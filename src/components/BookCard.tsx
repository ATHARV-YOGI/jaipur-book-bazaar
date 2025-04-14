
import { Book } from '@/types';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

interface BookCardProps {
  book: Book;
  showBuyButton?: boolean;
}

const BookCard = ({ book, showBuyButton = true }: BookCardProps) => {
  const { currentUser } = useAuth();
  
  // Format price in INR
  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(book.price);

  return (
    <Card className="book-card h-full flex flex-col">
      <div className="relative pt-[70%] overflow-hidden">
        <img
          src={book.image}
          alt={book.title}
          className="absolute top-0 left-0 w-full h-full object-cover transform transition-transform duration-500 hover:scale-105"
        />
        <Badge 
          className="absolute top-2 right-2" 
          variant={book.category === 'Drafter' ? 'default' : 'secondary'}
        >
          {book.category}
        </Badge>
      </div>
      
      <CardContent className="pt-4 flex-grow">
        <h3 className="font-playfair text-lg font-medium line-clamp-1">{book.title}</h3>
        <p className="text-muted-foreground text-sm mb-2">by {book.author}</p>
        
        <div className="flex flex-wrap gap-2 mb-2">
          <Badge variant="outline">{book.condition}</Badge>
        </div>
        
        <p className="text-bookBrown-dark font-bold text-lg">{formattedPrice}</p>
      </CardContent>
      
      <CardFooter className="pt-0 flex gap-2">
        <Link to={`/book/${book.id}`} className="flex-1">
          <Button variant="outline" className="w-full">View Details</Button>
        </Link>
        
        {showBuyButton && book.status === 'Available' && currentUser && currentUser.id !== book.sellerId && (
          <Link to={`/book/${book.id}`} className="flex-1">
            <Button className="w-full bg-bookAccent hover:bg-bookAccent-dark">Buy Now</Button>
          </Link>
        )}
      </CardFooter>
    </Card>
  );
};

export default BookCard;
