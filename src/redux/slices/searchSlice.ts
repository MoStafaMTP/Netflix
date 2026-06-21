import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Movie } from '@/types';
import movieService from '@/services/movieService';

interface SearchState {
  query: string;
  category: string; // '' = all categories
  results: Movie[];
  loading: boolean;
  error: string | null;
}

const initialState: SearchState = {
  query: '',
  category: '',
  results: [],
  loading: false,
  error: null,
};

export const searchMovies = createAsyncThunk(
  'search/query',
  async (query: string) => movieService.search(query),
);

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    setCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
    },
    resetSearch: (state) => {
      state.query = '';
      state.category = '';
      state.results = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.results = action.payload;
      })
      .addCase(searchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Search failed.';
      });
  },
});

export const { setQuery, setCategory, resetSearch } = searchSlice.actions;
export default searchSlice.reducer;
