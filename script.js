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

    addToLibrary(new book(bookTitle, bookAuthor, bookPages, isRead));
})

function book(title, author, numberOfPages, isRead, order)
{
    this.title = title;
    this.author = author;
    this.numberOfPages = numberOfPages;
    this.isRead = isRead;
};

//return book's info
book.prototype.info = function()
{
    return `${this.title} by ${this.author}, ${this.numberOfPages} pages, `;
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
};

function removeFromLibrary(bookIndex)
{
    library.splice(bookIndex, 1);
    updateShelf();
};


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
        const R = getRandomColor();
        const G = getRandomColor();
        const B = getRandomColor();

        const currentBook = document.createElement("p");
        currentBook.classList.add("book");
        //generate random book color
        currentBook.style.backgroundColor = `rgb(${R}, ${G}, ${B})`;
        //invert background color and use it as font for visiblity
        currentBook.style.color = `rgb(${256 - R}, ${256 - G}, ${256 - B})`;
        currentBook.innerText = library[i].info();
        currentBook.appendChild(addReadButton(i));
        currentBook.appendChild(addRemoveButton(i));
        divShelf.appendChild(currentBook);
    }
};

function getRandomColor()
{
    return Math.ceil(Math.random()*256);
}

function addRemoveButton(buttonIndex)
{
    const btnRemove = document.createElement('button');
    btnRemove.innerText = "Remove";
    btnRemove.setAttribute("data-index", buttonIndex);

    btnRemove.addEventListener('click', (e) =>{
        removeFromLibrary(+e.target.getAttribute("data-index"));
    });

    return btnRemove;
}

function addReadButton(buttonIndex)
{
    const btnRead = document.createElement('button')
    btnRead.innerText = `${library[buttonIndex].isRead? "Already read." : "Not read yet."}`;
    btnRead.setAttribute("data-index", buttonIndex);

    btnRead.addEventListener('click', () => {
        library[buttonIndex].toggleRead();
        updateShelf();
    });

    return btnRead;
}