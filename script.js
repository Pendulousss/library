let bookname = document.querySelector("#book_name");
let author = document.querySelector("#author");
let pages = document.querySelector("#pages");
let readstatus = document.querySelector("#status");
const container = document.querySelector("#container");
const form = document.querySelector("form").addEventListener("submit",(e)=>{
    e.preventDefault();
    myLibrary.push(new Book(bookname.value,author.value,pages.value,readstatus.value));
    addBookToMyLib();
    clearform();
})


const myLibrary = [];

class Book {
    constructor(name, author, pages, status) {
        this.name = name;
        this.author = author;
        this.pages = pages;
        this.status = status;
        this.id = crypto.randomUUID();
    }
}

function addBookToMyLib(){
    container.innerHTML = '';
    myLibrary.forEach(book => {
        
   
        const newbook = document.createElement("div");
        newbook.classList = "book";
        newbook.setAttribute('data-book-id', book.id);
        container.appendChild(newbook);

            let bname = document.createElement("p");
            bname.classList = "name";
            bname.textContent = book.name;
            newbook.appendChild(bname);
            let bauthor = document.createElement("p");
            bauthor.classList = "author";
            bauthor.textContent = book.author;
            newbook.appendChild(bauthor)
            let bpages = document.createElement("p");
            bpages.classList = "pages";
            bpages.textContent = book.pages;
            newbook.appendChild(bpages)
            let bstatus = document.createElement("button");
            bstatus.classList = "status";
            bstatus.type = "button";
            bstatus.textContent = book.status;
            bstatus.addEventListener('click', () => {
                if (book.status === 'read') {
                    book.status = 'unread';
                } else {
                    book.status = 'read';
                }
                bstatus.textContent = book.status;
            });
            newbook.appendChild(bstatus);
            let bremove = document.createElement("button");
            bremove.classList = "removebutton";
            bremove.type = "button";
            bremove.textContent = "Remove";
            bremove.addEventListener('click', () => {
                removebook(book.id);
            });
            newbook.appendChild(bremove);
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