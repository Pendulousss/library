let bookname = document.querySelector("#book_name");
let author = document.querySelector("#author");
let pages = document.querySelector("#pages");
let readstatus = document.querySelector("#status");
const newbookbutton = document.querySelector("#newbookbutton");
const darkModeToggle = document.querySelector("#darkModeToggle");
const closedialog = document.querySelector("#modalclose");
const sidebar = document.querySelector(".sidebar");
const container = document.querySelector("#container");
const form = document.querySelector("form");
const myLibrary = [];

// Fixed close dialog with animation
closedialog.addEventListener('click', () => { 
    sidebar.classList.add('closing');
    sidebar.addEventListener('animationend', () => {
        sidebar.classList.remove('closing');
        sidebar.close();
    }, { once: true });
});

darkModeToggle.addEventListener('click', () => {
    if (document.documentElement.getAttribute('data-theme') === 'dark') {
        document.documentElement.removeAttribute('data-theme');
        darkModeToggle.querySelector("svg").style.filter = 'invert(0)';
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        darkModeToggle.querySelector("svg").style.filter = 'invert(1)';
    }
});

newbookbutton.addEventListener('click', () => {
    sidebar.showModal();
});

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const newBook = new Book(bookname.value, author.value, pages.value, readstatus.value);
    myLibrary.push(newBook);
    addBookToMyLib(newBook.id);
    clearform();
})

class Book {
    constructor(name, author, pages, status) {
        this.name = name;
        this.author = author;
        this.pages = pages;
        this.status = status;
        this.id = crypto.randomUUID();
    }
}

myLibrary.push(new Book("Dune", "Frank Herbert", "500", "Unread"));
myLibrary.push(new Book('Three Body Problem', 'Cixin Liu', '400', 'Read'));
myLibrary.push(new Book('Project Hail Mary', 'Andy Weir', '268', 'Read'));
myLibrary.push(new Book('The left Hand of Darkness', 'Ursula K. LeGuin', '350', 'Reading'));

function createBookElement(book, isNew = false) {
    const newbook = document.createElement("div");
    newbook.className = isNew ? 'book book-new' : 'book';
    newbook.setAttribute('data-book-id', book.id);

    let bkremove = document.createElement("button");
    bkremove.className = "removebutton";
    bkremove.type = "button";
    bkremove.textContent = "X";
    bkremove.addEventListener('click', () => {
        removebook(book.id);
    });
    newbook.appendChild(bkremove);

    let bkname = document.createElement("p");
    bkname.className = "name";
    bkname.textContent = `Name: ${book.name}`;
    newbook.appendChild(bkname);

    let bkauthor = document.createElement("p");
    bkauthor.className = "author";
    bkauthor.textContent = `Author: ${book.author}`;
    newbook.appendChild(bkauthor);

    let bkpages = document.createElement("p");
    bkpages.className = "pages";
    bkpages.textContent = `Page count: ${book.pages}`;
    newbook.appendChild(bkpages);

    let nbbuttons = document.createElement("div");
    nbbuttons.className = "bookbuttons";
    newbook.appendChild(nbbuttons);

    let bkstatus = document.createElement("button");
    bkstatus.className = "status";
    bkstatus.textContent = book.status;
    bkstatus.type = "button";
    if (book.status === 'Read') { bkstatus.style.color = 'var(--positive-color)'; }
    else if (book.status === 'Reading') { bkstatus.style.color = 'var(--blue)'; }
    else if (book.status === 'Unread') { bkstatus.style.color = 'var(--yellow)'; }
    else { bkstatus.style.color = 'var(--text-color)'; }
    bkstatus.addEventListener('click', () => {
        if (book.status === 'Read' || bkstatus.style.backgroundColor === 'var(--positive-color)') {
            book.status = 'Unread';
            bkstatus.style.color = 'var(--yellow)';
        } else if (book.status === 'Read' || book.status === 'Unread') {
            book.status = 'Reading';
            bkstatus.style.color = 'var(--blue)';
        } else {
            book.status = 'Read';
            bkstatus.style.color = 'var(--positive-color)';
        }
        bkstatus.textContent = book.status;
    });
    nbbuttons.appendChild(bkstatus);
    return newbook;
}

function addBookToMyLib(newBookId = null) {
    if (newBookId) {
        // Only add the new book
        const newBook = myLibrary[myLibrary.length - 1];
        const bookElement = createBookElement(newBook, true);
        container.appendChild(bookElement);
    } else {
        // Initial load - add all books without animation
        container.innerHTML = "";
        myLibrary.forEach(book => {
            const bookElement = createBookElement(book, false);
            container.appendChild(bookElement);
        });
    }
};

function clearform() {
    bookname.value = '';
    author.value = '';
    pages.value = '';
    readstatus.value = 'unread';
}

function removebook(bookId) {
    const bookIndex = myLibrary.findIndex(book => book.id === bookId);
    if (bookIndex !== -1) {
        const bookElement = document.querySelector(`[data-book-id="${bookId}"]`);
        if (bookElement) {
            bookElement.classList.add('book-remove');
            bookElement.addEventListener('animationend', () => {
                myLibrary.splice(bookIndex, 1);
                bookElement.remove();
            });
        }
    }
}

function openDialog() {
    const dialog = document.querySelector('dialog');
    dialog.classList.remove('closing'); // Remove any closing class
    dialog.showModal();
}

function closeDialog() {
    const dialog = document.querySelector('dialog');
    dialog.classList.add('closing');
    
    setTimeout(() => {
        dialog.close();
        dialog.classList.remove('closing');
    }, 300);
}

addBookToMyLib();