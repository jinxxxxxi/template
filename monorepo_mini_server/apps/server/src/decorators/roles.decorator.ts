import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';
export enum UserRole {
  ROOT = 'ROOT',
  ADMIN = 'ADMIN',
  USER = 'USER',
}
export const Roles = (...roles: (UserRole | 'Public')[]) =>
  SetMetadata(ROLES_KEY, roles);
