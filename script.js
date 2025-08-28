const myLibrary = [];

function Books(title, author, pages, bool) {
    let read = "not read yet";

    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor")
    }

    if (bool == true) {
        read = "already read";
    }

    this.title = title,
    this.author = author,
    this.pages = pages,
    this.bool = bool,
    this.id = self.crypto.randomUUID();
    this.info = function () {
        return `${title} by ${author}, ${pages} pages, ${read}.`
    };
}

function addBookToLibrary(title, author, pages, bool) {
   let newBook = new Books(title, author, pages, bool);
   myLibrary.push(newBook);
}

function removeBookFromLibrary(index) {

}