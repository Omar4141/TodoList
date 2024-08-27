// Get elements
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

// Handle form submission
todoForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const newTask = todoInput.value.trim();

    if (newTask === '') {
        alert('Please enter a task!');
        return;
    }

    addTask(newTask, false); // Add new task with completion status set to false
    todoInput.value = '';
    saveTasksToLocalStorage();
});

// Add task to the list
function addTask(task, completed) {
    const listItem = document.createElement('li');

    const taskText = document.createElement('span');
    taskText.textContent = task;
    listItem.appendChild(taskText);

    const checkBox = document.createElement('input');
    checkBox.setAttribute('type', 'checkbox');
    checkBox.checked = completed; // Set checkbox state based on completed status
    checkBox.classList.add('custom-checkbox');
    if (completed) {
        taskText.style.textDecoration = 'line-through'; // If completed, show strikethrough
        taskText.style.textDecorationColor = 'blue'; // Change the color of the line
    }
    listItem.appendChild(checkBox);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete-btn');
    listItem.appendChild(deleteButton);
    // deleteButton.style.background = "#4682B4";


    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.classList.add('edit-btn');
    listItem.appendChild(editButton);

    todoList.appendChild(listItem);

    // Mark task as completed/uncompleted
    checkBox.addEventListener('change', function() {
        taskText.style.textDecoration = this.checked ? 'line-through' : 'none';
        taskText.style.textDecorationColor = 'blue'; // Change the color of the line
        saveTasksToLocalStorage();
    });

    // Delete task from list
    deleteButton.addEventListener('click', function() {
        todoList.removeChild(listItem);
        saveTasksToLocalStorage();
    });

    // Edit task
    editButton.addEventListener('click', function() {
        const isEditing = listItem.classList.contains('editing');

        if (isEditing) {
            const input = listItem.querySelector('input[type="text"]');
            taskText.textContent = input.value;
            listItem.replaceChild(taskText, input);
            listItem.classList.remove('editing');
            editButton.textContent = 'Edit';
            saveTasksToLocalStorage();
        } else {
            const input = document.createElement('input');
            input.type = 'text';
            input.value = taskText.textContent;
            listItem.replaceChild(input, taskText);
            listItem.classList.add('editing');
            editButton.textContent = 'Save';
        }
        
    });
}

// Save tasks to localStorage
function saveTasksToLocalStorage() {
    const tasks = [];
    document.querySelectorAll('#todo-list li').forEach(listItem => {
        const taskText = listItem.querySelector('span').textContent;
        const isCompleted = listItem.querySelector('input[type="checkbox"]').checked;
        tasks.push({ text: taskText, completed: isCompleted });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks from localStorage on page load
document.addEventListener('DOMContentLoaded', function() {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    savedTasks.forEach(task => {
        addTask(task.text, task.completed);
    });
});
