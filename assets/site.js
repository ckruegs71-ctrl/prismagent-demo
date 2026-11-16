/* PrismAgent Solutions: shared page behaviour (menu, bar, booking, Aria). */
(function () {
  var root = document.documentElement;
  root.classList.remove("no-js");

  // mobile menu sheet
  var sheet = document.getElementById("sheet"), openBtn = document.getElementById("menuOpen"), closeBtn = document.getElementById("menuClose");
  function setSheet(on) {
    if (!sheet) return;
    sheet.classList.toggle("is-open", on);
    if (openBtn) openBtn.setAttribute("aria-expanded", on ? "true" : "false");
    document.body.style.overflow = on ? "hidden" : "";
    if (on && closeBtn) closeBtn.focus(); else if (openBtn) openBtn.focus({ preventScroll: true });
  }
  if (openBtn) openBtn.addEventListener("click", function () { setSheet(true); });
  if (closeBtn) closeBtn.addEventListener("click", function () { setSheet(false); });
  if (sheet) {
    sheet.addEventListener("click", function (e) { if (e.target.closest("a")) setSheet(false); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && sheet.classList.contains("is-open")) setSheet(false); });
  }

  // the bar turns solid once the hero is behind you (pages with a full-bleed hero only)
  var bar = document.getElementById("bar");
  if (bar && !bar.classList.contains("is-page")) {
    var f = function () { bar.classList.toggle("is-solid", window.scrollY > innerHeight * 0.6); };
    addEventListener("scroll", f, { passive: true }); f();
  }
})();

/* booking link + Aria (GoHighLevel widget) */
var BOOKING = "https://api.leadconnectorhq.com/widget/booking/w3Rrw2m6EQeMJAcexF9i";
function openAria() {
  var api = window.leadConnector && window.leadConnector.chatWidget;
  if (api && typeof api.openWidget === "function") { api.openWidget(); return; }
  var done = false;
  function later() { var a = window.leadConnector && window.leadConnector.chatWidget;
    if (!done && a && typeof a.openWidget === "function") { done = true; a.openWidget(); } }
  window.addEventListener("LC_chatWidgetLoaded", later, { once: true });
  setTimeout(function () { later(); if (!done) { done = true; window.location.href = "tel:+16124059802"; } }, 4000);
}
document.querySelectorAll("[data-aria]").forEach(function (b) { b.addEventListener("click", function (e) { e.preventDefault(); openAria(); }); });
document.querySelectorAll("[data-book]").forEach(function (a) { a.href = BOOKING; a.target = "_blank"; a.rel = "noopener"; });
