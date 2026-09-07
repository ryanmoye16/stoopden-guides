# Stoopden Guides

Everyday pet gear for home and on the go.

Static HTML/CSS guide site for **US cats and small dogs** in apartments. Hubs: feed, play, groom, rest, travel. GitHub Pages with custom domain **stoopden.com**. There is no storefront or checkout on this site.

**Public URL:** [https://stoopden.com/](https://stoopden.com/)

## Pages

| Path | Notes |
| --- | --- |
| `index.html` | Hub home |
| `guides/indoor-gravity-feeder.html` | Feed |
| `guides/water-bowl-vs-fountain.html` | Feed |
| `guides/cat-teaser-toys.html` | Play |
| `guides/scratcher-sofa-vs-posts.html` | Play |
| `guides/wall-corner-groomers.html` | Groom |
| `guides/plush-beds-size-fit.html` | Rest |
| `guides/sofa-ramp-small-dogs.html` | Rest |
| `guides/walk-water-bottle-kit.html` | Travel |
| `guides/apartment-litter-travel.html` | Travel |
| `guides/how-we-pick.html` | Method |
| `about.html` | About |
| `disclosure.html` | Amazon Associates |
| `privacy.html` | Privacy |

Shared stylesheet: `css/site.css`. Mobile nav is CSS-only (checkbox). `js/site.js` is optional: it highlights the in-page table of contents and a scrolled header. The site still works with JavaScript off. In-page links are relative so local preview matches production. Canonicals, sitemap, and robots use `https://stoopden.com/`. Brand wordmark, inverse, and favicon live in `assets/`.

## GitHub Pages (root of `main`)

Deploy from **branch `main`, folder `/` (root)**, build type **legacy**. Keep the root `CNAME` file set to `stoopden.com`. Keep `.nojekyll` so GitHub does not run Jekyll on the HTML.

If Pages needs to be re-enabled (repo Settings → Pages):

```bash
gh api --method PUT /repos/ryanmoye16/stoopden-guides/pages \
  -H "Accept: application/vnd.github+json" \
  -f build_type=legacy \
  -f source[branch]=main \
  -f source[path]=/ \
  -f cname=stoopden.com
```

Confirm:

```bash
gh api /repos/ryanmoye16/stoopden-guides/pages
```

You want custom domain `stoopden.com`, `source.branch` = `main`, `source.path` = `/`. Do not point canonicals or the sitemap at `github.io`.

If `gh api` returns **403 Resource not accessible by integration**, enable the same settings in the GitHub UI: **Settings → Pages → Deploy from a branch → `main` / `/ (root)`**, custom domain `stoopden.com`.

## Amazon Associates (fill in later)

Every page includes: **As an Amazon Associate I earn from qualifying purchases.**

Product slots are labeled `ASIN_TODO_…` with a disabled **Link when we name one** control. There are no live Amazon URLs and no Associates tag yet. Public cards read as finished criteria holds — not dashed stubs.

When Ryan has a tag and real ASINs:

1. Put the tag in one place (a short note in this README is enough until you add a tiny script). Example tag format: `yourtag-20` — do not commit a guessed tag.
2. Replace each `ASIN_TODO_…` with a real ASIN that matches that slot’s type-level criteria (`guides/how-we-pick.html`).
3. Change the disabled control to a real `https://www.amazon.com/dp/ASIN/?tag=YOURTAG` link (or the equivalent Associates link builder).
4. Do not invent review counts, star ratings, or prices to “finish” a slot.

## Local preview

```bash
python3 -m http.server 8080 --bind 127.0.0.1
```

Open `http://127.0.0.1:8080/` — use a server so `guides/` relative CSS paths match production.

## Brand / content rules

- Tagline: Everyday pet gear for home and on the go.
- Audience: US cats + small dogs / apartments.
- Original commentary, not thin product grids.
- No storefront CTAs. This repo is guides only.
- No free-shipping promises.
- No personal inbox on the site.
- No fabricated reviews, prices, or ASINs.
