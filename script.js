'use strict';

const library = [];

const formNewBook = document.querySelector("form");

const bookTitle = document.querySelector("#bookTitle").value;
const bookAuthor = document.querySelector("#bookAuthor").value;
//the + converts string to number
const bookPages = +document.querySelector("#bookPages").value;

formNewBook.addEventListener("submit", (e) => {
    //stop form from refreshing the page
    e.preventDefault();
    //isRead is put here to refresh if the selection is changed
    const isRead = !!document.querySelector("#isRead").checked;

    addToLibrary(new book(bookTitle, bookAuthor, bookPages, isRead));

})

function book(title, author, numberOfPages, isRead)
{
    this.title = title;
    this.author = author;
    this.numberOfPages = numberOfPages;
    this.isRead = isRead;
};

//return book's info
book.prototype.info = function()
{
    return `${this.title} by ${this.author}, ${this.numberOfPages} pages, ` +
            `${this.isRead === true? "Already read" : "Not read Yet"}.`;
};

//read or unread a book
book.prototype.toggleRead = function()
{
    this.isRead = !this.isRead;
};

function addToLibrary(newBook)
{
    library.push(newBook);
};

const book1 = new book("Title", "Author", 200, false);
console.log(book1.info());