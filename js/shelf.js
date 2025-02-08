import {
  loadHeaderFooter,
  loadTemplate,
  renderWithTemplate,
} from "./utils.mjs";
import TopFive from "./TopFive.mjs";

loadHeaderFooter();

async function getBookResponse(key, query) {
  const books = new TopFive("book", key, query);
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
