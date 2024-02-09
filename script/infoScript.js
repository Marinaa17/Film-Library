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
            <button id="toggle-favourites" class="${movieInFavourites(movieInfo.Title, movieInfo.Year) ? 'remove-from-favourites' : 'add-to-favourites'}">${movieInFavourites(movieInfo.Title, movieInfo.Year) ? 'Remove from favourites' : 'Add to favourites'}</button>
            <button id="toggle-watched" class="${movieInWatched(movieInfo.Title, movieInfo.Year) ? 'remove-from-watched' : 'add-to-watched'}">${movieInWatched(movieInfo.Title, movieInfo.Year) ? 'Remove from watched' : 'Add to watched'}</button>
        `;
        
        // Event listener for "Add to favourites" or "Remove from favourites" button
        const toggleFavouritesBtn = document.getElementById('toggle-favourites');
        toggleFavouritesBtn.addEventListener('click', function () {
            toggleFavourites(movieInfo.Title, movieInfo.Year, toggleFavouritesBtn);
        });

        // Event listener for "Add to watched" or "Remove from watched" button
        const toggleWatchedBtn = document.getElementById('toggle-watched');
        toggleWatchedBtn.addEventListener('click', function () {
            toggleWatched(movieInfo.Title, movieInfo.Year, toggleWatchedBtn);
        });
    } else {
        alert('Failed to fetch movie info. Please try again later.');
    }
});

function movieInFavourites(title, year) {
    const movies = JSON.parse(localStorage.getItem('favourite-movies')) || [];
    return movies.some(movie => movie.title === title && movie.year === year);
}

function movieInWatched(title, year) {
    const movies = JSON.parse(localStorage.getItem('watched-movies')) || [];
    return movies.some(movie => movie.title === title && movie.year === year);
}

function toggleFavourites(title, year, button) {
    if (button.classList.contains('add-to-favourites')) {
        addMovieToFavourites(title, year);
        button.textContent = 'Remove from favourites';
        button.classList.remove('add-to-favourites');
        button.classList.add('remove-from-favourites');
    } else if (button.classList.contains('remove-from-favourites')) {
        removeMovieFromFavourites(title, year);
        button.textContent = 'Add to favourites';
        button.classList.remove('remove-from-favourites');
        button.classList.add('add-to-favourites');
    }
}

function toggleWatched(title, year, button) {
    if (button.classList.contains('add-to-watched')) {
        addMovieToWatched(title, year);
        button.textContent = 'Remove from watched';
        button.classList.remove('add-to-watched');
        button.classList.add('remove-from-watched');
    } else if (button.classList.contains('remove-from-watched')) {
        removeMovieFromWatched(title, year);
        button.textContent = 'Add to watched';
        button.classList.remove('remove-from-watched');
        button.classList.add('add-to-watched');
    }
}

function addMovieToFavourites(title, year) {
    const movieInfo = { title: title, year: year };
    if (movieInfo) {
        let movies = JSON.parse(localStorage.getItem('favourite-movies')) || [];
        movies.push(movieInfo);
        localStorage.setItem('favourite-movies', JSON.stringify(movies));
    }
}

function removeMovieFromFavourites(title, year) {
    const movies = JSON.parse(localStorage.getItem('favourite-movies')) || [];
    const indexToRemove = movies.findIndex(movie => movie.title === title && movie.year === year);
    if (indexToRemove !== -1) {
        movies.splice(indexToRemove, 1);
        localStorage.setItem('favourite-movies', JSON.stringify(movies));
    }
}

function addMovieToWatched(title, year) {
    const movieInfo = { title: title, year: year };
    if (movieInfo) {
        let movies = JSON.parse(localStorage.getItem('watched-movies')) || [];
        movies.push(movieInfo);
        localStorage.setItem('watched-movies', JSON.stringify(movies));
    }
}

function removeMovieFromWatched(title, year) {
    const movies = JSON.parse(localStorage.getItem('watched-movies')) || [];
    const indexToRemove = movies.findIndex(movie => movie.title === title && movie.year === year);
    if (indexToRemove !== -1) {
        movies.splice(indexToRemove, 1);
        localStorage.setItem('watched-movies', JSON.stringify(movies));
    }
}
