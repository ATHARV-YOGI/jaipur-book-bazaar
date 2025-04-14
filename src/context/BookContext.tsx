
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Book, Sale, BookCategory, BookCondition } from '../types';
import { mockBooks, mockSales } from '../data/mockData';
import { toast } from '@/components/ui/use-toast';
import { useAuth } from './AuthContext';

interface BookContextType {
  books: Book[];
  sales: Sale[];
  filteredBooks: Book[];
  setFilterCategory: (category: BookCategory | 'All') => void;
  addBook: (book: Omit<Book, 'id' | 'status' | 'createdAt' | 'sellerId' | 'sellerName'>) => void;
  updateBook: (id: string, updates: Partial<Book>) => void;
  deleteBook: (id: string) => void;
  buyBook: (bookId: string, deliveryLocation: string) => void;
  updateSaleStatus: (saleId: string, status: Sale['status']) => void;
  filteredSales: Sale[];
}

const BookContext = createContext<BookContextType | undefined>(undefined);

export const BookProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [books, setBooks] = useState<Book[]>(mockBooks);
  const [sales, setSales] = useState<Sale[]>(mockSales);
  const [filterCategory, setFilterCategory] = useState<BookCategory | 'All'>('All');
  const { currentUser } = useAuth();

  // Filter books based on category
  const filteredBooks = books.filter(book => {
    if (filterCategory === 'All') return true;
    return book.category === filterCategory || book.category === 'Both';
  });

  // Filter sales for current user (admin sees all)
  const filteredSales = currentUser?.isAdmin
    ? sales
    : sales.filter(
        sale =>
          sale.buyerId === currentUser?.id || sale.sellerId === currentUser?.id
      );

  // Add a new book
  const addBook = (bookData: Omit<Book, 'id' | 'status' | 'createdAt' | 'sellerId' | 'sellerName'>) => {
    if (!currentUser) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'You must be logged in to sell a book',
      });
      return;
    }

    const newBook: Book = {
      ...bookData,
      id: (books.length + 1).toString(),
      sellerId: currentUser.id,
      sellerName: currentUser.name,
      status: 'Available',
      createdAt: new Date().toISOString().split('T')[0],
    };

    setBooks([...books, newBook]);
    toast({
      title: 'Book added',
      description: 'Your book has been successfully listed for sale',
    });
  };

  // Update an existing book
  const updateBook = (id: string, updates: Partial<Book>) => {
    setBooks(
      books.map(book => (book.id === id ? { ...book, ...updates } : book))
    );
    toast({
      title: 'Book updated',
      description: 'Book details have been updated successfully',
    });
  };

  // Delete a book
  const deleteBook = (id: string) => {
    setBooks(books.filter(book => book.id !== id));
    toast({
      title: 'Book deleted',
      description: 'Book has been removed from the marketplace',
    });
  };

  // Buy a book
  const buyBook = (bookId: string, deliveryLocation: string) => {
    if (!currentUser) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'You must be logged in to buy a book',
      });
      return;
    }

    const book = books.find(b => b.id === bookId);
    if (!book) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Book not found',
      });
      return;
    }

    if (book.status !== 'Available') {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'This book is no longer available',
      });
      return;
    }

    // Update book status
    updateBook(bookId, { status: 'Sold' });

    // Create a new sale
    const newSale: Sale = {
      id: (sales.length + 1).toString(),
      bookId: book.id,
      bookTitle: book.title,
      buyerId: currentUser.id,
      buyerName: currentUser.name,
      sellerId: book.sellerId,
      sellerName: book.sellerName,
      price: book.price,
      status: 'Pending',
      deliveryLocation,
      pickupLocation: 'Pending', // Will be set by seller later
      createdAt: new Date().toISOString().split('T')[0],
    };

    setSales([...sales, newSale]);
    toast({
      title: 'Book purchased',
      description: 'Your order has been placed. You will receive your book within 24 hours!',
    });
  };

  // Update a sale's status
  const updateSaleStatus = (saleId: string, status: Sale['status']) => {
    setSales(
      sales.map(sale => (sale.id === saleId ? { ...sale, status } : sale))
    );
    toast({
      title: 'Status updated',
      description: `Sale has been marked as ${status}`,
    });
  };

  return (
    <BookContext.Provider
      value={{
        books,
        sales,
        filteredBooks,
        setFilterCategory,
        addBook,
        updateBook,
        deleteBook,
        buyBook,
        updateSaleStatus,
        filteredSales,
      }}
    >
      {children}
    </BookContext.Provider>
  );
};

export const useBooks = () => {
  const context = useContext(BookContext);
  if (context === undefined) {
    throw new Error('useBooks must be used within a BookProvider');
  }
  return context;
};
