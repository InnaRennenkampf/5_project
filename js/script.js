// console.log('Debbuger'); //проверка

const form = document.querySelector('#form');
const taskInput = document.querySelector('#taskInput');
const tasksList = document.querySelector('#tasksList');
const emptyList = document.querySelector('#emptyList');

let tasks = []; //массив для задач

if (localStorage.getItem('tasks')) {
    tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks.forEach(function (task) {
        renderTask(task)
    })
}

checkEmptyList()

form.addEventListener('submit', addTask);
tasksList.addEventListener('click', deleteTask);
tasksList.addEventListener('click', doneTask);

function addTask(event) {
    event.preventDefault();

    const taskText = taskInput.value;
    // console.log(taskText); //проверка

    const newTask = {
        id: Date.now(),
        text: taskText,
        done: false
    }

    tasks.push(newTask);

    saveToLocalStorage();

    // console.log(tasks); //проверка

    renderTask(newTask);

    taskInput.value = '';
    taskInput.focus();

    checkEmptyList()
}

function deleteTask(event) {
    if (event.target.dataset.action !== 'delete') return;

    const parentNode = event.target.closest('.list-group-item');

    const id = Number(parentNode.id);

    tasks = tasks.filter(function (task) {
        return task.id !== id;
    })

    saveToLocalStorage();

    parentNode.remove();

    checkEmptyList()
}

function doneTask(event) {
    if (event.target.dataset.action !== 'done') return
    const parentNode = event.target.closest('.list-group-item');

    const id = Number(parentNode.id);

    const task = tasks.find(function (task) {
        if (task.id === id) {
            return true
        }
    })

    // console.log(task); //проверка

    task.done = !task.done;

    saveToLocalStorage();

    const taskTitle = parentNode.querySelector('.task-title');

    // console.log(taskTitle); //проверка

    taskTitle.classList.toggle('task-title--done');
}

function checkEmptyList() {
    if (tasks.length === 0) {
        const emptyLisHTML = `<li id="emptyList" class="list-group-item empty-list d-flex justify-content-center">
        <!-- <img src="./img/leaf.svg" alt="Empty" width="48" class="mt-3"> -->
        <div class="empty-list__title">Список дел пуст</div>
    </li>`;
        tasksList.insertAdjacentHTML('afterbegin', emptyLisHTML);
    }

    if (tasks.length > 0) {
        const emptyList = document.querySelector('#emptyList');
        emptyList ? emptyList.remove() : null;
    }
}

function saveToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTask(task) {
    const cssClass = task.done ? 'task-title task-title--done' : 'task-title';

    const taskHTML = `<li id="${task.id}" class="list-group-item d-flex justify-content-between task-item">
    <span class="${cssClass}">${task.text}</span>
    <div class="task-item__buttons d-flex">
        <button type="button" data-action="done" class="btn-action">
            <img src="img/check-lg.svg" alt="Done" width="18" height="18">
        </button>
        <button type="button" data-action="delete" class="btn-action">
            <img src="img/x-lg.svg" alt="Done" width="18" height="18">
        </button>
    </div>
</li>`

    // console.log(taskHTML); //проверка

    tasksList.insertAdjacentHTML('beforeend', taskHTML);
}