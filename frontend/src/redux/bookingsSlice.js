import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchAPI } from '../services/api';

const initialState = { bookings: [], selectedBooking: null, loading: false, error: null };

export const fetchBookings = createAsyncThunk('bookings/fetchBookings', async (_, { rejectWithValue }) => {
  try {
    const data = await fetchAPI('/bookings', { method: 'GET' });
    return data.bookings || data;
  } catch (err) { return rejectWithValue(err.message); }
});

export const fetchUserBookings = createAsyncThunk('bookings/fetchUserBookings', async (userId, { rejectWithValue }) => {
  try {
    const data = await fetchAPI(`/bookings/user/${userId}`, { method: 'GET' });
    return data.bookings || data;
  } catch (err) { return rejectWithValue(err.message); }
});

export const createBooking = createAsyncThunk('bookings/createBooking', async (bookingData, { rejectWithValue }) => {
  try {
    const data = await fetchAPI('/bookings', { method: 'POST', body: JSON.stringify(bookingData) });
    return data;
  } catch (err) { return rejectWithValue(err.message); }
});

export const updateBookingStatusAPI = createAsyncThunk('bookings/updateBookingStatus', async ({ id, status }, { rejectWithValue }) => {
  try {
    const data = await fetchAPI(`/bookings/${id}`, { method: 'PUT', body: JSON.stringify({ status }) });
    return data;
  } catch (err) { return rejectWithValue(err.message); }
});

export const cancelBookingAPI = createAsyncThunk('bookings/cancelBooking', async (id, { rejectWithValue }) => {
  try {
    const data = await fetchAPI(`/bookings/${id}/cancel`, { method: 'POST' });
    return data;
  } catch (err) { return rejectWithValue(err.message); }
});

export const deleteBookingAPI = createAsyncThunk('bookings/deleteBooking', async (id, { rejectWithValue }) => {
  try {
    await fetchAPI(`/bookings/${id}`, { method: 'DELETE' });
    return id;
  } catch (err) { return rejectWithValue(err.message); }
});

const bookingsSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {
    selectBooking: (state, action) => { state.selectedBooking = state.bookings.find(b => b.id === action.payload) || null; },
    clearSelectedBooking: (state) => { state.selectedBooking = null; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookings.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(fetchBookings.fulfilled, (s, a) => { s.loading = false; s.bookings = a.payload; })
      .addCase(fetchBookings.rejected, (s, a) => { s.loading = false; s.error = a.payload; })

      .addCase(fetchUserBookings.pending, (s) => { s.loading = true; })
      .addCase(fetchUserBookings.fulfilled, (s, a) => { s.loading = false; s.bookings = a.payload; })
      .addCase(fetchUserBookings.rejected, (s, a) => { s.loading = false; s.error = a.payload; })

      .addCase(createBooking.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(createBooking.fulfilled, (s, a) => { s.loading = false; s.bookings.push(a.payload); })
      .addCase(createBooking.rejected, (s, a) => { s.loading = false; s.error = a.payload; })

      .addCase(updateBookingStatusAPI.pending, (s) => { s.loading = true; })
      .addCase(updateBookingStatusAPI.fulfilled, (s, a) => {
        s.loading = false;
        const i = s.bookings.findIndex(b => b.id === a.payload.id);
        if (i !== -1) s.bookings[i] = a.payload;
      })
      .addCase(updateBookingStatusAPI.rejected, (s, a) => { s.loading = false; s.error = a.payload; })

      .addCase(cancelBookingAPI.pending, (s) => { s.loading = true; })
      .addCase(cancelBookingAPI.fulfilled, (s, a) => {
        s.loading = false;
        const i = s.bookings.findIndex(b => b.id === a.payload.id);
        if (i !== -1) s.bookings[i] = a.payload;
      })
      .addCase(cancelBookingAPI.rejected, (s, a) => { s.loading = false; s.error = a.payload; })

      .addCase(deleteBookingAPI.pending, (s) => { s.loading = true; })
      .addCase(deleteBookingAPI.fulfilled, (s, a) => { s.loading = false; s.bookings = s.bookings.filter(b => b.id !== a.payload); })
      .addCase(deleteBookingAPI.rejected, (s, a) => { s.loading = false; s.error = a.payload; });
  },
});

export const { selectBooking, clearSelectedBooking } = bookingsSlice.actions;
export const selectAllBookings = (state) => state.bookings.bookings;
export const selectSelectedBooking = (state) => state.bookings.selectedBooking;
export const selectUserBookings = (state, userId) => state.bookings.bookings.filter(b => b.userId === userId);
export const selectBookingsByStatus = (status) => (state) => state.bookings.bookings.filter(b => b.status === status);
export const selectBookingStats = (state) => {
  const bookings = state.bookings.bookings;
  return {
    total: bookings.length,
    pending: bookings.filter(b => b.status === 'pending').length,
    confirmed: bookings.filter(b => b.status === 'confirmed').length,
    completed: bookings.filter(b => b.status === 'completed').length,
    cancelled: bookings.filter(b => b.status === 'cancelled').length,
    totalRevenue: bookings.filter(b => b.status === 'confirmed' || b.status === 'completed').reduce((sum, b) => sum + (b.totalPrice || 0), 0),
  };
};
export const selectUpcomingBookings = (state) => {
  const today = new Date().toISOString().split('T')[0];
  return state.bookings.bookings.filter(b => b.date >= today && b.status !== 'cancelled').sort((a,b) => new Date(a.date) - new Date(b.date));
};
export default bookingsSlice.reducer;