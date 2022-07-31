import {createAndAddPopup
} from './create.js';

import {ifBookInCart,
    increaseBookAmount,
    getBookFromArray,
    deleteBookfromArray,
    addBookToCart
} from './commonActions.js';

import {checkNameField,
        checkSurnameField,
        checkStreetField,
        checkHouseNumField,
        checkFlatNumField,
        getMinDateString,
        checkDateInput,
        checkPaymentInput,
        checkGiftsInputs,
        submitForm,
        resetForm
} from './form.js';

export const catalogUserInteractive = function(event, booksArray) {
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
    case ('image draggable'):
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

export const cartUserInteractive = function(event) {
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

export const dragAndDropToCart = function(event, booksArray) {
    if (event.target.className !== 'image draggable') {
        return;
    }
    const cardElement = event.target.parentElement.parentElement;
    const bookTitle = cardElement.querySelector('.card-title').innerHTML;
    const dropZone = document.querySelector('.dropzone');

    dropZone.addEventListener('dragover', (event) => {
        // prevent default to allow drop
        event.preventDefault();
    });
    let i = 1
    const bookObj = getBookFromArray(bookTitle, booksArray);
    const drop = function(event) {
        // prevent default action (open as link for some elements)
        event.preventDefault();
        // move dragged element to the selected drop target
        if (ifBookInCart(bookObj.title)) {
            increaseBookAmount(bookObj.title);
        } else {
            addBookToCart(bookObj);
        };
       dropZone.removeEventListener('drop', drop);
    }
    dropZone.addEventListener('drop', drop);
}

export const formUserInteractive = function() {
    const formNameInput = document.querySelector('#name');
    formNameInput.addEventListener('blur', event => checkNameField(formNameInput));
    const formSurnameInput = document.querySelector('#surname');
    formSurnameInput.addEventListener('blur', event => checkSurnameField(formSurnameInput));
    const formStreetInput = document.querySelector('#street');
    formStreetInput.addEventListener('blur', event => checkStreetField(formStreetInput));
    const formHouseNumInput = document.querySelector('#house-number');
    formHouseNumInput.addEventListener('blur', event => checkHouseNumField(formHouseNumInput));
    const formFlatNumInput = document.querySelector('#flat-number');
    formFlatNumInput.addEventListener('blur', event => checkFlatNumField(formFlatNumInput));
    const formDeliveryDateInput = document.querySelector('#date-delivery');
    formDeliveryDateInput.min = getMinDateString();
    formDeliveryDateInput.addEventListener('blur', event => checkDateInput(formDeliveryDateInput));
    const formPaymentFieldset = document.querySelector('#payment-method');
    formPaymentFieldset.addEventListener('change', event => checkPaymentInput(formPaymentFieldset));
    const formCashRadioInput = document.querySelector('#cash');
    formCashRadioInput.addEventListener('blur', event => checkPaymentInput(formCashRadioInput.parentElement.parentElement));
    const formCardRadioInput = document.querySelector('#card');
    formCardRadioInput.addEventListener('blur', event => checkPaymentInput(formCardRadioInput.parentElement.parentElement));
    const formGiftsFieldset = document.querySelector('#gifts-fieldset');
    formGiftsFieldset.addEventListener('change', event => checkGiftsInputs(formGiftsFieldset));
    const form = document.querySelector('form');
    form.addEventListener('submit', submitForm);
    form.addEventListener('reset', resetForm);
}