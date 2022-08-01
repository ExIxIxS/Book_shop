import {createHeader,
        createCartSection,
        createFooter
} from '../../assets/js/create.js';

import {cartUserInteractive,
        formUserInteractive
} from '../../assets/js/userActions.js';

import {getBooksInCart,
        checkCart
} from '../../assets/js/commonActions.js';

//Creating and adding header, cart and footer
const containerElement = document.querySelector('.container_centered');
containerElement.prepend(createHeader());
document.querySelector('main').prepend(createCartSection(getBooksInCart()));
containerElement.append(createFooter());

checkCart(); //checking cart, if empty - return back to the main page

//User Interactive
document.querySelector('.cart').addEventListener('click', cartUserInteractive);
document.querySelector('.cart-slider').addEventListener('click', checkCart);
document.addEventListener('DOMContentLoaded', formUserInteractive);