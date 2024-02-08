document.addEventListener('DOMContentLoaded', function () {
    fetch('favouritesID.json').then(response => response.json())
    .then(data => {
        var favoutieMoviesList = document.getElementById('movie-list');
        if (!data || data.length === 0) {
            var message = document.createElement('p');
            message.textContent = 'You don\'t have any favourites yet.';
            favoutieMoviesList.appendChild(message); 
            return;
        }
        data.forEach(imbdId => {
            var url = 'http://www.omdbapi.com/?i=${imdbId}&apikey=ff43acd6';

            fetch(url).then(response => response.json())
            .then(movie => {
                var movieSection = document.createElement('section');
                movieSection.classList.add('movie-section');
                movieSection.innerHTML = `
                <img src="${movie.Poster}" alt="${movie.Title}">
                <h3>${movie.Title}</h3>
                <p><strong>Year:</strong> ${movie.Year}</p>
                <p><strong>Type:</strong> ${movie.Type}</p>
                <button>Remove from favourites</button>
                <button>Mark as watched</button>`;
                favoutieMoviesList.appendChild(movieSection);
            })
            .catch(error => {
                console.error('Error fetching movie details:', error);
            });
        });
    })
    .catch(error => {
        console.error('Error loading favorites:', error);
    });
});