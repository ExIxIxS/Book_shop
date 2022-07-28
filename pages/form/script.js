import {createHeader,
        createCartSection
} from '../../assets/js/create.js';

import {cartUserInteractive
} from '../../assets/js/userActions.js';

const booksInCart = JSON.parse(localStorage.getItem('booksInCart'));
document.querySelector('.container_centered').prepend(createHeader());
document.querySelector('.header').after(createCartSection(booksInCart));
document.querySelector('.cart').addEventListener('click', event => cartUserInteractive(event));