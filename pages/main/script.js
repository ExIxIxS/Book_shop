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

const getBookFromArray = function(bookTitle, booksArray) {
    for (let book of booksArray) {
        if (bookTitle === book.title) {
            return book;
        }
    }
}

const addBookToCart = function(book) {
            book.amount = 1;
            const cartCard = createCartCard(book);
            document.querySelector('.cart').hidden = false;
            document.querySelector('.cart-slider').append(cartCard);
            const bookPrice = cartCard.querySelector('.cart-card-summary').firstElementChild.lastElementChild.innerHTML.slice(0,-1);
            let currentTotalPriceElement = document.querySelector('.cart-confirm-button').firstElementChild;
            currentTotalPriceElement.innerHTML = Number(currentTotalPriceElement.innerHTML.slice(0,-1)) + Number(bookPrice) + '$';
}

const createAndAddPopup = function(book) {
    const popup = createCompleteElement('div', 'popup-body');
    const popupWindow = createCompleteElement('div', 'popup-window');
    const popupImage = createCompleteElement('div', 'popup-image');
    const image = createCompleteElement('img', 'image');
    image.src = book.imageLink;
    image.alt = 'book cover'
    image.width = '320';
    image.height = '460';
    const popupContent = createCompleteElement('div', 'popup-content');
    const popupTitle = createCompleteElement('h2', 'popup-title', book.title);
    const popupDescription = createCompleteElement('h3', 'popup-description', book.description);
    const popupAuthor = createCompleteElement('h4', 'popup-author', book.author);
    const popupButton = createCompleteElement('div', 'popup-button-close', '<span class="material-icons icon-close" title="Close">cancel</span>');
    popupContent.append(popupTitle, popupDescription, popupAuthor);
    popupImage.append(image);
    popupWindow.append(popupImage, popupContent);
    popup.append(popupWindow, popupButton);
    document.querySelector('.catalog').prepend(popup);
}

const catalogUserInteractive = function(event, booksArray) {
    let cardElement;
    let book;
    switch (event.target.className) {
    // click on button 'add book to cart'
    case 'card-button-add':
        cardElement = event.target.parentElement.parentElement;
        book = getBookFromArray(cardElement.querySelector('.card-title').innerHTML, booksArray);
        if (ifBookInCart(book.title)) {
            increaseBookAmount(book.title);
        } else {
            addBookToCart(book);
        };
        break;
    // click on the button 'Show more'
    case ('card-button-show'):
        cardElement = event.target.parentElement;
        book = getBookFromArray(cardElement.querySelector('.card-title').innerHTML, booksArray);
        createAndAddPopup(book);
        break;
    // click on the image
    case ('image'):
        cardElement = event.target.parentElement.parentElement;
        book = getBookFromArray(cardElement.querySelector('.card-title').innerHTML, booksArray);
        createAndAddPopup(book);
        break;
    // click on the button 'Close PopUp'
    case ('material-icons icon-close'):
        document.querySelector('.popup-body').remove();
        break;
    }
}

const cartUserInteractive = function(event) {
    switch (event.target.className) {
    // click on the button 'Delete from cart'
    case ('material-icons icon-delete'):
        const cartCard = event.target.parentElement.parentElement.parentElement;
        const bookAmount = cartCard.querySelector('.cart-card-summary').firstElementChild.firstElementChild.innerHTML;
        const bookPrice = cartCard.querySelector('.cart-card-summary').firstElementChild.lastElementChild.innerHTML.slice(0,-1);
        const totalBookPrice = bookPrice * bookAmount;
        let currentTotalPriceElement = document.querySelector('.cart-confirm-button').firstElementChild;
        currentTotalPriceElement.innerHTML = Number(currentTotalPriceElement.innerHTML.slice(0,-1)) - totalBookPrice  + '$';
        cartCard.remove();
        break;
    }
}

fetch('../../assets/json/books.json') //path to the file with json data
        .then(response => {
            return response.json();
        })
        .then(books => {
            document.body.prepend(createCatalogPage(books, booksInCart));
            document.querySelector(".catalog").addEventListener("click", event => catalogUserInteractive(event, books));
            document.querySelector(".cart").addEventListener("click", event => cartUserInteractive(event));
        });