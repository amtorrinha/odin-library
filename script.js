const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        let readString = this.read ? "already read" : "not read yet";
        return `${this.title} by ${this.author}, ${this.pages} pages, ${readString}`
    }
    this.changeRead = function() {
        this.read = this.read ? false : true;
    }
}

function addBookToLibrary(title, author, pages, read) {
    let book = new Book(title, author, pages, read);
    myLibrary.push(book);
    displayLibrary();
}

let libraryDiv = document.querySelector('.books');

function displayLibrary() {
    libraryDiv.innerHTML = '';
    myLibrary.forEach((book, index) => {
        let bookDiv = document.createElement("div");
        // Book Info
        let bookInfo = document.createElement("p");
        bookInfo.innerHTML = book.info();
        // Remove Button
        let removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.book_id = index;
        removeButton.addEventListener("click", function(e) {
            removeBook(e.target.book_id);
        });
        // Read Button
        let readButton = document.createElement("button");
        readButton.textContent = book.read ? "Unread Book" : "Read Book";
        readButton.book_id = index;
        readButton.addEventListener("click", function(e) {
            readBook(e.target.book_id);
        });

        bookDiv.appendChild(bookInfo);
        bookDiv.appendChild(removeButton);
        bookDiv.appendChild(readButton);
        libraryDiv.appendChild(bookDiv);
    });
}

function removeBook(index) {
    myLibrary.splice(index, 1);
    displayLibrary();
}

function readBook(index) {
    myLibrary[index].changeRead();
    displayLibrary();
}

// Dialog and Form
const dialog = document.querySelector("dialog");
const showButton = document.querySelector(".new-book");
const closeButton = document.querySelector("dialog button");
showButton.addEventListener("click", () => {
  dialog.showModal();
});
closeButton.addEventListener("click", () => {
    dialog.close();
});

const form = document.getElementById('myForm');
form.addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the default form submission
    handleFormSubmission();
    // Reset the form after submission
    form.reset();
});

function handleFormSubmission() {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const readButtons = document.getElementsByName('book_read');
    let readValue;
    for(const radioButton of readButtons) {
        if (radioButton.checked) {
            readValue = radioButton.value;
            break;
        }
    }
    addBookToLibrary(title, author, pages, JSON.parse(readValue));
}

// Create Dummy Book and Display
addBookToLibrary("Dummy Title", "Dummy Author", "69", false);

