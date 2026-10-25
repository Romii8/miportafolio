/* Portafolio · JavaScript vanilla */
(function () {
  'use strict';

  /* ---- Menú móvil ---- */
  var btn = document.querySelector('.menu-btn');
  var menu = document.getElementById('menu-movil');
  function cerrarMenu() {
    btn.setAttribute('aria-expanded', 'false');
    menu.classList.remove('abierto');
  }
  btn.addEventListener('click', function () {
    var abierto = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!abierto));
    menu.classList.toggle('abierto', !abierto);
  });
  menu.addEventListener('click', function (e) { if (e.target.tagName === 'A') cerrarMenu(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') cerrarMenu(); });

  /* ---- Salpicadura al hacer clic en la paleta ---- */
  document.querySelectorAll('.gota').forEach(function (gota) {
    gota.addEventListener('click', function (e) {
      var color = getComputedStyle(gota).getPropertyValue('--c');
      for (var i = 0; i < 8; i++) {
        var s = document.createElement('span');
        s.className = 'salpicadura';
        s.style.background = color;
        s.style.left = e.clientX + 'px';
        s.style.top = e.clientY + 'px';
        var ang = Math.random() * Math.PI * 2, dist = 30 + Math.random() * 50;
        s.style.setProperty('--dx', Math.cos(ang) * dist + 'px');
        s.style.setProperty('--dy', Math.sin(ang) * dist + 'px');
        document.body.appendChild(s);
        setTimeout(s.remove.bind(s), 700);
      }
    });
  });

  /* ---- Revelar al desplazarse ---- */
  var revelables = document.querySelectorAll('.revelar');
  if ('IntersectionObserver' in window) {
    var obs = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('visible'); obs.unobserve(en.target); }
      });
    }, { threshold: 0.15 });
    revelables.forEach(function (el) { obs.observe(el); });
  } else {
    revelables.forEach(function (el) { el.classList.add('visible'); });
  }

  /* ---- Sección activa en el menú ---- */
  var enlaces = document.querySelectorAll('.menu a');
  var secciones = document.querySelectorAll('main section[id]');
  if ('IntersectionObserver' in window) {
    var obsSec = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (en) {
        if (en.isIntersecting) {
          enlaces.forEach(function (a) {
            a.classList.toggle('actual', a.getAttribute('href') === '#' + en.target.id);
          });
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    secciones.forEach(function (s) { obsSec.observe(s); });
  }

  /* ---- Filtros de proyectos ---- */
  var filtros = document.querySelectorAll('.filtro');
  var cuadros = document.querySelectorAll('.cuadro');
  filtros.forEach(function (f) {
    f.addEventListener('click', function () {
      filtros.forEach(function (x) { x.classList.remove('activo'); x.setAttribute('aria-pressed', 'false'); });
      f.classList.add('activo'); f.setAttribute('aria-pressed', 'true');
      var cat = f.dataset.filtro;
      cuadros.forEach(function (c) {
        c.hidden = !(cat === 'todos' || c.dataset.cat === cat);
      });
    });
  });

})();
