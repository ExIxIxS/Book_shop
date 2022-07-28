import {createHeader,
        createCartSection,
        createFooter
} from '../../assets/js/create.js';

import {cartUserInteractive
} from '../../assets/js/userActions.js';

import {booksInCart
} from '../../assets/js/commonActions.js';

document.querySelector('.container_centered').prepend(createHeader());
document.querySelector('main').prepend(createCartSection(booksInCart()));
document.querySelector('.cart').addEventListener('click', event => cartUserInteractive(event));
document.querySelector('.container_centered').append(createFooter());