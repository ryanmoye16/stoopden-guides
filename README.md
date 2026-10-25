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
| `guides/how-we-pick.html` | Method (canonical). `/how-we-pick.html` redirects here. |
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

## Amazon Associates

Every page includes: **As an Amazon Associate I earn from qualifying purchases.**

Associates tag: **stoopden-20** (Ryan's real tag — never commit a guessed tag).

Switch-on status (2026-10-25): 16 of 19 slots are wired with sourced ASINs (sources recorded in `~/workspace/affiliate-sites/stoopden-product-picks.md`):

| Slot | Pick | ASIN |
| --- | --- | --- |
| Gravity feeder | Petmate Pet Café Feeder | B004IJ6ZZ8 |
| Stainless dish beside feeder | Hepper NomNom, White | B00K0SH8XY |
| Water fountain | Catit Flower Fountain, 3 L | B0146QXOB0 |
| Water bowl | Americat Company Stainless Steel Cat Bowl | B084T76QHX |
| Scratcher sofa | PetFusion Ultimate Cat Scratcher Lounge | B004X6UEH6 |
| Sisal post | SmartCat Ultimate Scratching Post, 32 in | B000634MH8 |
| Waste-bag clip | Earth Rated Leash Dispenser | B00FGFC4IK |
| Covered litter | Van Ness Large Enclosed Corner Pan CP9 | B01HI9QDBA |
| Corner groomer | Catit Senses 2.0 Self Groomer | B00D3NI2PG |
| Litter mat | Gorilla Grip Cat Litter Mat, 40×28 in | B08QNGWF2M |
| Grooming glove | DELOMO Pet Grooming Glove (1 pack, right-hand) | B01N66Y1IK |
| Walk bottle | Dexas Snack-DuO with Companion Cup | B01ARNIHPE |
| Plush round bed | Best Friends by Sheri Donut Cuddler, Medium 30 in, Frost | B07P6FS2VT |
| Flat pillow bed | Brindle Soft Shredded Memory Foam Pillow Bed, 34×22 in, Khaki | B00SG1DX4A |
| Pet stairs | Best Pet Supplies Foam Pet Steps, 3-Step 16.5 in, Ash Gray Linen | B07HCXV4X5 |
| Mouse hunt box | SmartCat Peek-a-Prize Toy Box (large) | B0006VMN4O |

A wired card is labeled **Named pick**, names the product, and links to `https://www.amazon.com/dp/ASIN?tag=stoopden-20`. The other 3 slots keep their `ASIN_TODO_…` IDs, a **Criteria only** pill, and a **Link when we name one** hold — not a clickable button, and not a live Amazon URL — until their ASIN is verified from a recorded source, or, for the DoggoRamps ramp (ASIN already sourced), until Ryan's price-level decision.

To wire a remaining slot:

1. Confirm the ASIN from a real source and record that source (never guess; watch for accessory look-alike ASINs).
2. Replace the slot's `ASIN_TODO_…` ID with the real ASIN that matches that slot's type-level criteria (`guides/how-we-pick.html`), name the product in the card, and ground the copy in real owner feedback.
3. Change the disabled hold to a real `https://www.amazon.com/dp/ASIN?tag=stoopden-20` link styled `product-slot__link`.
4. Do not invent review counts, star ratings, or prices to “finish” a slot. No displayed prices.

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
