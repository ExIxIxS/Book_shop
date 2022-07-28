import {createCatalogPage
} from '../../assets/js/create.js';

import {catalogUserInteractive,
        cartUserInteractive,
        dragAndDropToCart
} from '../../assets/js/userActions.js';

fetch('../../assets/json/books.json') //path to the file with json data
        .then(response => {
            return response.json();
        })
        .then(books => {
            const booksInCart = JSON.parse(localStorage.getItem('booksInCart')) || [];
            document.body.prepend(createCatalogPage(books, booksInCart));
            document.querySelector('.catalog').addEventListener('click', event => catalogUserInteractive(event, books));
            document.querySelector('.cart').addEventListener('click', event => cartUserInteractive(event));
            document.querySelector('.catalog').addEventListener('dragstart', event => dragAndDropToCart(event, books));
        });