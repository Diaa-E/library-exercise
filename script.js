'use strict';

function book(title, author, numberOfPages, isRead)
{
    this.title = title;
    this.author = author;
    this.numberOfPages = numberOfPages;
    this.isRead = isRead;
};

book.prototype.info = function()
{
    return `${title} by ${author}, ${numberOfPages} pages, ` +
            `${isRead === true? "Already read" : "Not read Yet"}.`
}