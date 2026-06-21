// Centralised, app-wide constants.

export const APP_NAME = 'NETFLIX';

export const LS_KEYS = {
  favorites: 'nf_favorites',
  user: 'nf_user',
  rememberedEmail: 'nf_remembered_email',
} as const;

export const ROUTES = {
  home: '/',
  login: '/login',
  register: '/register',
  movie: (id: number | string) => `/movie/${id}`,
  search: '/search',
  favorites: '/favorites',
  profile: '/profile',
} as const;

// Simulated network latency (ms) for the mock service layer.
export const MOCK_LATENCY = 400;
