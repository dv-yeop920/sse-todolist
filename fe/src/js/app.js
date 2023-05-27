import ListApi from "./server/server.js";

const body = document.querySelector("#body");
const listForm = document.querySelector(".form-container");
const userInput = document.querySelector("#input");
const submitButton = document.querySelector("#submit-button");
const todoList = document.querySelector("#completed-list");
const listCount = document.querySelector(".list-count");
const listCompleteCount = document.querySelector(".list-complete-count");
const countBar = document.querySelector("#count-bar");
const completeCountBar = document.querySelector("#complete-count-bar");
const allButtons = document.querySelector(".button-group");


let list;
const completeList = {
    completeDetail:[]
};

let listDetail = 'listDetail';
let completeDetail = 'completeDetail';

const init = async () => {
    render();
    userInput.value = '';
    return;
};


const render = async () => {
    //if(userInput.value) {
    //    list[listDetail].push({detail:userInput.value});
    //}
    list = await ListApi.getAllListByListItem();
    const template = list['result'].map(item => {
        return `
            <li class = "list">
                <input class = "checkbox"
                        type="checkbox"
                        value = "checkbox" 
                        />
                <span  
                    class = "text"
                    style="font-size: 18px;">
                    ${item.title}
                </span>
                <div class="task-button-box">
                <button 
                    class="task-button edit" 
                    value="수정">수정
                </button>
                <button 
                    class="task-button delete" 
                    value="삭제">삭제
                </button>
                </div>
            </li>`;
    }).join("");

    todoList.innerHTML = template;
    listCounter();
    console.log(list);
}


listForm.addEventListener("submit", (event) => {
    return event.preventDefault();
});

const listCounter = () => {
    const listCounted = list['result'].length;
    countBar.value = listCounted;
    listCount.innerText = `총 ${listCounted} / 10개`;
    return;
}

const completeCounter = () => {
    const listCounted = completeList[completeDetail].length;
    completeCountBar.value = listCounted;
    listCompleteCount.innerText = `완료 ${listCounted} / 10개`;
    return;
}

const addList = async () => {

    if(userInput.value === '') {
        return alert("할일을 입력하세요^^");
    }
    //if(countBar.value === 10) {
    //    return [userInput.value = "" , alert("등록할 수 없습니다!")]
    //}

    const duplicatiedValue = list['result'].find(item => item.title === userInput.value);

    if(duplicatiedValue){
        alert("이미 있는 목록이잖아요^^");
        userInput.value = "";
        return;
    }
    await ListApi.creatList(userInput.value);
    render();
    userInput.value = "";
}


const updateList = (event) => {
    const listDetail = event.target.closest("li").querySelector(".text");
    
        if(event.target.classList.contains("edit")){
            const modifiedName = prompt("할일 수정" , listDetail.innerText);
        if(modifiedName){
            return listDetail.innerText = modifiedName;
        }else{
            return listDetail.innerText = listDetail.innerText;
        }
    }
}

const removeList = (event) => {
    const listTag = event.target.closest("li");

    if(confirm("정말 삭제 하시겠습니까?")) {
        listTag.remove();
        list[listDetail].pop();
        listCounter();
        completeList[completeDetail].pop();
        completeCounter();
        return;
    }
}

//전부삭제에 대한 이벤트 함수
const allButton = (event) => {
    if(event.target.value === "전부삭제") {
        const listTag = document.querySelectorAll(".list");
        if(confirm("정말 삭제 하시겠습니까?")) {
            for(let i = 0; i < listTag.length; i++) {
                listTag[i].remove();
                list[listDetail].pop();
                completeList[completeDetail].pop();
            }
        }
    }
    listCounter();
    completeCounter();
    console.log(list);
    return;
}

//checkbox 이벤트 함수
const complete = (event) => {
    const listDetail = event.target.closest("li").querySelector(".text");

    listDetail.classList.toggle("text-through");

    if(listDetail.classList.contains("text-through")) {
        completeList[completeDetail].push({detail:listDetail.innerText});
    }
    if(!listDetail.classList.contains("text-through")) {
        completeList[completeDetail].pop();
    }

    completeCounter();
    console.log(completeList);
}



//checkbox에 대한 이벤트 위임
todoList.addEventListener("click" , (event) => {
    const target = event.target;
    if(target.value === "checkbox") {
        complete(event);
    }
    if(target.value === "수정") {
        return updateList(event);
    }
    if(target.value === "삭제") {
        return removeList(event);
    }
});


allButtons.addEventListener("click" , allButton);
submitButton.addEventListener("click" , addList);

init();
//스위치로 바탕화면 dark 모드 light 모드 설정
const toggleSwitch = document.querySelector("#toggle-switch");
const moon = document.querySelector(".moon");
const sun = document.querySelector(".sun");

toggleSwitch.addEventListener("change", () => {
    const container = document.querySelector(".container");
    const header = document.querySelector("#header-title");
    const text = document.querySelectorAll(".text");

    if(!toggleSwitch.checked){
        // Off 상태 처리
        moon.style.opacity = 0;
        sun.style.opacity = 1;
        header.classList.remove("dark-mode");
        container.classList.remove("dark-mode");
        body.classList.remove("dark-mode");
        listCount.classList.remove("dark-mode");
        for(let i = 0; i < text.length; i++) {
            text[i].classList.remove("dark-mode");
        }
        return;
    }

    if (toggleSwitch.checked) {
        // On 상태 처리
        moon.style.opacity = 1;
        sun.style.opacity = 0;
        container.classList.add("dark-mode");
        header.classList.add("dark-mode");
        body.classList.add("dark-mode");
        listCount.classList.add("dark-mode");
        for(let i = 0; i < text.length; i++) {
            text[i].classList.add("dark-mode");
        }
        return;
        }

});




