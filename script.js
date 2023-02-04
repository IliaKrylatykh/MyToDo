'use strict';

const activeDB = ['todo1', 'todo2', 'todo3', 'todo4'],
      doneDB = ['done1', 'done2'];

const addTodoForm = document.querySelector('.form__todo'),
      addTodoInput = document.querySelector('.new__todo_input'),
      listActive = document.querySelector('.list__active'),
      listDone = document.querySelector('.list__done'),
      filterInput = document.getElementById('filterInput');


renderListActive(activeDB, listActive);
renderListDone(doneDB, listDone);

addTodoForm.addEventListener('submit', event => {
  event.preventDefault();
  let newTodo = addTodoInput.value;
  activeDB.push(newTodo);
  addTodoInput.value = '';
  renderListActive(activeDB, listActive);
});

function renderListActive(array, list) {
  list.innerHTML = '';

  array.forEach((todo, i) => {
    list.innerHTML += `
    <li id="change" class='todo__element_active'>

        <input onblur="changeText(${i}, this)" class="change__input" value="${todo}">
        
        <input onclick="doneTodo(${i})" type='checkbox'>
        <button onclick="deleteTodo(${i})" class="todo__element_delete">delete</button>
        <button onclick="moveUp(${i})" class="todo__element_up">up</button>
        <button onclick="moveDown(${i})" class="todo__element_down">down</button>
      
    </li>
    `;
  });
}

let changeInput = document.querySelectorAll('.change__input');

function renderListDone(array, list) {
  list.innerHTML = '';
  array.forEach((todo, i) => {
    list.innerHTML += `
    <li class='todo__element_done'>
    <div class="todo__text">${todo}
    </div>
    <input type='checkbox' checked>
    </li>
    `;
  });
}

filterInput.addEventListener('input', event => {
  const array = [];
  activeDB.forEach((item, i) => {
    if (!item.includes(event.target.value)) {
      array.push(i);
    }
  });
  Array.from(listActive.children).forEach((item, i) => {
    if (array.includes(i)) {
      item.classList.add('hide');
    } else {
      item.classList.remove('hide');
    }
  });
});

function changeText(key, input) {
  activeDB[key] = input.value;
}

function deleteTodo(key) {
  activeDB.splice(key, 1);
  renderListActive(activeDB, listActive);
}

function moveUp(key) {
  if (key > 0) {
    let buffer = activeDB[key - 1];
    activeDB[key - 1] = activeDB[key];
    activeDB[key] = buffer;
    renderListActive(activeDB, listActive);
  }
}

function moveDown(key) {
  if (key < activeDB.length - 1) {
    let buffer = activeDB[key + 1];
    activeDB[key + 1] = activeDB[key];
    activeDB[key] = buffer;
    renderListActive(activeDB, listActive);
  }
}

function doneTodo(key) {
  doneDB.push(activeDB[key]);
  activeDB.splice(key, 1);

  console.log(activeDB);
  console.log(doneDB);

  renderListActive(activeDB, listActive);
  renderListDone(doneDB, listDone);
}
