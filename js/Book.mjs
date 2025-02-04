export default class Book {
  constructor(title) {
    this.title = title;
  }

  async init() {
    return await this.getBookByTitle(this.title);
  }

  async searchBooks(type, query) {
    const url = `https://openlibrary.org/search.json?${type}=${encodeURIComponent(query)}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`API request failed with ${response.status}`);
      }
      const data = await response.json();
      return data.docs;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
}
