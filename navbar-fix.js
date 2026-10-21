/* Travel Tribe navbar scroll fix - version 2
   Adds the class "nav-scrolled" to <header> once you scroll
   past 40 pixels, and removes it when you go back to the top.
   It now checks the scroll position every 200 milliseconds,
   so it cannot miss, and it prints messages in the browser
   console so you can see that it is running. */

(function () {
  var header = document.querySelector("header");

  if (!header) {
    console.warn("Travel Tribe navbar fix: no <header> found on this page.");
    return;
  }

  console.log("Travel Tribe navbar fix: running on this page.");

  function update() {
    if (window.scrollY > 40) {
      header.classList.add("nav-scrolled");
    } else {
      header.classList.remove("nav-scrolled");
    }
  }

  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("load", update);
  setInterval(update, 200);
  update();
})();
