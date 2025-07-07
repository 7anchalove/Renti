import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import Header from '@/components/layout/header'
import { SupabaseProvider } from '@/lib/supabase-context'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Renti - Rent Anything, Anywhere',
  description: 'A modern platform for renting items of all categories',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SupabaseProvider>
          <Header />
          {children}
          <Toaster position="top-right" />
        </SupabaseProvider>
      </body>
    </html>
  )
} 