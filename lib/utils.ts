import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price)
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export function getCategoryIcon(category: string): string {
  const icons: Record<string, string> = {
    clothes: '👕',
    vehicles: '🚗',
    instruments: '🎸',
    tools: '🔧',
    furniture: '🪑',
    electronics: '📱',
    miscellaneous: '📦',
  }
  return icons[category] || '📦'
}

export function getCategoryName(category: string): string {
  const names: Record<string, string> = {
    clothes: 'Clothes',
    vehicles: 'Vehicles',
    instruments: 'Instruments',
    tools: 'Tools',
    furniture: 'Furniture',
    electronics: 'Electronics',
    miscellaneous: 'Miscellaneous',
  }
  return names[category] || 'Miscellaneous'
} 