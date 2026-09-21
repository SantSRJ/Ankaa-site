document.querySelectorAll('.catalog-media[data-multi]').forEach(media => {
  const track = media.querySelector('.m-track');
  const dots = media.querySelectorAll('.dot');
  let index = 0;

  function goTo(i) {
    index = (i + dots.length) % dots.length;
    track.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach((d, di) => d.classList.toggle('is-active', di === index));
  }

  dots.forEach(dot => {
    dot.addEventListener('click', e => {
      e.preventDefault();
      goTo(Number(dot.dataset.idx));
    });
  });

  // swipe táctil
  let startX = 0;
  track.addEventListener('touchstart', e => startX = e.touches[0].clientX);
  track.addEventListener('touchend', e => {
    const diff = e.changedTouches[0].clientX - startX;
    if (diff > 40) goTo(index - 1);
    else if (diff < -40) goTo(index + 1);
  });
});

// Menú hamburguesa responsive — sin dependencias externas.
document.addEventListener("DOMContentLoaded", function () {
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector("nav.categories");
  if (!toggle || !nav) return;

  function openNav() {
    nav.classList.add("is-open");
    toggle.setAttribute("aria-expanded", "true");
  }

  function closeNav() {
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  }

  toggle.addEventListener("click", function () {
    var isOpen = nav.classList.contains("is-open");
    if (isOpen) {
      closeNav();
    } else {
      openNav();
    }
  });

  // Cerrar al elegir una sección del menú.
  nav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", closeNav);
  });

  // Cerrar con la tecla Escape.
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeNav();
  });

  // Si la ventana vuelve a tamaño de escritorio, aseguramos que quede cerrado.
  window.addEventListener("resize", function () {
    if (window.innerWidth > 860) closeNav();
  });
});
