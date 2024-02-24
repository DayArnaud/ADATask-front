document.addEventListener("DOMContentLoaded", () => {
  const tasksTodo = document.getElementById("tasks-todo");
  const tasksCompleted = document.getElementById("tasks-completed");
  const deleteModal = document.getElementById("delete-modal");
  const deleteConfirm = document.getElementById("delete-confirm");
  const deleteCancel = document.getElementById("delete-cancel");
  let currentTaskToDelete = null;

  const tasksList = JSON.parse(localStorage.getItem("tasksList")) || [];

  const showModal = () => {
    document.getElementById("modal-background").style.display = "block";
    document.getElementById("delete-modal").style.display = "block";
  };

  const hideModal = () => {
    document.getElementById("modal-background").style.display = "none";
    document.getElementById("delete-modal").style.display = "none";
  };

  const deleteTask = () => {
    if (currentTaskToDelete !== null) {
      const updatedTasksList = tasksList.filter(
        (task) => task.id !== currentTaskToDelete
      );
      localStorage.setItem("tasksList", JSON.stringify(updatedTasksList));
      window.location.reload();
    }
  };

  tasksList.forEach((task) => {
    const taskCard = document.createElement("div");
    taskCard.classList.add("task-card");
    taskCard.style.backgroundColor = task.isCompleted
      ? "var(--grey-background)"
      : getBackgroundColor(task.category);

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.isCompleted;

    const aboutTask = document.createElement("div");
    aboutTask.classList.add("about-task");
    aboutTask.innerHTML = `<h3>${task.title}</h3><h4>${task.description || ""}</h4>`;

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.setAttribute("data-task-id", task.id);
    deleteBtn.innerHTML = '<i class="fas fa-trash trash-icon"></i>';

    taskCard.appendChild(checkbox);
    taskCard.appendChild(aboutTask);
    taskCard.appendChild(deleteBtn);

    checkbox.addEventListener("change", () => {
      task.isCompleted = checkbox.checked;
      localStorage.setItem("tasksList", JSON.stringify(tasksList));
      taskCard.style.backgroundColor = task.isCompleted
        ? "var(--grey-background)"
        : getBackgroundColor(task.category);
      taskCard.remove();

      if (task.isCompleted) {
        tasksCompleted.appendChild(taskCard);
      } else {
        tasksTodo.appendChild(taskCard);
      }
    });

    aboutTask.addEventListener("click", () => {
      localStorage.setItem("currentTask", JSON.stringify(task));
      window.location.href = "../ViewTask/viewTask.html";
    });

    deleteBtn.addEventListener("click", () => {
      currentTaskToDelete = task.id;
      showModal();
    });

    if (task.isCompleted) {
      tasksCompleted.appendChild(taskCard);
    } else {
      tasksTodo.appendChild(taskCard);
    }
  });

  deleteConfirm.addEventListener("click", () => {
    deleteTask();
    hideModal();
  });

  deleteCancel.addEventListener("click", hideModal);
});

const getBackgroundColor = (category) => {
  switch (category) {
    case "Trabalho":
      return "var(--salmon-category)";
    case "Estudos":
      return "var(--clear-blue)";
    case "Lazer":
      return "var(--yellow-category)";
    default:
      return "var(--grey-text)";
  }
};
