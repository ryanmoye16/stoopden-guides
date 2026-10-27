/* Apartment Station Sizing Helper (P2 #18, full-ownership plan).
   Tests a reader's clear floor patch against the named stations in
   Stoopden's guides, using ONLY the footprints and limits recorded in
   those guides (bed sizes in plush-beds-size-fit, the steps' footprint,
   height and ~20 lb limit in sofa-ramp-small-dogs, the litter mat in
   apartment-litter-travel, the post base in apartment-play-corner-
   scratchers, the hunt box in cat-teaser-toys, the feeder tray width in
   two-pet-feeding-stations-apartment). Where a guide records only one
   dimension (the lounge's length, the tray's width), the helper checks
   only that dimension and says so. Amazon links render only for
   stations that fit the patch and the pet. */
(function () {
  "use strict";

  var STATIONS = [
    {
      id: "donut-bed",
      name: "Best Friends by Sheri Donut Cuddler — Medium, 30 in, Frost",
      short: "Donut bed (curl sleepers)",
      asin: "B07P6FS2VT",
      guide: "plush-beds-size-fit.html",
      guideLabel: "Plush beds: size and fit",
      footW: 30, footD: 30,
      dimsLabel: "30 in round",
      pets: ["cat", "dog"],
      kind: "rest"
    },
    {
      id: "flat-bed",
      name: "Brindle Soft Shredded Memory Foam Pillow Bed — 34×22 in, Khaki",
      short: "Flat pillow bed (sprawlers)",
      asin: "B00SG1DX4A",
      guide: "plush-beds-size-fit.html",
      guideLabel: "Plush beds: size and fit",
      footW: 34, footD: 22,
      dimsLabel: "34×22 in, 3 in high",
      pets: ["cat", "dog"],
      kind: "rest"
    },
    {
      id: "pet-steps",
      name: "Best Pet Supplies Foam Pet Steps — 3-Step, 16.5 in, Ash Gray Linen",
      short: "Foam steps to the sofa",
      asin: "B07HCXV4X5",
      guide: "sofa-ramp-small-dogs.html",
      guideLabel: "Sofa ramps and steps for small dogs",
      footW: 21, footD: 16,
      dimsLabel: "21×16 in footprint, 16.5 in high",
      pets: ["dog"],
      kind: "rest",
      maxWeight: 20,
      topHeight: 16.5
    },
    {
      id: "litter-mat",
      name: "Gorilla Grip Cat Litter Mat, 40×28 in",
      short: "Litter exit-run mat",
      asin: "B08QNGWF2M",
      guide: "apartment-litter-travel.html",
      guideLabel: "Apartment litter setup and travel",
      footW: 40, footD: 28,
      dimsLabel: "40×28 in",
      pets: ["cat"],
      kind: "travel"
    },
    {
      id: "scratching-post",
      name: "SmartCat Ultimate Scratching Post, 32 in",
      short: "Scratching post (vertical scratch)",
      asin: "B000634MH8",
      guide: "apartment-play-corner-scratchers.html",
      guideLabel: "Apartment play corner: scratchers",
      footW: 16, footD: 16,
      dimsLabel: "16×16 in base, 32 in tall",
      pets: ["cat"],
      kind: "play"
    },
    {
      id: "scratcher-lounge",
      name: "PetFusion Ultimate Cat Scratcher Lounge",
      short: "Scratcher lounge (horizontal scratch)",
      asin: "B004X6UEH6",
      guide: "apartment-play-corner-scratchers.html",
      guideLabel: "Apartment play corner: scratchers",
      footW: 34, footD: null,
      dimsLabel: "About 34 in long (length is the dimension our guide records)",
      pets: ["cat"],
      kind: "play"
    },
    {
      id: "hunt-box",
      name: "SmartCat Peek-a-Prize Toy Box (large)",
      short: "Solo hunt box",
      asin: "B0006VMN4O",
      guide: "cat-teaser-toys.html",
      guideLabel: "Cat teaser toys for apartments",
      footW: 13.5, footD: 13.5,
      dimsLabel: "13.5×13.5 in",
      pets: ["cat"],
      kind: "play"
    },
    {
      id: "feeder-tray",
      name: "Hepper NomNom — White",
      short: "Feeding tray station",
      asin: "B00K0SH8XY",
      guide: "two-pet-feeding-stations-apartment.html",
      guideLabel: "Two feeding stations for two apartment pets",
      footW: 16, footD: null,
      dimsLabel: "16 in wide tray (width is the dimension our guide records)",
      pets: ["cat", "dog"],
      kind: "feed"
    }
  ];

  /* A station that fits with less than this much spare on its tightest
     side counts as "tight": there is no room left to slide it out for
     cleaning or to step around it, which in an apartment walkway reads
     as not fitting. This is the helper's own stated rule, printed on
     the page — not a manufacturer figure. */
  var TIGHT_SPARE = 2;

  function fmt(n) {
    return (Math.round(n * 10) / 10).toString().replace(/\.0$/, "");
  }

  function evaluateStation(st, input) {
    var fails = [];
    var notes = [];
    var spare = null;

    if (st.pets.indexOf(input.pet) === -1) {
      if (st.id === "pet-steps") {
        fails.push("Our steps guides are written for small dogs. For cats, our guides keep stations at floor level instead of adding a climb — the floor-level approach is in the guide list below.");
      } else {
        fails.push("This is a cat station in our guides — it is not a station we size for a small dog.");
      }
    }

    if (st.footD === null) {
      /* One recorded dimension: check the longer run of the patch. */
      var run = Math.max(input.width, input.depth);
      if (run < st.footW) {
        fails.push("It needs a " + fmt(st.footW) + " in run along a wall; the longest side of your patch is " + fmt(run) + " in.");
      } else {
        spare = run - st.footW;
        notes.push("Checked on the one dimension our guide records — the " + fmt(st.footW) + " in run. The other dimension is not stated in our guide, so judge the depth against the guide before you buy.");
      }
    } else {
      var spareNormal = Math.min(input.width - st.footW, input.depth - st.footD);
      var spareRotated = Math.min(input.width - st.footD, input.depth - st.footW);
      var best = Math.max(spareNormal, spareRotated);
      if (best < 0) {
        fails.push("It needs " + fmt(st.footW) + "×" + fmt(st.footD) + " in of clear floor (either way round); your patch is " + fmt(input.width) + "×" + fmt(input.depth) + " in — short by " + fmt(-best) + " in on the tightest side even turned.");
      } else {
        spare = best;
        if (spareRotated > spareNormal) {
          notes.push("It fits turned sideways against your patch — the long side does not have to run along the wall.");
        }
      }
    }

    if (st.maxWeight) {
      if (input.weight !== null && input.weight > st.maxWeight) {
        fails.push("Your dog is " + fmt(input.weight) + " lb — over the roughly " + st.maxWeight + " lb real-use limit our steps guide records for this foam block.");
      }
      if (input.weight === null) {
        notes.push("Provisional on weight: you did not enter a weight. This verdict holds only if your dog is at or under roughly " + st.maxWeight + " lb, the real-use limit in our steps guide.");
      }
    }
    if (st.topHeight) {
      if (input.seat !== null && input.seat > st.topHeight) {
        fails.push("Your sofa seat is " + fmt(input.seat) + " in high — above the steps' " + fmt(st.topHeight) + " in top, so the last step lands below the seat instead of level with it.");
      }
      if (input.seat === null) {
        notes.push("Provisional on seat height: you did not enter one. The steps top out at " + fmt(st.topHeight) + " in — measure your sofa seat before treating this as a fit.");
      }
    }

    var status;
    if (fails.length) {
      status = "outside";
    } else if (spare !== null && spare < TIGHT_SPARE) {
      status = "tight";
      notes.push("Fits — tight: under " + TIGHT_SPARE + " in to spare on the tightest side. There is no room to slide it out for cleaning or step around it; if this patch is a walkway, treat tight as doesn't fit.");
    } else if (spare !== null) {
      status = "fits";
      notes.push("Inside your patch with " + fmt(spare) + " in to spare on the tightest side — room to slide it out for cleaning and step around it.");
    } else {
      status = "fits";
    }

    if (status !== "outside" && st.kind === "rest" && input.sleep !== "unsure") {
      if (st.id === "donut-bed" && input.sleep === "sprawl") {
        notes.push("Shape note: the donut is the curl bed in our guides, and the flat bed is the sprawl bed. A sprawler can use a donut, but if sprawl is the usual sleep, read the flat bed's verdict first.");
      }
      if (st.id === "flat-bed" && input.sleep === "curl") {
        notes.push("Shape note: the flat bed is the sprawl bed in our guides, and the donut is the curl bed. A curler can use a flat bed, but if the curl is the usual sleep, read the donut's verdict first.");
      }
    }
    if (status !== "outside" && st.id === "scratching-post") {
      notes.push("The base is the footprint — the post itself rises 32 in for a full standing stretch, so the patch also needs that vertical room, clear of a door swing.");
    }
    if (status !== "outside" && st.id === "litter-mat") {
      notes.push("The mat is the exit run: the litter box sits at one end of it and the cat walks the mat's length out. The 40×28 in patch is the mat itself, on top of the box's own corner.");
    }
    if (status !== "outside" && st.id === "donut-bed") {
      notes.push("Size note from our bed guide: only the Medium named here and larger carry the removable, washable cover this site requires — the Small is whole-bed washable only.");
    }

    return { station: st, status: status, fails: fails, notes: notes, spare: spare };
  }

  function evaluate(input) {
    var results = STATIONS.map(function (st) { return evaluateStation(st, input); });
    var rank = { fits: 0, tight: 1, outside: 2 };
    results.sort(function (a, b) {
      if (rank[a.status] !== rank[b.status]) return rank[a.status] - rank[b.status];
      return (b.spare || 0) - (a.spare || 0);
    });
    return results;
  }

  /* ---- Browser wiring (skipped when loaded under Node for tests) ---- */
  if (typeof document === "undefined") {
    if (typeof module !== "undefined" && module.exports) {
      module.exports = { STATIONS: STATIONS, evaluate: evaluate, evaluateStation: evaluateStation };
    }
    return;
  }

  var form = document.getElementById("station-sizing-form");
  if (!form) return;
  var resultsEl = document.getElementById("checker-results");

  function numOrNull(v) {
    var n = parseFloat(v);
    return isNaN(n) ? null : n;
  }

  function readInput() {
    return {
      width: parseFloat(form.elements["width"].value),
      depth: parseFloat(form.elements["depth"].value),
      pet: form.elements["pet"].value,
      weight: numOrNull(form.elements["weight"].value),
      seat: numOrNull(form.elements["seat"].value),
      sleep: form.elements["sleep"].value
    };
  }

  function badgeText(status) {
    if (status === "fits") return "Fits your patch";
    if (status === "tight") return "Fits — tight";
    return "Doesn't fit this patch";
  }

  function render(input) {
    var results = evaluate(input);
    var fitCount = results.filter(function (r) { return r.status === "fits"; }).length;
    var tightCount = results.filter(function (r) { return r.status === "tight"; }).length;

    var html = "";
    if (fitCount) {
      html += '<p class="checker-summary"><strong>' + fitCount + " of the " + STATIONS.length + " stations we size fit your patch" + (tightCount ? ", plus " + tightCount + " tight" : "") + ".</strong> Verdicts use only the footprints and limits recorded in our guides — nothing is stretched to make a sale.</p>";
    } else if (tightCount) {
      html += '<p class="checker-summary"><strong>No comfortable fit — ' + tightCount + " tight station" + (tightCount > 1 ? "s" : "") + " only.</strong> Each one fits on the tape measure but leaves under 2 in to spare. In a walkway, read tight as doesn't fit.</p>";
    } else {
      html += '<p class="checker-summary"><strong>None of the ' + STATIONS.length + ' stations we size fits this patch and pet.</strong> That is a real answer, not a dead end: the “when nothing fits” section below lists what to look for instead.</p>';
    }

    results.forEach(function (r) {
      var st = r.station;
      html += '<div class="checker-result checker-result--' + r.status + '">';
      html += '<div class="checker-result-head"><h3>' + st.short + '</h3><span class="fit-badge fit-badge--' + r.status + '">' + badgeText(r.status) + "</span></div>";
      html += '<p class="checker-result-specs">' + st.name + " · Footprint " + st.dimsLabel + "</p>";
      r.fails.forEach(function (f) { html += '<p class="checker-reason">✗ ' + f + "</p>"; });
      r.notes.forEach(function (n) { html += '<p class="checker-reason">' + n + "</p>"; });
      html += '<p class="checker-result-links"><a href="' + st.guide + '">Read the guide: ' + st.guideLabel + " →</a>";
      if (r.status !== "outside") {
        html += ' &nbsp;<a href="https://www.amazon.com/dp/' + st.asin + '?tag=stoopden-20" target="_blank" rel="noopener sponsored" class="product-slot__link">Check price on Amazon →</a>';
      } else {
        html += ' <span class="checker-nocta">No buying link — we don’t link a purchase we just told you doesn’t fit.</span>';
      }
      html += "</p></div>";
    });

    resultsEl.innerHTML = html;
    resultsEl.hidden = false;
  }

  function runFromForm(pushUrl) {
    var input = readInput();
    if (!(input.width > 0) || !(input.depth > 0)) {
      resultsEl.innerHTML = '<p class="checker-summary">Enter both sides of your clear floor patch — those two numbers decide most of the verdicts.</p>';
      resultsEl.hidden = false;
      return;
    }
    render(input);
    if (pushUrl && window.history && window.history.replaceState) {
      var q = "?w=" + encodeURIComponent(input.width) + "&d=" + encodeURIComponent(input.depth) + "&pet=" + encodeURIComponent(input.pet);
      if (input.weight !== null) q += "&weight=" + encodeURIComponent(input.weight);
      if (input.seat !== null) q += "&seat=" + encodeURIComponent(input.seat);
      q += "&sleep=" + encodeURIComponent(input.sleep);
      window.history.replaceState(null, "", q);
    }
    if (typeof window.gtag === "function") {
      window.gtag("event", "station_sizing_run", { page_path: window.location.pathname });
    }
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    runFromForm(true);
    resultsEl.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  /* Pre-fill from a shared link (?w=40&d=30&pet=cat…) and run. */
  try {
    var params = new URLSearchParams(window.location.search);
    var has = false;
    [["w", "width"], ["d", "depth"], ["weight", "weight"], ["seat", "seat"]].forEach(function (pair) {
      if (params.get(pair[0])) { form.elements[pair[1]].value = params.get(pair[0]); has = true; }
    });
    ["pet", "sleep"].forEach(function (k) {
      if (params.get(k)) { form.elements[k].value = params.get(k); has = true; }
    });
    if (has) runFromForm(false);
  } catch (err) { /* a malformed query string should never break the page */ }
})();
