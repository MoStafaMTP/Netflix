# Netflix Clone — Frontend

A production-ready, fully responsive **Netflix-style streaming UI** built as a frontend-only
project. It uses mock JSON data (no backend required) and is optimised for deployment on
standard **cPanel shared hosting**.

> **Academic project**
> **Student:** Mostafa Taghipour
> **Major:** Computer Engineering
> **University:** Islamic Azad University, North Tehran Branch
> **Instructor:** Iman Khosrojerdi
>
> Educational project only. Not affiliated with Netflix, Inc. All content is mock data.

---

## ✨ Features

- **Home** — hero banner, Continue Watching, Trending, Popular, Top Rated, New Releases and a Categories grid.
- **Login / Register** — Netflix-inspired forms with full client-side validation and a "Remember me" option.
- **Movie Details** — poster, backdrop, rating, release date, duration, genres, cast, director, play & trailer buttons.
- **Search** — instant (debounced) search with category filtering and pagination.
- **Favorites (My List)** — add/remove titles, persisted to `localStorage`.
- **Profile** — avatar, membership, watch history (protected route).
- **404** — custom Netflix-style not-found page.
- Dark theme, red accents, smooth Framer Motion animations, hover effects, mobile-first and accessible (keyboard focus, ARIA labels, reduced-motion support).

## 🧰 Tech Stack

| Area              | Choice                          |
| ----------------- | ------------------------------- |
| Framework         | React 18                        |
| Build tool        | Vite 5                          |
| Language          | TypeScript (strict)             |
| Styling           | Tailwind CSS 3                  |
| Routing           | React Router DOM 6              |
| State             | Redux Toolkit + React Redux     |
| HTTP client       | Axios (pre-wired for a real API) |
| Animation         | Framer Motion                   |
| Icons             | React Icons                     |

## 📁 Folder Structure

```
src/
├── assets/          # static assets
├── components/      # reusable UI (Navbar, Footer, HeroBanner, MovieCard, MovieSlider,
│                    #   CategoryFilter, SearchBar, LoadingSkeleton, Modal, Button, Pagination, ScrollToTop)
├── pages/           # Home, Login, Register, MovieDetails, Search, Favorites, Profile, NotFound
├── routes/          # AppRoutes + ProtectedRoute
├── redux/           # store, typed hooks, slices (movies, user, favorites, search)
├── services/        # api (Axios), movieService, authService
├── hooks/           # useDebounce, useLocalStorage, useScrollPosition
├── types/           # shared TypeScript types
├── data/            # mock JSON (33 movies, 14 categories, 3 users)
├── layouts/         # MainLayout, AuthLayout
├── utils/           # helpers, constants
└── App.tsx
```

## 🚀 Getting Started

Requires **Node.js 18+**.

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server (http://localhost:5173)
npm run dev

# 3. Build static files into /dist
npm run build

# 4. Preview the production build locally
npm run preview
```

Other scripts: `npm run lint`, `npm run typecheck`.

## 🔑 Demo Accounts

| Email             | Password   | Membership |
| ----------------- | ---------- | ---------- |
| mostafa@demo.com  | `Demo1234` | Premium    |
| user@demo.com     | `Demo1234` | Standard   |
| sara@demo.com     | `Demo1234` | Basic      |

You can also register a new account (stored in-session only).

## 📦 Mock Data

All content lives in `src/data/` as plain JSON and is served through a small service layer
(`src/services/movieService.ts`) that simulates network latency. To connect a real API later,
set `VITE_API_BASE_URL` in a `.env` file and swap the service implementations — the Axios
instance in `src/services/api.ts` is already configured.

## ⚡ Performance

- Route-level **code splitting** via `React.lazy` + `Suspense`.
- Vendor chunks (React, Redux, Framer Motion) split for long-term caching.
- **Lazy-loaded images** with shimmer skeleton placeholders.
- Relative asset base (`./`) so the build runs from any cPanel directory.
