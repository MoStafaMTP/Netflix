// ---------------------------------------------------------------------------
// Domain types shared across the application.
// ---------------------------------------------------------------------------

export interface CastMember {
  name: string;
  character: string;
}

export interface Movie {
  id: number;
  title: string;
  description: string;
  /** Vertical poster image (used in cards / sliders). */
  poster: string;
  /** Wide backdrop image (used in hero / details banner). */
  backdrop: string;
  rating: number;
  releaseDate: string;
  /** Duration in minutes. */
  duration: number;
  genres: string[];
  cast: CastMember[];
  director: string;
  trailerUrl: string;
  /** Flags that drive the Home page rows. */
  trending: boolean;
  popular: boolean;
  topRated: boolean;
  newRelease: boolean;
  /** 0-100 percentage used by the "Continue Watching" row. */
  progress?: number;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
}

export interface WatchHistoryItem {
  movieId: number;
  watchedAt: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  /** Stored only in mock data; never displayed. */
  password?: string;
  avatar: string;
  membership: 'Basic' | 'Standard' | 'Premium';
  watchHistory: WatchHistoryItem[];
}

/** Shape of the authenticated user kept in Redux (no password). */
export type AuthUser = Omit<User, 'password'>;

export interface Credentials {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}
