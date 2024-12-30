const inputForm = document.querySelector('.input_container');
const container = document.querySelector('.container');





// creating current time 
function getTime() {
    const date = new Date();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    const time = `${(hour > 12)  ? '0' + hour % 12 : hour}:${(minute > 9) ? minute : '0'+ (minute) } ${(hour >= 12) ? 'PM' : 'AM'}, ${day}/${month+1}/${year}`;

    return time;
}


const deleteTodo = (e) => {
    const parent = e.target.parentElement.parentElement.parentElement;
    parent.remove();

    console.log(container.children.length)

}

const createTodo = (todoObj) => {
    const todoElement = `
            <input type="checkbox" ${todoObj.status === 'complete' ? 'checked' : ''} name="checkbox"  id="checkbox">
                    <div class="todo_title">
                        <p class="title">${todoObj.title}</p>
                        <span class="time">${todoObj.time}</span>
                    </div>
                    <div class="btn_container">
                        <button class="delete_btn">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
                        </button>
                        <button class="edit_btn">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h357l-80 80H200v560h560v-278l80-80v358q0 33-23.5 56.5T760-120H200Zm280-360ZM360-360v-170l367-367q12-12 27-18t30-6q16 0 30.5 6t26.5 18l56 57q11 12 17 26.5t6 29.5q0 15-5.5 29.5T897-728L530-360H360Zm481-424-56-56 56 56ZM440-440h56l232-232-28-28-29-28-231 231v57Zm260-260-29-28 29 28 28 28-28-28Z"/></svg>
                        </button>
                    </div>
    `;

    const todo = document.createElement('article');
    todo.setAttribute('data-id', todoObj.id);
    todo.className = 'todoList';
    todo.innerHTML = todoElement;

    container.append(todo);
    const deleteBtns = document.querySelectorAll('.delete_btn');
    const editBtns = document.querySelectorAll('.edit_btn');
    const checkbox = document.querySelector('#checkbox');

    deleteBtns.forEach(btn => {
        btn.addEventListener('click', deleteTodo);
    })
    
}


const appendTodo = (value) => {
    const id = self.crypto.randomUUID();

    const todoObject = {title: value, id: id, status: 'incomplete', time: getTime()};
    const todoElement = createTodo(todoObject);
    
}

const checkIsEmptlyVal = (value) => {

    // convert the string to array
    value = value.split('');
    for(let i = 0; i < value.length; i++) {
        if(value[i] !== ' ') {
            return true;
        }
    }

    return false;
}


const addTodo = (e) => {
    e.preventDefault();

    // inputElement
    let inputText = e.target.querySelector('#inputText');
    
    // check condition either input value is empty or empty space
    if(inputText.value != '' && checkIsEmptlyVal(inputText.value.trim())) {
        appendTodo(inputText.value);        
        console.log(container.hasChildNodes())
    }

    inputText.value = '';
}


inputForm.addEventListener('submit', addTodo);

