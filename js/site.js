(function () {
  var header = document.querySelector(".site-header");
  if (header) {
    var onScroll = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 12);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  document.addEventListener("keydown", function (event) {
    if (event.key !== "Escape") return;
    var toggle = document.getElementById("nav-toggle");
    if (toggle) toggle.checked = false;
  });

  var tocLinks = Array.prototype.slice.call(
    document.querySelectorAll('.toc a[href^="#"]')
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
    { rootMargin: "-18% 0px -70% 0px", threshold: 0 }
  );

  items.forEach(function (item) {
    observer.observe(item.el);
  });
})();
