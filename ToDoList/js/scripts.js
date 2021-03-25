const getTasks = async function () {
    const tasks = await getTasksAPI();
    const taskList = document.getElementById("task-list");
    tasks.forEach(function (task) {
       
        const taskLi = document.createElement("li");
        taskLi.id = task._id;

        
        const taskCheck = document.createElement("input")
        taskCheck.type = "checkbox";
        taskCheck.value = task._id;
        taskCheck.checked = task.done;
        taskCheck.addEventListener('change', updateTask);

        
        const taskInput = document.createElement("input");
        taskInput.className = "input-text";
        if (task.done == true) {
            taskInput.classList.add("strike-through");
        };
        taskInput.id = task._id;
        taskInput.value = task.description;

        
        const saveButton = document.createElement("button");
        saveButton.value = task._id;
        saveButton.className = "save-btn";
        saveButton.addEventListener('click', updateTask);

        
        const delButton = document.createElement("button");
        delButton.value = task._id;
        delButton.className = "delete-btn";
        delButton.addEventListener('click', deleteTask);

       
        taskList.appendChild(taskLi);
        taskLi.appendChild(taskCheck)
        taskLi.appendChild(taskInput);
        taskLi.appendChild(delButton);
    })
};


const removeTasks = () => {
    const taskList = document.getElementById("task-list");
    while (taskList.hasChildNodes()) {
        taskList.removeChild(taskList.firstChild);
    };
}


const refreshTasks = () => {
    removeTasks();
    getTasks();
}


const addTask = async () => {
    const taskInput = document.querySelector("#task-input");
    const description = taskInput.value;
    if (description != "") {
        const task = {
            description: description,
            done: false
        };
        const newTask = await addTaskAPI(task);
        taskInput.value = "";
        refreshTasks();
    }
}


const updateTask = async (event) => {
    const id = event.target.value;
    const description = document.getElementById(id).children[1].value;
    const done = document.getElementById(id).children[0].checked
    if (description != "") {
        const task = {
            description: description,
            done: done
        };
        const updateTask = await updateTaskAPI(id, task);
        refreshTasks();
    }
}


const deleteTask = async (event) => {
    const id = event.target.value;
    if (id != "") {
        await deleteTaskAPI(id);
        refreshTasks();
    }
}

document.querySelector("#task-form").addEventListener('submit', function (event) {
    addTask();
    event.preventDefault();
});

getTasks();
