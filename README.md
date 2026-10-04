# Fermor homepage

A new homepage for Fermor, built for the Frontend Developer Assignment.

The idea is to make money feel less scattered. The page moves from a clear financial overview to one useful next step, then to goals and everyday habits. It is aimed at people who want to take better care of their finances without needing to become finance experts first.

## Run locally

Use Node.js 22.12 or later.

```bash
npm ci
npm run dev
```

Open the local URL printed by Vite. To check the production version:

```bash
npm run build
npm run preview
```

## What works

- The sample overview switches between net worth, goals, and recent activity. Its chart has three period views.
- The goal section switches between a rainy-day fund, a trip, and a home. Moving the contribution slider changes the estimated time to the goal.
- The main call to action opens a planner. It checks income, expenses, and the chosen contribution before calculating a savings timeline.
- The money notes open readable articles. The questions expand individually, and the mobile navigation opens and closes.
- Dialogs use the browser's native focus management and Escape-to-close behaviour. Buttons, inputs, and links have visible keyboard focus. Reduced-motion preferences are respected.

## Design decisions

I chose a warm cream background and a quiet green palette to give the page a calmer feel. Fraunces adds character to the headings; DM Sans keeps controls and numbers readable. Both fonts are bundled with the build, so the page does not depend on a font CDN.

The dashboard is the main visual because it makes the promise concrete. The rest of the page gives visitors something to do: try a goal, read a short note, or make a simple plan. The illustrations are SVG and CSS, which keeps the page light and avoids stock photography that would add little to the story.

The content follows the assignment brief and Fermor's public description: understand, act, and grow. The [company's LinkedIn page](https://www.linkedin.com/company/fermor/) also describes bringing different parts of a financial life into one view. The layout, illustrations, and copy here are an independent interpretation. There are no invented customer quotes, adoption numbers, or claims about returns.

## Scope

This is a frontend concept, not Fermor's live product. All dashboard balances and transactions are illustrative. The goal estimates use contributions only, with no interest, market returns, inflation, or fees. The planner starts from a zero balance. There is no authentication, bank connection, or payment flow, and form inputs are not stored or transmitted. Reloading the page resets them.

React handles the interactions, Vite builds the static site, plain CSS handles the layout, and Lucide provides the interface icons. No backend or environment variables are needed.

## Deployment

The included GitHub Actions workflow builds the page and deploys `dist/` to GitHub Pages on pushes to `main`. In the repository settings, select **GitHub Actions** as the Pages source. The relative asset base also supports deployment to a subdirectory. Netlify and Vercel can use `npm run build` with `dist` as the output directory.

## Submission links

- Source: https://github.com/Jayesh-Waghmare/fermor-homepage
- Live homepage: https://jayesh-waghmare.github.io/fermor-homepage/

## Checks

The browser check covers the overview tabs and keyboard controls, chart periods, goal calculation, planner validation, dialog focus and Escape, articles, FAQ, and mobile navigation. It checks for horizontal overflow at 320, 375, 390, 680, 768, 1024, and 1440 pixels and fails on browser errors.

Build the page and start `npm run preview`. In a second terminal, run:

```bash
npm run test:e2e
```

The check uses an installed Google Chrome by default. For Playwright's bundled Chromium, run `npx playwright install chromium` first, then set `PLAYWRIGHT_CHANNEL=chromium`. `TEST_URL` can point the check at a different preview URL. Screenshots are written to the ignored `tmp/qa/` directory.

Run `npm run format` to format the source.
