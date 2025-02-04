function bookTemplate(book) {
    return `
    <div class="card">
        img src="${book.image}" alt="${book.title}"/>
        <h3 class="$title">${book.title}</h3>
        <div class="bar">
          <div class="description">
            <p>${book.description}</p>
          </div>
        </div>
      </div>
  `;
}

export default class Book {
    constructor(title) {
        this.title = title
    }

    async init() {
    }

}