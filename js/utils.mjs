export async function loadHeaderFooter() {
  const headerElement = document.querySelector("nav");
  const headerTemplate =   `<nav>
                                <a href=".index.html">home</a>
                                <a href="./bookShelf/index.html">books</a>
                                <a href="./movieShelf/index.html">movies</a>
                                <a href="./contact.html">contact</a>
                            </nav>
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
