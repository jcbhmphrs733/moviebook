export async function loadHeaderFooter() {
  const headerElement = document.querySelector("nav");
  const footerElement = document.querySelector("footer");
  const headerTemplate = await loadTemplate("/templates/header.html");
  const footerTemplate = await loadTemplate("/templates/footer.html");
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

export async function loadTemplate(templatePath) {
  try {
    const html = await fetch(templatePath);
    const template = await html.text();
    return template;
  } catch (error) {
    console.error(`Error fetching template: ${templatePath}`, error);
    return "<p> error loading template </p>";
  }
}

export function renderWithTemplate(element, template) {
  element.insertAdjacentHTML("afterbegin", template);
}
