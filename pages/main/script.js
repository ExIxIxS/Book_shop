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

const booksInCart = JSON.parse(localStorage.getItem('booksInCart')) || [];

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
            //work with Array booksInCart
            const booksInCart = JSON.parse(localStorage.getItem('booksInCart'));
            increaseBookAmountInArray(bookTitle, booksInCart);
            localStorage.setItem('booksInCart', JSON.stringify(booksInCart));
        }
    }
}

const getBookFromArray = function(bookTitleString, booksArray) {
    for (let bookObj of booksArray) {
        if (bookTitleString === bookObj.title) {
            return bookObj;
        }
    }
}

const increaseBookAmountInArray = function(bookTitleString, booksArray) {
    for (let bookObj of booksArray) {
        if (bookTitleString === bookObj.title) {
            bookObj.amount += 1;
        }
    }
}

const deleteBookfromArray = function(bookTitleString, booksArray) {
    const modifiedArray = booksArray.filter(bookObj => bookObj.title !== bookTitleString);
    return modifiedArray;
}

const addBookToCart = function(bookObj) {
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

const createAndAddPopup = function(bookObj) {
    const popup = createCompleteElement('div', 'popup-body');
    const popupWindow = createCompleteElement('div', 'popup-window');
    const popupImage = createCompleteElement('div', 'popup-image');
    const image = createCompleteElement('img', 'image');
    image.src = bookObj.imageLink;
    image.alt = 'book cover'
    image.width = '320';
    image.height = '460';
    const popupContent = createCompleteElement('div', 'popup-content');
    const popupTitle = createCompleteElement('h2', 'popup-title', bookObj.title);
    const popupDescription = createCompleteElement('h3', 'popup-description', bookObj.description);
    const popupAuthor = createCompleteElement('h4', 'popup-author', bookObj.author);
    const popupButton = createCompleteElement('div', 'popup-button-close', '<span class="material-icons icon-close" title="Close">cancel</span>');
    popupContent.append(popupTitle, popupDescription, popupAuthor);
    popupImage.append(image);
    popupWindow.append(popupImage, popupContent);
    popup.append(popupWindow, popupButton);
    document.querySelector('.catalog').prepend(popup);
}

const catalogUserInteractive = function(event, booksArray) {
    let cardElement;
    let bookObj;
    switch (event.target.className) {
    // click on button 'add book to cart'
    case 'card-button-add':
        cardElement = event.target.parentElement.parentElement;
        bookObj = getBookFromArray(cardElement.querySelector('.card-title').innerHTML, booksArray);
        if (ifBookInCart(bookObj.title)) {
            increaseBookAmount(bookObj.title);
        } else {
            addBookToCart(bookObj);
        };
        break;
    // click on the button 'Show more'
    case ('card-button-show'):
        cardElement = event.target.parentElement;
        bookObj = getBookFromArray(cardElement.querySelector('.card-title').innerHTML, booksArray);
        createAndAddPopup(bookObj);
        break;
    // click on the image
    case ('image'):
        cardElement = event.target.parentElement.parentElement;
        bookObj = getBookFromArray(cardElement.querySelector('.card-title').innerHTML, booksArray);
        createAndAddPopup(bookObj);
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
        //work with Array booksInCart
        const bookTitle = cartCard.querySelector('.cart-card-title').innerHTML;
        const booksInCart = JSON.parse(localStorage.getItem('booksInCart'));
        localStorage.setItem('booksInCart', JSON.stringify(deleteBookfromArray(bookTitle, booksInCart)));
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