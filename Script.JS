let draggedTask = null;

document.querySelectorAll(".task-list").forEach(list => {
  list.addEventListener("dragover", e => e.preventDefault());
  list.addEventListener("drop", dropTask);
});

function addTask(status) {
  const text = prompt("Enter task");
  if (!text) return;

  const task = createTask(text);
  document.getElementById(status).appendChild(task);
  saveBoard();
}

function createTask(text) {
  const div = document.createElement("div");
  div.className = "task";
  div.draggable = true;

  div.innerHTML = `
    <span>${text}</span>
    <button onclick="removeTask(this)">x</button>
  `;

  div.addEventListener("dragstart", () => draggedTask = div);
  div.addEventListener("dragend", () => draggedTask = null);

  return div;
}

function dropTask(e) {
  if (draggedTask) {
    e.target.appendChild(draggedTask);
    saveBoard();
  }
}

function removeTask(btn) {
  btn.parentElement.remove();
  saveBoard();
}

/* LOCAL STORAGE */
function saveBoard() {
  const data = {};
  ["todo", "doing", "done"].forEach(id => {
    data[id] = [...document.getElementById(id).children].map(
      task => task.innerText.replace("x", "")
    );
  });
  localStorage.setItem("kanbanBoard", JSON.stringify(data));
}

function loadBoard() {
  const data = JSON.parse(localStorage.getItem("kanbanBoard"));
  if (!data) return;

  Object.keys(data).forEach(id => {
    data[id].forEach(text => {
      document.getElementById(id).appendChild(createTask(text));
    });
  });
}

loadBoard();