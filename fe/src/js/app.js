

const menuForm = document.querySelector(".form-container");
const userInput = document.querySelector("#input");
const submitButton = document.querySelector("#submit-button");
const todoList = document.querySelector("#completed-list");
const deleteAllButton = document.querySelector("#filter-delete");
const menuCount = document.querySelector(".menu-count");
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
                        style="color: white; font-size: 18px; 
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




