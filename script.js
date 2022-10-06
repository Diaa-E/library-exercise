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

    //Book color is added as a property to 
    //avoid random shuffling when updating shelf
    const R = getRandomColor();
    const G = getRandomColor();
    const B = getRandomColor();

    addToLibrary(new book(
        bookTitle, 
        bookAuthor, 
        bookPages, 
        isRead, 
        `rgb(${R}, ${G}, ${B})`,
        getFontColor(R, G, B)));
})

function book(title, author, numberOfPages, isRead, color, fontColor)
{
    this.title = title;
    this.author = author;
    this.numberOfPages = numberOfPages;
    this.isRead = isRead;
    this.color = color;
    this.fontColor = fontColor;
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

        const currentBook = document.createElement("p");
        currentBook.classList.add("book");
        //assign book's color
        currentBook.style.backgroundColor = library[i].color;
        currentBook.style.color = library[i].fontColor;

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

function getFontColor(R, G, B)
{
    //if book color bright return dark font
    if(R > 150)
    {
        return "black";
    }
    else if(G > 150)
    {
        return "black";
    }
    else if (B > 150)
    {
        return "black";
    }

    //return bright font
    return "white";
}

function addRemoveButton(buttonIndex)
{
    const btnRemove = document.createElement('button');
    btnRemove.innerText = "Remove";
    btnRemove.setAttribute("data-index", buttonIndex);
    btnRemove.classList.add("remove");

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