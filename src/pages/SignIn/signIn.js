document.addEventListener("DOMContentLoaded", () => {
  let passwordInput = document.getElementById("password");
  let confirmPasswordInput = document.getElementById("confirm-password");
  let toggleIcons = document.querySelectorAll(".eye-icon");

  const togglePasswordVisibility = (input, icon) => {
    if (input.type === "password") {
      input.type = "text";
      icon.classList.remove("fa-eye-slash");
      icon.classList.add("fa-eye");
    } else {
      input.type = "password";
      icon.classList.add("fa-eye-slash");
      icon.classList.remove("fa-eye");
    }
  };

  toggleIcons.forEach(function (icon) {
    icon.addEventListener("click", function () {
      let inputId = this.dataset.for;
      let input = document.getElementById(inputId);
      togglePasswordVisibility(input, this);
    });
  });

  let form = document.querySelector("form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (passwordInput.value === confirmPasswordInput.value) {
      alert("As senhas coincidem.");
      window.location.href = "../Login/login.html";
    } else {
      alert("As senhas não coincidem. Verifique e corrija antes de seguir.");
    }
  });
});
