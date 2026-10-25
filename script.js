
/* Small progressive enhancements: mobile navigation and scroll reveal. */
(function () {
  'use strict';

  var root = document.documentElement;
  root.classList.add('js');

  var toggle = document.querySelector('.menu-toggle');
  var nav = document.getElementById('primary-nav');

  if (toggle && nav) {
    function closeMenu() {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open navigation menu');
    }

    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute(
        'aria-label',
        open ? 'Close navigation menu' : 'Open navigation menu'
      );
    });

    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') {
        closeMenu();

        if (
          document.activeElement &&
          nav.contains(document.activeElement)
        ) {
          toggle.focus();
        }
      }
    });

    document.addEventListener('click', function (event) {
      if (
        !nav.contains(event.target) &&
        !toggle.contains(event.target)
      ) {
        closeMenu();
      }
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 640) {
        closeMenu();
      }
    });
  }

  var targets = Array.prototype.slice.call(
    document.querySelectorAll('.reveal')
  );

  if (
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
    !('IntersectionObserver' in window)
  ) {
    targets.forEach(function (element) {
      element.classList.add('in-view');
    });
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px 25px 0px'
  });

  targets.forEach(function (element) {
    observer.observe(element);
  });
})();
