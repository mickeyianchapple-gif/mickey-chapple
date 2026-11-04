// Mobile nav toggle
(function () {
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('nav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', function () {
    var open = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.textContent = open ? 'Close' : 'Menu';
  });

  // Close the menu when a link is chosen
  nav.addEventListener('click', function (e) {
    if (e.target.tagName === 'A' && nav.classList.contains('is-open')) {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.textContent = 'Menu';
    }
  });
})();

// Reveal sections as they scroll into view.
// Nothing is hidden until we know we can un-hide it: the hiding class is
// added by JS, so with JS off or an old browser the page renders normally.
(function () {
  var root = document.documentElement;

  var reduce = window.matchMedia &&
               window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce || !('IntersectionObserver' in window)) return;

  var sections = [];
  var all = document.querySelectorAll('main > section, .site-foot');
  for (var i = 0; i < all.length; i++) {
    if (!all[i].classList.contains('hero')) sections.push(all[i]);
  }
  if (!sections.length) return;

  root.classList.add('reveal-on');
  sections.forEach(function (s) { s.classList.add('reveal'); });

  var show = function (el) { el.classList.add('is-visible'); };

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        show(entry.target);
        io.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -12% 0px', threshold: 0.06 });

  sections.forEach(function (s) { io.observe(s); });

  // Safety net: if anything goes wrong, never leave content hidden.
  window.setTimeout(function () { sections.forEach(show); }, 3000);
})();
