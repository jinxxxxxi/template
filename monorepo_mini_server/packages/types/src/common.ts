// 通用类型定义
import { User, UserRole } from '@packages/database';

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  statusCode?: number;
}

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  page: number;
  data: T[];
  total: number;
}

export interface UserPayload {
  userId: string;
  username: string;
  role: UserRole;
}

export interface ICurrentUser extends Omit<User, 'password'> {}
