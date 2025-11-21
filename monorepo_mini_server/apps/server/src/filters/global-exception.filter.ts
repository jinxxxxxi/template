import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    // 获取请求信息
    const { method, url, body, query, params, headers } = request;
    const userAgent = headers['user-agent'];
    const ip = headers['x-forwarded-for'] || request.connection.remoteAddress;

    // 记录错误日志
    this.logError(exception, { method, url, body, query, params, userAgent, ip });

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = '服务器内部错误';
    let errorCode = 'INTERNAL_ERROR';

    // 处理不同类型的异常
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const response = exception.getResponse() as any;
      message = response.message || exception.message;
      errorCode = this.getErrorCode(status);
    } else if (exception instanceof Error) {
      // 普通 JavaScript 错误
      message = exception.message || '未知错误';
      errorCode = 'JAVASCRIPT_ERROR';
      
      // 检查是否为 Prisma 相关错误
      if (exception.message.includes('P2002') || exception.message.includes('P2003')) {
        status = HttpStatus.BAD_REQUEST;
        message = this.getPrismaErrorMessage(exception.message);
        errorCode = 'PRISMA_ERROR';
      }
    } else if (typeof exception === 'string') {
      // 字符串错误
      message = exception;
      errorCode = 'STRING_ERROR';
    }

    // 构建错误响应
    const errorResponse: any = {
      success: false,
      error: {
        code: errorCode,
        message: process.env.NODE_ENV === 'production' ? '服务器内部错误' : message,
        timestamp: new Date().toISOString(),
        path: url,
        method,
      },
      data: null,
    };

    // 在开发环境下添加更多调试信息
    if (process.env.NODE_ENV === 'development') {
      errorResponse.error.stack = exception instanceof Error ? exception.stack : undefined;
    }

    // 发送响应
    response.status(status).json(errorResponse);
  }

  /**
   * 记录错误日志
   */
  private logError(exception: unknown, context: any): void {
    const errorMessage = exception instanceof Error ? exception.message : String(exception);
    const stack = exception instanceof Error ? exception.stack : undefined;

    this.logger.error(
      `异常: ${errorMessage}`,
      {
        exception: exception instanceof Error ? exception.stack : String(exception),
        context,
        timestamp: new Date().toISOString(),
      }
    );

    // 如果是严重错误，可以发送到监控系统
    if (this.isCriticalError(exception)) {
      this.logger.error('🚨 严重错误，需要立即关注！', {
        error: errorMessage,
        stack,
        context,
      });
    }
  }

  /**
   * 判断是否为严重错误
   */
  private isCriticalError(exception: unknown): boolean {
    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      return status >= 500; // 5xx 错误视为严重错误
    }
    
    // 数据库连接错误等
    if (exception instanceof Error) {
      const criticalKeywords = [
        'ECONNREFUSED',
        'ENOTFOUND',
        'ETIMEDOUT',
        'ECONNRESET',
        'database',
        'connection',
        'timeout',
      ];
      
      return criticalKeywords.some(keyword => 
        exception.message.toLowerCase().includes(keyword.toLowerCase())
      );
    }
    
    return false;
  }

  /**
   * 根据 HTTP 状态码获取错误代码
   */
  private getErrorCode(status: number): string {
    const errorCodes: Record<number, string> = {
      400: 'BAD_REQUEST',
      401: 'UNAUTHORIZED',
      403: 'FORBIDDEN',
      404: 'NOT_FOUND',
      405: 'METHOD_NOT_ALLOWED',
      409: 'CONFLICT',
      422: 'UNPROCESSABLE_ENTITY',
      429: 'TOO_MANY_REQUESTS',
      500: 'INTERNAL_SERVER_ERROR',
      502: 'BAD_GATEWAY',
      503: 'SERVICE_UNAVAILABLE',
      504: 'GATEWAY_TIMEOUT',
    };
    
    return errorCodes[status] || 'UNKNOWN_ERROR';
  }

  /**
   * 获取 Prisma 错误消息
   */
  private getPrismaErrorMessage(message: string): string {
    if (message.includes('P2002')) {
      return '数据已存在，请检查唯一性约束';
    }
    if (message.includes('P2003')) {
      return '外键约束失败';
    }
    if (message.includes('P2025')) {
      return '记录不存在';
    }
    if (message.includes('P2027')) {
      return '数据验证失败';
    }
    if (message.includes('P2034')) {
      return '事务失败';
    }
    if (message.includes('P2037')) {
      return '连接超时';
    }
    
    return '数据库操作失败';
  }
} 