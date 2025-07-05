'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  User, 
  Wallet, 
  Package, 
  Calendar, 
  MapPin, 
  DollarSign,
  Plus,
  Search,
  Filter
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatPrice, formatDate, getCategoryIcon } from '@/lib/utils'
import type { Rental, Item } from '@/lib/types'

// Mock data
const mockUser = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  phone: '+1 (555) 123-4567',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
  bio: 'Passionate about sharing and renting items in my community.',
  location: 'New York, NY',
  walletBalance: 1250.50,
  createdAt: '2023-01-15'
}

const mockRentals: Rental[] = [
  {
    id: '1',
    item: {
      id: '1',
      title: 'Professional Camera Equipment',
      description: 'High-quality camera equipment for photography and videography',
      category: 'electronics',
      pricePerDay: 50,
      location: 'New York, NY',
      images: ['https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=300&fit=crop'],
      owner: mockUser,
      isAvailable: true,
      createdAt: '2023-12-01',
      updatedAt: '2023-12-01'
    },
    renter: mockUser,
    owner: mockUser,
    startDate: '2023-12-15',
    endDate: '2023-12-20',
    totalPrice: 250,
    status: 'active',
    createdAt: '2023-12-10'
  }
]

const mockListings: Item[] = [
  {
    id: '1',
    title: 'Mountain Bike',
    description: 'Professional mountain bike in excellent condition',
    category: 'vehicles',
    pricePerDay: 25,
    location: 'New York, NY',
    images: ['https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?w=400&h=300&fit=crop'],
    owner: mockUser,
    isAvailable: true,
    createdAt: '2023-11-01',
    updatedAt: '2023-11-01'
  }
]

const mockTransactions = [
  {
    id: '1',
    type: 'rental_receipt' as const,
    amount: 150,
    description: 'Rental payment for Camera Equipment',
    createdAt: '2023-12-15'
  },
  {
    id: '2',
    type: 'deposit' as const,
    amount: 500,
    description: 'Wallet deposit',
    createdAt: '2023-12-10'
  }
]

type TabType = 'overview' | 'rentals' | 'listings' | 'wallet'

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<TabType>('overview')

  const tabs = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'rentals', label: 'My Rentals', icon: Package },
    { id: 'listings', label: 'My Listings', icon: Calendar },
    { id: 'wallet', label: 'Wallet', icon: Wallet },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img 
                src={mockUser.avatar} 
                alt={mockUser.name}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Welcome back, {mockUser.name}!</h1>
                <p className="text-gray-600">{mockUser.location}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Search className="w-4 h-4 mr-2" />
                Browse Items
              </Button>
              <Link href="/items/new">
                <Button size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  List Item
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as TabType)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-primary-100 rounded-lg">
                      <Wallet className="w-6 h-6 text-primary-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Wallet Balance</p>
                      <p className="text-2xl font-bold text-gray-900">{formatPrice(mockUser.walletBalance)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <Package className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Active Rentals</p>
                      <p className="text-2xl font-bold text-gray-900">{mockRentals.length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Calendar className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">My Listings</p>
                      <p className="text-2xl font-bold text-gray-900">{mockListings.length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <DollarSign className="w-6 h-6 text-purple-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Total Earnings</p>
                      <p className="text-2xl font-bold text-gray-900">{formatPrice(1250)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Rentals</CardTitle>
                </CardHeader>
                <CardContent>
                  {mockRentals.map((rental) => (
                    <div key={rental.id} className="flex items-center space-x-4 py-3 border-b last:border-b-0">
                      <img 
                        src={rental.item.images[0]} 
                        alt={rental.item.title}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{rental.item.title}</h4>
                        <p className="text-sm text-gray-600">
                          {formatDate(rental.startDate)} - {formatDate(rental.endDate)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900">{formatPrice(rental.totalPrice)}</p>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          rental.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {rental.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Transactions</CardTitle>
                </CardHeader>
                <CardContent>
                  {mockTransactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between py-3 border-b last:border-b-0">
                      <div>
                        <p className="font-medium text-gray-900">{transaction.description}</p>
                        <p className="text-sm text-gray-600">{formatDate(transaction.createdAt)}</p>
                      </div>
                      <div className={`font-medium ${
                        transaction.type === 'deposit' || transaction.type === 'rental_receipt' 
                          ? 'text-green-600' 
                          : 'text-red-600'
                      }`}>
                        {transaction.type === 'deposit' || transaction.type === 'rental_receipt' ? '+' : '-'}
                        {formatPrice(transaction.amount)}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'rentals' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">My Rentals</h2>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockRentals.map((rental) => (
                <Card key={rental.id} className="overflow-hidden">
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={rental.item.images[0]} 
                      alt={rental.item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">{getCategoryIcon(rental.item.category)}</span>
                      <span className="text-sm text-gray-500">{rental.item.category}</span>
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{rental.item.title}</h3>
                    <div className="flex items-center gap-1 text-gray-600 mb-2">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">{rental.item.location}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-primary-600">
                        {formatPrice(rental.totalPrice)}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        rental.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {rental.status}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'listings' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">My Listings</h2>
              <Link href="/items/new">
                <Button size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add New Listing
                </Button>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockListings.map((item) => (
                <Card key={item.id} className="overflow-hidden">
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={item.images[0]} 
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">{getCategoryIcon(item.category)}</span>
                      <span className="text-sm text-gray-500">{item.category}</span>
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                    <div className="flex items-center gap-1 text-gray-600 mb-2">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">{item.location}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-primary-600">
                        {formatPrice(item.pricePerDay)}/day
                      </span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        item.isAvailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {item.isAvailable ? 'Available' : 'Rented'}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'wallet' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Wallet Balance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <div className="text-4xl font-bold text-primary-600 mb-2">
                    {formatPrice(mockUser.walletBalance)}
                  </div>
                  <p className="text-gray-600 mb-6">Available balance</p>
                  <div className="flex space-x-4 justify-center">
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      Add Funds
                    </Button>
                    <Button variant="outline">
                      Withdraw
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Transaction History</CardTitle>
              </CardHeader>
              <CardContent>
                {mockTransactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between py-4 border-b last:border-b-0">
                    <div>
                      <p className="font-medium text-gray-900">{transaction.description}</p>
                      <p className="text-sm text-gray-600">{formatDate(transaction.createdAt)}</p>
                    </div>
                    <div className={`font-medium ${
                      transaction.type === 'deposit' || transaction.type === 'rental_receipt' 
                        ? 'text-green-600' 
                        : 'text-red-600'
                    }`}>
                      {transaction.type === 'deposit' || transaction.type === 'rental_receipt' ? '+' : '-'}
                      {formatPrice(transaction.amount)}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
} 