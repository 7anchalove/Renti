import Link from 'next/link'
import { Search, MapPin, Calendar, DollarSign } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getCategoryIcon, getCategoryName } from '@/lib/utils'
import type { ItemCategory } from '@/lib/types'

// Mock data for demonstration
const featuredItems = [
  {
    id: '1',
    title: 'Professional Camera Equipment',
    category: 'electronics' as ItemCategory,
    pricePerDay: 50,
    location: 'New York, NY',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=300&fit=crop',
  },
  {
    id: '2',
    title: 'Mountain Bike',
    category: 'vehicles' as ItemCategory,
    pricePerDay: 25,
    location: 'Los Angeles, CA',
    image: 'https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?w=400&h=300&fit=crop',
  },
  {
    id: '3',
    title: 'Guitar Collection',
    category: 'instruments' as ItemCategory,
    pricePerDay: 30,
    location: 'Nashville, TN',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
  },
  {
    id: '4',
    title: 'Power Tools Set',
    category: 'tools' as ItemCategory,
    pricePerDay: 40,
    location: 'Chicago, IL',
    image: 'https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=400&h=300&fit=crop',
  },
]

const categories = [
  'clothes', 'vehicles', 'instruments', 'tools', 'furniture', 'electronics', 'miscellaneous'
] as ItemCategory[]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-700 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Rent Anything, Anywhere
            </h1>
            <p className="text-xl mb-8 text-primary-100">
              Discover and rent items from people in your community. From tools to instruments, 
              find what you need when you need it.
            </p>
            
            {/* Search Bar */}
            <div className="bg-white rounded-lg p-2 flex items-center max-w-2xl mx-auto mb-8">
              <Search className="w-5 h-5 text-gray-400 ml-3" />
              <Input 
                placeholder="What are you looking for?"
                className="border-0 focus:ring-0 text-gray-900"
              />
              <Button className="ml-2">Search</Button>
            </div>

            {/* Quick Access Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/login">
                <Button variant="outline" size="lg" className="bg-white text-primary-600 hover:bg-gray-50">
                  Sign In
                </Button>
              </Link>
              <Link href="/auth/register">
                <Button size="lg" className="bg-white text-primary-600 hover:bg-gray-50">
                  Create Account
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button variant="outline" size="lg" className="bg-white text-primary-600 hover:bg-gray-50">
                  View Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Browse by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {categories.map((category) => (
              <Link key={category} href={`/search?category=${category}`}>
                <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-6">
                    <div className="text-4xl mb-2">{getCategoryIcon(category)}</div>
                    <p className="font-medium text-gray-900">{getCategoryName(category)}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Items */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Items</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredItems.map((item) => (
              <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">{getCategoryIcon(item.category)}</span>
                    <span className="text-sm text-gray-500">{getCategoryName(item.category)}</span>
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                  <div className="flex items-center gap-1 text-gray-600 mb-2">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{item.location}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-primary-600">
                      ${item.pricePerDay}/day
                    </span>
                    <Button size="sm">Rent Now</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/search">
              <Button variant="outline" size="lg">
                View All Items
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">1. Search</h3>
              <p className="text-gray-600">Find the perfect item in your area using our powerful search filters.</p>
            </div>
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">2. Book</h3>
              <p className="text-gray-600">Choose your dates and book securely through our platform.</p>
            </div>
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">3. Enjoy</h3>
              <p className="text-gray-600">Pick up your item and enjoy! Return it when you're done.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 