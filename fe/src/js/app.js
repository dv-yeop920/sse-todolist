const menuForm = document.querySelector(".form-container");
const userInput = document.querySelector("#input");
const submitButton = document.querySelector("#submit-button");
const todoList = document.querySelector(".task-container");



const addTodoList = () => {
    const template = 
    `<div class="completed-container">
    <ul id="completed-list">
        <li>
            <input class = "checkbox" type="checkbox"/>
            <span style="color: white; font-size: 18px;">
                ${userInput.value}
            </span>
            <div>
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
todoList.innerHTML += template;
userInput.value = '';
}

submitButton.addEventListener("click" , addTodoList);
submitButton.addEventListener("submit" , addTodoList);


menuForm.addEventListener("submit", (event) => {
    event.preventDefault();
});

