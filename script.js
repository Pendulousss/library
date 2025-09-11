let bookname = document.querySelector("#book_name");
let author = document.querySelector("#author");
let pages = document.querySelector("#pages");
let readstatus = document.querySelector("#status");
const newbookbutton = document.querySelector("#newbookbutton");
const sidebar = document.querySelector(".sidebar");
const container = document.querySelector("#container");
const form = document.querySelector("form");
const myLibrary = [];

newbookbutton.addEventListener('click', () => {
    sidebar.showModal();
});

form.addEventListener("submit",(e)=>{
    e.preventDefault();
    myLibrary.push(new Book(bookname.value,author.value,pages.value,readstatus.value));
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

function addBookToMyLib(){
    container.innerHTML = "";
    myLibrary.forEach(book => {
        
   
        const newbook = document.createElement("div");
        newbook.classList = "book";
        newbook.style.border = "3px solid aquamarine";
        newbook.style.borderRadius = "10%";
        newbook.style.padding = "16px";
        newbook.style.boxShadow = "2px 2px 4px black";
        newbook.setAttribute('data-book-id', book.id);
        container.appendChild(newbook);


            let bname = document.createElement("p");
            bname.classList = "name";
            bname.textContent = `Name: ${book.name}`;
            newbook.appendChild(bname);
            let bauthor = document.createElement("p");
            bauthor.classList = "author";
            bauthor.textContent =`Author: ${book.author}`;
            newbook.appendChild(bauthor)
            let bpages = document.createElement("p");
            bpages.classList = "pages";
            bpages.textContent = `Page count: ${book.pages}`;
            newbook.appendChild(bpages)


            let bstatus = document.createElement("button");
            bstatus.classList = "status";
            bstatus.type = "button";
            bstatus.style.padding = "8px";
            bstatus.style.marginRight = "16px";
            bstatus.style.width = "60px"
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
            bremove.style.padding = "8px";
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