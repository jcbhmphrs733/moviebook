import { loadHeaderFooter, getParams } from "./utils.mjs";

loadHeaderFooter();

const key = getParams("key");

if (Number.isInteger(Number(key))) {
  console.log("movie key passed");
  // movie key passed
  const apiKey =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlOTNjOGZiMzA0ZjA3NTgzZjczNDdmMGFlYmExYzZjMCIsIm5iZiI6MTczODYyNTY0Ni43MDU5OTk5LCJzdWIiOiI2N2ExNTI2ZTZiOWY2NjZhOTkwMmYzNjIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.InIbsNkJ_4h-TzRBNq3iVAE-C6eiCu2aQdvWlqKcUvI";

  const url = `https://api.themoviedb.org/3/movie/${key}`;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });
    if (!response.ok) {
      throw new Error(`bad response... status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
    document.querySelector("#coverArt").src = `${
      data.poster_path
        ? `https://image.tmdb.org/t/p/w500${data.poster_path}`
        : "../images/placeholder-images-image_large.png"
    }`;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
} else {
  console.log("book key passed");
  // book key passed
  const details = await fetch(`https://openlibrary.org${key}.json`);
  const data = await details.json();
  console.log(data);

  document.querySelector(
    "#coverArt"
  ).src = `https://covers.openlibrary.org/b/id/${data.covers[0]}-L.jpg`;
}
