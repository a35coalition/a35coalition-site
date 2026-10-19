(function () {
  var root = document.querySelector('.carousel');
  if (!root) return;
  var slides = Array.prototype.slice.call(root.querySelectorAll('.slide'));
  var dotsEl = root.querySelector('.carousel-dots');
  var i = 0, timer = null;
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  var dots = slides.map(function (_, n) {
    var b = document.createElement('button');
    b.type = 'button';
    b.setAttribute('role', 'tab');
    b.setAttribute('aria-label', 'Photo ' + (n + 1));
    b.addEventListener('click', function () { go(n); restart(); });
    dotsEl.appendChild(b);
    return b;
  });

  function go(n) {
    i = (n + slides.length) % slides.length;
    slides.forEach(function (s, k) {
      s.classList.toggle('is-active', k === i);
      s.setAttribute('aria-hidden', k === i ? 'false' : 'true');
      var img = s.querySelector('img');
      if (img && img.loading === 'lazy' && Math.abs(k - i) <= 1) img.loading = 'eager';
    });
    dots.forEach(function (d, k) { d.setAttribute('aria-selected', k === i ? 'true' : 'false'); });
  }
  function start() {
    clearInterval(timer);
    if (!reduce) timer = setInterval(function () { go(i + 1); }, 5000);
  }
  function stop() { clearInterval(timer); timer = null; }
  function restart() { stop(); start(); }

  root.querySelector('.prev').addEventListener('click', function () { go(i - 1); restart(); });
  root.querySelector('.next').addEventListener('click', function () { go(i + 1); restart(); });
  root.addEventListener('mouseenter', stop);
  root.addEventListener('mouseleave', start);
  root.addEventListener('focusin', stop);
  root.addEventListener('focusout', start);
  root.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') { go(i - 1); restart(); }
    if (e.key === 'ArrowRight') { go(i + 1); restart(); }
  });

  go(0);
  start();
})();
