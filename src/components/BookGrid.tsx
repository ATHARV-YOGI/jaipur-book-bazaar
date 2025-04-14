
import { Book } from '@/types';
import BookCard from './BookCard';

interface BookGridProps {
  books: Book[];
  showBuyButton?: boolean;
}

const BookGrid = ({ books, showBuyButton = true }: BookGridProps) => {
  if (books.length === 0) {
    return (
      <div className="py-8 text-center">
        <p className="text-muted-foreground text-lg">No books found. Try adjusting your filters.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {books.map((book) => (
        <BookCard key={book.id} book={book} showBuyButton={showBuyButton} />
      ))}
    </div>
  );
};

export default BookGrid;
