
import { useBooks } from '@/context/BookContext';
import { Button } from '@/components/ui/button';
import { BookCategory } from '@/types';

const BookCategoryFilter = () => {
  const { setFilterCategory } = useBooks();

  const handleFilter = (category: BookCategory | 'All') => {
    setFilterCategory(category);
  };

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <Button 
        variant="outline" 
        onClick={() => handleFilter('All')}
        className="border-bookBrown text-bookBrown hover:bg-bookBrown hover:text-white"
      >
        All Books
      </Button>
      <Button 
        variant="outline" 
        onClick={() => handleFilter('Drafter')}
        className="border-bookBrown text-bookBrown hover:bg-bookBrown hover:text-white"
      >
        Drafter Books
      </Button>
      <Button 
        variant="outline" 
        onClick={() => handleFilter('NK')}
        className="border-bookBrown text-bookBrown hover:bg-bookBrown hover:text-white"
      >
        NK Books
      </Button>
      <Button 
        variant="outline" 
        onClick={() => handleFilter('Both')}
        className="border-bookBrown text-bookBrown hover:bg-bookBrown hover:text-white"
      >
        Both Categories
      </Button>
    </div>
  );
};

export default BookCategoryFilter;
