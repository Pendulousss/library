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

myLibrary.push(new Book("Dune","Frank Herbert","500","Unread"));
myLibrary.push(new Book('Three Body Problem','Cixin Liu','400','Read'));
myLibrary.push(new Book('Project Hail Mary','Andy Weir','268','Read'));
myLibrary.push(new Book('The left Hand of Darkness','Ursula K. LeGuin','350','Unread'));

function addBookToMyLib(){
    container.innerHTML = "";
    myLibrary.forEach(book => {
        
   
        const newbook = document.createElement("div");
        newbook.classList = "book";
        // newbook.style.border = "1px solid gray";
        newbook.style.padding = "8px";
        newbook.style.width = '300px'
        newbook.style.height = "200px"
        newbook.style.boxShadow = "0 0 8px gray";
        newbook.style.borderRadius = '16px';
        newbook.style.display = "flex";
        newbook.style.flexDirection = 'column';
        newbook.style.backgroundColor = "aliceblue";
        newbook.setAttribute('data-book-id', book.id);
        container.appendChild(newbook);


            let bremove = document.createElement("button");
            bremove.classList = "removebutton";
            bremove.type = "button";
            bremove.textContent = "X";
            bremove.style.fontWeight = '900';
            bremove.style.borderRadius = '100%';
            bremove.style.border = 'none';
            bremove.style.alignSelf = "end";
            bremove.style.boxShadow = '0 0 8px gray'
            bremove.style.cursor = 'pointer';
            bremove.style.backgroundColor = 'aliceblue'
            bremove.addEventListener('click', () => {
                removebook(book.id);
            });
            newbook.appendChild(bremove);

            let bname = document.createElement("p");
            bname.classList = "name";
            bname.textContent = `Name: ${book.name}`;
            bname.style.padding = '0';
            bname.style.margin = '8px';
            newbook.appendChild(bname);
            let bauthor = document.createElement("p");
            bauthor.classList = "author";
            bauthor.textContent =`Author: ${book.author}`;
            bauthor.style.margin = '8px';
            bauthor.style.padding = '0';
            newbook.appendChild(bauthor)
            let bpages = document.createElement("p");
            bpages.classList = "pages";
            bpages.textContent = `Page count: ${book.pages}`;
            bpages.style.margin = '8px';
            bpages.style.padding = '0';
            newbook.appendChild(bpages)

            let nbbuttons = document.createElement("div");
            nbbuttons.style.display = "flex";
            nbbuttons.style.justifyContent = "flex-end";
            newbook.appendChild(nbbuttons);

            let bstatus = document.createElement("button");
            bstatus.classList = "status";
            bstatus.type = "button";
            bstatus.style.border = 'none';
            bstatus.style.padding = "8px";
            bstatus.style.margin = "16px";
            bstatus.style.width = "65px"
            bstatus.style.borderRadius = "24px";
            bstatus.textContent = book.status;
            bstatus.style.backgroundColor = 'aliceblue';
            bstatus.style.boxShadow = '0 0 8px gray'
            bstatus.style.cursor = 'pointer';
            bstatus.addEventListener('click', () => {
                if (book.status === 'Read' || bstatus.style.backgroundColor === 'green') {
                    book.status = 'Unread';
                    bstatus.style.backgroundColor = 'aliceblue';
                    bstatus.style.color = 'black';

                } else if (book.status === 'Read' || book.status === 'Unread'){
                    book.status = 'Reading';
                    bstatus.style.backgroundColor = 'gray';
                    bstatus.style.color = 'white';
                } else {
                    book.status = 'Read';
                    bstatus.style.backgroundColor = 'black';
                    bstatus.style.color = 'white';

                } 
                bstatus.textContent = book.status;
            });
            nbbuttons.appendChild(bstatus);

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