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

closedialog.addEventListener('click', () => {sidebar.close();});

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
        newbook.style.padding = "8px";
        newbook.style.width = '300px'
        newbook.style.height = "200px"
        newbook.style.boxShadow = "0 0 12px 4px var(--shadow-color)";
        newbook.style.borderRadius = '16px';
        newbook.style.display = "flex";
        newbook.style.flexDirection = 'column';
        newbook.style.backgroundColor = 'var(--theme-color)';
        newbook.style.color = 'var(--text-color)';
        newbook.style.transition = 'all 0.2s ease-out';
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
            bremove.style.boxShadow = '0 0 8px var(--shadow-color)'
            bremove.style.cursor = 'pointer';
            bremove.style.backgroundColor = 'var(--theme-color)';
            bremove.style.color = 'var(--text-color)';
            bremove.style.padding = '8px 12px';
            bremove.addEventListener('click', () => {
                removebook(book.id);
            });
            newbook.appendChild(bremove);

            let bname = document.createElement("p");
            bname.classList = "name";
            bname.textContent = `Name: ${book.name}`;
            bname.style.padding = '0';
            bname.style.margin = '8px';
            bname.style.color = 'var(--text-color)';
            bname.style.fontWeight = '700';
            newbook.appendChild(bname);
            let bauthor = document.createElement("p");
            bauthor.classList = "author";
            bauthor.textContent =`Author: ${book.author}`;
            bauthor.style.margin = '8px';
            bauthor.style.padding = '0';
            bauthor.style.color = 'var(--text-color)';
            bauthor.style.fontWeight = '700';
            newbook.appendChild(bauthor)
            let bpages = document.createElement("p");
            bpages.classList = "pages";
            bpages.textContent = `Page count: ${book.pages}`;
            bpages.style.margin = '8px';
            bpages.style.padding = '0';
            bpages.style.color = 'var(--text-color)';
            bpages.style.fontWeight = '700';
            newbook.appendChild(bpages)

            let nbbuttons = document.createElement("div");
            nbbuttons.style.display = "flex";
            nbbuttons.style.justifyContent = "flex-end";
            newbook.appendChild(nbbuttons);

            let bstatus = document.createElement("button");
            bstatus.classList = "status";
            bstatus.type = "button";
            bstatus.style.border = 'none';
            bstatus.style.padding = "12px";
            bstatus.style.margin = "16px";
            bstatus.style.width = "100px"
            bstatus.style.borderRadius = "24px";
            bstatus.textContent = book.status;
            bstatus.style.backgroundColor = 'var(--theme-color)';
            bstatus.style.color = 'var(--text-color)';
            bstatus.style.boxShadow = '0 0 8px var(--shadow-color)';
            bstatus.style.cursor = 'pointer';
            bstatus.style.fontWeight = '700';
            bstatus.addEventListener('click', () => {
                if (book.status === 'Read' || bstatus.style.backgroundColor === 'green') {
                    book.status = 'Unread';
                    bstatus.style.color = 'var(--text-color)';
                } else if (book.status === 'Read' || book.status === 'Unread'){
                    book.status = 'Reading';
                    bstatus.style.color = 'blue';
                } else {
                    book.status = 'Read';
                    bstatus.style.color = 'green';
                    

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