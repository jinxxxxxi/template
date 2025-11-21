import { UserRole } from '@packages/database';
import { ApiResponse, PaginatedResponse } from '../common';

// 获取自己用户信息响应
export interface GetUserSelfResponse extends ApiResponse<UserInfo> {}

// 获取单个用户信息响应
export interface GetUserResponse extends ApiResponse<UserInfo> {}

// 获取用户列表响应
export interface GetUserListResponse extends PaginatedResponse<UserListItem> {} 

// 用户基础信息接口
export interface UserInfo {
    id: string;
    username: string;
    email?: string;
    mobile?: string;
    description?: string;
    role: UserRole;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
  }
  
  // 用户列表项接口（不包含敏感信息）
  export interface UserListItem {
    id: string;
    username: string;
    email?: string;
    mobile?: string;
    description?: string;
    role: UserRole;
    createdAt: Date;
    updatedAt: Date;
  } 