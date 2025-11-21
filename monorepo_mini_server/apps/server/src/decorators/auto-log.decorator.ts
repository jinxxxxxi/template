import { SetMetadata } from '@nestjs/common';

export const AUTO_LOG_KEY = 'auto_log';
export const LOG_CALL_KEY = 'log_call';
export const LOG_PERFORMANCE_KEY = 'log_performance';

export interface AutoLogOptions {
  context?: string; // 日志上下文，默认使用类名
  logArgs?: boolean; // 是否记录方法参数，默认 true
  logResult?: boolean; // 是否记录返回值，默认 true
  logError?: boolean; // 是否记录错误，默认 true
  level?: 'log' | 'warn' | 'error' | 'debug' | 'verbose'; // 日志级别，默认 'log'
}

export interface LogCallOptions {
  context?: string; // 日志上下文，默认使用类名
  level?: 'log' | 'warn' | 'error' | 'debug' | 'verbose'; // 日志级别，默认 'log'
}

export interface LogPerformanceOptions {
  context?: string; // 日志上下文，默认使用类名
  threshold?: number; // 性能阈值（毫秒），超过此值会记录警告
}

/**
 * 自动日志装饰器 - 完整的方法日志记录
 * 自动记录方法调用、参数、结果、执行时间和错误
 */
export const AutoLog = (options?: AutoLogOptions) =>
  SetMetadata(AUTO_LOG_KEY, options ?? {});

/**
 * 简化日志装饰器 - 只记录方法调用和错误
 */
export const LogCall = (options?: LogCallOptions) =>
  SetMetadata(LOG_CALL_KEY, options ?? {});

/**
 * 性能监控装饰器 - 记录方法执行时间
 */
export const LogPerformance = (options?: LogPerformanceOptions) =>
  SetMetadata(LOG_PERFORMANCE_KEY, options ?? {}); 