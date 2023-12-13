const dialog = document.querySelector('dialog')
const addBtn = document.querySelector('.addBook')
const submitBtn = document.querySelector('.submit')
const closeButton = document.querySelector('dialog button')
const cardContainter = document.querySelector('.card-container')
const readedBtn = document.querySelector('.readed img')

let myLibrary = []
let bookId = 0


class Book{
    constructor(title, author, pages, readed){
        this.id = bookId++
        this.title = title
        this.author = author
        this.pages = pages
        this.readed = readed
    }
    
    info () {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${
            readed ? 'readed' : 'not readed yet'
        }`
    }
}

const book1 = new Book('The Hobbit', 'J.R.R. Tolkien', 295, false)
const book2 = new Book('The Hobbit 2', 'J.R.R. Tolkien', 300, true)
addBookToLibrary(book1)
addBookToLibrary(book2)
paintBooks()

function createNewCard(book) {
    const newCard = document.createElement('div')
    newCard.className = 'card'
    newCard.dataset.id = book.id;

    const newCardContent = createNewCardContent(book)
    const newCardActions = createNewCardActions(book)
    newCard.appendChild(newCardContent)
    newCard.appendChild(newCardActions)
    return newCard
}

function createNewCardActions(book) {
    const newCardActions = document.createElement('div')
    newCardActions.className = 'card-actions'
    const newButtonEliminar = document.createElement('button')
    const newImgEliminar = document.createElement('img')
    newImgEliminar.className = "remove-book"
    newImgEliminar.src = './imgs/book-remove-outline.svg'
    newButtonEliminar.addEventListener('click', () => {
        deleteBook(book.id)
        const cards = document.querySelectorAll(".card")
        cards.forEach(node => {
            if(node.dataset.id === String(book.id)){
                cardToRemove = node
            };
        })

        cardContainter.removeChild(cardToRemove)
    })
    newButtonEliminar.appendChild(newImgEliminar)

    const newButtonReaded = document.createElement('button')
    newButtonReaded.className = 'readed'
    const newImgReaded = document.createElement('img')
    checkReadedImage(book.readed, newImgReaded)
    newImgReaded.addEventListener('click', (event) => {
        toggleReaded(event)
    })
    newButtonReaded.appendChild(newImgReaded)

    newCardActions.append(newButtonEliminar, newButtonReaded)
    return newCardActions
}

function deleteBook(id) {
    myLibrary = myLibrary.filter(book => book.id !== id)
}

function checkReadedImage(readed, newImgReaded) {
    if(readed) {
        newImgReaded.className = 'readed'
        newImgReaded.src = './imgs/bookmark-check-outline.svg'
    } else {
        newImgReaded.className = 'not-readed'
        newImgReaded.src = './imgs/bookmark-outline.svg'
    }
}

function createNewCardContent(book) {
    const newCardContent = document.createElement('div')
    newCardContent.className = 'card-content'
    createNewElement(book.title, book.author, book.pages + ' pages', book.readed ? 'Leido' : 'Sin leer')
    
    function createNewElement(...inputs) {
        inputs.forEach(input => {
            const element = document.createElement('p')
            element.innerText = input
            newCardContent.append(element)
        })
    }

    return newCardContent
}

function toggleReaded (event) {
    const card = event.target.parentNode.parentNode.parentNode
    let id = card.dataset.id
    myLibrary.forEach(book => {
        if(Number(book.id) === Number(id)){
            book.readed=!book.readed;
        }
    })
    
    if(event.target.className==='readed'){
        event.target.className = 'not-readed'
        event.target.src = './imgs/bookmark-outline.svg'
        card.firstChild.children[3].textContent = 'Sin leer'
    }else{
        event.target.className = 'readed'
        event.target.src = './imgs/bookmark-check-outline.svg'
        card.firstChild.children[3].textContent = 'Leido'
    }
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

    let title = document.querySelector('#title')
    let author = document.querySelector('#author')
    let pages = document.querySelector('#numPages')
    let readed = document.querySelector('#readed')
    
    const newBook = new Book(title.value, author.value, pages.value, readed.checked)
    addBookToLibrary(newBook)
    paintNewBook(newBook)
    title.value = ''
    author.value = ''
    pages.value = ''
    readed.checked = false
    dialog.close()
})

function addBookToLibrary(book) {
    myLibrary.push(book)
}

function paintBooks() {
    myLibrary.forEach((book) => {
        paintNewBook(book)
    })
}

function paintNewBook(book) {
    cardContainter.appendChild(createNewCard(book))
}