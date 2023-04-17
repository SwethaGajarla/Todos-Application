let userInputEl = document.getElementById("userInput");
let addTodoBtnEl = document.getElementById("addTodoBtn");
let todoItemsContainerEl = document.getElementById("todoItemsContainer");
let saveBtnEl = document.getElementById("saveBtn");


function getTodoListFromLocalStorage(){
    let stringfyTodoList = localStorage.getItem("todoList");
    let parsedList = JSON.parse(stringfyTodoList)

    if (parsedList===null){
        return []
    }
    else{
        return parsedList
    }
}
let todoList = getTodoListFromLocalStorage();
let todoCount = todoList.length

saveBtnEl.onclick = function(){
    localStorage.setItem("todoList",JSON.stringify(todoList));
}


function onTodoStatusChange(checkboxId, labelId,todoId){
    let checkboxEl = document.getElementById(checkboxId);
    let labelElement = document.getElementById(labelId);
    labelElement.classList.toggle("checked");

    let todoObjectIndex = todoList.findIndex(function(eachTodo) {
        let eachTodoId = "todo" + eachTodo.uniqueId;
    
        if (eachTodoId === todoId) {
          return true;
        } else {
          return false;
        }
      });

      let todoObject = todoList[todoObjectIndex];
      
      if(todoObject.isChecked === true){
        todoObject.isChecked= false;
      }else{
        todoObject.isChecked = true;
      }
    
}


function deleteStatus(todoId){
    let todoElement = document.getElementById(todoId);
    todoItemsContainerEl.removeChild(todoElement);

    let deleteElementIndex = todoList.findIndex(function(eachTodo) {
        let eachTodoId = "todo" + eachTodo.uniqueId;
        if (eachTodoId === todoId) {
          return true;
        } else {
          return false;
        }
      });
    
      todoList.splice(deleteElementIndex, 1);
}

function  createAndAppendTodo(todo){
    let todoId = "todo" + todo.uniqueId;
    let checkboxId = "checkbox" + todo.uniqueId;
    let labelId ="label" + todo.uniqueId;

    let todoElement = document.createElement("li");
    todoElement.classList.add("todo_item_cntainer","d-flex","flex-row");
    todoElement.id = todoId;
    todoItemsContainerEl.appendChild(todoElement);

    let inputElement = document.createElement("input");
    inputElement.type = "checkbox";
    inputElement.id = checkboxId;

    inputElement.onclick = function(){
        onTodoStatusChange(checkboxId, labelId,todoId);
    }

    inputElement.classList.add("checkbox_input");
    todoElement.appendChild(inputElement);

    let labelElContainer = document.createElement("div");
    labelElContainer.classList.add("labet_conatiner","d-flex","flex-row");
    todoElement.appendChild(labelElContainer);

    let labelElement = document.createElement("label");
    labelElement.setAttribute("for",checkboxId);
    labelElement.id = labelId;
    labelElement.classList.add("label-element");
    labelElement.textContent = todo.text;
    if (todo.isChecked === true) {
        labelElement.classList.add("checked");
      }
    labelElContainer.appendChild(labelElement);

    let deleteIconContainer= document.createElement("div");
    deleteIconContainer.classList.add("delete_icon_container");
    labelElContainer.appendChild(deleteIconContainer);

    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon");
    deleteIcon.onclick = function(){
        deleteStatus(todoId);
    }
    deleteIconContainer.appendChild(deleteIcon);



    
}


for (let todo of todoList){
    createAndAppendTodo(todo);
}

 addTodoBtnEl.onclick  = function(){
    let userInputValue = userInputEl.value;

    todoCount += 1

    if(userInputValue ===""){
        alert("enter valid input")
    }
    else{

    
    let newTodo = {
        text:userInputValue,
        uniqueId: todoCount,
        isChecked:false
    };
    todoList.push(newTodo);
    createAndAppendTodo(newTodo)
    userInputEl.value = "";
}

 }