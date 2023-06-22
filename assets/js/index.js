const input = document.querySelector("input[type='text']");
const add_todo = document.querySelector(".add");
const clear = document.querySelector("button");
const todo = document.querySelector(".todo");
const ul = document.querySelector("ul");

let todos = localStorage.getItem("todos")
  ? JSON.parse(localStorage.getItem("todos"))
  : [];
if (todos && todos.length > 0) {
  todos.forEach(function (todoText) {
    var todoItem = document.createElement("li");
    var todoTextElement = document.createElement("p");
    todoTextElement.innerText = todoText;
    var editButton = document.createElement("i");
    editButton.classList.add("fa-regular", "fa-pen-to-square", "edit");
    var deleteButton = document.createElement("i");
    deleteButton.classList.add("fa-solid", "fa-trash", "delete");
    todoItem.appendChild(todoTextElement);
    todoItem.appendChild(editButton);
    todoItem.appendChild(deleteButton);
    ul.appendChild(todoItem);
  });
}

add_todo.addEventListener("click", () => {
  if (input.value.trim() == "") {
    alert("Please enter todo");
  } else {
    let li = document.createElement("li");
    li.innerHTML = `<p>${input.value}</p>
        <i class="fa-regular fa-pen-to-square edit"></i>
        <i class="fa-solid fa-trash delete"></i>`;
    ul.appendChild(li);
    let value = input.value;
    todos.push(value);
    localStorage.setItem("todos", JSON.stringify(todos));
    input.value = "";
  }
});

todo.addEventListener("click", function (event) {
  let selectedTodo = event.target.parentNode.querySelector("p");
  let selectedTodoText = selectedTodo.innerText;
  var todoIndex = todos.indexOf(selectedTodoText);
  if (event.target.classList.contains("delete")) {
    if (todoIndex > -1) {
      todos.splice(todoIndex, 1);
      localStorage.setItem("todos", JSON.stringify(todos));
    }
    event.target.parentNode.remove();
  } else if (event.target.classList.contains("edit")) {
    let editInput = event.target.parentNode.querySelector("input");
    if (editInput) {
      return;
    }
    editInput = document.createElement("input");
    editInput.placeholder = "You can edit todo";
    editInput.classList.add("editInput");
    event.target.parentNode.appendChild(editInput);
    editInput.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        event.target.parentNode.querySelector("p").textContent =
          editInput.value;
        if (todoIndex > -1) {
          todos[todoIndex] =
            event.target.parentNode.querySelector("p").textContent;
          localStorage.setItem("todos", JSON.stringify(todos));
        }
        editInput.remove();
      }
    });
  }
});

clear.addEventListener("click", () => {
  ul.innerHTML = "";
  localStorage.setItem("todos", []);
});
