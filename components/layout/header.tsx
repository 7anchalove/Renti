'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, User, LogIn, UserPlus } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">R</span>
            </div>
            <span className="text-xl font-bold text-gray-900">Renti</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-600 hover:text-gray-900 font-medium">
              Home
            </Link>
            <Link href="/search" className="text-gray-600 hover:text-gray-900 font-medium">
              Browse Items
            </Link>
            <Link href="/dashboard" className="text-gray-600 hover:text-gray-900 font-medium">
              Dashboard
            </Link>
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/auth/login">
              <Button variant="outline" size="sm">
                <LogIn className="w-4 h-4 mr-2" />
                Sign In
              </Button>
            </Link>
            <Link href="/auth/register">
              <Button size="sm">
                <UserPlus className="w-4 h-4 mr-2" />
                Sign Up
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4">
              <Link 
                href="/" 
                className="text-gray-600 hover:text-gray-900 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/search" 
                className="text-gray-600 hover:text-gray-900 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Browse Items
              </Link>
              <Link 
                href="/dashboard" 
                className="text-gray-600 hover:text-gray-900 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
              <div className="pt-4 border-t">
                <Link href="/auth/login" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="outline" className="w-full mb-2">
                    <LogIn className="w-4 h-4 mr-2" />
                    Sign In
                  </Button>
                </Link>
                <Link href="/auth/register" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full">
                    <UserPlus className="w-4 h-4 mr-2" />
                    Sign Up
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
} 