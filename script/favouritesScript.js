const loggedInUsername = localStorage.getItem('loggedInUser');

document.addEventListener('DOMContentLoaded', function () {
    const favoutieMoviesMain = document.getElementById('favourite-movies');
    const userData = getUserData(loggedInUsername);
    const favouriteMovies = userData.favourites;
    
    if (!favouriteMovies || favouriteMovies.length === 0) {
        const message = document.createElement('p');
        message.textContent = "You don't have any favourite movies yet.";
        favoutieMoviesMain.appendChild(message);
        return;
    }

    const favoutieMoviesList = document.createElement('ul');
    favoutieMoviesList.setAttribute('id', 'favourite-movies-list');
    favouriteMovies.forEach(favMovie => {
        const url = `https://www.omdbapi.com/?t=${favMovie.title}&y=${favMovie.year}&apikey=ff43acd6`;

        fetch(url)
            .then(response => response.json())
            .then(movie => {
                const listItem = document.createElement('li');
                listItem.textContent = `${movie.Title} (${movie.Year})`;
                const buttonMoreInfo = document.createElement('button');
                buttonMoreInfo.textContent = 'More info';
                buttonMoreInfo.classList.add('orange-button');
                buttonMoreInfo.classList.add('more-info-btn');
                listItem.appendChild(buttonMoreInfo);
                favoutieMoviesList.appendChild(listItem);
            })
            .catch(error => {
                console.error('Error fetching movie details:', error);
            });
    });

    favoutieMoviesMain.appendChild(favoutieMoviesList);
});

document.addEventListener('DOMContentLoaded', function () {
    const movieList = document.getElementById('favourite-movies-list');

    if (!movieList) {
        return;
    }

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
        if (event.target.classList.contains('orange-button')) {
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

function getUserData(loggedInUsername) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    return users.find(user => user.username === loggedInUsername) || { username: '', email: '', password: '', favourites: [], watched: [], addedMovies: [] };
}