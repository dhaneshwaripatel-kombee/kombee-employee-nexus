
export type UserRole = 'admin' | 'manager' | 'employee' | string;

export type Permission = 
  | 'user:read' 
  | 'user:create' 
  | 'user:update' 
  | 'user:delete'
  | 'role:read' 
  | 'role:create' 
  | 'role:update' 
  | 'role:delete'
  | 'document:read' 
  | 'document:create' 
  | 'document:update' 
  | 'document:delete'
  | 'settings:read'
  | 'settings:update';

export interface Role {
  id: string;
  name: UserRole;
  permissions: Permission[];
  description: string;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: Role;
  department?: string;
  position?: string;
  profileImage?: string;
  dateHired?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  token: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends LoginCredentials {
  firstName: string;
  lastName: string;
}
