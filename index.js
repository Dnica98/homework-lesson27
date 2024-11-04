const addToDoInput = document.getElementById('addToDoInput')
const addToDoBtn = document.getElementById('addToDoBtn')
const doneToDoList = document.getElementById('doneToDoList')
const inProgressToDoList = document.getElementById('inProgressToDoList')
const openModal = document.getElementById('openModal')
const modal = document.getElementById('modal')
const closingModal = document.getElementById('closingModal')

let list = JSON.parse(localStorage.getItem('todoList')) || []
let editModeIcon = null

function saveList () {
    localStorage.setItem('todoList', JSON.stringify(list))
}

const toggleToDo = (title) => {
    list = list.map((toDo) =>
    toDo.title === title ? {...toDo, done: !toDo.done} : toDo)

    saveList()
    renderPage()
}

const editToDo = (title) =>{
    editModeIcon = title
    const item = list.filter((toDo)=> toDo.title === title)[0]
    addToDoInput.value = listItem.title
    modal.classList.add('showModal')
}

const deleteToDo = (title) =>{
    list = list.filter((toDo)=>toDo.title !== title)
    saveList()
    renderPage()
}

function renderPage() {
    doneToDoList.innerHTML = ''
    inProgressToDoList.innerHTML = ''

    list.forEach((toDo) => {
        const listItem = document.createElement('div')
        listItem.classList.add('listItem')
       
        const actions = document.createElement('div')
        actions.classList.add('listItemActions')
        
        const editIcon = document.createElement('img')
        editIcon.classList.add('listItemIcon')
        editIcon.alt = 'edit-icon'
        editIcon.src = 'assets/icon-edit.png'

        const deleteIcon = document.createElement('img')
        deleteIcon.classList.add('listItemIcon')
        deleteIcon.alt = 'delete-icon'
        deleteIcon.src = 'assets/icon-delete.png'

        actions.appendChild(editIcon)
        actions.appendChild(deleteIcon)

        const title = document.createElement('p')
        title.innerText = toDo.title

        if(toDo.done) title.classList.add('doneToDoTitle')

        listItem.appendChild(title)
        listItem.appendChild(actions)

        const parent = toDo.done ? doneToDoList : inProgressToDoList

        parent.appendChild(listItem)

        listItem.addEventListener('click', () => {
            toggleToDo(toDo.title)
        })

        editIcon.addEventListener('click', (e) => {
            e.stopPropagation()
            editToDo(toDo.title)
        }) 

        deleteIcon.addEventListener('click', (e) =>{
            e.stopPropagation()
            deleteToDo(toDo.title)
        })
    })

}

const addToDo = () => {
    const title = addToDoInput.value.trim()
    if (title === undefined || title === '') return alert("Todo should have a title")
    
    if (editModeIcon){
        list = list.map((toDo)=>
        toDo.title === editModeIcon ? {...toDo, title} : toDo)
        editModeIcon = null
    } else {
        if(list.some((listItem)=> listItem.title === title))
            return alert('To do title should be uniq')
        list.push({...title, done: false})
    }
    
    addToDoInput.value = ''
    modal.classList.remove('showModal')
    saveList()
    renderPage()
}

addToDoBtn.addEventListener('click', addToDo)

openModal.addEventListener('click', () => {
    addToDoInput.value = ''
    modal.classList.add('showModal')
})

closingModal.addEventListener('click', () =>{
    modal.classList.remove('showModal')
})

renderPage()






