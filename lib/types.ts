export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  bio?: string;
  location?: string;
  walletBalance: number;
  createdAt: string;
}

export interface Item {
  id: string;
  title: string;
  description: string;
  category: ItemCategory;
  pricePerDay: number;
  location: string;
  images: string[];
  owner: User;
  isAvailable: boolean;
  createdAt: string;
  updatedAt: string;
}

export type ItemCategory = 
  | 'clothes' 
  | 'vehicles' 
  | 'instruments' 
  | 'tools' 
  | 'furniture' 
  | 'electronics' 
  | 'miscellaneous';

export interface Rental {
  id: string;
  item: Item;
  renter: User;
  owner: User;
  startDate: string;
  endDate: string;
  totalPrice: number;
  status: 'pending' | 'active' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface Transaction {
  id: string;
  userId: string;
  type: 'deposit' | 'withdrawal' | 'rental_payment' | 'rental_receipt';
  amount: number;
  description: string;
  createdAt: string;
}

export interface SearchFilters {
  category?: ItemCategory;
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  availabilityDate?: string;
  query?: string;
} 