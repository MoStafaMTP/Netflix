import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { Category, Movie } from '@/types';
import movieService from '@/services/movieService';

interface MoviesState {
  trending: Movie[];
  popular: Movie[];
  topRated: Movie[];
  newReleases: Movie[];
  continueWatching: Movie[];
  categories: Category[];
  all: Movie[];
  loading: boolean;
  error: string | null;
}

const initialState: MoviesState = {
  trending: [],
  popular: [],
  topRated: [],
  newReleases: [],
  continueWatching: [],
  categories: [],
  all: [],
  loading: false,
  error: null,
};

/** Loads every row used by the Home page in one shot. */
export const fetchHomeData = createAsyncThunk('movies/fetchHome', async () => {
  const [trending, popular, topRated, newReleases, continueWatching, categories, all] =
    await Promise.all([
      movieService.getTrending(),
      movieService.getPopular(),
      movieService.getTopRated(),
      movieService.getNewReleases(),
      movieService.getContinueWatching(),
      movieService.getCategories(),
      movieService.getAll(),
    ]);
  return { trending, popular, topRated, newReleases, continueWatching, categories, all };
});

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHomeData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHomeData.fulfilled, (state, action) => {
        state.loading = false;
        Object.assign(state, action.payload);
      })
      .addCase(fetchHomeData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Failed to load movies.';
      });
  },
});

export default moviesSlice.reducer;
