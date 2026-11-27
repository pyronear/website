// On the home page the nav wears the sky's colour at the top, so the hero reads as one scene; it turns solid on scroll.
var nav = document.querySelector(".nav--sky");
if (nav) {
  var update = function () { nav.classList.toggle("nav--sky", window.scrollY < 8); };
  addEventListener("scroll", update, { passive: true });
  update();
}

// Menu and language dropdowns: one open at a time; Escape, a tap outside or following a link closes them.
var menus = document.querySelectorAll(".nav details");
menus.forEach(function (menu) {
  menu.addEventListener("toggle", function () {
    if (menu.open) menus.forEach(function (other) { if (other !== menu) other.open = false; });
  });
  menu.addEventListener("click", function (event) { if (event.target.closest("a")) menu.open = false; });
});
document.addEventListener("click", function (event) {
  menus.forEach(function (menu) { if (menu.open && !menu.contains(event.target)) menu.open = false; });
});
document.addEventListener("keydown", function (event) {
  if (event.key !== "Escape") return;
  menus.forEach(function (menu) {
    if (menu.open) {
      menu.open = false;
      menu.querySelector("summary").focus();
    }
  });
});
