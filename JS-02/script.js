const form = document.querySelector('#task-form')
const titleInput = document.querySelector('#task-title')
const filterSelect = document.querySelector('#task-filter')
const countElement = document.querySelector('#task-count')
const listElement = document.querySelector('#task-list')

let tasks = []
let nextId = 1

function renderTasks() {
    listElement.replaceChildren()

    const filter = filterSelect.value

    let visible = tasks
    if (filter === 'active'){
        visible = tasks.filter(task => !task.completed)
    }

    if (filter === 'completed') {
        visible = tasks.filter(task => task.completed)
    }

    for (const task of visible) {
        const item = document.createElement('li')
        item.classList.add('task')
        item.dataset.taskId = task.id
        if (task.completed) item.classList.add('task--completed')

        const title = document.createElement('span')
        title.classList.add('task__title')
        title.textContent = task.title

        const toggle = document.createElement('button')
        toggle.type = 'button'
        toggle.dataset.action = 'toggle'
        toggle.textContent = 'Готово'

        const remove = document.createElement('button')
        remove.type = 'button'
        remove.dataset.action = 'delete'
        remove.textContent = 'Удалить'

        item.append(title, toggle, remove)
        listElement.append(item)
    }

    if (visible.length === 0) {
        const empty = document.createElement('li')
        empty.classList.add('empty-message')
        empty.textContent = 'Задач нет'
        listElement.append(empty)
    }

    countElement.textContent = 'Всего задач: ' + tasks.length
}

form.addEventListener('submit', event => {
    event.preventDefault()

    const title = titleInput.value.trim()
    if (title === '') return

    tasks.push({ id: nextId, title: title, completed: false })
    nextId = nextId + 1

    titleInput.value = ''
    renderTasks()
})

filterSelect.addEventListener('change', renderTasks)

listElement.addEventListener('click', event => {
    const button = event.target.closest('button[data-action]')
    if (!button) return

    const id = Number(button.closest('li').dataset.taskId)
    const task = tasks.find(task => task.id === id)

    if (button.dataset.action === 'toggle') {
        task.completed = !task.completed
    } else {
        tasks = tasks.filter(task => task.id !== id)
    }

    renderTasks()
})

renderTasks()