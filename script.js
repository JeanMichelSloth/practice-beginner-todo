const inputElement = document.getElementById("creation-input");
const taskListElement = document.getElementById("consultation-list");
let taskList = [];
const INPUT_INDEX_IN_DIV = 0;
const INCORRECT_TASK_NAME_MSG = "Task name is incorrect !";
const NO_TASK_SELECTED_MSG = "You selected 0 task !";

function addTask() {
    
    const newTaskText = inputElement.value;
    if(checkInputValueIsIncorrect(newTaskText)) {
        alert(INCORRECT_TASK_NAME_MSG);
        return;
    }

    const newTaskId = new Date().getTime();
    const newTaskDivElement = createNewTaskElement(newTaskId, newTaskText);
    addTaskElementIntoView(newTaskDivElement);
    addTaskElementIntoState(newTaskDivElement);
    refreshInputElement();
}

function checkInputValueIsIncorrect(input) {
    const fullSpaceInputRegex = new RegExp(`[ ]{${input.length}}`);
    return input === "" || input == null || input.match(fullSpaceInputRegex);
}

function createNewTaskElement(newTaskId, newTaskText) {
    const newTaskDivElement = document.createElement("div");
    newTaskDivElement.id = newTaskId;
    newTaskDivElement.className = "task";

    const newTaskCheckboxElement = document.createElement("input");
    newTaskCheckboxElement.type = "checkbox";
    newTaskCheckboxElement.id = `cbx-${newTaskId}`;
    newTaskDivElement.appendChild(newTaskCheckboxElement);

    const newTaskLabelElement = document.createElement("label");
    newTaskLabelElement.innerHTML = newTaskText;
    newTaskLabelElement.htmlFor = `cbx-${newTaskId}`;
    newTaskDivElement.appendChild(newTaskLabelElement);

    return newTaskDivElement;
}

function addTaskElementIntoView(newTaskDivElement) {
    taskListElement.appendChild(newTaskDivElement);
}

function addTaskElementIntoState(newTaskDivElement) {
    taskList.push(newTaskDivElement);
}

function refreshInputElement() {
    inputElement.value = "";
}

function removeSelectedTasks() {
    let taskListToRemove = taskList.filter(t => t.children[INPUT_INDEX_IN_DIV].checked);
    
    if(taskListToRemove.length === 0) {
        alert(NO_TASK_SELECTED_MSG);
        return;
    }

    removeTasksFromView(taskListToRemove);
    removeTasksFromState(taskListToRemove);
}

function removeTasksFromView(taskListToRemove) {
    taskListToRemove.forEach(t => taskListElement.removeChild(t));
}

function removeTasksFromState(taskListToRemove) {
    const idTaskListToRemove = taskListToRemove.map(t => t.id);
    taskList = taskList.filter(t => !idTaskListToRemove.includes(t.id));
}