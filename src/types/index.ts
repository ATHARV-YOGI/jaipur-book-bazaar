
export type BookCategory = 'Drafter' | 'NK' | 'Both';

export type BookCondition = 'New' | 'Like New' | 'Good' | 'Fair' | 'Poor';

export type User = {
  id: string;
  email: string;
  name: string;
  isAdmin: boolean;
  location?: string;
};

export type Book = {
  id: string;
  title: string;
  author: string;
  category: BookCategory;
  condition: BookCondition;
  price: number;
  description: string;
  image: string;
  sellerId: string;
  sellerName: string;
  status: 'Available' | 'Sold' | 'Reserved';
  createdAt: string;
};

export type Sale = {
  id: string;
  bookId: string;
  bookTitle: string;
  buyerId: string;
  buyerName: string;
  sellerId: string;
  sellerName: string;
  price: number;
  status: 'Pending' | 'Delivered' | 'Picked Up' | 'Cancelled';
  deliveryLocation: string;
  pickupLocation: string;
  createdAt: string;
};

export type SiteContent = {
  about: string;
  contact: {
    atharv: {
      phone: string;
      email: string;
    };
    yogesh: {
      phone: string;
    };
    vivek: {
      phone: string;
    };
    message: string;
  };
};
