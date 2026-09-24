// Deployment map: one approximate marker per partner area (see data/deployments.yaml)
var el = document.getElementById("map");
if (el && window.L) {
  var map = L.map(el, { scrollWheelZoom: false }).setView([46.6, 2.5], 5);
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 12,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);
  JSON.parse(el.dataset.markers).forEach(function (m) {
    var label = document.createElement("span");
    if (m.name) {
      var name = document.createElement("strong");
      name.textContent = m.name;
      label.append(name, document.createElement("br"));
    }
    label.append(m.place);
    L.circleMarker([m.lat, m.lng], { radius: 9, color: "#054546", weight: 2, fillColor: "#fbb400", fillOpacity: 0.9 })
      .bindPopup(label)
      .addTo(map);
  });
}
