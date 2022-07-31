import {createCartCard,
        createAndAddMessagePopup
} from './create.js';

export const ifBookInCart = function(bookTitle) {
    for (let cartCard of document.querySelector('.cart-slider').children) {
        if (bookTitle === cartCard.querySelector('.cart-card-title').innerHTML) {
            return true;
        }
    }
    return false;
}

export const increaseBookAmountInArray = function(bookTitleString, booksArray) {
    for (let bookObj of booksArray) {
        if (bookTitleString === bookObj.title) {
            bookObj.amount += 1;
        }
    }
}

export const increaseBookAmount = function(bookTitle) {
    for (let cartCard of document.querySelector('.cart-slider').children) {
        if (bookTitle === cartCard.querySelector('.cart-card-title').innerHTML) {
            let currentBookAmountElement = cartCard.querySelector('.cart-card-summary').firstElementChild.firstElementChild;
            currentBookAmountElement.innerHTML =  Number(currentBookAmountElement.innerHTML) + 1;
            let bookPrice = cartCard.querySelector('.cart-card-summary').firstElementChild.lastElementChild.innerHTML.slice(0,-1);
            let currentTotalPriceElement = document.querySelector('.cart-confirm-button').firstElementChild;
            currentTotalPriceElement.innerHTML = Number(currentTotalPriceElement.innerHTML.slice(0,-1)) + Number(bookPrice) + '$';
            //work with Array booksInCart
            const booksInCart = JSON.parse(localStorage.getItem('booksInCart'));
            increaseBookAmountInArray(bookTitle, booksInCart);
            localStorage.setItem('booksInCart', JSON.stringify(booksInCart));
        }
    }
}

export const getBookFromArray = function(bookTitleString, booksArray) {
    for (let bookObj of booksArray) {
        if (bookTitleString === bookObj.title) {
            return bookObj;
        }
    }
}

export const deleteBookfromArray = function(bookTitleString, booksArray) {
    const modifiedArray = booksArray.filter(bookObj => bookObj.title !== bookTitleString);
    return modifiedArray;
}

export const addBookToCart = function(bookObj) {
    bookObj.amount = 1;
    const cartCard = createCartCard(bookObj);
    document.querySelector('.cart').hidden = false;
    document.querySelector('.cart-slider').append(cartCard);
    const bookPrice = cartCard.querySelector('.cart-card-summary').firstElementChild.lastElementChild.innerHTML.slice(0,-1);
    let currentTotalPriceElement = document.querySelector('.cart-confirm-button').firstElementChild;
    currentTotalPriceElement.innerHTML = Number(currentTotalPriceElement.innerHTML.slice(0,-1)) + Number(bookPrice) + '$';
    //work with Array booksInCart
    const booksInCart = JSON.parse(localStorage.getItem('booksInCart'));
    booksInCart.push(bookObj);
    localStorage.setItem('booksInCart', JSON.stringify(booksInCart));
}

export const booksInCart = function() {
    //initialize Local Storage
    const booksInCartArray = JSON.parse(localStorage.getItem('booksInCart')) ?? [];
        if (booksInCartArray.length === 0) {
            localStorage.setItem('booksInCart', JSON.stringify(booksInCartArray));
        }
    return booksInCartArray;
}

export const checkCart = function() {
    const TITLE = 'Your cart is empty!';
    const MESSAGE = 'Please back to catalog and choose a book';
    const BUTTON = 'Ok';
    const LINK = 'https://ExIxIxS.github.io/book_shop/pages/main/';

    setTimeout( () => {
        if (booksInCart().length === 0) {
            createAndAddMessagePopup(TITLE, MESSAGE, BUTTON, LINK);
    }},
    200)
}