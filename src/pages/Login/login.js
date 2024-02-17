let passwordInput = document.getElementById("password");
let toggleIcon = document.querySelector(".eye-icon");

toggleIcon.addEventListener("click", function () {
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    toggleIcon.classList.remove("fa-eye-slash");
    toggleIcon.classList.add("fa-eye");
  } else {
    passwordInput.type = "password";
    toggleIcon.classList.add("fa-eye-slash");
    toggleIcon.classList.remove("fa-eye");
  }
});
