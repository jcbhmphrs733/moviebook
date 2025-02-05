import { loadHeaderFooter } from "./utils.mjs";
import Books from "./TopFive.mjs";

loadHeaderFooter();

async function getBookResponse(searchType, searchTerm) {
    const books = new Books();
    await books.init();
    topFive = books.topFive;
}


async function loadCards(topFive) {
    const cardsElement = document.querySelector(".shelf");
    const cardsTemplate = await loadTemplate("/templates/card.html");

    renderWithTemplate(cardsElement, cardsTemplate);
}