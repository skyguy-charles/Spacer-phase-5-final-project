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
