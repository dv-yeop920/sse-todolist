const body = document.querySelector("#body");
const menuForm = document.querySelector(".form-container");
const userInput = document.querySelector("#input");
const submitButton = document.querySelector("#submit-button");
const todoList = document.querySelector("#completed-list");
const menuCount = document.querySelector(".menu-count");
const countBar = document.querySelector("#count-bar");
const allButtons = document.querySelector(".button-group");


menuForm.addEventListener("submit", (event) => {
    event.preventDefault();
});

const menuCounter = () => {
    const menuCounted = menu.length;
    countBar.value = menuCounted;
    menuCount.innerText = `총 ${menuCounted} / 10개`;
    return;
}

let menu = [];

const render = () => {
    if(userInput.value) {
        menu.push({list:userInput.value});
    }
    const template = menu.map((item , index) => {
        return `
            <li class = "list">
                <input class = "checkbox"
                        type="checkbox"
                        value = "checkbox" 
                        />
                <span  data-list-id ="${index}"
                        class = "text"
                        style="font-size: 18px;">
                        ${item.list}
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
    menuCounter();
}

const addList = () => {

    if(userInput.value === '') {
        return alert("할일을 입력하세요^^");
    }
    if(countBar.value === 10) {
        alert("등록할 수 없습니다!");
        userInput.value = "";
        return;
    }

    const duplicatiedValue = menu.find(item => item.list === userInput.value);

    if(duplicatiedValue){
        alert("이미 있는 목록이잖아요^^");
        userInput.value = '';
        return;
    }
    render();
    userInput.value = '';
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
        menu.pop();
        menuCounter();
        return;
    }
}

//All 과 전부삭제에 대한 이벤트 함수
const allButton = (event) => {

    if(event.target.value === "전부삭제") {
        const listTag = document.querySelectorAll(".list");
        if(confirm("정말 삭제 하시겠습니까?")) {
            for(let i = 0; i < listTag.length; i++) {
                listTag[i].remove();
                menu.pop();
            }
        }
    }
    menuCounter();
    return;
}

//checkbox 이벤트 함수
const complete = (event) => {
    const listDetail = event.target.closest("li").querySelector(".text");
    listDetail.classList.toggle("text-through");
}

//checkbox에 대한 이벤트 위임
todoList.addEventListener("click" , (event) => {
    const target = event.target;
    if(target.value === "checkbox") {
        return complete(event);
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
submitButton.addEventListener("submit" , addList);




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
        menuCount.classList.remove("dark-mode");
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
        menuCount.classList.add("dark-mode");
        for(let i = 0; i < text.length; i++) {
            text[i].classList.add("dark-mode");
        }
        return;
        }

});



