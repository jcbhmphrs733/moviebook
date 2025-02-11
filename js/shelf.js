import {
  loadHeaderFooter,
  renderWithTemplate,
} from "./utils.mjs";

import Cards from "./Cards.mjs";

loadHeaderFooter();

function cardTemplate(card) {
  return `
  <div class="card">
  <h3 class="title">${card.title}</h3>
  <div class="description">
    <p></p>
  </div>
</div>`;
}

async function getResponse(type, key, query) {
  const books = new Cards(type, key, query);
  await books.init();

  const topFive = books.topFive;
  // const list = books.cards;

  const cardsElement = document.querySelector(".shelf");
  await loadCards(topFive, cardsElement);
  // await loadCards(list, cardsElement);
}

async function loadCards(topFive, cardsElement) {
  for (const book of topFive) {
  // for (const book of list) {
  const card = cardTemplate(book);
    renderWithTemplate(cardsElement, card);
  }
}

document.querySelector(".searchButton").addEventListener("click", () => {
  const type = document.querySelector(".searchButton").parentElement.id;
  console.log(type);
  const key = document.querySelector(".keySelect").value;
  const query = document.querySelector("#searchbox").value;
  getResponse(type, key, query);
});
