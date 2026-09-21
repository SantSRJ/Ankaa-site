document.addEventListener("DOMContentLoaded", function () {

  // ---------- Carrusel de fotos en catálogo ----------
  document.querySelectorAll('.catalog-media[data-multi]').forEach(media => {
    const track = media.querySelector('.m-track');
    const dots = media.querySelectorAll('.dot');
    let index = 0;

    function goTo(i) {
      index = (i + dots.length) % dots.length;
      track.style.transform = `translateX(-${index * 100}%)`;
      dots.forEach((d, di) => d.classList.toggle('is-active', di === index));
    }

    // Tocar/clickear un dot: cambia de foto y NO debe abrir el link de WhatsApp
    dots.forEach(dot => {
      dot.addEventListener('click', e => {
        e.preventDefault();
        e.stopPropagation();
        goTo(Number(dot.dataset.idx));
      });
    });

    // Swipe táctil sobre la imagen
    let startX = 0;
    let startY = 0;
    let moved = false;

    track.addEventListener('touchstart', e => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      moved = false;
    }, { passive: true });

    track.addEventListener('touchmove', e => {
      const diffX = Math.abs(e.touches[0].clientX - startX);
      const diffY = Math.abs(e.touches[0].clientY - startY);
      // Solo lo consideramos "swipe" si el movimiento es más horizontal que vertical
      if (diffX > 10 && diffX > diffY) moved = true;
    }, { passive: true });

    track.addEventListener('touchend', e => {
      const diff = e.changedTouches[0].clientX - startX;
      if (Math.abs(diff) > 40) {
        if (diff > 0) goTo(index - 1);
        else goTo(index + 1);
      }
    });

    // Si hubo swipe (no un tap limpio), evitamos que dispare el link de WhatsApp
    media.addEventListener('click', e => {
      if (moved) {
        e.preventDefault();
        moved = false;
      }
    });
  });

  // ---------- Menú hamburguesa responsive — sin dependencias externas ----------
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