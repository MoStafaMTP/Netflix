import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from './slices/moviesSlice';
import userReducer from './slices/userSlice';
import favoritesReducer from './slices/favoritesSlice';
import searchReducer from './slices/searchSlice';

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
    user: userReducer,
    favorites: favoritesReducer,
    search: searchReducer,
  },
});

// Inferred types for use throughout the app.
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
