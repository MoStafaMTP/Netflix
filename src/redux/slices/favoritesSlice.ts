import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { LS_KEYS } from '@/utils/constants';

interface FavoritesState {
  ids: number[];
}

const loadFavorites = (): number[] => {
  try {
    const raw = localStorage.getItem(LS_KEYS.favorites);
    return raw ? (JSON.parse(raw) as number[]) : [];
  } catch {
    return [];
  }
};

const persist = (ids: number[]) =>
  localStorage.setItem(LS_KEYS.favorites, JSON.stringify(ids));

const initialState: FavoritesState = {
  ids: loadFavorites(),
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      state.ids = state.ids.includes(id)
        ? state.ids.filter((x) => x !== id)
        : [...state.ids, id];
      persist(state.ids);
    },
    removeFavorite: (state, action: PayloadAction<number>) => {
      state.ids = state.ids.filter((x) => x !== action.payload);
      persist(state.ids);
    },
    clearFavorites: (state) => {
      state.ids = [];
      persist(state.ids);
    },
  },
});

export const { toggleFavorite, removeFavorite, clearFavorites } =
  favoritesSlice.actions;
export default favoritesSlice.reducer;
