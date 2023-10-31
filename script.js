const dialog = document.querySelector('dialog')
const addBtn = document.querySelector('.addBook')
const closeButton = document.querySelector("dialog button")

console.log(dialog);
console.log(addBtn);

const myLibrary = [];

function Book(title, author, pages) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readed = false;

    this.info = function() {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${readed ? 'readed' : 'not readed yet'}`;
    }
}

function addBookToLibrary(book) {
    myLibrary.push(book)
}

const book1 = new Book('The Hobbit', 'J.R.R. Tolkien', 295 );
addBookToLibrary(book1);


addBtn.addEventListener('click', () => {
    dialog.show()
})

// "Close" button closes the dialog
closeButton.addEventListener("click", () => {
    dialog.close();
});