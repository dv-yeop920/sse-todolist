const body = document.querySelector("#body");
const menuForm = document.querySelector(".form-container");
const userInput = document.querySelector("#input");
const submitButton = document.querySelector("#submit-button");
const todoList = document.querySelector("#completed-list");
const menuCount = document.querySelector(".menu-count");
const countBar = document.querySelector("#count-bar");
const allButtons = document.querySelector(".button-group");


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
    const template = menu.map((item , index) => {
        return `
            <li class = "list">
                <input class = "checkbox"
                        type="checkbox"
                        value = "checkbox" 
                        />
                <label  data-list-id ="${index}"
                        class = "text"
                        style="font-size: 18px;" 
                        for="checkbox">
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

const updateList = (event) => {
    const listDetail = event.target.closest("li").querySelector(".text");
    
        if(event.target.classList.contains("edit")){
            const modifiedName = prompt('메뉴 수정' , listDetail.innerText);
            
        if(modifiedName){
                return listDetail.innerText = modifiedName;
        }else{
            listDetail.innerText = listDetail.innerText;
        }
    }
}


const removeList = (event) => {
    const listTag = event.target.closest("li");
    if(confirm("정말 삭제 하시겠습니까?")) {
        listTag.remove();
        menu.pop();
        menuCounter();
    }
}



//All 과 전부삭제에 대한 이벤트 함수
const allButton = (event) => {
    if(event.target.value === "All") {
        alert("asdasd")
    }
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
}


//checkbox 이벤트 함수
const complete = (event) => {
    console.log(event);
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
})


menuForm.addEventListener("submit", (event) => {
    event.preventDefault();
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

    if (toggleSwitch.checked) {
    // On 상태 처리
    moon.style.opacity = 0;
    sun.style.opacity = 1;
    container.classList.add("light-mode");
    header.classList.add("light-mode");
    body.classList.add("light-mode");
    menuCount.classList.add("light-mode");
    menuCount.classList.remove("menu-count");
    for(let i = 0; i < text.length; i++) {
        text[i].classList.remove("color-white");
        text[i].classList.add("light-mode");
    }
    }

    if(!toggleSwitch.checked){
        // Off 상태 처리
        moon.style.opacity = 1;
        sun.style.opacity = 0;
        header.classList.remove("light-mode");
        container.classList.remove("light-mode");
        body.classList.remove("light-mode");
        menuCount.classList.remove("light-mode");
        menuCount.classList.add("menu-count");
        for(let i = 0; i < text.length; i++) {
            text[i].classList.remove("light-mode");
            text[i].classList.add("color-white");
        }
    }

});



