import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchAPI } from '../services/api';

const initialState = {
  spaces: [],
  selectedSpace: null,
  filters: { type: '', category: '', priceMin: '', priceMax: '', location: '', capacity: '', searchQuery: '' },
  sortBy: 'featured',
  loading: false,
  error: null,
};

export const fetchSpaces = createAsyncThunk('spaces/fetchSpaces', async (_, { rejectWithValue }) => {
  try {
    const data = await fetchAPI('/spaces', { method: 'GET' });
    return data.spaces || data;
  } catch (err) { return rejectWithValue(err.message); }
});

export const createSpace = createAsyncThunk('spaces/createSpace', async (spaceData, { rejectWithValue }) => {
  try {
    const data = await fetchAPI('/spaces', { method: 'POST', body: JSON.stringify(spaceData) });
    return data;
  } catch (err) { return rejectWithValue(err.message); }
});

export const updateSpaceAPI = createAsyncThunk('spaces/updateSpace', async ({ id, ...updates }, { rejectWithValue }) => {
  try {
    const data = await fetchAPI(`/spaces/${id}`, { method: 'PUT', body: JSON.stringify(updates) });
    return data;
  } catch (err) { return rejectWithValue(err.message); }
});

export const deleteSpaceAPI = createAsyncThunk('spaces/deleteSpace', async (id, { rejectWithValue }) => {
  try {
    await fetchAPI(`/spaces/${id}`, { method: 'DELETE' });
    return id;
  } catch (err) { return rejectWithValue(err.message); }
});

const spacesSlice = createSlice({
  name: 'spaces',
  initialState,
  reducers: {
    selectSpace: (state, action) => { state.selectedSpace = state.spaces.find(s => s.id === action.payload) || null; },
    clearSelectedSpace: (state) => { state.selectedSpace = null; },
    setFilters: (state, action) => { state.filters = { ...state.filters, ...action.payload }; },
    clearFilters: (state) => { state.filters = { type: '', category: '', priceMin: '', priceMax: '', location: '', capacity: '', searchQuery: '' }; },
    setSortBy: (state, action) => { state.sortBy = action.payload; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSpaces.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(fetchSpaces.fulfilled, (s, a) => { s.loading = false; s.spaces = a.payload; })
      .addCase(fetchSpaces.rejected, (s, a) => { s.loading = false; s.error = a.payload; })

      .addCase(createSpace.pending, (s) => { s.loading = true; })
      .addCase(createSpace.fulfilled, (s, a) => { s.loading = false; s.spaces.push(a.payload); })
      .addCase(createSpace.rejected, (s, a) => { s.loading = false; s.error = a.payload; })

      .addCase(updateSpaceAPI.pending, (s) => { s.loading = true; })
      .addCase(updateSpaceAPI.fulfilled, (s, a) => {
        s.loading = false;
        const i = s.spaces.findIndex(x => x.id === a.payload.id);
        if (i !== -1) s.spaces[i] = a.payload;
      })
      .addCase(updateSpaceAPI.rejected, (s, a) => { s.loading = false; s.error = a.payload; })

      .addCase(deleteSpaceAPI.pending, (s) => { s.loading = true; })
      .addCase(deleteSpaceAPI.fulfilled, (s, a) => { s.loading = false; s.spaces = s.spaces.filter(x => x.id !== a.payload); })
      .addCase(deleteSpaceAPI.rejected, (s, a) => { s.loading = false; s.error = a.payload; });
  },
});

export const { selectSpace, clearSelectedSpace, setFilters, clearFilters, setSortBy } = spacesSlice.actions;
export const selectAllSpaces = (state) => state.spaces.spaces;
export const selectFeaturedSpaces = (state) => state.spaces.spaces.filter(s => s.featured);
export const selectSelectedSpace = (state) => state.spaces.selectedSpace;
export const selectFilters = (state) => state.spaces.filters;
export const selectFilteredSpaces = (state) => {
  const { spaces, filters, sortBy } = state.spaces;
  let filtered = [...spaces];
  if (filters.type) filtered = filtered.filter(s => s.type === filters.type);
  if (filters.category) filtered = filtered.filter(s => s.category === filters.category);
  if (filters.priceMin) filtered = filtered.filter(s => s.price >= Number(filters.priceMin));
  if (filters.priceMax) filtered = filtered.filter(s => s.price <= Number(filters.priceMax));
  if (filters.location) filtered = filtered.filter(s => s.location.toLowerCase().includes(filters.location.toLowerCase()));
  if (filters.capacity) filtered = filtered.filter(s => s.capacity >= Number(filters.capacity));
  if (filters.searchQuery) {
    const q = filters.searchQuery.toLowerCase();
    filtered = filtered.filter(s => s.name.toLowerCase().includes(q) || s.description.toLowerCase().includes(q) || s.category.toLowerCase().includes(q));
  }
  switch (sortBy) {
    case 'price-low': filtered.sort((a,b)=> a.price - b.price); break;
    case 'price-high': filtered.sort((a,b)=> b.price - a.price); break;
    case 'rating': filtered.sort((a,b)=> b.rating - a.rating); break;
    case 'reviews': filtered.sort((a,b)=> b.reviews - a.reviews); break;
    default: filtered.sort((a,b)=> (b.featured?1:0) - (a.featured?1:0)); break;
  }
  return filtered;
};
export const selectCategories = (state) => [...new Set(state.spaces.spaces.map(s => s.category))];
export default spacesSlice.reducer;