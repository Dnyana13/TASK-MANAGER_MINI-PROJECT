
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];



if (window.location.pathname === '/index.html') {
    renderTasks();
} else if (window.location.pathname === '/add-task.html') {
    
    document.getElementById('taskForm').addEventListener('submit', handleFormSubmit);
}



function handleFormSubmit(event) {
    event.preventDefault();
    const taskInput = document.getElementById('taskInput');
    const dueDate = document.getElementById('dueDate');
    const taskText = taskInput.value.trim();

    if (taskText !== '') {
        const newTask = {
            text: taskText,
            completed: false,
            dueDate: dueDate.value
        };

        tasks.push(newTask);
        saveTasks();
        taskInput.value = '';
        dueDate.value = '';
        window.location.href = "index.html";  
    }
}


function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}





function renderTasks() {
    const taskContainer = document.getElementById('taskContainer');
    taskContainer.innerHTML = '';

    tasks.forEach((task, index) => {
        const taskCard = document.createElement('div');
        taskCard.classList.add('taskCard');
        let statusText = task.completed ? "Completed" : "Pending";

        const taskText = document.createElement('p');
        taskText.innerText = task.text;

        const taskDueDate = document.createElement('p');
        taskDueDate.classList.add('status');
        taskDueDate.innerText = `Due: ${task.dueDate}`;

        const toggleButton = document.createElement('button');
        toggleButton.classList.add("button-box", "green");
        toggleButton.innerHTML = task.completed ? 'Mark as Pending' : 'Mark as Completed';
        toggleButton.addEventListener('click', () => {
            task.completed = !task.completed;
            saveTasks();
            renderTasks();
        });

        const deleteButton = document.createElement('button');
        deleteButton.classList.add("button-box", "red");
        deleteButton.innerHTML = 'Delete';
        deleteButton.addEventListener('click', () => {
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
        });

        taskCard.appendChild(taskText);
        taskCard.appendChild(taskDueDate);
        taskCard.appendChild(toggleButton);
        taskCard.appendChild(deleteButton);
        taskContainer.appendChild(taskCard);
    });
}
