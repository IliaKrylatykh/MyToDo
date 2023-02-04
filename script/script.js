"use strict";

let todoDB = ['todo1', 'todo2', 'todo3', 'todo4'];
let todoDone = ['todo999', 'todo888'];

const addTodoInput = document.querySelector('.addTodo__input'),
      addTodoForm = document.querySelector('.addTodo__form'),
      todosListElement = document.querySelector('.todos__list'),
      todosDoneElement = document.querySelector('.todos__done'),
      filter = document.querySelector('.filter__form');

createTodosList(todoDB, todosListElement);
createTodosDone(todoDone, todosDoneElement);

addTodoForm.addEventListener('submit', event => {
  event.preventDefault();
  let addNewTodo = addTodoInput.value;
  todoDB.push(addNewTodo);
  addTodoInput.value = '';
  createTodosList(todoDB, todosListElement);
});

filter.addEventListener('submit', event => {
  event.preventDefault();
  let filterValue = filter;
  
});

function createTodosList(todos, element) {
  element.innerHTML = '';
  todos.forEach((todo, i) => {
    element.innerHTML += `
    <li class='todo__element'>
    <div onclick="changeTodo(${i})" class="todo__text">${i+1}) ${todo}
    </div>
    <input onclick="doneTodo(${i})" type='checkbox'>
    <button onclick="deleteTodo(${i})" class="todo__element_delete">delete</button>
    <button onclick="moveUp(${i})" class="todo__element_up">up</button>
    <button onclick="moveDown(${i})" class="todo__element_down">down</button>
    </li>
    `;
  });
}

function createTodosDone(todos, element) {
  element.innerHTML = '';
  todos.forEach((todo, i) => {
    element.innerHTML += `
    <li class='todo__element_done'>
    <div class="todo__text_done">${i+1}) ${todo}
    </div>
    </li>
    `;
  });
}

function deleteTodo(key) {
  todoDB.splice(key, 1);
  createTodosList(todoDB, todosListElement);
}

function moveUp(key) {
  if (key > 0) {
    let buffer = todoDB[key - 1];
    todoDB[key - 1] = todoDB[key];
    todoDB[key] = buffer;
    createTodosList(todoDB, todosListElement);
  }
}

function moveDown(key) {
  if (key < todoDB.length - 1) {
    let buffer = todoDB[key + 1];
    todoDB[key + 1] = todoDB[key];
    todoDB[key] = buffer;
    createTodosList(todoDB, todosListElement);
  }
}

function changeTodo(key) {
  let buffer = todoDB[key];
  let newTodoValue = prompt('новое значение?', buffer);
  todoDB[key] = newTodoValue;
  createTodosList(todoDB, todosListElement);
}

function doneTodo(key) {
  todoDone.push(todoDB[key]);
  todoDB.splice(key, 1);

  createTodosList(todoDB, todosListElement);
  createTodosDone(todoDone, todosDoneElement);
}

