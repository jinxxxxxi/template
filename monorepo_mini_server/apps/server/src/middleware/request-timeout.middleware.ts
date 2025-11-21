import { Injectable, NestMiddleware, RequestTimeoutException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class RequestTimeoutMiddleware implements NestMiddleware {
  private readonly timeout = 60000; // 30 秒超时

  use(req: Request, res: Response, next: NextFunction): void {
    // 设置请求超时
    const timeoutId = setTimeout(() => {
      if (!res.headersSent) {
        res.status(408).json({
          success: false,
          error: {
            code: 'REQUEST_TIMEOUT',
            message: '请求超时，请稍后重试',
            timestamp: new Date().toISOString(),
            path: req.url,
            method: req.method,
          },
          data: null,
        });
      }
    }, this.timeout);

    // 请求完成时清除超时
    res.on('finish', () => {
      clearTimeout(timeoutId);
    });

    res.on('close', () => {
      clearTimeout(timeoutId);
    });

    next();
  }
} 