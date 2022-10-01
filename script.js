'use strict';

const library = [];

const formNewBook = document.querySelector("form");

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

//Add book data to the array
function addToLibrary(newBook)
{
    library.push(newBook);
    updateShelf();

    //addToShelf(newBook);
    //create a visual of the book
};

function removeFromLibrary(bookIndex)
{
    library.splice(bookIndex, 1);
    updateShelf();
};

/*//Add visual of the book
function addToShelf(newBook)
{
    const pBook = document.createElement("p");
    pBook.innerText = newBook.info();
    
    addRemoveButton(newBook, pBook);

    //add to shelf
    divShelf.appendChild(pBook);

};

function addRemoveButton(newBook, pBook)
{
    const btnRemoveBook = document.createElement("button");
    btnRemoveBook.setAttribute("data-index", newBook.order);
    btnRemoveBook.innerText = "Remove";
    pBook.appendChild(btnRemoveBook);
}

function removeBook(bookIndex)
{
    library.splice(bookIndex, 1);

}*/


//This is a replacement to adding books once they are created
//When a book is removed using the previous methods, the data-index property
//is no longer accurate, it can be refreshed but that's probably the same as
//looping throught them in the new function but the new function is simpler
function updateShelf()
{
    const divShelf = document.querySelector(".shelf");

    //clear all elements
    //better than HTML as it doesn't invoke HTML parser
    divShelf.innerText = '';

    for (let i = 0; i < library.length; i++)
    {
        const currentBook = document.createElement("p");
        currentBook.innerText = library[i].info();
        divShelf.appendChild(currentBook);
    }
};