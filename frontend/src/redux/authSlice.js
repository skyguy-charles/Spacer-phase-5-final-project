import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchAPI } from '../services/api';

const initialState = {
  user: JSON.parse(localStorage.getItem('spacer_user')) || null,
  isAuthenticated: !!localStorage.getItem('spacer_user'),
  role: localStorage.getItem('spacer_role') || null,
  loading: false,
  error: null,
};

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const data = await fetchAPI('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      localStorage.setItem('spacer_token', data.access_token);
      localStorage.setItem('spacer_user', JSON.stringify(data.user));
      localStorage.setItem('spacer_role', data.user.role);
      return data.user;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async ({ name, email, password, role = 'client' }, { rejectWithValue }) => {
    try {
      const data = await fetchAPI('/auth/register', {
        method: 'POST',
        body: JSON.stringify({ name, email, password, role }),
      });
      localStorage.setItem('spacer_token', data.access_token);
      localStorage.setItem('spacer_user', JSON.stringify(data.user));
      localStorage.setItem('spacer_role', data.user.role);
      return data.user;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.role = null;
      state.error = null;
      localStorage.removeItem('spacer_user');
      localStorage.removeItem('spacer_role');
      localStorage.removeItem('spacer_token');
    },
    updateProfile: (state, action) => {
      const { name, avatar } = action.payload;
      if (state.user) {
        state.user = { ...state.user, name, avatar };
        localStorage.setItem('spacer_user', JSON.stringify(state.user));
      }
    },
    clearError: (state) => { state.error = null; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(loginUser.fulfilled, (s, a) => {
        s.loading = false; s.user = a.payload; s.isAuthenticated = true; s.role = a.payload.role;
      })
      .addCase(loginUser.rejected, (s, a) => { s.loading = false; s.error = a.payload || a.error.message; })

      .addCase(registerUser.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(registerUser.fulfilled, (s, a) => {
        s.loading = false; s.user = a.payload; s.isAuthenticated = true; s.role = a.payload.role;
      })
      .addCase(registerUser.rejected, (s, a) => { s.loading = false; s.error = a.payload || a.error.message; });
  },
});

export const { logout, updateProfile, clearError } = authSlice.actions;
export const selectUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectRole = (state) => state.auth.role;
export const selectAuthError = (state) => state.auth.error;
export default authSlice.reducer;