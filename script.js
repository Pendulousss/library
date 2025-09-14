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

closedialog.addEventListener('click', () => { sidebar.close(); });

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
    myLibrary.push(new Book(bookname.value, author.value, pages.value, readstatus.value));
    addBookToMyLib();
    clearform();
    sidebar.close();
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

function addBookToMyLib() {
    container.innerHTML = "";
    myLibrary.forEach(book => {


        const newbook = document.createElement("div");
        newbook.className = "book";
        newbook.setAttribute('data-book-id', book.id);
        container.appendChild(newbook);

        //from here on... bk for book and nb for new book

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
        newbook.appendChild(bkauthor)

        let bkpages = document.createElement("p");
        bkpages.className = "pages";
        bkpages.textContent = `Page count: ${book.pages}`;
        newbook.appendChild(bkpages)

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

    });
}

function clearform() {
    bookname.value = '';
    author.value = '';
    pages.value = '';
    readstatus.value = 'unread';
}



function removebook(bookId) {
    const bookIndex = myLibrary.findIndex(book => book.id === bookId);
    if (bookIndex !== -1) {
        myLibrary.splice(bookIndex, 1);
        addBookToMyLib();
    }
}

addBookToMyLib();