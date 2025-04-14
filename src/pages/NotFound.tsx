
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { BookX } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-bookBeige">
      <div className="text-center max-w-md px-4">
        <BookX className="h-24 w-24 text-bookBrown mx-auto mb-6" />
        <h1 className="text-4xl font-playfair font-bold mb-4 text-bookBrown">404</h1>
        <p className="text-xl text-bookBrown-dark mb-6">
          Oops! We couldn't find the page you're looking for.
        </p>
        <p className="text-muted-foreground mb-8">
          It seems this book has been checked out or doesn't exist in our library.
        </p>
        <Link to="/">
          <Button className="bg-bookBrown hover:bg-bookBrown-dark">
            Return to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
