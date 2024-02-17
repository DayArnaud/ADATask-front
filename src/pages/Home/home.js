document.getElementById("footer-icon").addEventListener("click", function (e) {
  e.preventDefault();
  let pageWrapper = document.getElementById("page-wrapper");
  pageWrapper.classList.add("footer-animating");

  setTimeout(function () {
    window.location.href = e.target.closest("a").href;
  }, 500);
});
