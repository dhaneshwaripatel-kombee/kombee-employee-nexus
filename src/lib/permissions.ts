
import { Permission } from '@/types/auth';

// Role-based permission mapping
export const ROLE_PERMISSIONS: Record<string, Permission[]> = {
  admin: [
    'user:read', 
    'user:create', 
    'user:update', 
    'user:delete',
    'role:read', 
    'role:create', 
    'role:update', 
    'role:delete',
    'document:read', 
    'document:create', 
    'document:update', 
    'document:delete',
    'settings:read',
    'settings:update'
  ],
  manager: [
    'user:read',
    'document:read', 
    'document:create', 
    'document:update',
    'settings:read'
  ],
  employee: [
    'document:read',
    'document:create'
  ]
};

// Helper to check if a user has a specific permission
export const hasPermission = (userPermissions: Permission[], requiredPermission: Permission): boolean => {
  return userPermissions.includes(requiredPermission);
};

// Helper to check if a user has any of the specified permissions
export const hasAnyPermission = (userPermissions: Permission[], requiredPermissions: Permission[]): boolean => {
  return requiredPermissions.some(permission => userPermissions.includes(permission));
};

// Helper to check if a user has all of the specified permissions
export const hasAllPermissions = (userPermissions: Permission[], requiredPermissions: Permission[]): boolean => {
  return requiredPermissions.every(permission => userPermissions.includes(permission));
};
