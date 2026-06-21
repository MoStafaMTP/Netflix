import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { AuthUser, Credentials, RegisterPayload } from '@/types';
import authService from '@/services/authService';
import { LS_KEYS } from '@/utils/constants';

interface UserState {
  current: AuthUser | null;
  loading: boolean;
  error: string | null;
}

/** Rehydrate the session from localStorage on first load. */
const loadPersistedUser = (): AuthUser | null => {
  try {
    const raw = localStorage.getItem(LS_KEYS.user);
    return raw ? (JSON.parse(raw) as AuthUser) : null;
  } catch {
    return null;
  }
};

const initialState: UserState = {
  current: loadPersistedUser(),
  loading: false,
  error: null,
};

export const loginUser = createAsyncThunk<AuthUser, Credentials>(
  'user/login',
  async (credentials, { rejectWithValue }) => {
    try {
      return await authService.login(credentials);
    } catch (err) {
      return rejectWithValue((err as Error).message);
    }
  },
);

export const registerUser = createAsyncThunk<AuthUser, RegisterPayload>(
  'user/register',
  async (payload, { rejectWithValue }) => {
    try {
      return await authService.register(payload);
    } catch (err) {
      return rejectWithValue((err as Error).message);
    }
  },
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.current = null;
      localStorage.removeItem(LS_KEYS.user);
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    const persist = (state: UserState, user: AuthUser) => {
      state.loading = false;
      state.current = user;
      state.error = null;
      localStorage.setItem(LS_KEYS.user, JSON.stringify(user));
    };

    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => persist(state, action.payload))
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) ?? 'Login failed.';
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => persist(state, action.payload))
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) ?? 'Registration failed.';
      });
  },
});

export const { logout, clearError } = userSlice.actions;
export default userSlice.reducer;
