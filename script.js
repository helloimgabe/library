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
        console.log(bookId);
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

function Books(title, author, pages, read) {
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor")
    }

    this.title = title,
        this.author = author,
        this.pages = pages,
        this.read = read,
        this.id = self.crypto.randomUUID();
}

function addBookToLibrary(title, author, pages, read) {
    myLibrary.push(new Books(title, author, pages, read));
}

function displayBooks() {
    myLibrary.forEach((myLibrary) => {

        const newCard = document.createElement("div");
        newCard.className = "card";
        newCard.id = myLibrary.id;
        mainGrid.appendChild(newCard);

        const titleEle = document.createElement("div");
        titleEle.textContent = myLibrary.title;
        titleEle.className = "card-text";
        newCard.appendChild(titleEle);

        const authorEle = document.createElement("div");
        authorEle.textContent = myLibrary.author;
        authorEle.className = "card-text";
        newCard.appendChild(authorEle);

        const pagesEle = document.createElement("div");
        pagesEle.textContent = `${myLibrary.pages} pages`;
        pagesEle.className = "card-text";
        newCard.appendChild(pagesEle);

        const readLabel = document.createElement("div");
        readLabel.textContent = "Read: ";
        newCard.appendChild(readLabel);

        const readBttn = document.createElement("input");
        const readVal = myLibrary.read;
        readBttn.className = "checkbox";
        readBttn.type = "checkbox";
        if (readVal == true) {
            readBttn.checked = true;
        }
        else {
            readBttn.checked = false;
        }
        readLabel.appendChild(readBttn);

        const delBttn = document.createElement("button");
        delBttn.type = "button";
        delBttn.className = "delBttn";
        delBttn.textContent = "Delete";
        newCard.appendChild(delBttn);
    })

    console.table(myLibrary);
}