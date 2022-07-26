import {createCompleteElement,
        createHeader,
        createCartCard,
        createCartSection,
        createCatalogCard,
        createCatalogSection,
        createMain,
        createFooter,
        createCatalogPage
} from '../../assets/js/create.js';

const booksInCart = [];

const ifBookInCart = function(bookTitle) {
    for (let cartCard of document.querySelector(".cart-slider").children) {
        if (bookTitle === cartCard.querySelector('.cart-card-title').innerHTML) {
            return true;
        }
    }
    return false;
}

const increaseBookAmount = function(bookTitle) {
    for (let cartCard of document.querySelector('.cart-slider').children) {
        if (bookTitle === cartCard.querySelector('.cart-card-title').innerHTML) {
            let currentBookAmountElement = cartCard.querySelector('.cart-card-summary').firstElementChild.firstElementChild;
            currentBookAmountElement.innerHTML =  Number(currentBookAmountElement.innerHTML) + 1;
            let bookPrice = cartCard.querySelector('.cart-card-summary').firstElementChild.lastElementChild.innerHTML.slice(0,-1);
            let currentTotalPriceElement = document.querySelector('.cart-confirm-button').firstElementChild;
            currentTotalPriceElement.innerHTML = Number(currentTotalPriceElement.innerHTML.slice(0,-1)) + Number(bookPrice) + '$';
        }
    }
    return false;
}

const addBookToCart = function(bookTitle, booksArray) {
    for (let book of booksArray) {
        if (bookTitle === book.title) {
            book.amount = 1;
            const cartCard = createCartCard(book);
            document.querySelector('.cart').hidden = false;
            document.querySelector('.cart-slider').append(cartCard);
            let bookPrice = cartCard.querySelector('.cart-card-summary').firstElementChild.lastElementChild.innerHTML.slice(0,-1);
            let currentTotalPriceElement = document.querySelector('.cart-confirm-button').firstElementChild;
            currentTotalPriceElement.innerHTML = Number(currentTotalPriceElement.innerHTML.slice(0,-1)) + Number(bookPrice) + '$';
        }
    }
}

const catalogUserInteractive = function(event, booksArray) {
    switch (event.target.className) {
    // click on button 'add book to cart'
    case 'card-button-add':
        const cardElement = event.target.parentElement.parentElement;
        const bookTitle = cardElement.querySelector('.card-title').innerHTML;
        if (ifBookInCart(bookTitle)) {
            increaseBookAmount(bookTitle);
        } else {
            addBookToCart(bookTitle, booksArray);
        };
        break;
    // click on the button 'Show more' or image
    case ('card-button-show'):
    case ('image'):
        alert('COOL!');
        break;
    }
}

fetch('../../assets/json/books.json') //path to the file with json data
        .then(response => {
            return response.json();
        })
        .then(books => {
            document.body.prepend(createCatalogPage(books, booksInCart));
            document.querySelector(".card-container").addEventListener("click", event => catalogUserInteractive(event, books));
        });

