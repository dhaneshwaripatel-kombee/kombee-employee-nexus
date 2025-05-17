
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AuthState, LoginCredentials, RegisterCredentials, User } from '@/types/auth';
import { useToast } from '@/hooks/use-toast';

// Mock login function (in a real app, this would be an API call)
const loginUser = async ({ email, password }: LoginCredentials): Promise<{ user: User, token: string }> => {
  // Check if email ends with @kombee.com
  if (!email.endsWith('@kombee.com')) {
    throw new Error('Only @kombee.com email addresses are allowed');
  }
  
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // This is mock data - in a real app, you would get this from your API
  if (email === 'admin@kombee.com' && password === 'password') {
    return {
      user: {
        id: '1',
        email: 'admin@kombee.com',
        firstName: 'Admin',
        lastName: 'User',
        role: {
          id: '1',
          name: 'admin',
          permissions: [
            'user:read', 'user:create', 'user:update', 'user:delete',
            'role:read', 'role:create', 'role:update', 'role:delete',
            'document:read', 'document:create', 'document:update', 'document:delete',
            'settings:read', 'settings:update'
          ],
          description: 'Full system access'
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      token: 'mock-jwt-token'
    };
  } else if (email === 'manager@kombee.com' && password === 'password') {
    return {
      user: {
        id: '2',
        email: 'manager@kombee.com',
        firstName: 'Manager',
        lastName: 'User',
        role: {
          id: '2',
          name: 'manager',
          permissions: [
            'user:read', 
            'document:read', 'document:create', 'document:update',
            'settings:read'
          ],
          description: 'Team management access'
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      token: 'mock-jwt-token'
    };
  } else if (email === 'employee@kombee.com' && password === 'password') {
    return {
      user: {
        id: '3',
        email: 'employee@kombee.com',
        firstName: 'Employee',
        lastName: 'User',
        role: {
          id: '3',
          name: 'employee',
          permissions: ['document:read', 'document:create'],
          description: 'Basic employee access'
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      token: 'mock-jwt-token'
    };
  }
  
  throw new Error('Invalid credentials');
};

// Define the context type
interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  register: (credentials: RegisterCredentials) => Promise<void>;
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
    token: null
  });
  const { toast } = useToast();

  // Check for existing token on mount
  useEffect(() => {
    const checkAuth = async () => {
      const storedToken = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');
      
      if (storedToken && storedUser) {
        setAuthState({
          user: JSON.parse(storedUser),
          token: storedToken,
          isAuthenticated: true,
          isLoading: false,
          error: null
        });
      } else {
        setAuthState(prev => ({
          ...prev,
          isLoading: false
        }));
      }
    };
    
    checkAuth();
  }, []);

  // Login function
  const login = async (credentials: LoginCredentials) => {
    setAuthState(prev => ({
      ...prev,
      isLoading: true,
      error: null
    }));

    try {
      const { user, token } = await loginUser(credentials);
      
      // Store the token and user in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      setAuthState({
        user,
        token,
        isAuthenticated: true,
        isLoading: false,
        error: null
      });
      
      toast({
        title: "Login successful",
        description: `Welcome back, ${user.firstName}!`,
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage
      }));
      
      toast({
        title: "Login failed",
        description: errorMessage,
        variant: "destructive"
      });
    }
  };

  // Logout function
  const logout = () => {
    // Clear localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Reset state
    setAuthState({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null
    });
    
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  // Register function (mockup for demo)
  const register = async (credentials: RegisterCredentials) => {
    setAuthState(prev => ({
      ...prev,
      isLoading: true,
      error: null
    }));

    try {
      // Check if email ends with @kombee.com
      if (!credentials.email.endsWith('@kombee.com')) {
        throw new Error('Only @kombee.com email addresses are allowed');
      }
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, this would create a user in your database
      toast({
        title: "Registration successful",
        description: "Your account has been created. Please log in.",
      });
      
      setAuthState(prev => ({
        ...prev,
        isLoading: false
      }));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage
      }));
      
      toast({
        title: "Registration failed",
        description: errorMessage,
        variant: "destructive"
      });
    }
  };

  const contextValue: AuthContextType = {
    ...authState,
    login,
    logout,
    register
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
