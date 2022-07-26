export const createCompleteElement = function(type, className = '', innerHTML = '') {
    const element = document.createElement(type);
    if (className !== '')
        {element.className = className};
    if (innerHTML !== '')
        {element.innerHTML = innerHTML};
    return element;
}

export const createHeader = function() {
    const header = createCompleteElement('header', 'header')
    const title = createCompleteElement('h1', '', "Book Mood");
    title.hidden = true;
    const LOGOCONTENT = '<div><p>b</p><p>m</p></div><div class="logo-title-central"><p>OO</p></div><div><p>k</p><p>d</p></div>';
    const logo = createCompleteElement('a', 'logo-title', LOGOCONTENT);
    logo.href = '';
    const sloganContent = '“Think before you speak. Read before you think.”';
    const slogan = createCompleteElement('p', 'slogan', sloganContent);
    header.append(title, logo, slogan);
    return header;
}

export const createCartCard = function(book) {
    const card = createCompleteElement('div','cart-card');
    const cardContent = createCompleteElement('div', 'cart-card-content');
    const cardImage = createCompleteElement('div', 'cart-card-image');
    const image = createCompleteElement('img', '');
    image.src = book.imageLink;
    image.alt = 'book cover';
    image.width = '320';
    image.height = '460';
    const cardText = createCompleteElement('div','cart-card-text');
    const cardTitle = createCompleteElement('h5', 'cart-card-title', book.title);
    const cardAuthor = createCompleteElement('h6', 'cart-card-author', book.author);
    const summary = createCompleteElement('div', 'cart-card-summary');
    const summaryContainer = createCompleteElement('div', '');
    const summaryAmount = createCompleteElement('h6', 'cart-card-summary-amount', book.amount);
    const summaryMultiplier = createCompleteElement('h6', 'cart-card-summary-multiplier', 'x');
    const summaryPrice = createCompleteElement('h6', 'cart-card-summary-price', (book.price + '$'));
    const summaryButton = createCompleteElement('div', 'cart-card-summary-button', '<span class="material-icons">delete_forever</span>');

    cardImage.append(image);
    cardText.append(cardTitle, cardAuthor);
    summaryContainer.append(summaryAmount, summaryMultiplier, summaryPrice);
    summary.append(summaryContainer, summaryButton);
    cardContent.append(cardImage, cardText);
    card.append(cardContent, summary);
    return card;
}

export const createCartSection = function(booksInCart) {
    const cart = createCompleteElement('section', 'cart');
    const slider = createCompleteElement('div', 'cart-slider');
    const cartConfirmButton = createCompleteElement('div', 'cart-confirm-button');
    let totalPrice = 0;

    if (booksInCart.length === 0) {
        cart.hidden = true;
    } else {
        for (let book of booksInCart) {
        slider.append(createCartCard(book));
        totalPrice += book.amount * book.price;
        }
    }

    cartConfirmButton.innerHTML = `<h3>${totalPrice}$</h3><div><span class="material-icons">shopping_cart_checkout</span></div>`;
    cart.append(slider, cartConfirmButton);
    return cart;
}

export const createCatalogCard = function(book) {
    const card = createCompleteElement('div', 'card');
    const cardButtonShow = createCompleteElement('div', 'card-button-show', 'Show More');
    const cardButtonAdd = createCompleteElement('div', 'card-button-add', 'Add to cart');
    const cardImage = createCompleteElement('div', 'card-content card-content-image');
    const image = createCompleteElement('img', 'image');
    image.src = book.imageLink;
    image.alt = 'book cover'
    image.width = '320';
    image.height = '460';
    const cardText = createCompleteElement('div', 'card-content card-content-text');
    const cardTitle = createCompleteElement('h4', 'card-title', book.title);
    const cardAuthor = createCompleteElement('h5', 'card-author', book.author);
    const cardPrice = createCompleteElement('p', 'card-price', ('$' + book.price));

    cardImage.append(image);
    cardText.append(cardTitle, cardAuthor, cardButtonAdd, cardPrice);
    card.append(cardButtonShow, cardImage, cardText);
    return card;
    }

export const createCatalogSection = function(books) {
    const Catalog = createCompleteElement('section', 'catalog');
    const cardContainer = createCompleteElement('div', 'card-container');

    for (let book of books) {
        cardContainer.append(createCatalogCard(book));
    }

    Catalog.append(cardContainer);
    return Catalog;
}

export const createMain = function(content) {
    const main = document.createElement('main');
    main.append(...content);
    return main;
}

export const createFooter = function() {
    const FOOTERCONTENT = '<a title="Me on GitHub" href="https://github.com/ExIxIxS"><svg id="github-logo" height="32" aria-hidden="true" viewBox="0 0 16 16" version="1.1" width="32" data-view-component="true"><path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path></svg><p class="foot-block">ExIxIxS</p></a><a href="https://rs.school/js-en/"><img id="rss-logo" src="../../assets/icons/rs_school_js.svg" alt="RSSchool logo" width="73" height="26"></a><p class="foot-block">© Denis Bondarenko 2022</p></a>';
    const footer = createCompleteElement('footer', 'footer', FOOTERCONTENT);
    return footer;
}

export const createCatalogPage = function(books, booksInCart) {
    const CatalogPage = createCompleteElement('div', 'container_centered');
    CatalogPage.append(createHeader(), createMain([createCartSection(booksInCart), createCatalogSection(books)]), createFooter());
    return CatalogPage;
}