const myLibrary = [];

const form = document.getElementById("form");
const addButton = document.querySelector("[data-open-modal]");
const closeButton = document.querySelector("[data-close-modal]");
const modal = document.querySelector("[data-modal]");
const mainGrid = document.querySelector(".main-grid");

addButton.addEventListener("click", () => {
    modal.showModal();
})

closeButton.addEventListener("click", () => {
    form.reset();
    modal.close();
})

/* Attr. Web Dev Simplified for modal click closing code */
modal.addEventListener("click", e => {
    const dialogDim = modal.getBoundingClientRect()
    if (
        e.clientX < dialogDim.left ||
        e.clientX > dialogDim.right ||
        e.clientY < dialogDim.top ||
        e.clientY > dialogDim.bottom
    ) {
        form.reset();
        modal.close();
    }
})

document.querySelector(".main-grid").addEventListener("click", (e) => {
    //Removes card from the DOM and the myLibrary array
    if (e.target.className == "delBttn") {
        const bookId = e.target.parentElement.id;
        const findBook = myLibrary.findIndex((element) => element.id === bookId);
        const remBook = myLibrary.splice(findBook, 1);
        e.target.parentElement.remove();
    }
    //Updates the read value for the targetted book in the myLibrary array
    if (e.target.className == "checkbox") {
        const bookId = e.target.parentElement.parentElement.id;
        const findBook = myLibrary.find((element) => element.id === bookId);
        if (e.target.checked) {
            findBook.read = true;
        }
        else {
            findBook.read = false;
        }
    }
})

form.addEventListener("submit", (e) => {
    modal.close();
    e.preventDefault();

    // 1. Capture form data
    const bookTitle = document.getElementById("book-title").value;
    const authorName = document.getElementById("author-name").value;
    const pageAmt = document.getElementById("page-amt").value;
    const read = document.getElementById("read").checked;

    // 2. Add the new book to the library array (addBookToLibrary)
    addBookToLibrary(bookTitle, authorName, pageAmt, read);

    // 3. Clear the existing display of cards on the page
    while (mainGrid.firstChild) {
        mainGrid.removeChild(mainGrid.firstChild);
    };

    // 4. Loop through the entire myLibrary array and display all books (displayBooks)
    displayBooks();

    // 5. Reset data in form fields after submission
    form.reset();
})

class Books {
    constructor(title, author, pages, read) {
        this.title = title,
            this.author = author,
            this.pages = pages,
            this.read = read,
            this.id = self.crypto.randomUUID();
    }

    createCardElement() {
        //Creates the main library card
        const newCard = document.createElement("div");
        newCard.className = "card";
        newCard.id = this.id;
       
        //Creates title ele using form data
        const titleEle = document.createElement("div");
        titleEle.textContent = this.title;
        titleEle.className = "card-text";
       
        //Creates author ele using form data
        const authorEle = document.createElement("div");
        authorEle.textContent = this.author;
        authorEle.className = "card-text";
       
        //Creates page count ele using form data
        const pagesEle = document.createElement("div");
        pagesEle.textContent = `${this.pages} pages`;
        pagesEle.className = "card-text";
       
        //Creates read checkbox label ele
        const readLabel = document.createElement("div");
        readLabel.className = "read-label"
        readLabel.textContent = "Read: ";
       
        //Creates read checkbox ele using form data
        const readBttn = document.createElement("input");
        const readVal = this.read;
        readBttn.className = "checkbox";
        readBttn.type = "checkbox";

        if (readVal == true) {
            readBttn.checked = true;
        }
        else {
            readBttn.checked = false;
        }

        const delBttn = document.createElement("button");
        delBttn.type = "button";
        delBttn.className = "delBttn";
        delBttn.textContent = "Delete";

        //Appends all created elements to the newCard
        newCard.appendChild(titleEle);
        newCard.appendChild(authorEle);
        newCard.appendChild(pagesEle);
        newCard.appendChild(readLabel);
        readLabel.appendChild(readBttn);
        newCard.appendChild(delBttn);

        return newCard;
    }
}

function addBookToLibrary(title, author, pages, read) {
    myLibrary.push(new Books(title, author, pages, read));
}

function displayBooks() {
    myLibrary.forEach((bookObj) => {
        const card = bookObj.createCardElement()
        mainGrid.appendChild(card)
    })
}