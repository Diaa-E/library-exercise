'use strict';

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
            `${this.isRead === true? "Already read" : "Not read Yet"}.`
}

//read or unread a book
book.prototype.toggleRead = function()
{
    this.isRead = !this.isRead;
}