export default class TopFive {
  constructor(key, query, type) {
    this.key = key;
    this.query = query;
    this.type = type;
    this.topFive = [];
  }

  async init() {
    if (this.type === "book") {
      this.topFive = await this.searchBooks(this.key, this.query);
    } else if (this.type === "movie") {
      // Assuming you have a similar method for movies
      //this.topFive = movie api call
    } else {
      throw new Error("Invalid type specified");
    }
  }

  async searchBooks(key, query) {
    const url = `https://openlibrary.org/search.json?${key}=${encodeURIComponent(query)}`;
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
