fetch('favouritesID.json').then(response => response.json())
.then(data => {
    const favoutieMoviesList = document.getElementById('movie-list');
    data.forEach(imbdId => {
        const url = 'http://www.omdbapi.com/?i=${imdbId}&apikey=ff43acd6';

        fetch(url).then(response => response.json())
        .then(movie => {
            const movieSection = document.createElement('section');
            movieSection.classList.add('movie-section');
            movieSection.innerHTML = `
            <img src="${movie.Poster}" alt="${movie.Title}">
            <h3>${movie.Title}</h3>
            <p><strong>Year:</strong> ${movie.Year}</p>
            <p><strong>Type:</strong> ${movie.Type}</p>
            <button>Remove from favourites</button>
            <button>Mark as watched</button>`;
        })
    })
})