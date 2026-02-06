// Spaces Slice - Manages workspace/space listings
import { createSlice } from '@reduxjs/toolkit';

// Mock spaces data
const initialSpaces = [
  {
    id: 1,
    name: 'Downtown Office Suite',
    description: 'Professional office suite in the heart of downtown with modern amenities and stunning city views. Perfect for small teams and startups.',
    type: 'office',
    category: 'Office Space',
    price: 150,
    priceUnit: 'day',
    capacity: 10,
    location: '123 Main St, Nairobi - CBD',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
    amenities: ['WiFi', 'Parking', 'Meeting Room', 'Kitchen', 'Air Conditioning'],
    rating: 4.8,
    reviews: 24,
       available: true,
    featured: true,
  },
  {
    id: 2,
    name: 'Creative Studio Loft',
    description: 'Spacious and bright loft space perfect for creative professionals, photo shoots, and artistic endeavors. Natural light throughout.',
    type: 'studio',
    category: 'Creative Studio',
    price: 75,
    priceUnit: 'hour',
    capacity: 15,
    location: '456 Art Ave, Nairobi - Kilimani',
    image: 'https://images.unsplash.com/photo-1505373877841-8d43a716668d?w=800&q=80',
    amenities: ['WiFi', 'Equipment Rental', 'Props', 'Lighting', 'Green Screen'],
    rating: 4.9,
    reviews: 18,
    available: true,
    featured: true,
  },
  {

