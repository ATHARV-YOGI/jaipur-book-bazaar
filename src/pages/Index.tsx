
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingBag, BookMarked } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BookGrid from '@/components/BookGrid';
import DeliveryPromise from '@/components/DeliveryPromise';
import BookCategoryFilter from '@/components/BookCategoryFilter';
import LocationInput from '@/components/LocationInput';
import { useBooks } from '@/context/BookContext';
import { useAuth } from '@/context/AuthContext';

const Index = () => {
  const [userLocation, setUserLocation] = useState("");
  const { filteredBooks } = useBooks();
  const { currentUser } = useAuth();
  
  // Only show the most recent 4 books
  const recentBooks = [...filteredBooks]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 4);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-bookBeige to-bookBeige-dark pt-16 pb-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h1 className="text-4xl md:text-5xl font-playfair font-bold text-bookBrown mb-4">
                  Jaipur's Marketplace for Student Books
                </h1>
                <p className="text-lg text-bookBrown-dark mb-6">
                  Buy and sell Drafter and NK books directly from other students in Jaipur. 
                  Save money and help the environment!
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/buy">
                    <Button className="bg-bookBrown hover:bg-bookBrown-dark flex items-center w-full sm:w-auto">
                      <ShoppingBag className="mr-2 h-5 w-5" />
                      Buy Books
                    </Button>
                  </Link>
                  
                  <Link to="/sell">
                    <Button variant="outline" className="border-bookBrown text-bookBrown hover:bg-bookBrown hover:text-white flex items-center w-full sm:w-auto">
                      <BookMarked className="mr-2 h-5 w-5" />
                      Sell Books
                    </Button>
                  </Link>
                </div>
              </div>
              
              <div className="relative">
                <div className="bg-white p-6 rounded-lg shadow-lg bg-opacity-80 backdrop-blur-sm">
                  <h2 className="text-xl font-playfair font-bold text-bookBrown mb-4">Set Your Jaipur Location</h2>
                  <LocationInput 
                    onLocationSet={setUserLocation} 
                    initialLocation={currentUser?.location}
                  />
                </div>
                
                {/* Decorative elements */}
                <div className="absolute -top-5 -left-5 w-16 h-16 bg-bookAccent opacity-10 rounded-full"></div>
                <div className="absolute -bottom-5 -right-5 w-24 h-24 bg-bookBrown opacity-10 rounded-full"></div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Delivery Promise Banner */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <DeliveryPromise />
          </div>
        </section>
        
        {/* Featured Books Section */}
        <section className="py-12 bg-bookBeige-light">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-playfair font-bold text-bookBrown">
                Recent Books
              </h2>
              <Link to="/buy">
                <Button variant="outline" className="border-bookBrown text-bookBrown hover:bg-bookBrown hover:text-white">
                  View All Books
                </Button>
              </Link>
            </div>
            
            <BookCategoryFilter />
            
            <BookGrid books={recentBooks} />
            
            <div className="mt-12 text-center">
              <Link to="/sell">
                <Button className="bg-bookAccent hover:bg-bookAccent-dark">
                  <BookMarked className="mr-2 h-5 w-5" />
                  Sell a Book
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
