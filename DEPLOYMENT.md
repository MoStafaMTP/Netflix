# Deploying to cPanel Shared Hosting

This is a static React (Vite) build, so **no Node.js is required on the server**. You build
locally and upload the resulting files.

---

## Step 1 — Build the project locally

On your own computer (with Node.js 18+ installed):

```bash
npm install
npm run build
```

This creates a `dist/` folder containing:

```
dist/
├── .htaccess          ← routing + caching rules (important!)
├── index.html
├── favicon.svg
└── assets/            ← hashed JS, CSS, images
```

> **Tip:** `.htaccess` is a hidden file. Make sure your file manager / FTP client is set to
> show hidden files so you don't miss it.

## Step 2 — Open cPanel File Manager

1. Log in to cPanel.
2. Open **File Manager**.
3. Navigate to **`public_html`** (this is your site's document root).
   - To host at the root domain → use `public_html` directly.
   - To host in a sub-folder (e.g. `yoursite.com/netflix`) → create
     `public_html/netflix` and use that instead (then see Step 5).

## Step 3 — Upload the build

You can upload either way:

**Option A — Upload a ZIP (fastest)**
1. On your computer, zip the **contents** of `dist/` (not the `dist` folder itself).
2. In File Manager, click **Upload** and select the ZIP.
3. Back in File Manager, right-click the ZIP → **Extract** into `public_html`.
4. Delete the ZIP afterwards.

**Option B — Upload files directly**
1. Select every file inside `dist/` (including `.htaccess` and the `assets` folder).
2. Drag them into `public_html`.

After uploading, `public_html` should contain `index.html`, `favicon.svg`, `.htaccess`, and the
`assets/` folder.

## Step 4 — Test

Visit your domain. The home page should load. Then:

- Click into a movie (`/movie/5`) and **refresh the page** — it should still load (this proves
  the `.htaccess` SPA fallback is working).
- Try `/search`, `/favorites`, `/profile`.

If a refresh on a sub-route shows an Apache 404 instead of the app, the `.htaccess` file is
missing or wasn't uploaded — re-check Step 3.

## Step 5 — (Only if hosting in a sub-folder)

If you deployed to `public_html/netflix` instead of the root:

1. Open `.htaccess` in the File Manager editor and **uncomment** this line, adjusting the
   folder name:
   ```apache
   RewriteBase /netflix/
   ```
2. The project is already built with a **relative base path** (`base: './'` in
   `vite.config.ts`), so the assets resolve correctly from any sub-folder — no rebuild needed
   for asset paths. The `RewriteBase` change above is only for the router fallback.

## Troubleshooting

| Symptom | Fix |
| --- | --- |
| Blank page, console shows 404s for `/assets/...` | You're in a sub-folder. The build already uses relative paths; make sure you uploaded the whole `assets/` folder. |
| Refresh on `/search` → Apache 404 | `.htaccess` not uploaded, or `mod_rewrite` disabled. Confirm the file is present in `public_html`. |
| Old version still showing after re-deploy | The HTML is set to not cache, but force-refresh (Ctrl/Cmd+Shift+R). Hashed assets update automatically. |
| Mixed-content warnings | Ensure your domain uses HTTPS (enable AutoSSL in cPanel). |

## Updating the site later

1. Make your changes locally.
2. Run `npm run build` again.
3. Re-upload the new `dist/` contents, overwriting the old files.

Because asset filenames are content-hashed, returning visitors automatically receive the new
version while still benefiting from long-term caching.
