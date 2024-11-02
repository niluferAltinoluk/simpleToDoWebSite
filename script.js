const textInputDOM = document.getElementById("todo-input");
const btnAddTodoDOM = document.getElementById("add-todo");
const todosDOM = document.querySelector("#todos");
const btnClearDOM = document.querySelector("#clear");
//We select HTML elements from the DOM and assign them to variables for later use. We use id for choosing.

class Storage {
  static addTodoStorage(todoArr) {
    let storage = localStorage.setItem("todo", JSON.stringify(todoArr));
    return storage;
  }
//We get the value stored under the "todo" key in the local storage. If there is no data stored under this key, we return null
//We convert the JSON string back into a JavaScript object. with getitem "todo" if its not null.
//Simply we got the class Storage , we are taking storage in this part.
  static getStorage() {
    let storage =
      localStorage.getItem("todo") === null
        ? []
        : JSON.parse(localStorage.getItem("todo"));
    return storage;
  }
}

let todoArr = Storage.getStorage();

//We describe our function for btn
//We described with addEventListener("click"),
//we give id and when we click the other todos are gonna stay too
//We increased the todoArr we defined before by one.
//we create new todo object
//we add list and We reversed the order of the items in TodoArr. 
//This means that newly added to-dos will now be at the top of the array.
//We used UI.alert to show a simple message box to the user.
//We cleaned our area and made it ready for the user to use again after these operations.
//We add for storage

btnAddTodoDOM.addEventListener("click", function (e) {
  e.preventDefault();
  let id = todoArr.length + 1;
  let title = textInputDOM.value;
  const todo = new Todo(id, title);
  todoArr.push(todo);
  todoArr.reverse();
  UI.alert("It's add!");
  UI.clearInput();
  UI.displayTodos();
  // add to localStorage
  Storage.addTodoStorage(todoArr);
});

//we describe Todo

class Todo {
  constructor(id, title) {
    this.id = id;
    this.title = title;
  }
}

class UI {
  static displayTodos() {
    let result = "";
    //We create space to store the HTML code of the to-do list.
    //If nothing is written in this field yet, it says add something.
    //else situation, we increase the result. 
    //We also add what we will get from our storage here.

    if (todoArr.length === 0) {
      todosDOM.innerHTML = "Add something!";
    } else {
      todoArr.forEach((item) => {
        result += `
        <li
          class="flex justify-between border border-2 px-4 py-3 flex items-center justify-between font-bold"
        >
          <span>${item.title}</span>
          <button class="text-red-400 remove" data-id="${item.id}">delete</button>
        </li>
            `;
      });

      todosDOM.innerHTML = result;
      //We ensure that the new todo list is displayed on the screen with new items added.
    }
  }

  static clearInput() {
    textInputDOM.value = "";
  }
//When we press the delete button, we cause it to be deleted.
  static removeTodo() {
    todosDOM.addEventListener("click", function (e) {
      if (e.target.classList.contains("remove")) {
        e.target.parentElement.remove();
        let btnId = e.target.dataset.id;
        UI.removeArrayTodo(btnId);
      }
    });
  }

  static removeArrayTodo(id) {
    todoArr = todoArr.filter((item) => item.id !== +id);
    Storage.addTodoStorage(todoArr);
    UI.displayTodos();
    UI.alert("Todo Deleted!");
  }
  //we remove item by id so UI will alert and we effect our UI

  static clearTodos() {
    btnClearDOM.addEventListener("click", function () {
      todoArr = [];
      Storage.addTodoStorage(todoArr);
      UI.displayTodos();
      UI.alert("List Deleted!");
    });
  }

  static alert(text) {
    window.alert(text);
  }
}

//We prevent in-page confusion and achieve a more dynamic layout.
window.addEventListener("DOMContentLoaded", function () {
  UI.removeTodo();
  UI.displayTodos();
  UI.clearTodos();
});

