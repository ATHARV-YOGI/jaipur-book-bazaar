
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAuth } from '@/context/AuthContext';
import { useBooks } from '@/context/BookContext';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription,
  CardFooter 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BookMarked, BookCopy, Info } from 'lucide-react';
import { BookCategory, BookCondition } from '@/types';

const SellBooks = () => {
  const { currentUser } = useAuth();
  const { addBook } = useBooks();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    category: '' as BookCategory,
    condition: '' as BookCondition,
    price: '',
    description: '',
    image: '/placeholder.svg', // Default image
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.author.trim()) newErrors.author = 'Author is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.condition) newErrors.condition = 'Condition is required';
    if (!formData.price.trim()) {
      newErrors.price = 'Price is required';
    } else {
      const price = parseFloat(formData.price);
      if (isNaN(price) || price <= 0) {
        newErrors.price = 'Price must be a positive number';
      }
    }
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear the error for this field when user types
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear the error for this field
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentUser) {
      navigate('/login');
      return;
    }
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      addBook({
        title: formData.title,
        author: formData.author,
        category: formData.category as BookCategory,
        condition: formData.condition as BookCondition,
        price: parseFloat(formData.price),
        description: formData.description,
        image: formData.image,
      });
      
      // Reset form
      setFormData({
        title: '',
        author: '',
        category: '' as BookCategory,
        condition: '' as BookCondition,
        price: '',
        description: '',
        image: '/placeholder.svg',
      });
      
      navigate('/');
    } catch (error) {
      console.error('Error adding book:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow py-12 bg-bookBeige-light">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-playfair font-bold text-bookBrown mb-6">
              Sell Your Books
            </h1>
            
            {!currentUser ? (
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center py-8">
                    <BookCopy className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <h2 className="text-xl font-medium mb-2">Login Required</h2>
                    <p className="text-muted-foreground mb-6">
                      You need to be logged in to sell books.
                    </p>
                    <Button 
                      onClick={() => navigate('/login')}
                      className="bg-bookBrown hover:bg-bookBrown-dark"
                    >
                      Login to Continue
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BookMarked className="mr-2 h-5 w-5" />
                    List Your Book
                  </CardTitle>
                  <CardDescription>
                    Fill out the details below to list your book for sale.
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="title">Book Title*</Label>
                        <Input
                          id="title"
                          name="title"
                          value={formData.title}
                          onChange={handleChange}
                          placeholder="Enter book title"
                          className={errors.title ? "border-red-500" : ""}
                        />
                        {errors.title && (
                          <p className="text-red-500 text-sm">{errors.title}</p>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="author">Author*</Label>
                        <Input
                          id="author"
                          name="author"
                          value={formData.author}
                          onChange={handleChange}
                          placeholder="Enter author name"
                          className={errors.author ? "border-red-500" : ""}
                        />
                        {errors.author && (
                          <p className="text-red-500 text-sm">{errors.author}</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="category">Category*</Label>
                        <Select
                          onValueChange={(value) => handleSelectChange('category', value)}
                          value={formData.category}
                        >
                          <SelectTrigger className={errors.category ? "border-red-500" : ""}>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Drafter">Drafter</SelectItem>
                            <SelectItem value="NK">NK</SelectItem>
                            <SelectItem value="Both">Both</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.category && (
                          <p className="text-red-500 text-sm">{errors.category}</p>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="condition">Condition*</Label>
                        <Select
                          onValueChange={(value) => handleSelectChange('condition', value)}
                          value={formData.condition}
                        >
                          <SelectTrigger className={errors.condition ? "border-red-500" : ""}>
                            <SelectValue placeholder="Select condition" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="New">New</SelectItem>
                            <SelectItem value="Like New">Like New</SelectItem>
                            <SelectItem value="Good">Good</SelectItem>
                            <SelectItem value="Fair">Fair</SelectItem>
                            <SelectItem value="Poor">Poor</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.condition && (
                          <p className="text-red-500 text-sm">{errors.condition}</p>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="price">Price (₹)*</Label>
                        <Input
                          id="price"
                          name="price"
                          type="number"
                          value={formData.price}
                          onChange={handleChange}
                          placeholder="Enter price in INR"
                          min="1"
                          className={errors.price ? "border-red-500" : ""}
                        />
                        {errors.price && (
                          <p className="text-red-500 text-sm">{errors.price}</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="description">Description*</Label>
                      <Textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Describe your book, its condition, any highlights, etc."
                        rows={5}
                        className={errors.description ? "border-red-500" : ""}
                      />
                      {errors.description && (
                        <p className="text-red-500 text-sm">{errors.description}</p>
                      )}
                    </div>
                    
                    <div className="bg-muted/50 p-4 rounded-lg flex items-start gap-3">
                      <Info className="h-5 w-5 text-bookBrown mt-0.5" />
                      <div>
                        <h3 className="font-medium mb-1">Important Note</h3>
                        <p className="text-sm text-muted-foreground">
                          By listing your book, you agree to our 24-hour pickup policy. 
                          You'll need to make the book available for pickup within 24 hours
                          of a sale. Your pickup location will be shared with the buyer.
                        </p>
                      </div>
                    </div>
                  
                    <CardFooter className="px-0 pt-2">
                      <Button 
                        type="submit"
                        className="bg-bookAccent hover:bg-bookAccent-dark w-full"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Listing Book..." : "List Book for Sale"}
                      </Button>
                    </CardFooter>
                  </form>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SellBooks;
