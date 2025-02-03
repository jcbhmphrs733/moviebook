async function getBookByTitle(title) {
    const url = `https://openlibrary.org/search.json?title=${encodeURIComponent(title)}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;

    } catch (error) {
        console.error('Error fetching data:', error);
    }
    
}

async function searchByBookTitle() {
    const title = document.getElementById('bookTitle').value;
    result = await getBookByTitle(title);
    console.log(result.docs[0]);
}
