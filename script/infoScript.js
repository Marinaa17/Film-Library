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
            <button id="add-to-favourites">Add to favourites</button>
        `;
        if (movieExists(movieInfo.Title, movieInfo.Year)) {
            document.getElementById('info').innerHTML = `
            <button id="remove-from-favourites">Remove from favourites</button>
        `;
        } else {
            document.getElementById('info').innerHTML = `
            <button id="add-to-favourites">Add to favourites</button>
        `;
        }
        // Optionally, you can show/hide the movie details section if needed
        document.getElementById('info').style.display = 'block';
    } else {
        alert('Failed to fetch movie info. Please try again later.');
    }

    // Event listener for "Add to favourites" or "Remove from favourites" button
    const addToFavoritesBtn = document.getElementById('add-to-favourites');
    const removeFromFavoritesBtn = document.getElementById('remove-from-favourites');

    if (addToFavoritesBtn) {
        addToFavoritesBtn.addEventListener('click', function () {
            addMovieToFavourites(movieInfo.Title, movieInfo.Year);
            // Add your logic to handle adding to favourites here
        });
    } else if (removeFromFavoritesBtn){
        removeFromFavoritesBtn.addEventListener('click', function () {
            removeMovieFromFavourites(movieInfo.Title, movieInfo.Year);
            // Add your logic to handle adding to favourites here
        });
    }
});

function movieExists(title, year) {
    // Retrieve movies from localStorage
    const movies = JSON.parse(localStorage.getItem('movies')) || [];
    
    // Check if any movie in the array matches the given title and year
    return movies.some(movie => movie.title === title && movie.year === year);
}

function addMovieToFavourites(title, year) {

    const movieInfo = {
        title: title,
        year: year
    };

    // Check if movieInfo is not null or undefined
    if (movieInfo) {
        // Retrieve existing movies from localStorage or initialize an empty array
        let movies = JSON.parse(localStorage.getItem('movies')) || [];

        movies.push(movieInfo);

        localStorage.setItem('movies', JSON.stringify(movies));
    }
}

function removeMovieFromFavourites(title, year) {

    // Retrieve movies from localStorage
    const movies = JSON.parse(localStorage.getItem('movies')) || [];
    
    // Find index of movie to remove
    const indexToRemove = movies.findIndex(movie => movie.title === title && movie.year === year);

    // If movie found, remove it
    if (indexToRemove !== -1) {
        movies.splice(indexToRemove, 1); // Remove the movie from the array
        localStorage.setItem('movies', JSON.stringify(movies)); // Update localStorage
        console.log('Movie removed from favorites:', title, year);
    } else {
        console.log('Movie not found in favorites:', title, year);
    }
}
