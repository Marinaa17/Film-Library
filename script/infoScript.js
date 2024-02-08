document.addEventListener('DOMContentLoaded', async function () {
    const urlParams = new URLSearchParams(window.location.search);
    const title = urlParams.get('title');
    const year = urlParams.get('year');

    // Function to fetch additional movie info from OMDB API
    async function fetchMovieInfo(title, year) {
        const apiKey = 'ff43acd6';
        const apiUrl = `https://www.omdbapi.com/?t=${title}&y=${year}&apikey=${apiKey}`;

        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching movie info:', error);
            return null;
        }
    }

    const movieInfo = await fetchMovieInfo(title, year);
    if (movieInfo) {
        document.getElementById('img').innerHTML = `<img src="${movieInfo.Poster}" alt="${movieInfo.Title} Poster">`;
        document.getElementById('info').innerHTML = `
            <h2 id="title">${movieInfo.Title}</h2>
            <p id="year"><strong>Year:</strong> ${movieInfo.Year}</p>
            <p id="genre"><strong>Genre:</strong> ${movieInfo.Genre}</p>
            <p id="director"><strong>Director:</strong> ${movieInfo.Director}</p>
            <p id="actors"><strong>Actors:</strong> ${movieInfo.Actors}</p>
            <p id="plot"><strong>Plot:</strong> ${movieInfo.Plot}</p>
        `;
        // Optionally, you can show/hide the movie details section if needed
        document.getElementById('info').style.display = 'block';
    } else {
        alert('Failed to fetch movie info. Please try again later.');
    }
});
