const createHeader = function() {
    let header = document.createElement('header');
    let title = document.createElement('h1');
    let logo = document.createElement('a');
    let slogan = document.createElement('p');
    header.className = 'header';
    title.innerHTML = "Book Mood";
    title.hidden = true;
    logo.className = 'logo-title';
    logo.href = '';
    logo.innerHTML = '<div><p>b</p><p>m</p></div><div class="logo-title-central"><p>OO</p></div><div><p>k</p><p>d</p></div>';
    slogan.className = 'slogan';
    slogan.innerHTML = '“Think before you speak. Read before you think.”'
    header.append(title, logo, slogan);
    return header;
}

const createCartSection = function(booksInCart) {
    const createCartCard = function(book) {
        let card = document.createElement('div');
        let cardContent = document.createElement('div');
        let cardImage = document.createElement('div');
        let image = document.createElement('img');
        let cardText = document.createElement('div');
        let cardTitle = document.createElement('h5');
        let cardAuthor = document.createElement('h6');
        let summary = document.createElement('div');
        let summaryContainer = document.createElement('div');
        let summaryAmount = document.createElement('h6');
        let summaryMultiplier = document.createElement('h6');
        let summaryPrice = document.createElement('h6');
        let summaryButton = document.createElement('div');

        card.className = 'cart-card';
        cardContent.className = 'cart-card-content';
        cardImage.className = 'cart-card-image';
        cardText.className = 'cart-card-text';
        cardTitle.className = 'cart-card-title';
        cardAuthor.className = 'cart-card-author';
        summary.className = 'cart-card-summary';
        summaryAmount.className = 'cart-card-summary-amount';
        summaryMultiplier.className = 'cart-card-summary-multiplier';
        summaryPrice.className = 'cart-card-summary-price';
        summaryButton.className = 'cart-card-summary-button';

        image.src = book.imageLink;
        image.alt = 'book cover';
        image.width = '320';
        image.height = '460';
        cardTitle.innerHTML = book.title;
        cardAuthor.innerHTML = book.author;
        summaryAmount.innerHTML = book.amount;
        summaryMultiplier.innerHTML = 'x';
        summaryPrice.innerHTML = book.price + '$';
        summaryButton.innerHTML = '<span class="material-icons">delete_forever</span>';

        cardImage.append(image);
        cardText.append(cardTitle, cardAuthor);
        summaryContainer.append(summaryAmount, summaryMultiplier, summaryPrice);
        summary.append(summaryContainer, summaryButton);
        cardContent.append(cardImage, cardText);
        card.append(cardContent, summary);
        return card;
    }

    let cart = document.createElement('section');
    let slider = document.createElement('div');
    let cartConfirmButton = document.createElement('div');
    let totalPrice = 0;

    cart.className = 'cart';
    slider.className = 'cart-slider';
    cartConfirmButton.className = 'cart-confirm-button';

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

const createCatalogeSection = function(books) {
    const createCatalogeCard = function(book) {
        let card = document.createElement('div');
        let cardButtonShow = document.createElement('div');
        let cardButtonAdd = document.createElement('div');
        let cardImage = document.createElement('div');
        let image = document.createElement('img');
        let cardText = document.createElement('div');
        let cardTitle = document.createElement('h4');
        let cardAuthor = document.createElement('h5');
        let cardPrice = document.createElement('p');

        card.className = 'card';
        cardButtonShow.className = 'card-button-show';
        cardButtonAdd.className = 'card-button-add';
        cardImage.className = 'card-content card-content-image';
        cardText.className = 'card-content card-content-text';
        cardTitle.className = 'card-title';
        cardAuthor.className = 'card-author';
        cardPrice.className = 'card-price';

        image.src = book.imageLink;
        image.alt = 'book cover'
        image.width = '320';
        image.height = '460';

        cardButtonShow.innerHTML = 'Show More';
        cardButtonAdd.innerHTML = 'Add to cart';
        cardTitle.innerHTML = book.title;
        cardAuthor.innerHTML = book.author;
        cardPrice.innerHTML = '$' + book.price;

        cardImage.append(image);
        cardText.append(cardTitle, cardAuthor, cardButtonAdd, cardPrice);
        card.append(cardButtonShow, cardImage, cardText);
        return card;
    }

    let cataloge = document.createElement('section');
    let cardContainer = document.createElement('div');
    cataloge.className = 'catalog';
    cardContainer.className = 'card-container';

    for (let book of books) {
        cardContainer.append(createCatalogeCard(book));
    }

    cataloge.append(cardContainer);
    return cataloge;
}

const createMain = function(content) {
    let main = document.createElement('main');
    main.append(...content);
    return main;
}

const createFooter = function() {
    const footer = document.createElement('footer');
    footer.innerHTML = '<a title="Me on GitHub" href="https://github.com/ExIxIxS"><svg id="github-logo" height="32" aria-hidden="true" viewBox="0 0 16 16" version="1.1" width="32" data-view-component="true"><path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path></svg><p class="foot-block">ExIxIxS</p></a><a href="https://rs.school/js-en/"><img id="rss-logo" src="../../assets/icons/rs_school_js.svg" alt="RSSchool logo" width="73" height="26"></a><p class="foot-block">© Denis Bondarenko 2022</p></a>';
    return footer;
}

/*
        <footer>

        </footer>
*/

const createCatalogePage = function(booksInCart) {
    let catalogePage = document.createElement('div');
    catalogePage.className = 'container_centered';
    catalogePage.append(createHeader(), createMain([createCartSection(booksInCart), createCatalogeSection(books)]), createFooter());
    return catalogePage;
}

/*
const booksInCart = [];
*/


const booksInCart = [{
        "author": "Douglas Crockford",
        "imageLink": "../../assets/images/js-good parts.jpg",
        "title": "JavaScript: The Good Parts: The Good Parts",
        "price": 30,
        "amount": 3,
        "description": "With JavaScript: The Good Parts, you'll discover a beautiful, elegant, lightweight and highly expressive language that lets you create effective code, whether you're managing object libraries or just trying to get Ajax to run fast. If you develop sites or applications for the Web, this book is an absolute must"
    },
    {
      "author": "David Herman",
      "imageLink": "../../assets/images/effective_js.jpg",
      "title": "Effective JavaScript: 68 Specific Ways to Harness the Power of JavaScript",
      "price": 22,
      "amount": 3,
      "description": "Effective JavaScript is organized around 68 proven approaches for writing better JavaScript, backed by concrete examples. You’ll learn how to choose the right programming style for each project, manage unanticipated problems, and work more successfully with every facet of JavaScript programming from data structures to concurrency"
    },
    {
      "author": "David Flanagan",
      "imageLink": "../../assets/images/js_the_defenitive_guide.jpg",
      "title": "JavaScript: The Definitive Guide",
      "price": 40,
      "amount": 3,
      "description": "This Fifth Edition is completely revised and expanded to cover JavaScript as it is used in today's Web 2.0 applications. This book is both an example-driven programmer's guide and a keep-on-your-desk reference, with new chapters that explain everything you need to know to get the most out of JavaScript"
    },
    {
      "author": " Eric Elliott",
      "imageLink": "../../assets/images/programming_js_applications.jpg",
      "title": "Programming JavaScript Applications",
      "price": 19,
      "amount": 3,
      "description": "Take advantage of JavaScript’s power to build robust web-scale or enterPrice applications that are easy to extend and maintain. By applying the design patterns outlined in this practical book, experienced JavaScript developers will learn how to write flexible and resilient code that’s easier—yes, easier—to work with as your code base grows."
    },
    {
      "author": "Addy Osmani",
      "imageLink": "../../assets/images/learning_js_design_patterns.jpg",
      "title": "Learning JavaScript Design Patterns",
      "price": 32,
      "amount": 33,
      "description": "With Learning JavaScript Design Patterns, you’ll learn how to write beautiful, structured, and maintainable JavaScript by applying classical and modern design patterns to the language. If you want to keep your code efficient, more manageable, and up-to-date with the latest best practices, this book is for you."
    },
    {
      "author": "Boris Cherny",
      "imageLink": "../../assets/images/programming_typescript_.jpg",
      "title": "Programming TypeScript",
      "price": 28,
      "amount": 2,
      "description": "Any programmer working with a dynamically typed language will tell you how hard it is to scale to more lines of code and more engineers. That’s why Facebook, Google, and Microsoft invented gradual static type layers for their dynamically typed JavaScript and Python code. This practical book shows you how one such type layer, TypeScript, is unique among them: it makes programming fun with its powerful static type system."
    },
    {
      "author": "Alex Banks, Eve Porcello",
      "imageLink": "../../assets/images/learning_react.jpg",
      "title": "Learning React, 2nd Edition",
      "price": 25,
      "amount": 3,
      "description": "If you want to learn how to build efficient React applications, this is your book. Ideal for web developers and software engineers who understand how JavaScript, CSS, and HTML work in the browser, this updated edition provides best practices and patterns for writing modern React code. No prior knowledge of React or functional JavaScript is necessary."
    },
    {
      "author": "Bradley Meck Alex Young and Mike Cantelon",
      "imageLink": "../../assets/images/node_js_in_action.jpg",
      "title": "Node.js in Action",
      "price": 38,
      "amount": 3,
      "description": "Node.js in Action, Second Edition is a thoroughly revised book based on the best-selling first edition. It starts at square one and guides you through all the features, techniques, and concepts you'll need to build production-quality Node applications."
    },
    {
        "author": "Kyle Simpson",
        "imageLink": "../../assets/images/you_dont_know_js_yet.jpg",
        "title": "You Don't Know JS Yet: Get Started",
        "price": 26,
        "description": "It seems like there's never been as much widespread desire before for a better way to deeply learn the fundamentals of JavaScript. But with a million blogs, books, and videos out there, just where do you START? Look no further!",
        "amount": 1
    },
    {
        "author": "John Resig and Bear Bibeault",
        "imageLink": "../../assets/images/js_ninja.jpg",
        "title": "Secrets of the JavaScript Ninja",
        "price": 33,
        "description": "Secrets of the Javascript Ninja takes you on a journey towards mastering modern JavaScript development in three phases: design, construction, and maintenance. Written for JavaScript developers with intermediate-level skills, this book will give you the knowledge you need to create a cross-browser JavaScript library from the ground up.",
        "amount": 3
    }];

    const books = booksInCart;

document.body.prepend(createCatalogePage(books, booksInCart));