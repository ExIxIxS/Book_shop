import {createHeader,
        createCartSection,
        createFooter
} from '../../assets/js/create.js';

import {cartUserInteractive,
        formUserInteractive
} from '../../assets/js/userActions.js';

import {booksInCart
} from '../../assets/js/commonActions.js';

//Creating and adding header, cart and footer
document.querySelector('.container_centered').prepend(createHeader());
document.querySelector('main').prepend(createCartSection(booksInCart()));
document.querySelector('.container_centered').append(createFooter());
//User Interactive
document.querySelector('.cart').addEventListener('click', event => cartUserInteractive(event));
document.addEventListener('DOMContentLoaded', formUserInteractive);