(function () {
  var header = document.querySelector(".site-header");
  var root = document.documentElement;

  var syncStickyOffset = function () {
    if (!header) return;
    var height = Math.ceil(header.getBoundingClientRect().height);
    if (!height) return;
    root.style.setProperty("--header-stack", height + "px");
  };

  if (header) {
    var onScroll = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 12);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    syncStickyOffset();
    window.addEventListener("resize", syncStickyOffset);
    if (typeof ResizeObserver === "function") {
      new ResizeObserver(syncStickyOffset).observe(header);
    }
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(syncStickyOffset);
    }
  }

  document.addEventListener("keydown", function (event) {
    if (event.key !== "Escape") return;
    var toggle = document.getElementById("nav-toggle");
    if (toggle) toggle.checked = false;
  });

  var tocLinks = Array.prototype.slice.call(
    document.querySelectorAll('.toc ol a[href^="#"]')
  );
  if (!tocLinks.length || !("IntersectionObserver" in window)) return;

  var items = tocLinks
    .map(function (link) {
      var id = decodeURIComponent(link.getAttribute("href").slice(1));
      return { link: link, el: document.getElementById(id) };
    })
    .filter(function (item) {
      return item.el;
    });

  if (!items.length) return;

  var headerHeight = header ? header.getBoundingClientRect().height : 72;
  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        tocLinks.forEach(function (link) {
          link.removeAttribute("aria-current");
        });
        items.forEach(function (item) {
          if (item.el === entry.target) {
            item.link.setAttribute("aria-current", "location");
          }
        });
      });
    },
    { rootMargin: "-" + Math.round(headerHeight + 12) + "px 0px -68% 0px", threshold: 0 }
  );

  items.forEach(function (item) {
    observer.observe(item.el);
  });
})();

/* Affiliate outbound-click instrumentation (GA4).
   Fires an `affiliate_click` event on clicks to Amazon product pages
   (/dp/ links and pick-card window.open handlers) and to Systeme.io
   affiliate links (sa= parameter). Pageviews alone cannot show which
   pages send revenue clicks; this closes that gap. Added 2026-10-25
   under the full-ownership plan, P0 item 2. */
(function () {
  if (window.__affiliateClickTracking) return;
  window.__affiliateClickTracking = true;

  function destinationFromOnclick(el) {
    var oc = el.getAttribute && el.getAttribute("onclick");
    if (!oc) return null;
    var match = oc.match(/https?:\/\/[^\s'")]+/);
    return match ? match[0] : null;
  }

  function affiliateDestination(url) {
    try {
      var parsed = new URL(url, window.location.href);
      if (parsed.hostname === "www.amazon.com" && parsed.pathname.indexOf("/dp/") === 0) return parsed;
      if (parsed.hostname === "systeme.io" && parsed.search.indexOf("sa=") !== -1) return parsed;
      return null;
    } catch (err) {
      return null;
    }
  }

  document.addEventListener("click", function (event) {
    var el = event.target;
    if (!el || typeof el.closest !== "function") return;
    var anchor = el.closest("a[href]");
    var url = anchor ? anchor.href : null;
    var sourceEl = anchor || el;
    if (!url) {
      var card = el.closest("[onclick]");
      if (card) {
        url = destinationFromOnclick(card);
        sourceEl = card;
      }
    }
    if (!url) return;
    var dest = affiliateDestination(url);
    if (!dest) return;
    if (typeof window.gtag !== "function") return;
    window.gtag("event", "affiliate_click", {
      destination_host: dest.hostname,
      destination_path: dest.pathname,
      page_path: window.location.pathname,
      link_text: (sourceEl.textContent || "").trim().replace(/\s+/g, " ").slice(0, 80),
      transport_type: "beacon"
    });
  }, true);
})();
