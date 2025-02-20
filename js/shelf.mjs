import { getParams, loadHeaderFooter, renderWithTemplate } from "./utils.mjs";

import Cards from "./Cards.mjs";

loadHeaderFooter();

function cardTemplate(card) {
  const coverImageUrl = card.cover_edition_key
    ? `https://covers.openlibrary.org/b/olid/${card.cover_edition_key}-M.jpg`
    : card.poster_path
    ? `https://image.tmdb.org/t/p/w500${card.poster_path}`
    : "../images/placeholder-images-image_large.png";

  return `
  <div class="card">
    <a href="../details/index.html?key=${
      card.author_key ? card.key : card.id
    }"  class="card-link">
      <img class="coverArt" src="${coverImageUrl}" alt="${
    card.title
  }" style="font-size: x-small;">
    </a>
  </div>`;
}

export async function getResponse(type, key, query) {
  const cards = new Cards(type, key, query);
  await cards.init();

  const topFew = cards.topFew;

  const cardsElement = document.querySelector(".shelf");
  await loadCards(topFew, cardsElement, type);
  // 
}

async function loadCards(topFew, cardsElement, type) {
  for (const book of topFew) {
    // for (const book of list) {
    const card = cardTemplate(book);
    renderWithTemplate(cardsElement, card);
  }
  document.querySelectorAll(".card-link").forEach((link) => {
    link.addEventListener("click", () => {
      if (type === "book") {
        localStorage.setItem("bookCards", JSON.stringify(topFew));
      } else {
        localStorage.setItem("movieCards", JSON.stringify(topFew));
      }
    });
  });
}

export function loadCardsFromLocalStorage() {
  const type = getParams("type");
  if (type === "book") {
    const savedCards = localStorage.getItem("bookCards");
    if (savedCards) {
      const cards = JSON.parse(savedCards);
      const cardsElement = document.querySelector(".shelf");
      cardsElement.innerHTML = ""; // Clear existing HTML
      loadCards(cards, cardsElement, type);
      localStorage.removeItem("bookCards");
    }
  } else if (type === "movie") {
    const savedCards = localStorage.getItem("movieCards");
    if (savedCards) {
      const cards = JSON.parse(savedCards);
      const cardsElement = document.querySelector(".shelf");
      cardsElement.innerHTML = ""; // Clear existing HTML
      loadCards(cards, cardsElement, type);
      localStorage.removeItem("movieCards");
    }
  }
}

loadCardsFromLocalStorage();
window.addEventListener("load", () => {
  document.querySelector(".searchButton").addEventListener("click", () => {
    const type = document.querySelector(".searchButton").parentElement.id;
    console.log(type);
    const key = document.querySelector(".keySelect").value;
    const query = document.querySelector("#searchbox").value;
    const cardsElement = document.querySelector(".shelf");
    cardsElement.innerHTML = ""; // Clear existing HTML
    getResponse(type, key, query);
  });
});
