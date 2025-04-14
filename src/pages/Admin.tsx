
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useBooks } from '@/context/BookContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Book, ChevronDown, Edit, ShoppingBag, Package, UserCog, Trash, CheckCircle } from 'lucide-react';
import { mockSiteContent } from '@/data/mockData';

const Admin = () => {
  const { currentUser } = useAuth();
  const { books, sales, updateBook, deleteBook, updateSaleStatus } = useBooks();
  
  // Redirect non-admin users
  if (!currentUser || !currentUser.isAdmin) {
    return <Navigate to="/" />;
  }
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow py-12 bg-bookBeige-light">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-playfair font-bold text-bookBrown mb-6">
            Admin Panel
          </h1>
          
          <Tabs defaultValue="books">
            <TabsList className="mb-6">
              <TabsTrigger value="books" className="flex items-center gap-2">
                <Book className="h-4 w-4" />
                Books
              </TabsTrigger>
              <TabsTrigger value="sales" className="flex items-center gap-2">
                <ShoppingBag className="h-4 w-4" />
                Sales
              </TabsTrigger>
              <TabsTrigger value="site-content" className="flex items-center gap-2">
                <Edit className="h-4 w-4" />
                Site Content
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="books">
              <AdminBooksTab books={books} updateBook={updateBook} deleteBook={deleteBook} />
            </TabsContent>
            
            <TabsContent value="sales">
              <AdminSalesTab sales={sales} updateSaleStatus={updateSaleStatus} />
            </TabsContent>
            
            <TabsContent value="site-content">
              <AdminSiteContentTab />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

// Books Management Tab
const AdminBooksTab = ({ 
  books, 
  updateBook, 
  deleteBook 
}: { 
  books: any[]; 
  updateBook: (id: string, updates: any) => void; 
  deleteBook: (id: string) => void; 
}) => {
  const [bookToEdit, setBookToEdit] = useState<any | null>(null);
  const [bookToDelete, setBookToDelete] = useState<any | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    category: '',
    condition: '',
    price: '',
    description: '',
    status: '',
  });
  
  // Handle opening the edit dialog
  const handleEditClick = (book: any) => {
    setBookToEdit(book);
    setFormData({
      title: book.title,
      author: book.author,
      category: book.category,
      condition: book.condition,
      price: book.price.toString(),
      description: book.description,
      status: book.status,
    });
  };
  
  // Handle form changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  // Handle select changes
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  // Handle form submission for editing
  const handleEditSubmit = () => {
    if (!bookToEdit) return;
    
    updateBook(bookToEdit.id, {
      title: formData.title,
      author: formData.author,
      category: formData.category,
      condition: formData.condition,
      price: parseFloat(formData.price),
      description: formData.description,
      status: formData.status,
    });
    
    setBookToEdit(null);
  };
  
  // Handle book deletion
  const handleDeleteConfirm = () => {
    if (!bookToDelete) return;
    
    deleteBook(bookToDelete.id);
    setBookToDelete(null);
    
    toast({
      title: "Book deleted",
      description: "The book has been successfully removed",
    });
  };
  
  // Format price in INR
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Books Management</CardTitle>
        <CardDescription>Manage all books listed on the platform</CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="rounded-md border">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Author</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Condition</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {books.map((book) => (
                <tr key={book.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium">{book.title}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm">{book.author}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge variant={book.category === 'Drafter' ? 'default' : 'secondary'}>
                      {book.category}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm">{book.condition}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium">{formatPrice(book.price)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge 
                      variant={book.status === 'Available' ? 'default' : 'secondary'}
                      className={book.status === 'Available' ? 'bg-green-500 hover:bg-green-600' : ''}
                    >
                      {book.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleEditClick(book)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => setBookToDelete(book)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
      
      {/* Edit Book Dialog */}
      <Dialog open={!!bookToEdit} onOpenChange={(open) => !open && setBookToEdit(null)}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Edit Book</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Book Title</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="author">Author</Label>
                <Input
                  id="author"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => handleSelectChange('category', value)}
                >
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Drafter">Drafter</SelectItem>
                    <SelectItem value="NK">NK</SelectItem>
                    <SelectItem value="Both">Both</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="condition">Condition</Label>
                <Select
                  value={formData.condition}
                  onValueChange={(value) => handleSelectChange('condition', value)}
                >
                  <SelectTrigger id="condition">
                    <SelectValue placeholder="Condition" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="New">New</SelectItem>
                    <SelectItem value="Like New">Like New</SelectItem>
                    <SelectItem value="Good">Good</SelectItem>
                    <SelectItem value="Fair">Fair</SelectItem>
                    <SelectItem value="Poor">Poor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="price">Price (₹)</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => handleSelectChange('status', value)}
              >
                <SelectTrigger id="status">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Available">Available</SelectItem>
                  <SelectItem value="Sold">Sold</SelectItem>
                  <SelectItem value="Reserved">Reserved</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setBookToEdit(null)}>
              Cancel
            </Button>
            <Button onClick={handleEditSubmit}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={!!bookToDelete} onOpenChange={(open) => !open && setBookToDelete(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          <p>
            Are you sure you want to delete the book "{bookToDelete?.title}"? This action cannot be undone.
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setBookToDelete(null)}>
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleDeleteConfirm}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

// Sales Management Tab
const AdminSalesTab = ({ 
  sales, 
  updateSaleStatus 
}: { 
  sales: any[]; 
  updateSaleStatus: (id: string, status: string) => void; 
}) => {
  // Format price in INR
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };
  
  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };
  
  const handleStatusChange = (saleId: string, newStatus: string) => {
    updateSaleStatus(saleId, newStatus);
    
    toast({
      title: "Status updated",
      description: `Sale has been marked as ${newStatus}`,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sales Management</CardTitle>
        <CardDescription>Track and manage all book sales</CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="rounded-md border">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Book</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Buyer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Seller</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sales.map((sale) => (
                <tr key={sale.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium">{sale.bookTitle}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm">{sale.buyerName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm">{sale.sellerName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium">{formatPrice(sale.price)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge 
                      variant={
                        sale.status === 'Pending' ? 'outline' : 
                        sale.status === 'Delivered' || sale.status === 'Picked Up' ? 'default' : 
                        'secondary'
                      }
                      className={
                        (sale.status === 'Delivered' || sale.status === 'Picked Up') ? 
                        'bg-green-500 hover:bg-green-600' : ''
                      }
                    >
                      {sale.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm">{formatDate(sale.createdAt)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm">
                          <span>Update Status</span>
                          <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => handleStatusChange(sale.id, 'Pending')}>
                          Mark as Pending
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleStatusChange(sale.id, 'Delivered')}>
                          Mark as Delivered
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleStatusChange(sale.id, 'Picked Up')}>
                          Mark as Picked Up
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleStatusChange(sale.id, 'Cancelled')}>
                          Mark as Cancelled
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

// Site Content Management Tab
const AdminSiteContentTab = () => {
  const [siteContent, setSiteContent] = useState(mockSiteContent);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    about: mockSiteContent.about,
    contactMessage: mockSiteContent.contact.message,
    atharvPhone: mockSiteContent.contact.atharv.phone,
    atharvEmail: mockSiteContent.contact.atharv.email,
    yogeshPhone: mockSiteContent.contact.yogesh.phone,
    vivekPhone: mockSiteContent.contact.vivek.phone,
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSave = () => {
    // In a real app, this would send an API request to update the site content
    const updatedContent = {
      about: formData.about,
      contact: {
        atharv: {
          phone: formData.atharvPhone,
          email: formData.atharvEmail,
        },
        yogesh: {
          phone: formData.yogeshPhone,
        },
        vivek: {
          phone: formData.vivekPhone,
        },
        message: formData.contactMessage,
      },
    };
    
    setSiteContent(updatedContent);
    setIsEditing(false);
    
    toast({
      title: "Content updated",
      description: "The site content has been successfully updated",
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Site Content Management</CardTitle>
            <CardDescription>Edit the about and contact information displayed on the site</CardDescription>
          </div>
          
          {!isEditing ? (
            <Button onClick={() => setIsEditing(true)}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Content
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave}>
                <CheckCircle className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </div>
          )}
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-6">
          {isEditing ? (
            // Edit Mode
            <>
              <div className="space-y-2">
                <Label htmlFor="about">About Text</Label>
                <Textarea
                  id="about"
                  name="about"
                  value={formData.about}
                  onChange={handleChange}
                  rows={3}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="contactMessage">Contact Message</Label>
                <Input
                  id="contactMessage"
                  name="contactMessage"
                  value={formData.contactMessage}
                  onChange={handleChange}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-lg font-medium mb-3">Atharv Yogi</h3>
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <Label htmlFor="atharvPhone">Phone</Label>
                      <Input
                        id="atharvPhone"
                        name="atharvPhone"
                        value={formData.atharvPhone}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="atharvEmail">Email</Label>
                      <Input
                        id="atharvEmail"
                        name="atharvEmail"
                        value={formData.atharvEmail}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-3">Other Team Members</h3>
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <Label htmlFor="yogeshPhone">Yogesh Sharma (Phone)</Label>
                      <Input
                        id="yogeshPhone"
                        name="yogeshPhone"
                        value={formData.yogeshPhone}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="vivekPhone">Vivek Sharma (Phone)</Label>
                      <Input
                        id="vivekPhone"
                        name="vivekPhone"
                        value={formData.vivekPhone}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            // View Mode
            <>
              <div>
                <h3 className="text-lg font-medium mb-2">About Section</h3>
                <p className="p-4 bg-muted rounded-md">{siteContent.about}</p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Contact Information</h3>
                <p className="mb-4">Message: {siteContent.contact.message}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center">
                        <UserCog className="mr-2 h-5 w-5" />
                        Atharv Yogi
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <span className="text-muted-foreground w-16">Phone:</span>
                          <span>{siteContent.contact.atharv.phone}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-muted-foreground w-16">Email:</span>
                          <span>{siteContent.contact.atharv.email}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <div className="space-y-4">
                    <Card>
                      <CardHeader className="py-3">
                        <CardTitle className="text-lg">Yogesh Sharma</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center">
                          <span className="text-muted-foreground w-16">Phone:</span>
                          <span>{siteContent.contact.yogesh.phone}</span>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="py-3">
                        <CardTitle className="text-lg">Vivek Sharma</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center">
                          <span className="text-muted-foreground w-16">Phone:</span>
                          <span>{siteContent.contact.vivek.phone}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default Admin;
