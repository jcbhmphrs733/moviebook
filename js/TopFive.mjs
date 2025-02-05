export default class TopFive {
  constructor(type, key, query) {
    this.key = key;
    this.query = query;
    this.type = type;
    this.topFive = [];
  }

  async init() {
    if (this.type === "book") {
      const results = await this.searchBooks(this.key, this.query);
      this.topFive = results.slice(0, 5);
      console.log(this.topFive);
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
