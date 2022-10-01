'use strict';

const library = [];

const formNewBook = document.querySelector("form");
const divShelf = document.querySelector(".shelf");

formNewBook.addEventListener("submit", (e) => {
    //stop form from refreshing the page
    e.preventDefault();

    //elements are put here to refresh if the input is changed
    const bookTitle = document.querySelector("#bookTitle").value;
    const bookAuthor = document.querySelector("#bookAuthor").value;
    //the + converts string to number
    const bookPages = +document.querySelector("#bookPages").value;
    const isRead = !!document.querySelector("#isRead").checked;

    addToLibrary(new book(bookTitle, bookAuthor, bookPages, isRead, library.length));
})

function book(title, author, numberOfPages, isRead, order)
{
    this.title = title;
    this.author = author;
    this.numberOfPages = numberOfPages;
    this.isRead = isRead;
    this.order = order;
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

    const bookBody = document.createElement("p");
    
    bookBody.innerText = `${newBook.title} by ${newBook.author}, ${newBook.numberOfPages} pages, ` +
    `${newBook.isRead === true? "Already read" : "Not read Yet"}.`;

    divShelf.appendChild(bookBody);
};