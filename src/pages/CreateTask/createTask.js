document.addEventListener("DOMContentLoaded", (e) => {
  const form = document.querySelector("form");
  const titleInput = document.getElementById("title");
  const descriptionInput = document.getElementById("description");
  const dateInput = document.getElementById("due-date");
  const categorySelect = document.getElementById("dropdown");
  const subtaskInput = document.getElementById("subtask");
  const saveButton = document.querySelector(".add-btn");

  subtaskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();

      if (e.target.value.trim() !== "") {
        const subtaskItem = document.createElement("div");
        subtaskItem.classList.add("subtask-item");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.classList.add("subtask-checkbox");

        const label = document.createElement("label");
        label.textContent = e.target.value;
        label.classList.add("subtask-label");

        checkbox.id = "checkbox-" + Date.now();
        label.htmlFor = checkbox.id;

        subtaskItem.appendChild(checkbox);
        subtaskItem.appendChild(label);

        form.insertBefore(subtaskItem, subtaskInput.parentNode);

        e.target.value = "";
      } else {
        alert("Por favor, insira um título para a subtarefa.");
      }
    }
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (titleInput.value && dateInput.value && categorySelect.value) {
      const newTaskData = {
        id: "checkbox" + Date.now(),
        title: titleInput.value,
        description: descriptionInput.value,
        date: dateInput.value,
        category: categorySelect.options[categorySelect.selectedIndex].text,
        subtasks: [],
        completed: false,
      };

      document.querySelectorAll(".subtask-item").forEach((subtaskElement) => {
        const subtaskText = subtaskElement.querySelector("label").textContent;
        const isCompleted = subtaskElement.querySelector(
          "input[type='checkbox']"
        ).checked;
        newTaskData.subtasks.push({
          text: subtaskText,
          completed: isCompleted,
        });
      });

      const tasksList = JSON.parse(localStorage.getItem("tasksList")) || [];
      tasksList.push(newTaskData);
      localStorage.setItem("tasksList", JSON.stringify(tasksList));

      window.location.href = "../TasksList/tasksList.html";
    } else {
      console.log(
        "Por favor, preencha ao menos o título, a data e a categoria."
      );
    }
  });

  saveButton.addEventListener("click", () => {
    const updatedTaskData = {
      title: titleInput.value,
      description: descriptionInput.value,
      date: dateInput.value,
      category: categorySelect.value,
      subtasks: [],
    };

    localStorage.setItem("currentTask", JSON.stringify(updatedTaskData));
    window.location.href = "../TasksList/tasksList.html";
  });
});
