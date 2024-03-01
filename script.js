document.addEventListener("DOMContentLoaded", function() {
    const taskInput = document.getElementById("taskInput");
    const taskList = document.getElementById("taskList");
    const addButton = document.querySelector("button");

    // Load tasks from local storage
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // Display tasks
    tasks.forEach(task => {
        addTaskToList(task);
    });

    // Add event listener to the button
    addButton.addEventListener("click", addTask);

    // Add task function
    function addTask() {
        const taskText = taskInput.value.trim();
        console.log("Task to be added:", taskText); // Debugging log
        if (taskText !== "") {
            tasks.push(taskText);
            addTaskToList(taskText);
            taskInput.value = "";
            saveTasks();
        }
    }

    // Add task to list
    function addTaskToList(taskText) {
        const li = document.createElement("li");
        li.textContent = taskText;
        const deleteButton = document.createElement("span");
        deleteButton.textContent = "❌";
        deleteButton.classList.add("delete");
        deleteButton.onclick = function() {
            const index = tasks.indexOf(taskText);
            if (index > -1) {
                tasks.splice(index, 1);
                saveTasks();
                taskList.removeChild(li);
            }
        };
        li.appendChild(deleteButton);
        taskList.appendChild(li);
    }

    // Save tasks to local storage
    function saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // Debugging log
    console.log("Document loaded");
});
