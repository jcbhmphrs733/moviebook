export async function loadHeaderFooter() {
  const headerElement = document.querySelector("nav");
  const headerTemplate =  `
<a class="homeButton" href="../home/index.html">home</a>
<a href="../bookShelf/index.html?type=book">books</a>
<a href="../movieShelf/index.html?type=movie">movies</a>                
`;
  const footerElement = document.querySelector("footer");
  const footerTemplate = `<p>WDD330 Final Project &copy; Jacob Humphreys 2025</p>`;
  renderWithTemplate(headerElement, headerTemplate);
  renderWithTemplate(footerElement, footerTemplate);
}

export async function loadCards() {
  const cardsElement = document.querySelector(".shelf");
  const cardsTemplate = await loadTemplate("/templates/card.html");

  renderWithTemplate(cardsElement, cardsTemplate);
}

export async function loadTemplate(path) {
  const html = await fetch(path);
  const template = await html.text();
  return template;
}

export function renderWithTemplate(element, template) {
  element.insertAdjacentHTML("afterbegin", template);
}

export function getParams(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);
  return product;
}