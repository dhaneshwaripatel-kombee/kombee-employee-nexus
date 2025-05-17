
import { useAuth } from '@/contexts/AuthContext';
import AppLayout from '@/components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Users, FileText, ShieldCheck } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();

  if (!user) return null;

  // Different dashboard views based on role
  const renderDashboardContent = () => {
    switch (user.role.name) {
      case 'admin':
        return <AdminDashboard />;
      case 'manager':
        return <ManagerDashboard />;
      default:
        return <EmployeeDashboard />;
    }
  };

  return (
    <AppLayout>
      <div className="page-container">
        <h1 className="mb-6 text-2xl font-bold">Dashboard</h1>
        {renderDashboardContent()}
      </div>
    </AppLayout>
  );
};

// Admin Dashboard View
const AdminDashboard = () => {
  // Mock data for admin dashboard
  const stats = [
    { title: 'Total Employees', value: 123, icon: <Users className="h-6 w-6 text-blue-500" /> },
    { title: 'Departments', value: 8, icon: <User className="h-6 w-6 text-green-500" /> },
    { title: 'Documents', value: 456, icon: <FileText className="h-6 w-6 text-amber-500" /> },
    { title: 'User Roles', value: 5, icon: <ShieldCheck className="h-6 w-6 text-purple-500" /> },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index} className="card-hover">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="card-hover">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center gap-4 border-b pb-3 last:border-0">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">User account updated</p>
                    <p className="text-sm text-muted-foreground">
                      {i} hour{i !== 1 ? 's' : ''} ago
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader>
            <CardTitle>System Health</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p>Database Status</p>
                <span className="flex items-center text-green-500">
                  <span className="mr-1 h-2 w-2 rounded-full bg-green-500"></span> Healthy
                </span>
              </div>
              <div className="flex items-center justify-between">
                <p>API Status</p>
                <span className="flex items-center text-green-500">
                  <span className="mr-1 h-2 w-2 rounded-full bg-green-500"></span> Operational
                </span>
              </div>
              <div className="flex items-center justify-between">
                <p>Storage Usage</p>
                <span>76%</span>
              </div>
              <div className="flex items-center justify-between">
                <p>Last Backup</p>
                <span>Today, 03:45 AM</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Manager Dashboard View
const ManagerDashboard = () => {
  // Mock data for manager dashboard
  const teamMembers = [
    { name: 'John Doe', position: 'Frontend Developer', status: 'Available' },
    { name: 'Jane Smith', position: 'Backend Developer', status: 'In a meeting' },
    { name: 'Robert Johnson', position: 'UI Designer', status: 'Away' },
    { name: 'Emily Wilson', position: 'QA Tester', status: 'Available' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="card-hover">
          <CardHeader>
            <CardTitle>Team Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teamMembers.length}</div>
            <p className="text-sm text-muted-foreground">Team members</p>
          </CardContent>
        </Card>
        
        <Card className="card-hover">
          <CardHeader>
            <CardTitle>Documents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-sm text-muted-foreground">Team documents</p>
          </CardContent>
        </Card>
        
        <Card className="card-hover">
          <CardHeader>
            <CardTitle>Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-sm text-muted-foreground">Pending tasks</p>
          </CardContent>
        </Card>
      </div>
      
      <Card className="card-hover">
        <CardHeader>
          <CardTitle>Team Members</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {teamMembers.map((member, index) => (
              <div key={index} className="flex items-center justify-between border-b pb-3 last:border-0">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-sm font-semibold text-primary">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium">{member.name}</p>
                    <p className="text-sm text-muted-foreground">{member.position}</p>
                  </div>
                </div>
                <div>
                  <span className={`text-sm ${
                    member.status === 'Available' 
                      ? 'text-green-500' 
                      : member.status === 'Away' 
                        ? 'text-amber-500' 
                        : 'text-blue-500'
                  }`}>
                    {member.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Employee Dashboard View
const EmployeeDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="card-hover">
          <CardHeader>
            <CardTitle>My Documents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-sm text-muted-foreground">Personal documents</p>
          </CardContent>
        </Card>
        
        <Card className="card-hover">
          <CardHeader>
            <CardTitle>Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-sm text-muted-foreground">Assigned tasks</p>
          </CardContent>
        </Card>
        
        <Card className="card-hover">
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-sm text-muted-foreground">Unread messages</p>
          </CardContent>
        </Card>
      </div>
      
      <Card className="card-hover">
        <CardHeader>
          <CardTitle>Recent Documents</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {['Employee Handbook', 'Benefits Overview', 'Vacation Request Form', 'Performance Review'].map((doc, i) => (
              <div key={i} className="flex items-center gap-4 border-b pb-3 last:border-0">
                <div className="h-10 w-10 rounded bg-primary/10 flex items-center justify-center">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">{doc}</p>
                  <p className="text-sm text-muted-foreground">
                    Last viewed {Math.floor(Math.random() * 24)} hours ago
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
