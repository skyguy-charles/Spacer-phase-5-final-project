// Users Slice - Manages user records (Admin functionality)
import { createSlice } from '@reduxjs/toolkit';

// Extended mock users data with more detail
const initialUsers = [
  {
    id: 1,
    name: 'John Client',
    email: 'client@demo.com',
    password: 'client123',
    role: 'client',
    phone: '+1 555-0101',
    avatar: null,
    createdAt: '2024-01-15T10:00:00Z',
    totalBookings: 5,
    totalSpent: 2450,
  },
  {
    id: 2,
      name: 'Admin User',
    email: 'admin@demo.com',
    password: 'admin123',
    role: 'admin',
    phone: '+1 555
          avatar: null,
    createdAt: '2024-01-01T08:00:00Z',
    totalBookings: 0,
    totalSpent: 0,
  },
  {
    id: 3,
    name: 'Sarah Smith',
    email: 'sarah@demo.com',
    password: 'sarah123',
    role: 'client',
    phone: '+1 555-0102',
    avatar: null,


