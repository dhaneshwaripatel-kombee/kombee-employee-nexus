
import { ReactNode } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  description?: string;
}

const AuthLayout = ({ children, title, description }: AuthLayoutProps) => {
  const { isAuthenticated, isLoading } = useAuth();

  // If still loading authentication status, show loading indicator
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-pulse text-2xl font-semibold text-primary">Loading...</div>
      </div>
    );
  }

  // If already authenticated, redirect to dashboard
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-kombee-blue">Kombee</h1>
          <p className="text-gray-600">Employee Management System</p>
        </div>
        
        <Card className="border-0 shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">{title}</CardTitle>
            {description && <CardDescription className="text-center">{description}</CardDescription>}
          </CardHeader>
          <CardContent>
            {children}
          </CardContent>
          <CardFooter className="border-t p-4">
            <p className="w-full text-center text-sm text-gray-500">
              &copy; {new Date().getFullYear()} Kombee Inc. All rights reserved.
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default AuthLayout;
