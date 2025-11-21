import { UserRole } from '@packages/database';
import { PaginationParams } from '../common';

// 查询用户列表请求参数
export interface GetUserListRequest extends PaginationParams {
  username?: string;
  email?: string;
  role?: UserRole;
  sortBy?: 'createdAt' | 'updatedAt';
}

// 查询单个用户请求参数
export interface GetUserRequest {
  userId: string;
} 