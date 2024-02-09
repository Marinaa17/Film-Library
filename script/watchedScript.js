document.addEventListener('DOMContentLoaded', function () {
    const favoutieMoviesMain = document.getElementById('watched-movies');
    const favouriteMovies = JSON.parse(localStorage.getItem('watched-movies')) || [];

    if (!favouriteMovies || favouriteMovies.length === 0) {
        const message = document.createElement('p');
        message.textContent = "You don't have any favourite movies yet.";
        favoutieMoviesMain.appendChild(message);
        return;
    }

    const favoutieMoviesList = document.createElement('ul');
    favouriteMovies.forEach(favMovie => {
        const url = `https://www.omdbapi.com/?t=${favMovie.title}&y=${favMovie.year}&apikey=ff43acd6`;

        fetch(url)
            .then(response => response.json())
            .then(movie => {
                const listItem = document.createElement('li');
                listItem.textContent = `${movie.Title} (${movie.Year})`;
                const buttonMoreInfo = document.createElement('button');
                buttonMoreInfo.textContent = 'More info';
                buttonMoreInfo.classList.add('more-info-btn');
                listItem.appendChild(buttonMoreInfo);
                favoutieMoviesList.appendChild(listItem);
            })
            .catch(error => {
                console.error('Error fetching movie details:', error);
            });
    });

    favoutieMoviesMain.appendChild(favoutieMoviesList); // Append the list to the DOM
});
