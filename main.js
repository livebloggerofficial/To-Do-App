const tasks = [];

const input = document.querySelector(".todo-container input[type='text']");
const addBtn = document.querySelector(".todo-container .add-btn");
const tasksList = document.querySelector(".todo-container .tasks-list");

const saveTasks = () => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

const createTasks = (taskTitle, completed) => {
  if (taskTitle.trim() === "") {
    return;
  }

  tasks.push({
    taskTitle,
    completed,
  });
};

const displayTasks = () => {
  if (tasks.length === 0) {
    tasksList.textContent = "No tasks to display.";
    return;
  }

  saveTasks();

  tasksList.innerHTML = "";
  tasks.forEach((t) => {
    const completeBtn = document.createElement("button");
    completeBtn.classList.add("complete-btn");
    completeBtn.innerHTML = `${
      !t.completed
        ? '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"> \
    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /> \
  </svg> \
  '
        : '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6"> \
  <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clip-rule="evenodd" /> \
</svg> \
'
    }`;
    completeBtn.addEventListener("click", () => {
      t.completed = !t.completed;
      displayTasks();
    });

    const title = document.createElement("div");
    title.classList.add("task-title");
    title.textContent = t.taskTitle;
    if (t.completed) {
      title.style.textDecoration = "line-through";
    }

    const removeBtn = document.createElement("button");
    removeBtn.classList.add("remove-btn");
    removeBtn.textContent = "+";
    removeBtn.addEventListener("click", () => {
      tasks.splice(tasks.indexOf(t), 1);
      displayTasks();
      saveTasks();
    });

    const task = document.createElement("div");
    task.classList.add("task");

    task.appendChild(completeBtn);
    task.appendChild(title);
    task.appendChild(removeBtn);

    tasksList.appendChild(task);
  });
};

addBtn.addEventListener("click", () => {
  let taskTitle = input.value;
  createTasks(taskTitle, false);
  displayTasks();
  input.value = "";
});

const loadTasks = () => {
  const loadedTasks = JSON.parse(localStorage.getItem("tasks"));
  if (loadedTasks) {
    tasks.push(...loadedTasks);
  }
};

input.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    let taskTitle = input.value;
    createTasks(taskTitle, false);
    displayTasks();
    input.value = "";
  }
});

loadTasks();
displayTasks();
