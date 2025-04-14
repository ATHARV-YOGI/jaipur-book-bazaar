
import { Book, Sale, User, SiteContent } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    email: 'atharvyogi123@gmail.com',
    name: 'Atharv Yogi',
    isAdmin: true
  },
  {
    id: '2',
    email: 'yogesh@example.com',
    name: 'Yogesh Sharma',
    isAdmin: true
  },
  {
    id: '3',
    email: 'vivek@example.com',
    name: 'Vivek Sharma',
    isAdmin: true
  },
  {
    id: '4',
    email: 'student1@example.com',
    name: 'Rahul Kumar',
    isAdmin: false,
    location: 'Malviya Nagar, Jaipur'
  },
  {
    id: '5',
    email: 'student2@example.com',
    name: 'Priya Sharma',
    isAdmin: false,
    location: 'Vaishali Nagar, Jaipur'
  }
];

export const mockBooks: Book[] = [
  {
    id: '1',
    title: 'Engineering Drawing',
    author: 'N.D. Bhatt',
    category: 'Drafter',
    condition: 'Good',
    price: 150,
    description: 'Complete guide to engineering drawing. Covers all the basics with detailed illustrations.',
    image: '/placeholder.svg',
    sellerId: '4',
    sellerName: 'Rahul Kumar',
    status: 'Available',
    createdAt: '2023-09-15'
  },
  {
    id: '2',
    title: 'Fundamentals of Electric Circuits',
    author: 'Charles K. Alexander',
    category: 'Drafter',
    condition: 'Like New',
    price: 150,
    description: 'Comprehensive coverage of electric circuit analysis with plenty of examples.',
    image: '/placeholder.svg',
    sellerId: '5',
    sellerName: 'Priya Sharma',
    status: 'Available',
    createdAt: '2023-10-05'
  },
  {
    id: '3',
    title: 'Data Structures and Algorithms',
    author: 'Thomas H. Cormen',
    category: 'NK',
    condition: 'Good',
    price: 250,
    description: 'Introduction to data structures and algorithms with a focus on implementation.',
    image: '/placeholder.svg',
    sellerId: '4',
    sellerName: 'Rahul Kumar',
    status: 'Available',
    createdAt: '2023-08-22'
  },
  {
    id: '4',
    title: 'Organic Chemistry',
    author: 'Morrison & Boyd',
    category: 'NK',
    condition: 'Fair',
    price: 250,
    description: 'Classic textbook on organic chemistry with detailed explanations of reactions.',
    image: '/placeholder.svg',
    sellerId: '5',
    sellerName: 'Priya Sharma',
    status: 'Available',
    createdAt: '2023-11-12'
  },
  {
    id: '5',
    title: 'Mechanical Engineering Design',
    author: 'Joseph E. Shigley',
    category: 'Drafter',
    condition: 'Good',
    price: 150,
    description: 'Covers the fundamentals of mechanical engineering design with practical examples.',
    image: '/placeholder.svg',
    sellerId: '4',
    sellerName: 'Rahul Kumar',
    status: 'Available',
    createdAt: '2023-07-20'
  },
  {
    id: '6',
    title: 'Introduction to Algorithms',
    author: 'CLRS',
    category: 'NK',
    condition: 'Like New',
    price: 250,
    description: 'Comprehensive introduction to algorithms and data structures for computer science students.',
    image: '/placeholder.svg',
    sellerId: '5',
    sellerName: 'Priya Sharma',
    status: 'Available',
    createdAt: '2023-06-15'
  }
];

export const mockSales: Sale[] = [
  {
    id: '1',
    bookId: '1',
    bookTitle: 'Engineering Drawing',
    buyerId: '5',
    buyerName: 'Priya Sharma',
    sellerId: '4',
    sellerName: 'Rahul Kumar',
    price: 150,
    status: 'Pending',
    deliveryLocation: 'Vaishali Nagar, Jaipur',
    pickupLocation: 'Malviya Nagar, Jaipur',
    createdAt: '2023-12-01'
  },
  {
    id: '2',
    bookId: '3',
    bookTitle: 'Data Structures and Algorithms',
    buyerId: '4',
    buyerName: 'Rahul Kumar',
    sellerId: '5',
    sellerName: 'Priya Sharma',
    price: 250,
    status: 'Delivered',
    deliveryLocation: 'Malviya Nagar, Jaipur',
    pickupLocation: 'Vaishali Nagar, Jaipur',
    createdAt: '2023-11-15'
  }
];

export const mockSiteContent: SiteContent = {
  about: 'Old Books Market: Jaipur students buy/sell Drafter/NK books, 24-hour delivery/pickup. By Atharv Yogi, Yogesh Sharma, Vivek Sharma.',
  contact: {
    atharv: {
      phone: '+918209934606',
      email: 'atharvyogi123@gmail.com'
    },
    yogesh: {
      phone: '+917728061345'
    },
    vivek: {
      phone: '+919057667468'
    },
    message: 'Book queries?'
  }
};
