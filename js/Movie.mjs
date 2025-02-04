
async function getMovieByTitle(title) {
    const apiKey = "TBDb :) api key";
    
    const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(title)}`;

    try {
        const response = await fetch(url, {
            headers: {
                Authorization: `Bearer ${apiKey}`
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}


async function searchByMovieTitle() {
    const movieTitle = document.getElementById('movieTitle').value;
    result = await getMovieByTitle(movieTitle);
    console.log(result[0]);
}
