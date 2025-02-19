import { getResponse } from "./shelf.mjs";
import { getParams } from "./utils.mjs";

class Details {
  constructor() {
    this.data = [];
    this.title = "";
    this.key = "";
  }
  // loadHeaderFooter();
}

const details = new Details();
details.key = getParams("key");

if (Number.isInteger(Number(details.key))) {
  console.log("movie key passed");
  // movie key passed
  const apiKey =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlOTNjOGZiMzA0ZjA3NTgzZjczNDdmMGFlYmExYzZjMCIsIm5iZiI6MTczODYyNTY0Ni43MDU5OTk5LCJzdWIiOiI2N2ExNTI2ZTZiOWY2NjZhOTkwMmYzNjIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.InIbsNkJ_4h-TzRBNq3iVAE-C6eiCu2aQdvWlqKcUvI";

  const url = `https://api.themoviedb.org/3/movie/${details.key}`;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });
    if (!response.ok) {
      throw new Error(`bad response... status: ${response.status}`);
    }
    details.data = await response.json();
    details.title = details.data.title;
    document.querySelector("#description").textContent = details.data.overview;
    document.querySelector("#coverArt").src = `${
      details.data.poster_path
        ? `https://image.tmdb.org/t/p/w500${details.data.poster_path}`
        : "../images/placeholder-images-image_large.png"
    }`;
    console.log(details.data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
} else {
  console.log("book key passed");
  // book key passed
  details.data = await fetch(`https://openlibrary.org${details.key}.json`);
  details.data = await details.data.json();
  details.title = details.data.title;
  console.log(details.data);
  document.querySelector("#description").textContent = details.data.description? details.data.description.type? details.data.description.value : details.data.description? details.data.description: "No description available" : "No description available";
  document.querySelector(
    "#coverArt"
  ).src = `https://covers.openlibrary.org/b/id/${details.data.covers[0]}-M.jpg`;
}

document.querySelector(".compareButton").addEventListener("click", () => {
  const key = getParams("key");
  if (Number.isInteger(Number(key))) {
    document.querySelector(".shelf").innerHTML = "";
    getResponse("book", "title", details.title);
  } else {
    document.querySelector(".shelf").innerHTML = "";
    getResponse("movie", "movie", details.title);
  }
});
