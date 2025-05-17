
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
      <div className="text-center space-y-8 p-8 max-w-4xl">
        <h1 className="text-4xl md:text-6xl font-bold text-white">Kombee Employee Management System</h1>
        <p className="text-xl text-white/90">
          A secure, role-based employee management platform for modern enterprises
        </p>

        <div className="flex flex-wrap gap-4 justify-center mt-8">
          <Button asChild size="lg" variant="default" className="bg-white text-blue-600 hover:bg-blue-50">
            <Link to="/login">Sign In</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
            <Link to="/register">Create Account</Link>
          </Button>
        </div>

        <div className="mt-12 pt-8 border-t border-white/20">
          <p className="text-white/80 text-sm">
            For demonstration purposes, you can use the following credentials:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div className="bg-white/10 p-4 rounded-lg">
              <h3 className="font-bold text-white">Admin</h3>
              <p className="text-white/80 text-sm">Email: admin@kombee.com</p>
              <p className="text-white/80 text-sm">Password: password</p>
            </div>
            <div className="bg-white/10 p-4 rounded-lg">
              <h3 className="font-bold text-white">Manager</h3>
              <p className="text-white/80 text-sm">Email: manager@kombee.com</p>
              <p className="text-white/80 text-sm">Password: password</p>
            </div>
            <div className="bg-white/10 p-4 rounded-lg">
              <h3 className="font-bold text-white">Employee</h3>
              <p className="text-white/80 text-sm">Email: employee@kombee.com</p>
              <p className="text-white/80 text-sm">Password: password</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
