// On the home page the nav wears the sky's colour at the top, so the hero reads as one scene; it turns solid on scroll.
var nav = document.querySelector(".nav--sky");
if (nav) {
  var update = function () { nav.classList.toggle("nav--sky", window.scrollY < 8); };
  addEventListener("scroll", update, { passive: true });
  update();
}
