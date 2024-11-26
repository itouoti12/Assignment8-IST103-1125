let holdTaks = [];

// task object
// {
//     id:number,
//     description:String,
//     priority: "high" | "midium" | "low"
// }

function addTask() {
  const priority = document.getElementById("priority").value;
  const description = document.getElementById("description").value;
  const filterPriority = document.getElementById("priority-filter").value;

  if (!description || !priority) {
    alert("Description, priority are required");
    return;
  }

  const task = {
    id: holdTaks.length + 1,
    description,
    priority,
  };
  holdTaks.push(task);
  console.log(`Task Added: ${description} (${priority})`);
  displayAllTasks(filterPriority);
  return task;
}

function deleteTask(id) {
  const filterPriority = document.getElementById("priority-filter").value;

  const idList = holdTaks.map((task) => task.id);
  if (!idList.includes(id)) {
    console.log(`Task ${id} not found`);
    return;
  }
  holdTaks = holdTaks.filter((task) => task.id !== id);
  console.log(`Task with ID ${id} deleted.`);
  displayAllTasks(filterPriority);
}

function onChangeFilter() {
  const filterPriority = document.getElementById("priority-filter").value;
  displayAllTasks(filterPriority);
}

function displayAllTasks(priority) {
  let targetPriority = priority ? [priority] : ["high", "medium", "low"];

  console.clear();
  const todoArea = document.getElementById("todo-items");
  todoArea.innerHTML = "";
  holdTaks
    .filter((task) => targetPriority.includes(task.priority))
    .forEach((task) => {
      console.log(`ID: ${task.id}, Description: ${task.description}, Priority: ${task.priority}`);
      const card = createTodoCard(task);
      todoArea.appendChild(card);
    });
}

function createTodoCard(task) {
  const card = document.createElement("div");
  card.className = "todo-item";
  let cardInnerHTML =
    '<div style="font-weight: bold">' +
    task.id +
    `<span style="margin-left: 10px; font-size: small">Priority: ${task.priority}</span>` +
    "</div>" +
    `<p>${task.description}</p>` +
    `<button id="doneButton" onclick="deleteTask(${task.id})">Done</button>`;

  card.innerHTML = cardInnerHTML;
  return card;
}
