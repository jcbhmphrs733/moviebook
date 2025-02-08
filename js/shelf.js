import {
  loadHeaderFooter,
  loadTemplate,
  renderWithTemplate,
} from "./utils.mjs";
import Cards from "./Cards.mjs";

loadHeaderFooter();


async function getResponse(type, key, query) {
  const books = new TopFive(type, key, query);
  await books.init();
  const topFive = books.topFive;
  const cardsElement = document.querySelector(".shelf");
  const cardsTemplate = await loadTemplate("/templates/card.html");
  await loadCards(topFive, cardsElement, cardsTemplate);
}

async function loadCards(topFive, cardsElement, cardsTemplate) {
  for (const book of topFive) {
    renderWithTemplate(cardsElement, cardsTemplate);
  }
}

document.querySelector(".search").addEventListener("click", () => {
  getBookResponse(
    document.querySelector(".keySelect").value,
    document.querySelector("#searchbox").value
  );
});
