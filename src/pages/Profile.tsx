
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  User, 
  MapPin, 
  Phone, 
  Mail, 
  Package, 
  ShoppingBag, 
  BookOpen,
  Edit
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import LocationInput from '@/components/LocationInput';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useBooks } from '@/context/BookContext';
import { Book } from '@/types';
import { toast } from 'sonner';

const Profile = () => {
  const { currentUser, logout, updateUserLocation } = useAuth();
  const navigate = useNavigate();
  const { allBooks } = useBooks();
  const [isEditingLocation, setIsEditingLocation] = useState(false);
  const [userBooks, setUserBooks] = useState<Book[]>([]);
  
  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
      return;
    }
    
    // Filter books belonging to the current user
    if (currentUser && allBooks) {
      const filteredBooks = allBooks.filter(book => book.sellerId === currentUser.id);
      setUserBooks(filteredBooks);
    }
  }, [currentUser, navigate, allBooks]);

  const handleLocationUpdate = (location: string) => {
    if (currentUser) {
      updateUserLocation(location);
      setIsEditingLocation(false);
      toast.success('Location updated successfully');
    }
  };

  if (!currentUser) {
    return null;
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="flex flex-col min-h-screen bg-bookBeige-light">
      <Header />
      
      <main className="container mx-auto px-4 py-8 flex-grow">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* User Profile Card */}
          <Card className="md:col-span-1">
            <CardHeader className="pb-2">
              <CardTitle className="font-playfair">User Profile</CardTitle>
              <CardDescription>Your account information</CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="flex flex-col items-center">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${currentUser.name}`} alt={currentUser.name} />
                  <AvatarFallback>{getInitials(currentUser.name)}</AvatarFallback>
                </Avatar>
                
                <h2 className="text-xl font-bold mb-1">{currentUser.name}</h2>
                {currentUser.isAdmin && (
                  <span className="bg-bookAccent text-white text-xs px-2 py-1 rounded-full">
                    Admin
                  </span>
                )}
              </div>
              
              <Separator />
              
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-bookBrown" />
                  <span className="text-sm">{currentUser.email}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-bookBrown" />
                  <span className="text-sm">{currentUser.phone || 'Not provided'}</span>
                </div>
                
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-bookBrown mt-0.5" />
                  {isEditingLocation ? (
                    <div className="flex-1">
                      <LocationInput 
                        onLocationSet={handleLocationUpdate} 
                        initialLocation={currentUser.location}
                      />
                    </div>
                  ) : (
                    <div className="flex flex-1 justify-between items-center">
                      <span className="text-sm">{currentUser.location || 'Not provided'}</span>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => setIsEditingLocation(true)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
              
              <Separator />
              
              <Button 
                onClick={() => {
                  logout();
                  navigate('/');
                }}
                variant="outline" 
                className="w-full border-bookBrown text-bookBrown hover:bg-bookBrown hover:text-white"
              >
                Logout
              </Button>
            </CardContent>
          </Card>
          
          {/* Activity Summary and Books Listed */}
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-playfair">Book Activity</CardTitle>
                <CardDescription>Summary of your book transactions</CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm border flex items-center gap-3">
                    <div className="bg-bookBeige p-3 rounded-full">
                      <BookOpen className="h-6 w-6 text-bookBrown" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Books Listed</p>
                      <p className="text-2xl font-bold">{userBooks.length}</p>
                    </div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg shadow-sm border flex items-center gap-3">
                    <div className="bg-bookBeige p-3 rounded-full">
                      <ShoppingBag className="h-6 w-6 text-bookBrown" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Books Sold</p>
                      <p className="text-2xl font-bold">{userBooks.filter(book => book.status === 'Sold').length}</p>
                    </div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg shadow-sm border flex items-center gap-3">
                    <div className="bg-bookBeige p-3 rounded-full">
                      <Package className="h-6 w-6 text-bookBrown" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Books Bought</p>
                      <p className="text-2xl font-bold">0</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Your Books */}
            <Card>
              <CardHeader>
                <CardTitle className="font-playfair">Your Books</CardTitle>
                <CardDescription>Books you have listed for sale</CardDescription>
              </CardHeader>
              
              <CardContent>
                {userBooks.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {userBooks.map(book => (
                        <TableRow key={book.id} className="cursor-pointer" onClick={() => navigate(`/book/${book.id}`)}>
                          <TableCell className="font-medium">{book.title}</TableCell>
                          <TableCell>₹{book.price}</TableCell>
                          <TableCell>{book.category}</TableCell>
                          <TableCell>
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              book.status === 'Available' ? 'bg-green-100 text-green-800' :
                              book.status === 'Sold' ? 'bg-blue-100 text-blue-800' :
                              'bg-yellow-100 text-yellow-800'
                            }`}>
                              {book.status}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="text-center py-8">
                    <div className="flex justify-center mb-4">
                      <BookOpen className="h-12 w-12 text-bookBrown opacity-60" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">No books listed yet</h3>
                    <p className="text-muted-foreground mb-4">
                      You haven't listed any books for sale.
                    </p>
                    <Button 
                      onClick={() => navigate('/sell')}
                      className="bg-bookBrown hover:bg-bookBrown-dark"
                    >
                      Sell a Book
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;
