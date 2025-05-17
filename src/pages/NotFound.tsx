
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4 text-center">
      <div className="space-y-4">
        <div className="text-kombee-blue">
          <h1 className="text-9xl font-bold">404</h1>
        </div>
        <h2 className="text-2xl font-bold sm:text-3xl">Page not found</h2>
        <p className="mx-auto max-w-md text-gray-600">
          Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
        </p>
        <Button asChild>
          <Link to="/">Return to Dashboard</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
