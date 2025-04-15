import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "@/components/ui/navigation-menu"

const Header = () => {
  const { currentUser } = useAuth();
  
  return (
    <header className="bg-white border-b border-gray-200">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-playfair font-bold text-bookBrown">
          BookBees
        </Link>
        
        <div className="space-x-4">
          <Link to="/buy" className="text-bookBrown hover:text-bookBrown-dark">
            Buy Books
          </Link>
          <Link to="/sell" className="text-bookBrown hover:text-bookBrown-dark">
            Sell Books
          </Link>
          <Link to="/about" className="text-bookBrown hover:text-bookBrown-dark">
            About
          </Link>
          <Link to="/contact" className="text-bookBrown hover:text-bookBrown-dark">
            Contact
          </Link>
          
          {currentUser ? (
            <>
              <Link to="/profile" className="text-bookBrown hover:text-bookBrown-dark">
                Profile
              </Link>
            </>
          ) : (
            <>
              <Link to="/login" className="text-bookBrown hover:text-bookBrown-dark">
                Login
              </Link>
              <Link to="/signup" className="text-bookBrown hover:text-bookBrown-dark">
                Sign Up
              </Link>
            </>
          )}
        </div>
        
        {currentUser?.isAdmin && (
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link 
                    to="/admin/orders"
                    className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                  >
                    Admin Panel
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        )}
      </nav>
    </header>
  );
};

export default Header;
