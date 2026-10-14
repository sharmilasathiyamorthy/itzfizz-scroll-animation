# ITZFIZZ — Scroll-Driven Car Hero

A premium, scroll-driven automotive campaign hero section built with React, Vite, Tailwind CSS, and GSAP ScrollTrigger.

## What it does

- A full-screen hero with a widely letter-spaced **WELCOME** headline and the bold **ITZFIZZ** wordmark
- A prominent car image that slides in on page load
- Four statistics (98%, 85%, 92%, 100%) with staggered entrance animations
- On scroll, the hero section is **pinned** and the car moves horizontally with subtle scaling and rotation
- Scrolling back up **reverses** the animation naturally
- Below the hero is a content section with design/performance/heritage blurbs
- Fully responsive for mobile and desktop
- Respects `prefers-reduced-motion`

## How to run the project

You need [Node.js](https://nodejs.org/) installed (version 18 or higher).

1. Open a terminal in the project folder.
2. Install dependencies (only needed once):
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```
4. Open the URL shown in the terminal (usually `http://localhost:5173`).

## How to build for production

```
npm run build
```

This creates a `dist/` folder with the optimized site. You can preview it with:

```
npm run preview
```

## Publishing on GitHub Pages

1. Create a repository on GitHub and push your code:
   ```
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo>.git
   git push -u origin main
   ```

2. Install the `gh-pages` helper:
   ```
   npm install --save-dev gh-pages
   ```

3. Add these lines to `package.json` (inside the `"scripts"` section):
   ```json
   "predeploy": "npm run build",
   "deploy": "gh-pages -d dist"
   ```

4. If your repo is not at the root of `username.github.io`, you also need to set the base path in `vite.config.ts`. Add a `base` field:
   ```ts
   export default defineConfig({
     base: '/<your-repo-name>/',
     // ... rest of config
   });
   ```

5. Deploy:
   ```
   npm run deploy
   ```

6. In your GitHub repo, go to **Settings → Pages**. Under "Build and deployment", select the **gh-pages** branch. Your site will be live at `https://<your-username>.github.io/<your-repo>/`.

## How the GSAP scroll animation works

The animation uses two GSAP timelines:

### 1. Entrance animation (plays once on load)

A `gsap.timeline()` animates elements into view with staggered delays:
- Each character of the "WELCOME" headline fades in and slides up, one by one
- The car image slides in from the right with a slight scale and rotation
- The "ITZFIZZ" wordmark fades in
- The four statistics animate in one-by-one with a stagger

### 2. Scroll-driven animation (GSAP ScrollTrigger)

A second timeline is linked to scroll position using `scrollTrigger`:

```js
scrollTrigger: {
  trigger: section,       // the hero section
  start: 'top top',       // start when hero hits the top of the viewport
  end: '+=200%',          // scroll an extra 200% of viewport height
  scrub: 1,               // animation follows scroll with 1s smoothing
  pin: true,              // pin the hero in place during the scroll
}
```

- **`pin: true`** keeps the hero section fixed on screen while you scroll through the 200% range, so the content below doesn't appear until the animation is done.
- **`scrub: 1`** ties the animation progress directly to scroll position. Scrolling down advances the animation; scrolling up reverses it — no autoplay, purely user-controlled.
- During the scroll, the car image moves horizontally (`x: '25vw'`), scales up slightly (`scale: 1.12`), and rotates gently (`rotation: -2`). Meanwhile the headline, sub-text, and stats fade out upward.

### Reduced motion

If the user's system has `prefers-reduced-motion: reduce` enabled, the scroll-driven animation is skipped entirely and all entrance elements are shown immediately without animation.

## Tech stack

- React 18 + TypeScript
- Vite (dev server + bundler)
- Tailwind CSS (styling)
- GSAP + ScrollTrigger (animation)
- Lucide React (icons)
- Google Fonts: Syncopate (display) + Inter (body)
