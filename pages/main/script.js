import {createCatalogPage
} from '../../assets/js/create.js';

import {catalogUserInteractive,
        cartUserInteractive,
        dragAndDropToCart
} from '../../assets/js/userActions.js';

import {getBooksInCart
} from '../../assets/js/commonActions.js';

fetch('../../assets/json/books.json') //path to the file with json data
        .then(response => {
            return response.json();
        })
        .then(booksArray => {
            document.body.prepend(createCatalogPage(booksArray, getBooksInCart()));
            document.querySelector('.catalog').addEventListener('click', event => catalogUserInteractive(event, booksArray));
            document.querySelector('.cart').addEventListener('click', cartUserInteractive);
            document.querySelector('.catalog').addEventListener('dragstart', event => dragAndDropToCart(event, booksArray));
        });