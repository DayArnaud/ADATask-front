let passwordInput = document.getElementById("password");
let toggleIcon = document.querySelector(".eye-icon");
let form = document.querySelector("form");
let emailInput = document.getElementById("email");

toggleIcon.addEventListener("click", () => {
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

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (emailInput.value && passwordInput.value) {
    window.location.href = "../TasksList/tasksList.html";
  } else {
    console.log("Por favor, preencha todos os campos.");
  }
});
