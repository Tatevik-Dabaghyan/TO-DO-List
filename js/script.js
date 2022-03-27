'use strict';
//data
const listItm1 = { id: 1, value: '', status: 'TO-DO', checked: false, disabled: true }
const listItm2 = { id: 2, value: 'Codeing', status: 'DONE', checked: true, disabled: false }
let listData = [listItm1, listItm2], id = listData.length + 1;

//select elements
const todoContainer = document.querySelector('.todo-list__todoes');
const doneContainer = document.querySelector('.todo-list__done');
//select btns
const addNewTaskBTN = document.querySelector('#add-todo');


//display to-do and done containers on load
const displayOnLoad = function (todoContainer, doneContainer, data) {
   //create html element
   data.forEach(task => {
      task.checked === true ? doneContainer.insertAdjacentHTML('afterbegin', createHtmlElement(task)) :
         todoContainer.insertAdjacentHTML('beforeend', createHtmlElement(task));
      console.log(task);

      //add checkboxChange & textAreaChange functions to existing current element
      let taskCheckbox = document.getElementById(task.id);
      let taskTextArean = taskCheckbox.closest('.todo-list__todo').querySelector('textarea');
      onCheckboxChange(taskCheckbox);
      onTextAreaChange(taskTextArean);
   });
}
displayOnLoad(todoContainer, doneContainer, listData); //when we have already created some tasks before


//event handlers
//1. update & display UI after adding new task
addNewTaskBTN.addEventListener('click', function (e) {
   e.preventDefault;
   let newTask = createNewTask();
   todoContainer.insertAdjacentHTML('beforeend', createHtmlElement(newTask));

   //add checkboxChange & textAreaChange functions to new adding elements
   let taskCheckbox = document.getElementById(newTask.id);
   let taskTextArean = taskCheckbox.closest('.todo-list__todo').querySelector('textarea');
   onCheckboxChange(taskCheckbox);
   onTextAreaChange(taskTextArean);
});

//2. update & display UI after removeing any task


//FUNCTIONS

//1. create new task
function createNewTask() {
   let newTask = {};
   newTask.id = id,
      newTask.value = '',
      newTask.status = 'TO-DO',
      newTask.checked = false,
      newTask.disabled = true
      ;

   //update data
   listData.push(newTask);
   id++;

   return newTask;
};

//2. create html element
function createHtmlElement(obj) {
   let htmlElement = `
   <div class="todo-list__todo ${obj.checked === false ? 'todo' : 'done'}">
         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path
               d="M364.2 83.8C339.8 59.39 300.2 59.39 275.8 83.8L91.8 267.8C49.71 309.9 49.71 378.1 91.8 420.2C133.9 462.3 202.1 462.3 244.2 420.2L396.2 268.2C407.1 257.3 424.9 257.3 435.8 268.2C446.7 279.1 446.7 296.9 435.8 307.8L283.8 459.8C219.8 523.8 116.2 523.8 52.2 459.8C-11.75 395.8-11.75 292.2 52.2 228.2L236.2 44.2C282.5-2.08 357.5-2.08 403.8 44.2C450.1 90.48 450.1 165.5 403.8 211.8L227.8 387.8C199.2 416.4 152.8 416.4 124.2 387.8C95.59 359.2 95.59 312.8 124.2 284.2L268.2 140.2C279.1 129.3 296.9 129.3 307.8 140.2C318.7 151.1 318.7 168.9 307.8 179.8L163.8 323.8C157.1 330.5 157.1 341.5 163.8 348.2C170.5 354.9 181.5 354.9 188.2 348.2L364.2 172.2C388.6 147.8 388.6 108.2 364.2 83.8V83.8z" />
         </svg>
         <label>
            <span>${obj.checked === false ? listData.filter(obj => !obj.checked).length : ''} ${obj.status}</span>
            <input type="checkbox" id="${obj.id}" ${obj.checked === true ? 'checked' : ''} ${obj.disabled === true ? 'disabled' : ''}>
         </label>
         <textarea name="" id="" cols="30" rows="10" class="todo__text">${obj.value}</textarea>
      </div>
   `;
   return htmlElement;
}

//3. disable or enable checkbox on textarea change
function onTextAreaChange(textArea) {
   textArea.oninput = function () {
      textArea.closest('.todo').querySelector("input[type = 'checkbox']").disabled = textArea.value !== '' ? '' : 'disabled';
   }
}

//4. display to-do and done containers on checkbox checked change
function onCheckboxChange(checkbox) {
   checkbox.addEventListener('change', function () {
      let currentObj = listData.find(obj => obj.id === Number(checkbox.id));
      let currentTask = checkbox.closest('.todo-list__todo');

      //update Data
      currentObj.status = checkbox.checked ? 'DONE' : 'TO-DO';
      currentObj.checked = checkbox.checked ? true : false;

      //update UI of containers
      currentTask.querySelector('span').innerText = checkbox.checked ? currentObj.status : `${listData.filter(obj => !obj.checked).length} ${currentObj.status}`;
      //update UI of to-do list order
      checkbox.checked ? changeListOrder(currentTask) : '';
      currentTask.classList.replace(checkbox.checked ? 'todo' : 'done', checkbox.checked ? 'done' : 'todo');
      checkbox.checked ? doneContainer.prepend(currentTask) : todoContainer.appendChild(currentTask);
   })
}

//5. if current task is cutting from todo container, correct task order after it
function changeListOrder(elem) {
   let todoTasks = document.querySelectorAll('.todo');
   let indexOfcurrentTask = Array.from(todoTasks).indexOf(elem);
   while (indexOfcurrentTask >= 0 && indexOfcurrentTask < todoTasks.length - 1) {
      todoTasks[indexOfcurrentTask + 1].querySelector('span').innerText = `${indexOfcurrentTask + 1} ${todoTasks[indexOfcurrentTask + 1].querySelector('span').innerText.split(' ').slice(1).join('')}`;
      indexOfcurrentTask++;
   }
}