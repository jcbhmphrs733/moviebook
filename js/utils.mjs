export async function loadHeaderFooter() {
    const headerElement = document.querySelector("nav");
    const footerElement = document.querySelector("footer");
    const headerTemplate = await loadTemplate(`/templates/header.html`);
    const footerTemplate = await loadTemplate(`/templates/footer.html`);

    renderWithTemplate(headerElement, headerTemplate);
    renderWithTemplate(footerElement, footerTemplate);
}

export async function loadCards() {
    const cardsElement = document.querySelector(".shelf");
    const cardsTemplate = await loadTemplate("/templates/card.html");

    renderWithTemplate(cardsElement, cardsTemplate);
}

export async function loadTemplate(templatePath) {
    const html = await fetch(templatePath);
    const template = await html.text();
    return template;
}

export function renderWithTemplate(element, template) {
    element.insertAdjacentHTML("afterbegin", template);
}

