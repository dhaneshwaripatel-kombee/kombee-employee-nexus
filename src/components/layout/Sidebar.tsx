
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import { Link, useLocation } from 'react-router-dom';
import { hasPermission } from '@/lib/permissions';
import { 
  Home, 
  Users, 
  FileText, 
  Settings, 
  LogOut, 
  ShieldCheck, 
  User
} from 'lucide-react';

const Sidebar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  if (!user) return null;

  const userPermissions = user.role.permissions;

  const NavItem = ({ to, icon, label, permission }: { 
    to: string; 
    icon: React.ReactNode;
    label: string;
    permission?: string;
  }) => {
    const isActive = location.pathname === to;
    
    // If permission is required and user doesn't have it, don't render the item
    if (permission && !hasPermission(userPermissions, permission as any)) {
      return null;
    }

    return (
      <Link
        to={to}
        className={cn(
          'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
          isActive 
            ? 'bg-sidebar-accent text-sidebar-accent-foreground' 
            : 'text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground'
        )}
      >
        {icon}
        {label}
      </Link>
    );
  };

  return (
    <div className="hidden w-64 flex-shrink-0 bg-sidebar lg:block">
      <div className="flex h-full flex-col">
        <div className="flex h-16 items-center justify-center border-b border-sidebar-border">
          <h1 className="text-xl font-bold text-sidebar-foreground">Kombee EMS</h1>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4">
          <nav className="flex flex-col space-y-1">
            <NavItem to="/dashboard" icon={<Home size={18} />} label="Dashboard" />
            <NavItem 
              to="/employees" 
              icon={<Users size={18} />} 
              label="Employees" 
              permission="user:read"
            />
            <NavItem 
              to="/profile" 
              icon={<User size={18} />} 
              label="My Profile" 
            />
            <NavItem 
              to="/documents" 
              icon={<FileText size={18} />} 
              label="Documents" 
              permission="document:read"
            />
            <NavItem 
              to="/roles" 
              icon={<ShieldCheck size={18} />} 
              label="Roles & Permissions" 
              permission="role:read"
            />
            <NavItem 
              to="/settings" 
              icon={<Settings size={18} />} 
              label="Settings" 
              permission="settings:read"
            />
          </nav>
        </div>
        
        <div className="p-4">
          <button
            onClick={logout}
            className="flex w-full items-center gap-3 rounded-md bg-sidebar-accent/10 px-3 py-2 text-sm font-medium text-sidebar-foreground transition-colors hover:bg-sidebar-accent/30"
          >
            <LogOut size={18} />
            Logout
          </button>
          <div className="mt-4 flex items-center gap-3 rounded-md border border-sidebar-border p-2">
            <div className="h-8 w-8 rounded-full bg-sidebar-accent/30 flex items-center justify-center">
              <span className="text-sm font-semibold text-sidebar-foreground">
                {user.firstName.charAt(0)}{user.lastName.charAt(0)}
              </span>
            </div>
            <div className="overflow-hidden">
              <p className="truncate text-sm font-medium text-sidebar-foreground">
                {user.firstName} {user.lastName}
              </p>
              <p className="truncate text-xs text-sidebar-foreground/70">
                {user.role.name}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
