export default class Cards {
  constructor(type, key, query) {
    this.key = key;
    this.query = query;
    this.type = type;
    this.cards = [];
    this.topFive = [];
  }

  
  async init() {
    if (this.type === "book") {
      const results = await this.getBooks(this.key, this.query);
      this.cards = results;
      this.topFive = results.slice(0, 5);
      console.log(this.topFive);
    } else if (this.type === "movie") {
      const results = await this.getMovies(this.key, this.query);
      this.cards = results;
      this.topFive = results.slice(0, 5);
      console.log(this.topFive);
    } else {
      throw new Error("Invalid type specified");
    }
  }
  
  cardTemplate(card) {
    return ``;
  }

  async getBooks(key, query) {
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

  async getMovies(key, query) {
    const apiKey = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlOTNjOGZiMzA0ZjA3NTgzZjczNDdmMGFlYmExYzZjMCIsIm5iZiI6MTczODYyNTY0Ni43MDU5OTk5LCJzdWIiOiI2N2ExNTI2ZTZiOWY2NjZhOTkwMmYzNjIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.InIbsNkJ_4h-TzRBNq3iVAE-C6eiCu2aQdvWlqKcUvI";

    const url = `https://api.themoviedb.org/3/search/${key}?query=${encodeURIComponent(query)}`;

    try {
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${apiKey}`
        }
      });
      if (!response.ok) {
        throw new Error(`bad response... status: ${response.status}`);
      }
      const data = await response.json();
      return data.results;
    } catch (error) {
      console.error('Error fetching data:', error);
      return null;
    }
  }
}
