
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { 
  Menu, 
  X, 
  BookOpen, 
  LogIn, 
  UserPlus, 
  ShoppingBag, 
  BookMarked, 
  ShieldCheck 
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const { currentUser, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <BookOpen className="w-8 h-8 text-bookBrown mr-2" />
            <span className="text-2xl font-playfair font-bold text-bookBrown">Old Books Market</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-bookBrown-dark hover:text-bookAccent transition-colors">
              Home
            </Link>
            <Link to="/buy" className="text-bookBrown-dark hover:text-bookAccent transition-colors">
              Buy Books
            </Link>
            <Link to="/sell" className="text-bookBrown-dark hover:text-bookAccent transition-colors">
              Sell Books
            </Link>
            {currentUser?.isAdmin && (
              <Link to="/admin" className="text-bookBrown-dark hover:text-bookAccent transition-colors">
                Admin Panel
              </Link>
            )}
            
            {currentUser ? (
              <div className="flex items-center space-x-4">
                <span className="text-bookBrown-dark">Hi, {currentUser.name.split(' ')[0]}</span>
                <Button variant="outline" onClick={logout}>Logout</Button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login">
                  <Button variant="outline" className="flex items-center">
                    <LogIn className="w-4 h-4 mr-2" />
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="flex items-center bg-bookBrown hover:bg-bookBrown-dark">
                    <UserPlus className="w-4 h-4 mr-2" />
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden focus:outline-none"
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-bookBrown" />
            ) : (
              <Menu className="w-6 h-6 text-bookBrown" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 py-2 bg-white">
            <ul className="space-y-4">
              <li>
                <Link 
                  to="/" 
                  className="block px-3 py-2 text-bookBrown-dark hover:bg-bookBeige rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="flex items-center">
                    <BookOpen className="w-5 h-5 mr-2" />
                    Home
                  </div>
                </Link>
              </li>
              <li>
                <Link 
                  to="/buy" 
                  className="block px-3 py-2 text-bookBrown-dark hover:bg-bookBeige rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="flex items-center">
                    <ShoppingBag className="w-5 h-5 mr-2" />
                    Buy Books
                  </div>
                </Link>
              </li>
              <li>
                <Link 
                  to="/sell" 
                  className="block px-3 py-2 text-bookBrown-dark hover:bg-bookBeige rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="flex items-center">
                    <BookMarked className="w-5 h-5 mr-2" />
                    Sell Books
                  </div>
                </Link>
              </li>
              {currentUser?.isAdmin && (
                <li>
                  <Link 
                    to="/admin" 
                    className="block px-3 py-2 text-bookBrown-dark hover:bg-bookBeige rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div className="flex items-center">
                      <ShieldCheck className="w-5 h-5 mr-2" />
                      Admin Panel
                    </div>
                  </Link>
                </li>
              )}
              {currentUser ? (
                <>
                  <li className="px-3 py-2 text-bookBrown-dark">
                    Hi, {currentUser.name.split(' ')[0]}
                  </li>
                  <li>
                    <button 
                      onClick={() => {
                        logout();
                        setIsMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-bookBrown-dark hover:bg-bookBeige rounded-md"
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link 
                      to="/login" 
                      className="block px-3 py-2 text-bookBrown-dark hover:bg-bookBeige rounded-md"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <div className="flex items-center">
                        <LogIn className="w-5 h-5 mr-2" />
                        Login
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/signup" 
                      className="block px-3 py-2 text-bookBrown-dark hover:bg-bookBeige rounded-md"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <div className="flex items-center">
                        <UserPlus className="w-5 h-5 mr-2" />
                        Sign Up
                      </div>
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
