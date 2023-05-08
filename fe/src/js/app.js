const body = document.querySelector("#body");
const menuForm = document.querySelector(".form-container");
const userInput = document.querySelector("#input");
const submitButton = document.querySelector("#submit-button");
const todoList = document.querySelector("#completed-list");
const deleteAllButton = document.querySelector("#filter-delete");
const menuCount = document.querySelector("#menu-count");
const countBar = document.querySelector("#count-bar");



let menu = [];

const menuCounter = () => {
    const menuCounted = menu.length;
    countBar.value = menuCounted;
    menuCount.innerText = `총 ${menuCounted} / 10개`;
}

const render = () => {
    if(userInput.value) {
        menu.push({list:userInput.value});
    }
    const template = menu.map(item => {
        return `
            <li class = "list">
                <input class = "checkbox" type="checkbox"/>
                <label  class = "text"
                        style="font-size: 18px;" 
                        for="myCheckbox">
                        ${item.list}
                </label>
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
    }).join('');

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


const deleteAllList = () => {
    if(confirm("모두 삭제 하시겠습니까?")) {
        todoList.innerHTML = "zzzzz"
    }
}


menuForm.addEventListener("submit", (event) => {
    event.preventDefault();
});




submitButton.addEventListener("click" , addList);
submitButton.addEventListener("submit" , addList);
deleteAllButton.addEventListener("click" , deleteAllList);




const toggleSwitch = document.querySelector("#toggle-switch");
const moon = document.querySelector(".moon");
const sun = document.querySelector(".sun");

toggleSwitch.addEventListener("change", () => {
    const container = document.querySelector(".container");
    const header = document.querySelector("#header-title");
    const text = document.querySelectorAll(".text");

    if (toggleSwitch.checked) {
    // On 상태 처리
    moon.style.opacity = 0;
    sun.style.opacity = 1;
    container.classList.add("light-mode");
    header.classList.add("light-mode");
    body.classList.add("light-mode");
    for(let i = 0; i < text.length; i++) {
        text[i].classList.add("light-mode");
    }
    }else{
    // Off 상태 처리
    moon.style.opacity = 1;
    sun.style.opacity = 0;
    header.classList.remove("light-mode");
    container.classList.remove("light-mode");
    body.classList.remove("light-mode");
    for(let i = 0; i < text.length; i++) {
        text[i].classList.remove("light-mode");
    }
    }
});

