import {createHeader,
        createCartSection
} from '../../assets/js/create.js';

import {cartUserInteractive
} from '../../assets/js/userActions.js';

import {booksInCart
} from '../../assets/js/commonActions.js';

document.querySelector('.container_centered').prepend(createHeader());
document.querySelector('.header').after(createCartSection(booksInCart()));
document.querySelector('.cart').addEventListener('click', event => cartUserInteractive(event));