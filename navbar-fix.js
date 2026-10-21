/* Travel Tribe navbar scroll fix - version 3
   Fixes the "sometimes Travel / Vacations Ltd / links stay white
   after scrolling" glitch. Two things were removed on purpose:

   REMOVED 1: the cached element (var header = querySelector...)
   React's hydration can replace that <header> element with a fresh
   copy. The old script then kept adding "nav-scrolled" to a detached
   element nobody can see, so the real header stayed white.
   -> Now the header is looked up fresh on every single check.

   REMOVED 2: setInterval(update, 200)
   Polling meant that when React rewrote the header's class list
   (it does, for its own scroll background effect), our class stayed
   wiped for up to 200 ms -> visible lag / flicker while scrolling.
   -> Replaced by a MutationObserver that restores the class in the
      same instant React wipes it, plus a smooth requestAnimationFrame
      scroll listener instead of polling.

   A guard also makes a double <script> include harmless.
*/

(function () {
  if (window.__ttNavbarFix) return;
  window.__ttNavbarFix = true;

  var observer = null;

  function getHeader() {
    return document.querySelector("header");
  }

  /* Add or remove "nav-scrolled" so it matches the scroll position.
     Only touches the DOM when the state actually changes. */
  function apply() {
    var h = getHeader();
    if (!h) return;
    var scrolled = window.scrollY > 40;
    if (scrolled && !h.classList.contains("nav-scrolled")) {
      h.classList.add("nav-scrolled");
    } else if (!scrolled && h.classList.contains("nav-scrolled")) {
      h.classList.remove("nav-scrolled");
    }
  }

  /* --- scroll handling: smooth, no polling --- */
  var ticking = false;
  window.addEventListener(
    "scroll",
    function () {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(function () {
          ticking = false;
          apply();
        });
      }
    },
    { passive: true }
  );

  /* --- self-heal: watch the header's class attribute.
         If anything (React re-render) strips "nav-scrolled" while
         the page is scrolled, put it back immediately. --- */
  function watchHeader() {
    var h = getHeader();
    if (!h) return;
    if (observer) observer.disconnect();
    observer = new MutationObserver(apply);
    observer.observe(h, { attributes: true, attributeFilter: ["class"] });
    apply();
  }

  watchHeader();

  /* Safety nets for late hydration / replaced headers */
  window.addEventListener("load", apply);
  setTimeout(watchHeader, 300);
  setTimeout(watchHeader, 1500);
  setTimeout(watchHeader, 4000);

  apply();
})();
