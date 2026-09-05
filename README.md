# Stoopden Guides

Everyday pet gear for home and on the go.

Static HTML/CSS guide site for **US cats and small dogs** in apartments. Hubs: feed, play, groom, rest, travel. This is a GitHub Pages prototype — not the Shopify checkout.

**Public URL:** [https://ryanmoye16.github.io/stoopden-guides/](https://ryanmoye16.github.io/stoopden-guides/)

Shop (separate): [https://stoopden.com](https://stoopden.com)

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

Shared stylesheet: `css/site.css`. Mobile nav is CSS-only (checkbox). Links are relative so the site works at the project Pages URL.

## GitHub Pages (root of `main`)

This repo should deploy from **branch `main`, folder `/` (root)**, build type **legacy**. Do **not** attach custom domain `stoopden.com` until Ryan says so. DNS for the shop stays untouched.

If Pages is not on yet (repo Settings → Pages):

```bash
# Create Pages (empty repo / first enable)
gh api --method POST /repos/ryanmoye16/stoopden-guides/pages \
  -H "Accept: application/vnd.github+json" \
  -f build_type=legacy \
  -f source[branch]=main \
  -f source[path]=/

# Or update an existing Pages config
gh api --method PUT /repos/ryanmoye16/stoopden-guides/pages \
  -H "Accept: application/vnd.github+json" \
  -f build_type=legacy \
  -f source[branch]=main \
  -f source[path]=/
```

Confirm:

```bash
gh api /repos/ryanmoye16/stoopden-guides/pages
```

You want `html_url` = `https://ryanmoye16.github.io/stoopden-guides/` and `source.branch` = `main`, `source.path` = `/`. `cname` should be empty.

First build can take a few minutes. A `.nojekyll` file is in the root so GitHub does not run Jekyll on the HTML.

### Custom domain — out of scope

Do **not** add a `CNAME` file, do **not** set `stoopden.com` (or `www`) as a Pages custom domain, and do **not** change shop DNS, until Ryan explicitly asks.

## Amazon Associates (fill in later)

Every page includes: **As an Amazon Associate I earn from qualifying purchases.**

Product slots are labeled `ASIN_TODO_…` with a disabled **Amazon link coming** control. There are no live Amazon URLs and no Associates tag in this prototype.

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
- No free-shipping promises.
- No personal inbox on the site (shop contact is chat on stoopden.com).
- No fabricated reviews, prices, or ASINs.
