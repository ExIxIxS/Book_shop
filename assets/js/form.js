import {getBooksInCart
} from './commonActions.js';

import {createCompleteElement,
        createAndAddConfirmPopup
} from './create.js';

const makeInputInvalid = function(inputElement) {
    if (inputElement.className !== 'invalid') {
        const invalidMessageElement = createCompleteElement('span', 'invalid-message', '* The field is invalid');
        invalidMessageElement.title = 'Please check and enter valid data';
        inputElement.classList.remove('valid');
        inputElement.classList.add('invalid');
        inputElement.after(invalidMessageElement);
    }
}

const makeInputValid = function(inputElement) {
    inputElement.classList.add('valid');
    if (inputElement.classList.contains('invalid')) {
        inputElement.classList.remove('invalid');
        inputElement.nextElementSibling.remove();
    }
}

const checkFormForValidData = function() {
    const validCollection = document.querySelectorAll('.valid');
    const formCompleteButton = document.querySelector('.form-submit-button');
    const requiredParamAmount = 7; //7 required fields
    if (validCollection.length === requiredParamAmount) {
        formCompleteButton.disabled = false;
        formCompleteButton.title = 'Confirm and send your order'
    } else {
        formCompleteButton.disabled = true;
        formCompleteButton.title = 'Please check and fill required fields'
    }
}

export const checkNameField = function(inputElement) {
    const NAME = inputElement.value;
    //NAME (mandatory, the length not less than 4 symbols, strings only)
    const validString = (NAME.match(/\p{Letter}{4,}/gu) ?? []).join('')
    if (validString.length === NAME.length && NAME.length !== 0) {
        makeInputValid(inputElement);
    } else {
        makeInputInvalid(inputElement);
    }
    checkFormForValidData();
}

export const checkSurnameField = function(inputElement) {
    const SURNAME = inputElement.value;
    //SURNAME (mandatory, the length not less than 5 symbols, strings only)
    const validString = (SURNAME.match(/\p{Letter}{5,}/u) ?? []).join('')
    if (validString.length === SURNAME.length && SURNAME.length !== 0) {
        makeInputValid(inputElement);
    } else {
         makeInputInvalid(inputElement);
    }
    checkFormForValidData();
}

export const checkStreetField = function(inputElement) {
    const STREET = inputElement.value;
    //STREET mandatory, the length not less than 5 symbols, the numbers are allowed
    //spaces also allowed, if not, delete '\s*'
    const validString = (STREET.match(/(\p{N}*\s*\p{Letter}+\s*\p{N}*)+/u) ?? [[]])
    if (validString[0].length === STREET.length && validString[0].length >= 5) {
        makeInputValid(inputElement);
    } else {
        makeInputInvalid(inputElement);
    }
    checkFormForValidData();
}

export const checkHouseNumField = function(inputElement) {
    const HOUSENUMBER = inputElement.value;
    //HOUSENUMBER (mandatory, numbers only, positive numbers only)
    const validString = (HOUSENUMBER.match(/\d+/) ?? [[]])
    if (validString[0].length === HOUSENUMBER.length  && HOUSENUMBER.length !== 0) {
        makeInputValid(inputElement);
    } else {
        makeInputInvalid(inputElement);
    }
    checkFormForValidData();
}

export const checkFlatNumField = function(inputElement) {
    const FLATNUMBER = inputElement.value;
    /*
        FLATNUMBER (mandatory, numbers only, positive numbers only, the dash symbol is allowed.
        Means, the flat number shouldn't start with minus/dash symbol.
        For example: -37 is invalid, but 1-37 is valid)
    */
    const validString = (FLATNUMBER.match(/\d(-?\d+)*/) ?? [[]])
    if (validString[0].length === FLATNUMBER.length  && FLATNUMBER.length !== 0) {
        makeInputValid(inputElement);
    } else {
        makeInputInvalid(inputElement);
    }
    checkFormForValidData();
}

export const getMinDateString = function() {
    const minDayObj = new Date(Date.now() + 24 * 36 * 10 ** 5); //now + 24h (*in ms)
    let days = String(minDayObj.getDate()); // getDate() return day number [1-31]
    if (days.length !== 2) {
        days = '0' + days;
    }
    let months = String(minDayObj.getMonth() + 1); // getMonth() return mounth number [0-11]
    if (months.length !== 2) {
        months = '0' + months;
    }
    const minDeliveryDate = `${minDayObj.getFullYear()}-${months}-${days}`;
    return minDeliveryDate;
}

export const checkDateInput = function(inputElement) {
    const USER_DATE = inputElement.value;
    //USERDATE mandatory, not earlier than next day
    if (Date.parse(USER_DATE) >= Date.parse(getMinDateString())) {
        makeInputValid(inputElement);
    } else {
        makeInputInvalid(inputElement);
    }
    checkFormForValidData();
}

export const checkPaymentInput = function(paymentFieldsetElement) {
    const inputsCollection = paymentFieldsetElement.querySelectorAll('input');
    for (let input of inputsCollection) {
        if (input.checked) {
            makeInputValid(paymentFieldsetElement);
            checkFormForValidData();
            return;
        }
    }
    makeInputInvalid(paymentFieldsetElement);
    checkFormForValidData();
}

export const checkGiftsInputs = function(giftsFieldsetElement) {
    const inputs = giftsFieldsetElement.querySelectorAll('input');
    const checkedInputsAmount = Array.from(inputs).filter(input => input.checked === true).length
    if (checkedInputsAmount === 2) {
        for (let input of inputs) {
            if (!input.checked) {
                input.disabled = true;
            }
        }
    } else {
        for (let input of inputs) {
            if (input.disabled) {
                input.disabled = false;
            }
        }
    }
}

export const submitForm = function(event) {
    event.preventDefault();
    createAndAddConfirmPopup(getBooksInCart());
    localStorage.setItem('booksInCart', JSON.stringify([])); //cart is empty now

}

export const resetForm = function(event) {
    event.preventDefault();
}

export const getFormData = function() {
    const formDataObj = {};
    const formElement = document.querySelector('form');
    formDataObj.name = formElement.querySelector('#name').value;
    formDataObj.surname = formElement.querySelector('#surname').value;
    formDataObj.fullName = `${formDataObj.name} ${formDataObj.surname}`
    formDataObj.street = formElement.querySelector('#street').value;
    formDataObj.houseNumber = formElement.querySelector('#house-number').value;
    formDataObj.flatNumber = formElement.querySelector('#flat-number').value;
    formDataObj.address = `${formDataObj.street} str., ${formDataObj.houseNumber}, apartment № ${formDataObj.flatNumber}`;
    formDataObj.dateDelivery = formElement.querySelector('#date-delivery').value;
    const paymentInputs = formElement.querySelector('#payment-method').querySelectorAll('input');
    for (let input of paymentInputs) {
        if (input.checked === true) {
            formDataObj.paymentMethod = input.value;
        }
    }
    const GIFTS = {
        pack: 'pack as a gift',
        postcard: 'add postcard',
        discount: 'provide 2% discount to the next time',
        pen: 'branded pen or pencil'
    }
    const giftsInputs =  formElement.querySelector('#gifts-fieldset').querySelectorAll('input');
    formDataObj.giftsArray = [];
    for (let input of giftsInputs) {
        if (input.checked === true) {
            formDataObj.giftsArray.push(GIFTS[input.value]);
        }
    }
    formDataObj.gifts = `${formDataObj.giftsArray.join(' and ')}`;

    return formDataObj; // object with all required form values
}