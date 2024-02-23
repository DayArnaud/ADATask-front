document.getElementById("footer-icon").addEventListener("click", (e) => {
  e.preventDefault();
  let pageWrapper = document.getElementById("page-wrapper");
  pageWrapper.classList.add("footer-animating");

  setTimeout(() => {
    window.location.href = e.target.closest("a").href;
  }, 300);
});
