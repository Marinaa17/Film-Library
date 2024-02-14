const loggedInUserEmail = getLoggedInUserEmail();
const userData = getUserData(loggedInUserEmail);

document.addEventListener('DOMContentLoaded', function () {
    const watchedMoviesMain = document.getElementById('watched-movies');
    const watchedMovies = userData.watched;

    if (!watchedMovies || watchedMovies.length === 0) {
        const message = document.createElement('p');
        message.textContent = "You don't have any watched movies yet.";
        watchedMoviesMain.appendChild(message);
        return;
    }

    const watchedMoviesList = document.createElement('ul');
    watchedMoviesList.setAttribute('id', 'watched-movies-list');
    watchedMovies.forEach(watchedMovie => {
        const url = `https://www.omdbapi.com/?t=${watchedMovie.title}&y=${watchedMovie.year}&apikey=ff43acd6`;

        fetch(url)
            .then(response => response.json())
            .then(movie => {
                const listItem = document.createElement('li');
                listItem.textContent = `${movie.Title} (${movie.Year})`;
                const buttonMoreInfo = document.createElement('button');
                buttonMoreInfo.textContent = 'More info';
                buttonMoreInfo.classList.add('more-info-btn');
                listItem.appendChild(buttonMoreInfo);
                watchedMoviesList.appendChild(listItem);
            })
            .catch(error => {
                console.error('Error fetching movie details:', error);
            });
    });

    watchedMoviesMain.appendChild(watchedMoviesList);
});

document.addEventListener('DOMContentLoaded', function () {
    const movieList = document.getElementById('watched-movies-list');

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

    movieList.addEventListener('click', async function (event) {
        if (event.target.classList.contains('more-info-btn')) {
            const listItem = event.target.closest('li');
            const titleYear = listItem.textContent.split(' (');
            const title = titleYear[0];
            const year = titleYear[1].slice(0, -1);
            const movieInfo = await fetchMovieInfo(title, year);
            if (movieInfo) {
                const queryString = `?title=${encodeURIComponent(title)}&year=${encodeURIComponent(year)}`;
                window.location.href = `info.html${queryString}`;
            } else {
                alert('Failed to fetch movie info. Please try again later.');
            }
        }
    });
});

function getUserData(loggedInUserEmail) {
    const userDataString = localStorage.getItem(loggedInUserEmail);
    return userDataString ? JSON.parse(userDataString) : { email: '', password: '', favourites: [], watched: [], addedMovies: [] };
}

function getLoggedInUserEmail() {
    return localStorage.getItem('loggedInUserEmail');
}