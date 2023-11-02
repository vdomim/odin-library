const dialog = document.querySelector('dialog')
const addBtn = document.querySelector('.addBook')
const submitBtn = document.querySelector('.submit')
const closeButton = document.querySelector('dialog button')
const cardContainter = document.querySelector('.card-container')

const myLibrary = []

function Book(title, author, pages, readed) {
    this.title = title
    this.author = author
    this.pages = pages

    this.readed = readed
    this.info = function () {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${
            readed ? 'readed' : 'not readed yet'
        }`
    }
}

function addBookToLibrary(book) {
    myLibrary.push(book)
}

const book1 = new Book('The Hobbit', 'J.R.R. Tolkien', 295, false)
const book2 = new Book('The Hobbit 2', 'J.R.R. Tolkien', 300, false)
addBookToLibrary(book1)
addBookToLibrary(book2)

paintBooks()

function paintNewBook(book) {
    cardContainter.appendChild(createNewCard(book))
}

function paintBooks() {
    myLibrary.forEach((book) => {
        cardContainter.appendChild(createNewCard(book))
    })
}

function createNewCard(book) {
    const newCard = document.createElement('div')
    newCard.className = 'card'

    const newCardContent = createNewCardContent(book)
    const newCardActions = createNewCardActions()
    newCard.appendChild(newCardContent)
    newCard.appendChild(newCardActions)
    return newCard
}

function createNewCardActions() {
    const newCardActions = document.createElement('div')
    newCardActions.className = 'card-actions'
    const newButtonEliminar = document.createElement('button')
    const btnEliminarText = document.createTextNode('Eliminar')
    newButtonEliminar.appendChild(btnEliminarText)
    const newButtonReaded = document.createElement('button')
    const btnReadedText = document.createTextNode('Cambiar estado')
    newButtonReaded.appendChild(btnReadedText)
    newCardActions.append(newButtonEliminar, newButtonReaded)
    return newCardActions
}

function createNewCardContent(book) {
    const newCardContent = document.createElement('div')
    newCardContent.className = 'card-content'
    const title = createNewElement(book.title)
    const author = createNewElement(book.author)
    const pages = createNewElement(book.pages + ' pages')
    const readed = createNewElement(book.readed ? 'leido' : 'sin leer')
    newCardContent.append(title, author, pages, readed)
    return newCardContent
}
function createNewElement(input) {
    const element = document.createElement('p')
    const elementText = document.createTextNode(input)
    element.appendChild(elementText)
    return element
}

addBtn.addEventListener('click', () => {
    dialog.showModal()
})

// "Close" button closes the dialog
closeButton.addEventListener('click', () => {
    dialog.close()
})

submitBtn.addEventListener('click', (event) => {
    event.preventDefault()

    let title = document.querySelector('#title').value
    let author = document.querySelector('#author').value
    let pages = document.querySelector('#numPages').value
    let readed = Boolean(document.querySelector('#readed').checked)

    const newBook = new Book(title, author, pages, readed)
    addBookToLibrary(newBook)
    paintNewBook(newBook)
})
