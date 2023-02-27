let tasks = [];

const addTaskInput = document.getElementById('add');
const tasksCounter = document.getElementById('tasks-counter');
const tasksList = document.getElementById('list');

// console.log('Working');
function addtaskToDOM(task){
        const li =document.createElement('li');
       li.innerHTML =   `
    <input type="checkbox" id="${task.id}" ${ task.done ? 'checked':''} class="custom-checkbox" />
    <label for="${task.id}">${task.text}</label>
    <img src="delete-forever.png" class="delete" data-id="${task.id}"/>
    `;
       
        // template literals/string
      tasksList.append(li);


        
}
function renderList () {
        tasksList.innerHTML='';
        for (let i = 0; i < tasks.length; i++) {
            addtaskToDOM(tasks[i]);
        }
        tasksCounter.innerHTML = tasks.length;
      
}

function TaskDoneCheck (taskId) {
    const task=tasks.filter(function(task){
            return task.id===taskId;
    });
    if(task.length>0){
        const currentTask=task[0];
        currentTask.done=!currentTask.done;
        
        renderList();
        showNotification("task done succesfully");
        return;
    }
    showNotification("could not done the task");
}

function deleteTask (taskId) {
    let newTasks=tasks.filter(function(task){
        return task.id!==taskId;
    });
    tasks=newTasks;
    renderList();
    showNotification("Task deleted succesfully");
}

function addTask (task) {
    if(task){
        tasks.push(task);
        renderList();
        showNotification('Task added succesfully');
        return;
    }
    showNotification('Task is not added');
}

function showNotification(text) {

    alert(text);
}

function handleInputKeypress(e){
    if(e.key=='Enter'){
            const text=e.target.value;
            console.log(text);
            if(!text){
                showNotification("input should not be empty");
                return;
            }

            const task={
                text:text,
                id:Date.now().toString(),
                done:false,
            }
            e.target.value='';
            addTask(task);
    }
}

addTaskInput.addEventListener('keyup',handleInputKeypress);

function HandlerClickListener(e){
 var target=e.target;

if(target.className=='delete'){
        const taskId=target.dataset.id;
        window.confirm("do you really wanna delete the task");
        deleteTask(taskId);
        
        return;
}else if(target.className=='custom-checkbox'){
        const taskId=target.id;
        
        TaskDoneCheck(taskId);
        return;
  }
}


document.addEventListener('click',HandlerClickListener)