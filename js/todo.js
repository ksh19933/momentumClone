const toDoForm = document.getElementById("todo-form");
const toDoInput = toDoForm.querySelector("input");
const toDolist = document.getElementById("todo-list");

const TODOS_KEY = "todos";

let toDos = [];

function saveToDos(){
    localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function deleteToDo(event){
    const parentLi = event.target.parentElement;
    parentLi.remove();
    toDos = toDos.filter((toDo) => toDo.id !== parseInt(parentLi.id));
    saveToDos();
}

function paintToDo(newTodo){
    const tmpLi = document.createElement("li");
    tmpLi.id = newTodo.id;
    const tmpSpan = document.createElement("span");
    const tmpButton = document.createElement("button");

    //부모 태그와 자식 태그 연결
    toDolist.appendChild(tmpLi);
    tmpLi.appendChild(tmpSpan);
    tmpLi.appendChild(tmpButton);

    //태그안에 내용 삽입
    tmpSpan.innerText = newTodo.text;
    tmpButton.innerText = "❌";
    tmpButton.addEventListener("click", deleteToDo);

}

function handleToDoSubmit(event){
    event.preventDefault();
    const newTodo = toDoInput.value;
    toDoInput.value = "";

    const newTodoObj = {
        id:Date.now(), 
        text:newTodo,
    };
    toDos.push(newTodoObj);
    paintToDo(newTodoObj);
    saveToDos();
}


toDoForm.addEventListener("submit", handleToDoSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY);
if(savedToDos){
    const parsedToDos = JSON.parse(savedToDos);
    toDos = parsedToDos;
    parsedToDos.forEach(paintToDo);
}