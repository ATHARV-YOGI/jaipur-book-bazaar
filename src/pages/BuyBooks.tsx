
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BookGrid from '@/components/BookGrid';
import BookCategoryFilter from '@/components/BookCategoryFilter';
import LocationInput from '@/components/LocationInput';
import { useBooks } from '@/context/BookContext';
import { useAuth } from '@/context/AuthContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Search } from 'lucide-react';

const BuyBooks = () => {
  const { filteredBooks } = useBooks();
  const { currentUser } = useAuth();
  const [userLocation, setUserLocation] = useState(currentUser?.location || "");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter books based on search query
  const searchedBooks = searchQuery.trim() === ""
    ? filteredBooks
    : filteredBooks.filter(book => 
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase())
      );

  // Only show available books
  const availableBooks = searchedBooks.filter(book => book.status === 'Available');

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow py-12 bg-bookBeige-light">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-playfair font-bold text-bookBrown mb-6">
            Buy Books
          </h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-medium mb-4">Set Your Location</h2>
                <LocationInput 
                  onLocationSet={setUserLocation} 
                  initialLocation={currentUser?.location}
                />
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-medium mb-4">Search Books</h2>
                <div className="space-y-2">
                  <Label htmlFor="search">Title or Author</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="search"
                      type="text"
                      placeholder="Search books..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-medium mb-4">Filter by Category</h2>
                <div className="flex flex-col gap-2">
                  <BookCategoryFilter />
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-3">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-medium">
                  Available Books {searchedBooks.length > 0 ? `(${availableBooks.length})` : ''}
                </h2>
              </div>
              
              <BookGrid books={availableBooks} />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BuyBooks;
