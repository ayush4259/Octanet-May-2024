document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
});

function addTask(listNumber) {
    const taskInput = document.getElementById(`new-task-${listNumber}`);
    const taskList = document.getElementById(`task-list-${listNumber}`);

    if (taskInput.value.trim() === '') {
        alert('Please enter a task.');
        return;
    }

    const taskItem = document.createElement('li');
    taskItem.textContent = taskInput.value;

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.onclick = () => {
        taskList.removeChild(taskItem);
        saveTasks();
    };

    taskItem.appendChild(removeButton);
    taskList.appendChild(taskItem);

    taskInput.value = '';

    saveTasks();
}

function saveTasks() {
    const checklists = {};
    for (let i = 1; i <= 10; i++) {
        const taskList = document.getElementById(`task-list-${i}`);
        const tasks = [];

        taskList.childNodes.forEach(taskItem => {
            tasks.push(taskItem.textContent.replace('Remove', '').trim());
        });

        checklists[`list${i}`] = tasks;
    }

    localStorage.setItem('checklists', JSON.stringify(checklists));
}

function loadTasks() {
    const checklists = JSON.parse(localStorage.getItem('checklists')) || {};

    for (let i = 1; i <= 10; i++) {
        const tasks = checklists[`list${i}`] || [];
        const taskList = document.getElementById(`task-list-${i
