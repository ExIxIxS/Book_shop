import {createCompleteElement,
        createHeader,
        createCartCard,
        createCartSection,
        createCatalogeCard,
        createCatalogeSection,
        createMain,
        createFooter,
        createCatalogePage
} from '../../assets/js/create.js';

const booksInCart = [{
    "author": "Bradley Meck Alex Young and Mike Cantelon",
    "imageLink": "../../assets/images/node_js_in_action.jpg",
    "title": "Node.js in Action",
    "price": 38,
    "amount": 3,
    "description": "Node.js in Action, Second Edition is a thoroughly revised book based on the best-selling first edition. It starts at square one and guides you through all the features, techniques, and concepts you'll need to build production-quality Node applications."
  }];

fetch('../../assets/json/books.json') //path to the file with json data
        .then(response => {
            return response.json();
        })
        .then(books => {
            document.body.prepend(createCatalogePage(books, booksInCart));
            addEventListener
            const book = document.querySelector(".card-container");
            book.addEventListener("click", event => alert(event.currentTarget.className));
        });

