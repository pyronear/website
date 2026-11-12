// Deployments map: show the name of a shaded department next to the pointer (labels come from data/deployments.yaml)
var figure = document.querySelector(".deploy-map");
if (figure) {
  var tip = figure.querySelector(".deploy-map__tip");
  figure.querySelectorAll("path[data-label]").forEach(function (shape) {
    shape.addEventListener("pointermove", function (event) {
      var box = figure.getBoundingClientRect();
      tip.textContent = shape.dataset.label;
      tip.style.left = event.clientX - box.left + "px";
      tip.style.top = event.clientY - box.top + "px";
      tip.hidden = false;
    });
    shape.addEventListener("pointerleave", function () {
      tip.hidden = true;
    });
  });
}
