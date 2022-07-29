import {createHeader,
        createCartSection,
        createFooter,
        createCompleteElement
} from '../../assets/js/create.js';

import {cartUserInteractive
} from '../../assets/js/userActions.js';

import {booksInCart
} from '../../assets/js/commonActions.js';

const makeInputInvalid = function(inputElement) {
    if (inputElement.className !== 'invalid') {
        const invalidMessageElement = createCompleteElement('span', 'invalid-message', '* The field is invalid');
        invalidMessageElement.title = 'Please check and enter valid data';
        inputElement.classList.add('invalid');
        inputElement.after(invalidMessageElement);
    }
}

const makeInputValid = function(inputElement) {
        if (inputElement.classList.contains('invalid')) {
            inputElement.classList.remove('invalid');
            inputElement.nextElementSibling.remove();
        }
    }

const checkNameField = function(inputElement) {
    const NAME = inputElement.value;
    //NAME (mandatory, the length not less than 4 symbols, strings only)
    const validString = (NAME.match(/\p{Letter}/gu) ?? []).join('')
    console.log('validString is "' + validString + '"'); //delete this before release
    if (validString.length === NAME.length && NAME.length >= 4) {
        //console.log(validString);
        makeInputValid(inputElement);
        //checkFormForValidData();
    } else {
        makeInputInvalid(inputElement);
    }
}

const checkSurnameField = function(inputElement) {
    const SURNAME = inputElement.value;
    //SURNAME (mandatory, the length not less than 5 symbols, strings only)
    const validString = (SURNAME.match(/\p{Letter}/gu) ?? []).join('')
    console.log('validString is "' + validString + '"');
        if (validString.length === SURNAME.length && SURNAME.length >= 5) {
            //console.log(validString);
            makeInputValid(inputElement);
            //checkFormForValidData();
        } else {
            makeInputInvalid(inputElement);
        }
}

const formUserInteractive = function() {
    const formNameInput = document.querySelector('#name');
    formNameInput.addEventListener('blur', event => checkNameField(formNameInput));
    const formSurnameInput = document.querySelector('#surname');
    formSurnameInput.addEventListener('blur', event => checkSurnameField(formSurnameInput));
}

//Creating and adding of header, cart and footer
document.querySelector('.container_centered').prepend(createHeader());
document.querySelector('main').prepend(createCartSection(booksInCart()));
document.querySelector('.container_centered').append(createFooter());

document.querySelector('.cart').addEventListener('click', event => cartUserInteractive(event));
document.addEventListener('DOMContentLoaded', formUserInteractive);