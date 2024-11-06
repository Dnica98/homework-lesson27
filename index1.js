const addToDoInput = document.getElementById('addToDoInput')
const addToDoBtn = document.getElementById('addToDoBtn')
const doneToDoList = document.getElementById('doneToDoList')
const inProgressToDoList = document.getElementById('inProgressToDoList')
const openModal = document.getElementById('openModal')
const modal = document.getElementById('modal')
const closingModal = document.getElementById('closingModal')

let list = JSON.parse(localStorage.getItem('todoList')) || []
let editModeIcon = ''

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
    const listItem = list.filter((toDo)=> toDo.title === title)[0]
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



// const addToDoInput = document.getElementById('addToDoInput')
// const addToDoBtn = document.getElementById('addToDoBtn')
// const doneToDoList = document.getElementById('doneToDoList')
// const inProgressToDoList = document.getElementById('inProgressToDoList')
// const modal = document.getElementById('modal')
// const editToDoInput = document.getElementById('editToDoInput')
// const editToDoBtn = document.getElementById('editToDoBtn')
// const closingModal = document.getElementById('closingModal')

// const savedList = JSON.parse(localStorage.getItem('todoList'))

// let list = savedList ? savedList : []
// let toDoforEditing = ''

// const closeModal = () => {
//     modal.classList.remove('showModal')
// }

// const saveList = (updatedList) => {
//     localStorage.setItem('toDoList', JSON.stringify(updatedList))
// }

// const toggleToDo = (title) => {
//     const updatedList = list.map((toDo) =>{
//      return {...toDo, done: title === toDo.title ? !toDo.done : toDo.done}})

//     list = updatedList
//     saveList(updatedList)
//     renderPage()
// }

// const openModal= (toDo) =>{
//     modal.classList.add('showModal')
//     addToDoInput.value = toDo
//     editModeIcon = toDo
// }

// const editToDo = () =>{
//     const newTitle =  editToDoInput.value
//     if(newTitle === '') return alert('Title should can\'t be emply')
//     if(list.some(item => item.title === newTitle && item.title !== toDoforEditing)) return alert('Todo should be uniq')   
    
//     const updatedList = list.map((toDo) => {
//          return { ...toDo, title: toDo.title === toDoforEditing ? newTitle : toDo.title }
//     }) 

//     list = updatedList
//     toDoforEditing =''
//     saveList(updatedList)
//     closeModal()
//     renderPage()
// }

// const deleteToDo = (toDo) =>{
//     const updatedList = list.filter((item)=>item.title !== toDo)
//     list = updatedList
//     saveList(updatedList)
//     renderPage()
// }

// function renderPage() {
//     doneToDoList.innerHTML = ''
//     inProgressToDoList.innerHTML = ''

//     list.forEach((toDo) => {
//         const listItem = document.createElement('div')
//         listItem.classList.add('listItem')
       
//         const actions = document.createElement('div')
//         actions.classList.add('listItemActions')
        
//         const editIcon = document.createElement('img')
//         editIcon.classList.add('listItemIcon')
//         editIcon.alt = 'edit-icon'
//         editIcon.src = 'assets/icon-edit.png'

//         const deleteIcon = document.createElement('img')
//         deleteIcon.classList.add('listItemIcon')
//         deleteIcon.alt = 'delete-icon'
//         deleteIcon.src = 'assets/icon-delete.png'

//         actions.appendChild(editIcon)
//         actions.appendChild(deleteIcon)

//         const title = document.createElement('p')
//         title.innerText = toDo.title

//         if(toDo.done) title.classList.add('doneToDoTitle')

//         listItem.appendChild(title)
//         listItem.appendChild(actions)

//         const parent = toDo.done ? doneToDoList : inProgressToDoList

//         parent.appendChild(listItem)

//         listItem.addEventListener('click', () => {
//             toggleToDo(toDo.title)
//         })

//         editIcon.addEventListener('click', (e) => {
//             e.stopPropagation()
//             openModal(toDo.title)
//         }) 

//         deleteIcon.addEventListener('click', (e) =>{
//             e.stopPropagation()
//             deleteToDo(toDo.title)
//         })
//     })

// }

// const addToDo = () => {
//     const title = addToDoInput.value
//     if (title === '') return alert("Todo should have a title")
    
//     if(list.some((item)=> item.title === title)) return alert('To do title should be uniq')
    
//     list.push({title, done: false})
//     addToDoInput.value = ''
//     saveList(list)
//     renderPage()
// }

// closingModal.onclick = closeModal
// editToDoBtn.onclick = editToDo

// renderPage()





