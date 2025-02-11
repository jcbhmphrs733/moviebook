export async function loadHeaderFooter() {
  const headerElement = document.querySelector("nav");
  const headerTemplate = await loadTemplate("../templates/header.html");
  const footerElement = document.querySelector("footer");
  const footerTemplate = await loadTemplate("../templates/footer.html");
  console.log(headerTemplate);
  console.log(footerTemplate);
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
