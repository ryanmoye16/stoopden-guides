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
