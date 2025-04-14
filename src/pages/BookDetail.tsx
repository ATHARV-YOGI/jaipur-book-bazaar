
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useBooks } from '@/context/BookContext';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
import { ShoppingBag, User, Calendar, ArrowLeft } from 'lucide-react';

const BookDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { books, buyBook } = useBooks();
  const { currentUser } = useAuth();
  
  const [showBuyDialog, setShowBuyDialog] = useState(false);
  const [deliveryLocation, setDeliveryLocation] = useState(currentUser?.location || '');
  
  // Find the book with the given ID
  const book = books.find(b => b.id === id);
  
  // Handle case where book is not found
  if (!book) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow py-12 bg-bookBeige-light">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl font-playfair font-bold text-bookBrown mb-4">
              Book Not Found
            </h1>
            <p className="mb-6">
              The book you're looking for doesn't exist or has been removed.
            </p>
            <Button onClick={() => navigate('/buy')} className="bg-bookBrown hover:bg-bookBrown-dark">
              Browse Books
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  // Format price in INR
  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(book.price);
  
  // Format date
  const formattedDate = new Date(book.createdAt).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  
  const handleBuyClick = () => {
    if (!currentUser) {
      toast({
        title: "Login required",
        description: "You need to log in to buy books",
      });
      navigate('/login');
      return;
    }
    
    if (currentUser.id === book.sellerId) {
      toast({
        variant: "destructive",
        title: "Cannot buy your own book",
        description: "You cannot purchase a book that you're selling",
      });
      return;
    }
    
    setShowBuyDialog(true);
  };
  
  const handleBuyConfirm = () => {
    if (!deliveryLocation.trim()) {
      toast({
        variant: "destructive",
        title: "Delivery location required",
        description: "Please enter your delivery location in Jaipur",
      });
      return;
    }
    
    buyBook(book.id, deliveryLocation);
    setShowBuyDialog(false);
    navigate('/');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow py-12 bg-bookBeige-light">
        <div className="container mx-auto px-4">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-6 text-bookBrown hover:text-bookBrown-dark hover:bg-bookBeige"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-6">
              {/* Book Image */}
              <div className="md:col-span-1">
                <div className="aspect-[3/4] bg-muted rounded-md overflow-hidden">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              {/* Book Details */}
              <div className="md:col-span-2 space-y-6">
                <div>
                  <div className="flex flex-wrap gap-2 mb-2">
                    <Badge variant={book.category === 'Drafter' ? 'default' : 'secondary'}>
                      {book.category}
                    </Badge>
                    <Badge variant="outline">{book.condition}</Badge>
                    <Badge 
                      variant={book.status === 'Available' ? 'default' : 'destructive'}
                      className={book.status === 'Available' ? 'bg-green-500 hover:bg-green-600' : ''}
                    >
                      {book.status}
                    </Badge>
                  </div>
                  
                  <h1 className="text-3xl font-playfair font-bold text-bookBrown">{book.title}</h1>
                  <p className="text-lg text-muted-foreground">by {book.author}</p>
                </div>
                
                <div>
                  <h2 className="text-2xl font-bold text-bookBrown-dark">{formattedPrice}</h2>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Description</h3>
                  <p className="text-muted-foreground">
                    {book.description}
                  </p>
                </div>
                
                <Separator />
                
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center">
                    <User className="h-5 w-5 text-muted-foreground mr-2" />
                    <span>Seller: {book.sellerName}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-muted-foreground mr-2" />
                    <span>Listed on: {formattedDate}</span>
                  </div>
                </div>
                
                {book.status === 'Available' && (
                  <div className="pt-4">
                    <Button 
                      onClick={handleBuyClick}
                      className="w-full md:w-auto bg-bookAccent hover:bg-bookAccent-dark"
                      disabled={currentUser?.id === book.sellerId}
                    >
                      <ShoppingBag className="mr-2 h-5 w-5" />
                      Buy Now
                    </Button>
                    {currentUser?.id === book.sellerId && (
                      <p className="text-sm text-muted-foreground mt-2">
                        You cannot purchase your own book.
                      </p>
                    )}
                  </div>
                )}
                
                {book.status !== 'Available' && (
                  <Card>
                    <CardContent className="pt-6">
                      <p className="text-center text-muted-foreground">
                        This book is no longer available for purchase.
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* Buy Confirmation Dialog */}
      <Dialog open={showBuyDialog} onOpenChange={setShowBuyDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Your Purchase</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Book:</span>
                <span className="font-medium">{book.title}</span>
              </div>
              <div className="flex justify-between">
                <span>Price:</span>
                <span className="font-medium">{formattedPrice}</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="deliveryLocation">Delivery Location in Jaipur*</Label>
              <Input
                id="deliveryLocation"
                value={deliveryLocation}
                onChange={(e) => setDeliveryLocation(e.target.value)}
                placeholder="Enter your delivery address in Jaipur"
              />
              <p className="text-xs text-muted-foreground">
                Your book will be delivered to this address within 24 hours.
              </p>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowBuyDialog(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleBuyConfirm}
              className="bg-bookAccent hover:bg-bookAccent-dark"
            >
              Confirm Purchase
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
};

export default BookDetail;
