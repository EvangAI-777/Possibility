# Hosting the Handshake Copilot Deliverable for Judges

## Recommendation (best balance of speed + polish)

Use **Vercel** and deploy a tiny React app that renders `React Component Artifacts/handshake_copilot.jsx` as the main page.

Why this is the best default for judging:
- very fast setup (minutes)
- stable public URL
- easy redeploys if you tweak the demo
- clean HTTPS link and good first-load performance

---

## Fast Path Options

### Option A — Vercel (recommended)

1. Create a minimal React app (Vite is fastest).
2. Copy `handshake_copilot.jsx` into `src/`.
3. In `src/main.jsx`, render the component directly.
4. Push to GitHub.
5. Import repo in Vercel and deploy.
6. Submit the production URL to judges.

Use this when you want a polished, reliable judging link.

### Option B — Netlify

Same pattern as Vercel:
- build with Vite
- deploy from GitHub
- use generated HTTPS URL

Use if you already prefer Netlify.

### Option C — GitHub Pages

Good for static demos if you already use GitHub heavily.

Caveat: setup can be slightly more finicky than Vercel/Netlify for React routing and base paths.

### Option D — StackBlitz/CodeSandbox

Great for **very fast proof-of-demo** sharing.

Caveat: less "production-like" than Vercel/Netlify for final judging.

---

## Judge-Ready Checklist

Before sharing the link:
- include one-click preset scenarios visible on landing/results flow
- ensure mobile + desktop layout are both readable
- remove any dependency on local environment variables for core demo
- add a short `README` section: "What to click in 60 seconds"
- verify the URL works in a private/incognito browser

---

## Suggested Submission Format

Provide judges with:
1. **Live URL** (primary)
2. **30–60 second click path** (Candidate → Team → Org → Results)
3. **Repo URL** (optional technical appendix)
4. **One-line value proposition**

Example one-liner:

> "Handshake Enterprise Copilot predicts candidate-team-org stability and surfaces merge-conflict risk before hiring costs hit reality."
