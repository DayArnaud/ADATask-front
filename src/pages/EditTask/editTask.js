document.addEventListener("DOMContentLoaded", () => {
  const titleInput = document.getElementById("title");
  const descriptionInput = document.getElementById("description");
  const dateInput = document.getElementById("due-date");
  const categorySelect = document.getElementById("dropdown");
  const subtaskInput = document.getElementById("subtask");
  const form = document.querySelector("form");
  const taskToEdit = JSON.parse(localStorage.getItem("taskToEdit"));

  if (taskToEdit) {
    titleInput.value = taskToEdit.title;
    descriptionInput.value = taskToEdit.description || "";
    dateInput.value = taskToEdit.date;
    categorySelect.value = taskToEdit.category || "";

    taskToEdit.subtasks.forEach((subtask) => {
      const subtaskItem = createSubtaskElement(subtask.text, subtask.completed);
      if (subtask.completed) {
        subtaskItem.querySelector("label").style.textDecoration =
          "line-through";
      }
      form.insertBefore(subtaskItem, subtaskInput.parentNode);
    });
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const updatedTaskData = {
      title: titleInput.value,
      description: descriptionInput.value,
      date: dateInput.value,
      category: categorySelect.options[categorySelect.selectedIndex].text,
      subtasks: [],
    };

    document.querySelectorAll(".subtask-item").forEach((subtaskElement) => {
      const text = subtaskElement.querySelector("label").textContent;
      const completed = subtaskElement.querySelector(
        "input[type='checkbox']"
      ).checked;
      updatedTaskData.subtasks.push({ text, completed });
    });

    localStorage.setItem("currentTask", JSON.stringify(updatedTaskData));
    window.location.href = "../ViewTask/viewTask.html";
  });

  subtaskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter")
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
  });
});

const createSubtaskElement = (text, completed) => {
  const subtaskItem = document.createElement("div");
  subtaskItem.classList.add("subtask-item");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.classList.add("subtask-checkbox");
  checkbox.checked = completed;
  checkbox.id = "checkbox-" + Date.now();

  const label = document.createElement("label");
  label.textContent = text;
  label.htmlFor = checkbox.id;
  label.classList.add("subtask-label");

  subtaskItem.appendChild(checkbox);
  subtaskItem.appendChild(label);

  return subtaskItem;
};
