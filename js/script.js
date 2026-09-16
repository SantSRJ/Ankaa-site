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
