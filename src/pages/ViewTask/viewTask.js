document.addEventListener("DOMContentLoaded", (e) => {
  const taskData = JSON.parse(localStorage.getItem("currentTask"));
  const taskContainer = document.getElementById("task-container");
  const editButton = document.querySelector(".edit-btn");

  if (taskData) {
    const titleElement = document.createElement("h1");
    titleElement.textContent = taskData.title;
    taskContainer.appendChild(titleElement);

    const descriptionElement = document.createElement("h2");
    descriptionElement.textContent = taskData.description;
    taskContainer.appendChild(descriptionElement);

    const dateElement = document.createElement("h2");
    dateElement.textContent = taskData.date;
    dateElement.classList.add("date");
    taskContainer.appendChild(dateElement);

    const categoryElement = document.createElement("h2");
    categoryElement.textContent = taskData.category;
    taskContainer.appendChild(categoryElement);

    const subtaskListElement = document.createElement("div");
    taskData.subtasks.forEach((subtask, index) => {
      const subtaskItem = document.createElement("div");
      subtaskItem.classList.add("subtask-item");

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.classList.add("subtask-checkbox");
      checkbox.checked = subtask.completed;
      checkbox.id = "checkbox-" + index;

      const label = document.createElement("label");
      label.textContent = subtask.text;
      label.htmlFor = checkbox.id;
      label.classList.add("subtask-label");
      if (subtask.completed) {
        label.style.textDecoration = "line-through";
      }

      checkbox.addEventListener("change", () => {
        if (checkbox.checked) {
          label.style.textDecoration = "line-through";
        } else {
          label.style.textDecoration = "none";
        }
        subtask.completed = checkbox.checked;
        localStorage.setItem("currentTask", JSON.stringify(taskData));
      });

      subtaskItem.appendChild(checkbox);
      subtaskItem.appendChild(label);
      subtaskListElement.appendChild(subtaskItem);
    });
    taskContainer.appendChild(subtaskListElement);
  }

  editButton.addEventListener("click", () => {
    localStorage.setItem("taskToEdit", localStorage.getItem("currentTask"));
    window.location.href = "../EditTask/editTask.html";
  });
});
