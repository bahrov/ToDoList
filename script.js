const toDo = document.querySelector(".to-do");
const done = document.querySelector(".done");
const remove = document.querySelector(".remove");
const add = document.querySelector(".add");
const contentEl = document.querySelectorAll(".content");

/*------------------------------------*/
//  Tasks array
/*------------------------------------*/

let tasks = [
  {
    id: 123,
    done: false,
    content: "Написати перше завдання",
  },
];

/*------------------------------------*/
// REUSABLE FUNCTIONS
/*------------------------------------*/

// Makes random numbers
const random = function () {
  return Math.trunc(Math.random() * 1000);
};

// refreshes the field
function refresh() {
  toDo.innerHTML = "";
  render();
}

// Button maker
const makeBtn = function (btnName, iconClass, id) {
  const btn = document.createElement("button");
  btn.classList.add(btnName);
  const btnI = document.createElement("i");
  btnI.classList.add(...iconClass);
  btn.appendChild(btnI);
  return btn;
};

// makes all tasks visible
const render = function () {
  tasks.forEach((task) => {
    // creating new task elements
    const taskEl = document.createElement("div");
    taskEl.className = "task";
    if (task.done) taskEl.classList.add("complited");
    taskEl.id = task.id;

    // create buttons
    const doneBtn = makeBtn("done", ["fas", "fa-check-circle", "btn"]);
    doneBtn.id = task.id;
    doneBtn.addEventListener("click", function (event) {
      doneOnClick(event);
    });
    const removeBtn = makeBtn("remove", ["fas", "fa-times-circle", "btn"]);
    removeBtn.id = task.id;
    removeBtn.addEventListener("click", function (event) {
      removeOnClick(event);
    });

    // creating task content
    const content = document.createElement("div");
    content.innerHTML = task.content;
    content.className = "content";
    content.id = task.id;
    content.addEventListener("click", function (event) {
      onTaskClick(event);
    });

    // collecting all elements and putting them to the parent element
    taskEl.appendChild(doneBtn);
    taskEl.appendChild(content);
    taskEl.appendChild(removeBtn);
    toDo.appendChild(taskEl);
  });
};

render();

/*------------------------------------*/
// BUTTON CONTROLLERS
/*------------------------------------*/

// Edit the task content
function onTaskClick(event) {
  const taskEl = event.target;
  const taskId = +event.target.id;
  let input = document.createElement("input");
  input.classList.add("task-input");
  input.id = taskId;
  taskEl.replaceWith(input);
  input = document.querySelector(".task-input");
  for (let index = 0; index <= tasks.length - 1; index++) {
    if (tasks[index].id === taskId) {
      input.value = tasks[index].content;
    }
  }
  input.focus();
  input.addEventListener("blur", function (event) {
    submitEvent(event);
  });
}

// Markes task as done
function doneOnClick(event) {
  const taskId = +event.target.parentElement.id;
  for (let index = 0; index <= tasks.length - 1; index++) {
    if (tasks[index].id == taskId) {
      tasks[index].done = !tasks[index].done;
    }
  }
  refresh();
}

// deletes the task
function removeOnClick(event) {
  const taskId = +event.target.parentElement.id;
  for (let index = 0; index <= tasks.length - 1; index++) {
    if (tasks[index].id == taskId) tasks.splice(index, 1);
  }
  refresh();
}

// adding element to the task array
add.addEventListener("click", function () {
  tasks.push({ id: random(), done: false, content: "" });
  refresh();
});

// add edited task
const submitEvent = function (event) {
  // recieve data from input
  const input = event.target;
  const inputId = +event.target.id;
  const inputValue = input.value;

  // put the input values to the tasks array
  for (let index = 0; index <= tasks.length - 1; index++) {
    if (tasks[index].id === inputId) {
      tasks[index].content = inputValue;
    }
  }
  // creating div
  const divEl = document.createElement("div");
  divEl.classList.add("content");
  divEl.id = inputId;
  divEl.innerHTML = inputValue;
  divEl.addEventListener("click", function (event) {
    onTaskClick(event);
  });
  input.replaceWith(divEl);
};
