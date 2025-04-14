
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { 
  Menu, 
  X, 
  BookOpen, 
  LogIn, 
  UserPlus, 
  ShoppingBag, 
  BookMarked, 
  ShieldCheck,
  User
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

const Header = () => {
  const { currentUser, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
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
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center gap-2 p-1">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-bookBeige text-bookBrown-dark">
                          {getInitials(currentUser.name)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-bookBrown-dark">{currentUser.name.split(' ')[0]}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => navigate('/profile')}>
                      <User className="mr-2 h-4 w-4" />
                      My Profile
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
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
                  <li>
                    <Link 
                      to="/profile" 
                      className="block px-3 py-2 text-bookBrown-dark hover:bg-bookBeige rounded-md"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <div className="flex items-center">
                        <User className="w-5 h-5 mr-2" />
                        My Profile
                      </div>
                    </Link>
                  </li>
                  <li>
                    <button 
                      onClick={() => {
                        logout();
                        setIsMenuOpen(false);
                        navigate('/');
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
