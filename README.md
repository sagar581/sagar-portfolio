# Sagar Chaudhari: portfolio

Vue 3 + Vite + three.js. No backend.

## Edit the content

All text, links and data live in `src/content.js`. The components only lay it out.

## Run locally

```bash
npm install
npm run dev
```

## Deploy on Vercel

1. Push this folder to a new GitHub repository.
2. On vercel.com choose **Add New > Project** and import the repository.
3. Vercel detects Vite on its own (build command `npm run build`, output `dist`). Press **Deploy**.

Or from the terminal, without GitHub:

```bash
npx vercel        # first run asks you to log in, then gives a preview URL
npx vercel --prod # publishes to the production URL
```

## Where things are

- `src/components/HeroScene.vue`: the 3D payment network (three.js)
- `src/components/PassbookSection.vue`, `RatingChart.vue`: the journey and the CodeChef graph
- `src/components/WorkSection.vue`: Indiabulls work and the security checks panel
- `src/components/AppsSection.vue`: Smart Library and smaller builds
- `src/styles.css`: colours, type and layout tokens are at the top
