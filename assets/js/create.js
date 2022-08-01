import {getFormData
} from './form.js';

export const createCompleteElement = function(type, className = '', innerHTML = '',) {
    const element = document.createElement(type);
    if (className !== '')
        {element.className = className};
    if (innerHTML !== '')
        {element.innerHTML = innerHTML};
    return element;
}

const createLogo = function() {
    const logoElement = createCompleteElement('a', 'logo-title');
    logoElement.href = 'https://ExIxIxS.github.io/book_shop/pages/main/';
    const logoFirstPart = createCompleteElement('div', '', '<p>b</p><p>m</p>');
    const logoSecondPart = createCompleteElement('div', 'logo-title-central', '<p>OO</p>');
    const logoThirdPart = createCompleteElement('div', '', '<p>k</p><p>d</p>');
    logoElement.append(logoFirstPart, logoSecondPart, logoThirdPart);
    return logoElement;
}

export const createHeader = function() {
    const headerElement = createCompleteElement('header', 'header')
    const titleElement = createCompleteElement('h1', '', "Book Mood");
    titleElement.hidden = true;
    const logoElement = createLogo();
    const sloganContent = '“Think before you speak. Read before you think.”';
    const sloganElement = createCompleteElement('p', 'slogan', sloganContent);
    headerElement.append(titleElement, logoElement, sloganElement);
    return headerElement;
}

export const createCartCard = function(bookObj) {
    const cardElement = createCompleteElement('div','cart-card');
    const cardContentElement = createCompleteElement('div', 'cart-card-content');
    const cardImageElement = createCompleteElement('div', 'cart-card-image');
    const imageElement = createCompleteElement('img', 'image');
    imageElement.src = bookObj.imageLink;
    imageElement.alt = 'book cover';
    imageElement.width = '320';
    imageElement.height = '460';
    const cardTextElement = createCompleteElement('div','cart-card-text');
    const cardTitleElement = createCompleteElement('h5', 'cart-card-title', bookObj.title);
    const cardAuthorElement = createCompleteElement('h6', 'cart-card-author', bookObj.author);
    const summaryElement = createCompleteElement('div', 'cart-card-summary');
    const summaryContainerElement = createCompleteElement('div', '');
    const summaryAmountElement = createCompleteElement('h6', 'cart-card-summary-amount', bookObj.amount);
    const summaryMultiplierElement = createCompleteElement('h6', 'cart-card-summary-multiplier', 'x');
    const summaryPriceElement = createCompleteElement('h6', 'cart-card-summary-price', (bookObj.price + '$'));
    const deleteButtonContent = '<span class="material-icons icon-delete" title="Delete from cart">delete_forever</span>';
    const deleteButtonElement = createCompleteElement('div', 'cart-card-summary-button', deleteButtonContent);

    cardImageElement.append(imageElement);
    cardTextElement.append(cardTitleElement, cardAuthorElement);
    summaryContainerElement.append(summaryAmountElement, summaryMultiplierElement, summaryPriceElement);
    summaryElement.append(summaryContainerElement, deleteButtonElement);
    cardContentElement.append(cardImageElement, cardTextElement);
    cardElement.append(cardContentElement, summaryElement);
    return cardElement;
}

export const createCardConfirmPopup = function(bookObj) {
    const cardElement = createCompleteElement('div','cart-card confirm-cart-card');
    const cardContentElement = createCompleteElement('div', 'cart-card-content');
    const cardImageElement = createCompleteElement('div', 'cart-card-image');
    const imageElement = createCompleteElement('img', 'image');
    imageElement.src = bookObj.imageLink;
    imageElement.alt = 'book cover';
    imageElement.width = '320';
    imageElement.height = '460';
    const cardTextElement = createCompleteElement('div','cart-card-text');
    const cardTitleElement = createCompleteElement('h5', 'cart-card-title', bookObj.title);
    const cardAuthorElement = createCompleteElement('h6', 'cart-card-author', bookObj.author);
    const summaryElement = createCompleteElement('div', 'cart-card-summary');
    const summaryContainerElement = createCompleteElement('div', '');
    const summaryAmountElement = createCompleteElement('h6', 'cart-card-summary-amount', bookObj.amount);
    const summaryMultiplierElement = createCompleteElement('h6', 'cart-card-summary-multiplier', 'x');
    const summaryPriceElement = createCompleteElement('h6', 'cart-card-summary-price', (bookObj.price + '$'));

    cardImageElement.append(imageElement);
    cardTextElement.append(cardTitleElement, cardAuthorElement);
    summaryContainerElement.append(summaryAmountElement, summaryMultiplierElement, summaryPriceElement);
    summaryElement.append(summaryContainerElement);
    cardContentElement.append(cardImageElement, cardTextElement);
    cardElement.append(cardContentElement, summaryElement);
    return cardElement;
}

export const createCartSection = function(booksInCartArray) {
    const cartElement = createCompleteElement('section', 'cart');
    const sliderElement = createCompleteElement('div', 'cart-slider dropzone');
    const cartConfirmButtonElement = createCompleteElement('a', 'cart-confirm-button');

    let totalPrice = 0;

    if (booksInCartArray.length === 0) {
        cartElement.hidden = true;
    } else {
        for (let bookObj of booksInCartArray) {
        sliderElement.append(createCartCard(bookObj));
        totalPrice += bookObj.amount * bookObj.price;
        }
    }

    cartConfirmButtonElement.href = '../form/index.html';
    cartConfirmButtonElement.innerHTML = `<h3>${totalPrice}$</h3><div><span class="material-icons">shopping_cart_checkout</span>`;
    cartElement.append(sliderElement, cartConfirmButtonElement);
    return cartElement;
}

export const createCartConfirmPopup = function(booksInCartArray) {
    const sliderElement = createCompleteElement('div', 'cart-slider confirm-slider');
    let totalPrice = 0;
    for (let bookObj of booksInCartArray) {
        sliderElement.append(createCardConfirmPopup(bookObj));
        totalPrice += bookObj.amount * bookObj.price;
    }
    return {slider: sliderElement, total: totalPrice};
}

export const createCatalogCard = function(bookObj) {
    const cardElement = createCompleteElement('div', 'card');
    const cardButtonShowElement = createCompleteElement('div', 'card-button-show', 'Show More');
    const cardButtonAddElement = createCompleteElement('div', 'card-button-add', 'Add to cart');
    const cardImageElement = createCompleteElement('div', 'card-content card-content-image');
    const imageElement = createCompleteElement('img', 'image draggable');
    imageElement.src = bookObj.imageLink;
    imageElement.alt = 'book cover'
    imageElement.width = '320';
    imageElement.height = '460';
    imageElement.draggable='true';
    const cardTextElement = createCompleteElement('div', 'card-content card-content-text');
    const cardTitleElement = createCompleteElement('h4', 'card-title', bookObj.title);
    const cardAuthorElement = createCompleteElement('h5', 'card-author', bookObj.author);
    const cardPriceElement = createCompleteElement('p', 'card-price', ('$' + bookObj.price));

    cardImageElement.append(imageElement);
    cardTextElement.append(cardTitleElement, cardAuthorElement, cardButtonAddElement, cardPriceElement);
    cardElement.append(cardButtonShowElement, cardImageElement, cardTextElement);
    return cardElement;
    }

export const createCatalogSection = function(booksArray) {
    const catalogElement = createCompleteElement('section', 'catalog');
    const cardContainerElement = createCompleteElement('div', 'card-container');

    for (let bookObj of booksArray) {
        cardContainerElement.append(createCatalogCard(bookObj));
    }

    catalogElement.append(cardContainerElement);
    return catalogElement;
}

export const createMain = function(elementsArray) {
    const mainElement = document.createElement('main');
    mainElement.append(...elementsArray);
    return mainElement;
}

export const createFooter = function() {
    const footerElement = createCompleteElement('footer', 'footer');
    const githubLogoSvgContent = '<svg id="github-logo" height="32" aria-hidden="true" viewBox="0 0 16 16" version="1.1" width="32" data-view-component="true"><path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path></svg>'
    const githubElement = createCompleteElement('a', '', githubLogoSvgContent);
    githubElement.title = 'Me on GitHub';
    githubElement.href = 'https://github.com/ExIxIxS';
    const githubText = createCompleteElement('p', 'foot-block', 'ExIxIxS');
    githubElement.append(githubText);

    const rsSchoolElement = createCompleteElement('a');
    rsSchoolElement.href = 'https://rs.school/js-en/';
    const rsSchoolImageElement = createCompleteElement('img', 'rss-logo');
    rsSchoolImageElement.src = '../../assets/icons/rs_school_js.svg';
    rsSchoolImageElement.alt = 'RSSchool logo';
    rsSchoolImageElement.width = '73';
    rsSchoolImageElement.height = '26';
    rsSchoolElement.append(rsSchoolImageElement);

    const authorElement = createCompleteElement('p', 'foot-block', '© Denis Bondarenko 2022');

    footerElement.append(githubElement, rsSchoolElement, authorElement);
    return footerElement;
}

export const createCatalogPage = function(booksArray, booksInCartArray) {
    const CatalogPage = createCompleteElement('div', 'container_centered');
    CatalogPage.append(createHeader(), createMain([createCartSection(booksInCartArray), createCatalogSection(booksArray)]), createFooter());
    return CatalogPage;
}

export const createAndAddPopup = function(bookObj) {
    const popup = createCompleteElement('div', 'popup-body');
    const popupWindow = createCompleteElement('div', 'popup-window');
    const popupImage = createCompleteElement('div', 'popup-image');
    const image = createCompleteElement('img', 'image');
    image.src = bookObj.imageLink;
    image.alt = 'book cover'
    image.width = '320';
    image.height = '460';
    const popupContent = createCompleteElement('div', 'popup-content');
    const popupTitle = createCompleteElement('h2', 'popup-title', bookObj.title);
    const popupDescription = createCompleteElement('h3', 'popup-description', bookObj.description);
    const popupAuthor = createCompleteElement('h4', 'popup-author', bookObj.author);
    const popupButton = createCompleteElement('div', 'popup-button-close', '<span class="material-icons icon-close" title="Close">cancel</span>');
    popupContent.append(popupTitle, popupDescription, popupAuthor);
    popupImage.append(image);
    popupWindow.append(popupImage, popupContent);
    popup.append(popupWindow, popupButton);
    document.querySelector('.catalog').prepend(popup);
}

export const createAndAddConfirmPopup = function(booksInCartArray) {
    const USER_DATA = getFormData();
    const popupElement = createCompleteElement('div', 'popup-body');
    const popupWindowElement = createCompleteElement('div', 'popup-confirm-window');
    const popupContentElement = createCompleteElement('div', 'popup-confirm-content');
    const popupTitleElement = createCompleteElement('h2', 'popup-title', 'Your order successfully created!');
    const popupRecipientElement = createCompleteElement('h4', '', `<strong>Recipient: </strong>${USER_DATA.fullName}`);
    const popupAddressElement = createCompleteElement('h4', '', `<strong>Delivery address: </strong>${USER_DATA.address}`);
    const popupPaymentElement = createCompleteElement('h4', '', `<strong>Payment method: </strong>${USER_DATA.paymentMethod}`);
    const popupYourOrderElement = createCompleteElement('h4', '', '<strong>Your order:</strong>');
    const sliderObj = createCartConfirmPopup(booksInCartArray);
    const sliderElement = sliderObj.slider;
    const popupGiftsElement = createCompleteElement('h4', '', `<strong>Chosen gifts: </strong>${USER_DATA.gifts}`);
    const popupTotalElement = createCompleteElement('h3', '', `Total: ${sliderObj.total}$`);
    const buttonDoneElement = createCompleteElement('a', 'popup-button', 'Done');
    buttonDoneElement.href = 'https://ExIxIxS.github.io/book_shop/pages/main/'

    popupContentElement.append(popupRecipientElement, popupAddressElement, popupPaymentElement, popupGiftsElement, popupYourOrderElement, sliderElement, popupTotalElement);
    popupWindowElement.append(popupTitleElement, popupContentElement, buttonDoneElement);
    popupElement.append(popupWindowElement);
    document.querySelector('main').prepend(popupElement);
}

export const createAndAddPopupMessage = function(title, message, buttonTitle, buttonLink) {
    const popupElement = createCompleteElement('div', 'popup-body');
    const popupWindowElement = createCompleteElement('div', 'popup-message-window');
    const popupContentElement = createCompleteElement('div', 'popup-message-content');
    const popupTitleElement = createCompleteElement('h2', 'popup-title', title);
    const popupMessageElement = createCompleteElement('h4', 'popup-message', message);
    const buttonOkElement = createCompleteElement('a', 'popup-button', buttonTitle);
    buttonOkElement.href = buttonLink;

    popupContentElement.append(popupMessageElement);
    popupWindowElement.append(popupTitleElement, popupContentElement, buttonOkElement);
    popupElement.append(popupWindowElement);
    document.querySelector('main').prepend(popupElement);
}