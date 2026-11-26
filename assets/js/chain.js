// How it works opening: plays the four steps over the camera feed once and rests on the last; a click picks one and stops it (WCAG 2.2.2).
// It only runs while the feed is on screen, and not at all when motion is reduced (the steps stay clickable).
var feed = document.querySelector(".feed");
if (feed) {
  var chain = feed.closest(".chain");
  var buttons = document.querySelectorAll(".chain__steps button");
  // Detection is a glance, so the alert comes in quickly, before visitors scroll on; --dwell fills each step's progress bar
  var dwell = [1500, 4500, 4500, 4500];
  var still = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var current = 0;
  var timer;
  var show = function (n) {
    current = n;
    feed.dataset.step = n + 1;
    chain.style.setProperty("--dwell", dwell[n] + "ms");
    buttons.forEach(function (b, k) {
      if (k === n) b.setAttribute("aria-current", "step");
      else b.removeAttribute("aria-current");
    });
  };
  var play = function () {
    clearTimeout(timer);
    if (!still && !("paused" in chain.dataset) && current < buttons.length - 1) {
      timer = setTimeout(function () { show(current + 1); play(); }, dwell[current]);
    }
  };
  buttons.forEach(function (b, k) {
    b.addEventListener("click", function () {
      chain.dataset.paused = "";
      clearTimeout(timer);
      show(k);
    });
  });
  new IntersectionObserver(function (entries) {
    if (entries[0].isIntersecting) play();
    else clearTimeout(timer);
  }).observe(feed);
}
