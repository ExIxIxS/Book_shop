import {createCompleteElement,
        createHeader,
        createCartCard,
        createCartSection,
        createCatalogeCard,
        createCatalogeSection,
        createMain,
        createFooter,
        createCatalogePage
} from '../../assets/js/create.js';

const booksInCart = [{
    "author": "Bradley Meck Alex Young and Mike Cantelon",
    "imageLink": "../../assets/images/node_js_in_action.jpg",
    "title": "Node.js in Action",
    "price": 38,
    "amount": 3,
    "description": "Node.js in Action, Second Edition is a thoroughly revised book based on the best-selling first edition. It starts at square one and guides you through all the features, techniques, and concepts you'll need to build production-quality Node applications."
  }];

const ifBookInCart = function(bookTitle) {
    for (let cartCard of document.querySelector(".cart-slider").children) {
        if (bookTitle === cartCard.querySelector('.cart-card-title').innerHTML) {
            return true;
        }
    }
    return false;
}

const increaseBookAmount = function(bookTitle) {
    let currentBookAmountElement;
    let bookPrice;
    let currentTotalPriceElement;
    for (let cartCard of document.querySelector('.cart-slider').children) {
        if (bookTitle === cartCard.querySelector('.cart-card-title').innerHTML) {
            currentBookAmountElement = cartCard.querySelector('.cart-card-summary').firstElementChild.firstElementChild;
            currentBookAmountElement.innerHTML =  Number(currentBookAmountElement.innerHTML) + 1;
            bookPrice = cartCard.querySelector('.cart-card-summary').firstElementChild.lastElementChild.innerHTML.slice(0,-1);
            currentTotalPriceElement = document.querySelector('.cart-confirm-button').firstElementChild;
            currentTotalPriceElement.innerHTML = Number(currentTotalPriceElement.innerHTML.slice(0,-1)) + Number(bookPrice) + '$';
        }
    }
    return false;
}

const catalogUserInteractive = function(event) {
    if (event.target.className === 'card-button-add') {
        const card = event.target.parentElement.parentElement;
        const title = card.querySelector('.card-title').innerHTML;
        if (ifBookInCart(title)) {
            console.log('Yes, it`s in the cart'); //delete this line before release
            increaseBookAmount(title);
        } else {
            console.log('No, there is no book in the cart'); //delete this line before release
            for (let book of books) {
                console.log(book);
            }
        }
    }
}

fetch('../../assets/json/books.json') //path to the file with json data
        .then(response => {
            return response.json();
        })
        .then(books => {
            document.body.prepend(createCatalogePage(books, booksInCart));
            document.querySelector(".card-container").addEventListener("click", catalogUserInteractive);
        });

