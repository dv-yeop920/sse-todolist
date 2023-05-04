const menuForm = document.querySelector(".form-container");
const userInput = document.querySelector("#input");
const submitButton = document.querySelector("#submit-button");
const todoList = document.querySelector(".task-container");
const deleteAllButton = document.querySelector("#filter-delete");
const menuCount = document.querySelector('.menu-count');
const countBar = document.querySelector("#count-bar");
const checkBox = document.querySelector(".check-box");

let menu = [];

const menuCounter = () => {
    const menuCounted = menu.length;
    countBar.value = menuCounted;
    menuCount.innerText = `총 ${menuCounted} / 10개`;
}

const render = () => {
    if(userInput.value) {
        menu.push({list:userInput.value});
        console.log(menu);
    }
    const template = menu.map(item => {
        return `
        <div class="completed-container">
        <ul id="completed-list">
            <li class = "list">
                <input class = "check-box" type="checkbox"/>
                <span class = "text" style="color: white; font-size: 18px;">
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
            </li>
        </ul>
    </div>`
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
    }
    render();
    userInput.value = '';
}


const deleteAllList = () => {
    confirm("모두 삭제 하시겠습니까?");
    console.dir(window)
}

const check = () => {
    alert("asd")
}





menuForm.addEventListener("submit", (event) => {
    event.preventDefault();
});

submitButton.addEventListener("click" , addList);
submitButton.addEventListener("submit" , addList);
deleteAllButton.addEventListener("click" , deleteAllList);
checkBox.addEventListener("click" , check)

