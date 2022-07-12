const btnAdd = document.querySelector('.btn-add');
const btnAccept = document.getElementsByClassName('accept');
const btnCancel = document.getElementsByClassName('cancel');
const toDoInput = document.querySelector('.todo-input');
const ul = document.querySelector('.todolist ul');
const errInfo = document.querySelector('.error-info');
const popup = document.querySelector('.popup');
const popupInput = document.querySelector('.popup-input');
const popupAccept = document.querySelector('.popup-body .accept');
const popupCancel = document.querySelector('.popup-body .cancel');
let confBtn = document.querySelectorAll('.complete');
let editBtn = document.querySelectorAll('.edit');
let delBtn = document.querySelectorAll('.delete');
let taskEdit = undefined;

const count = () => {
    if (ul.childElementCount < 1) {
        errInfo.textContent = 'Brak zadań na liscie.';
    } else {
        errInfo.textContent =
            'Liczba pozostałych zadań: ' + ul.childElementCount;
    }
};

const addNewTask = () => {
    if (toDoInput.value.trim() == '') {
        errInfo.textContent = 'Podaj treść zadania!';
    } else {
        createTask();
        count();
        toDoInput.value = '';
    }
};

const addNewTaskOnEnter = (e) => {
    if (e.key == 'Enter') {
        if (toDoInput.value.trim() == '') {
            errInfo.textContent = 'Podaj treść zadania!';
        } else {
            createTask();
            count();
            toDoInput.value = '';
        }
    }
};

const completeTask = (e) => {
    let task = e.target.closest('li');
    task.classList.toggle('completed');
    if (task.classList[0] == 'completed') {
        task.childNodes[1].childNodes[1].disabled = true;
        task.childNodes[1].childNodes[0].childNodes[0].classList.remove(
            'fa-check'
        );
        task.childNodes[1].childNodes[0].childNodes[0].classList.add(
            'fa-check-double'
        );
    } else {
        task.childNodes[1].childNodes[1].disabled = false;
        task.childNodes[1].childNodes[0].childNodes[0].classList.remove(
            'fa-check-double'
        );
        task.childNodes[1].childNodes[0].childNodes[0].classList.add(
            'fa-check'
        );
    }
};

const toggleBtns = () => {
    console.log(btnAdd.disabled);
    if (!btnAdd.disabled || btnAdd.disabled == undefined) {
        btnAdd.disabled = true;
        for (let i = 0; i < editBtn.length; i++) {
            confBtn[i].disabled = true;
            editBtn[i].disabled = true;
            delBtn[i].disabled = true;
        }
    } else {
        btnAdd.disabled = false;
        for (let i = 0; i < editBtn.length; i++) {
            confBtn[i].disabled = false;
            editBtn[i].disabled = false;
            delBtn[i].disabled = false;
        }
    }
};

const editTask = (e) => {
    confBtn = document.querySelectorAll('.complete');
    editBtn = document.querySelectorAll('.edit');
    delBtn = document.querySelectorAll('.delete');
    toggleBtns();
    taskEdit = e.target.closest('li');
    let val = taskEdit.textContent.slice(0, -4);
    if (popup.style.display != 'flex') {
        popup.style.display = 'flex';
        popupInput.value = val;
    } else {
        popup.style.display = 'none';
    }
};

const confirm = () => {
    taskEdit.childNodes[0].nodeValue = popupInput.value;
    popup.style.display = 'none';
    toggleBtns();
};

const confirmOnEnter = (e) => {
    if (e.key == 'Enter') {
        taskEdit.childNodes[0].nodeValue = popupInput.value;
        popup.style.display = 'none';
        toggleBtns();
    }
};

const closePopUp = () => {
    popup.style.display = 'none';
    toggleBtns();
};

const delTask = (e) => {
    let task = e.target.closest('li');
    task.remove();
    count();
};

const createTask = () => {
    const li = document.createElement('li');
    const div = document.createElement('div');
    const addButton = document.createElement('button');
    const editButton = document.createElement('button');
    const delButton = document.createElement('button');
    const iCheck = document.createElement('i');
    const iTimes = document.createElement('i');
    li.textContent = toDoInput.value;
    div.classList.add('tools');
    addButton.classList.add('complete');
    editButton.classList.add('edit');
    delButton.classList.add('delete');
    editButton.textContent = 'EDIT';
    iCheck.classList.add('fas', 'fa-check');
    iTimes.classList.add('fas', 'fa-times');
    addButton.append(iCheck);
    delButton.append(iTimes);
    div.append(addButton, editButton, delButton);
    li.append(div);
    ul.append(li);
    addButton.addEventListener('click', completeTask);
    editButton.addEventListener('click', editTask);
    delButton.addEventListener('click', delTask);
};

btnAdd.addEventListener('click', addNewTask);
toDoInput.addEventListener('keypress', addNewTaskOnEnter);
popupAccept.addEventListener('click', confirm);
popupInput.addEventListener('keypress', confirmOnEnter);
popupCancel.addEventListener('click', closePopUp);
