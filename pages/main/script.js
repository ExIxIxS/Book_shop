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
            let bookPrice = cartCard.querySelector('.cart-card-summary').firstElementChild.lastElementChild.innerHTML.slice(0,-1);
            let currentTotalPriceElement = document.querySelector('.cart-confirm-button').firstElementChild;
            currentTotalPriceElement.innerHTML = Number(currentTotalPriceElement.innerHTML.slice(0,-1)) + Number(bookPrice) + '$';
}
/*
const createThanAddPopup = function(book) {
    const popup = createCompleteElement('div', 'popup-body');
    const popupWindow = createCompleteElement('div', 'popup-window');
    const popupImage = createCompleteElement('div', 'popup-image');
    const image = createCompleteElement('img', 'image');
    image.src = book.imageLink;
    image.alt = 'book cover'
    image.width = '320';
    image.height = '460';
    const popupContent = createCompleteElement('div', 'popup-content');
    const popupContent = createCompleteElement('div', 'popup-content');
}
*/
/*
                <div class="popup-body">
                    <div class="popup-window">
                        <div class="popup-image">
                            <img class="image" src="../../assets/images/js-good parts.jpg" width="320" height="460">
                        </div>
                        <div class="popup-content">
                            <h2 class="popup-title">JavaScript: The Good Parts: The Good Parts</h2>
                            <h3 class="popup-description">With JavaScript: The Good Parts, you'll discover a beautiful, elegant,
                                 lightweight and highly expressive language that lets you create effective code,
                                  whether you're managing object libraries or just trying to get Ajax to run fast.
                                 If you develop sites or applications for the Web, this book is an absolute must!</h3>
                            <h4 class="popup-author">Douglas Crockford</h4>
                        </div>
                    </div>
                    <div class="popup-button-close">
                        <span class="material-icons">cancel</span>
                    </div>
                </div>
*/


const catalogUserInteractive = function(event, booksArray) {
    const validEvents = ['card-button-add', 'card-button-show', 'image'];
    if (!validEvents.includes(event.target.className)) {
        return;
    }
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
        break;
    // click on the button 'Show more' or image
    case ('image'):
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