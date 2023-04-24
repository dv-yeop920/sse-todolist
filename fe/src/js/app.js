const menuForm = document.querySelector(".form-container");
const userInput = document.querySelector("#input");
const submitButton = document.querySelector("#submit-button");
const todoList = document.querySelector(".task-container");
const taskButtonBox = document.querySelector(".task-button-box");

let menu = [];

const render = () => {
    if(userInput.value !== "") {
        menu.push({list:userInput.value});
        console.log(menu);
    }
    const template = menu.map(item => {
        return `
        <div class="completed-container">
        <ul id="completed-list">
            <li>
                <input class = "checkbox" type="checkbox"/>
                <span style="color: white; font-size: 18px;">
                    ${item.list}
                </span>
                <div class="task-button-box">
                <button 
                    class="task-button"  
                    value="수정">수정
                </button>
                <button 
                    class="task-button" 
                    value="삭제">삭제
                </button>
                </div>
            </li>
        </ul>
    </div>`
    }).join('');

todoList.innerHTML = template;
}

const addList = () => {
    if(userInput.value === '') {
        return alert("할일을 입력하세요^^");
    }
    render();
    userInput.value = '';
}

const removeList = (event) => {
    if(event.target.value === "삭제") {
        
    }
}


submitButton.addEventListener("click" , addList);
submitButton.addEventListener("submit" , addList);
taskButtonBox.addEventListener("click" , )


menuForm.addEventListener("submit", (event) => {
    event.preventDefault();
});

