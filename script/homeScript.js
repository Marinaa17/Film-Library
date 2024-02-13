document.addEventListener('DOMContentLoaded', function () {
    const movieList = document.getElementById('movie-list');

    fetch('../json/movies.json')
        .then(response => response.json())
        .then(data => {
            data.sort((a, b) => a.title.localeCompare(b.title));
            data.forEach(movie => {
                const listItem = document.createElement('li');
                listItem.textContent = `${movie.title} (${movie.year})`;
                var buttonMoreInfo = document.createElement('button');
                buttonMoreInfo.textContent = 'More info';
                buttonMoreInfo.classList.add('more-info-btn');
                listItem.appendChild(buttonMoreInfo);
                movieList.appendChild(listItem);
            });
        })
        .catch(error => console.error('Error fetching movies:', error));
});

document.addEventListener('DOMContentLoaded', function () {
    const dropdown = document.querySelector('.dropdown');
    const movieList = document.getElementById('movie-list');

    function sortMovieList(order) {
        const movies = Array.from(movieList.children);

        movies.sort((a, b) => {
            const titleA = a.textContent.trim().toLowerCase();
            const titleB = b.textContent.trim().toLowerCase();
            if (order === 'az') {
                return titleA.localeCompare(titleB);
            } else if (order === 'za') {
                return titleB.localeCompare(titleA);
            } else if (order === 'newest') {
                return parseInt(getYearFromTitle(b)) - parseInt(getYearFromTitle(a));
            } else if (order === 'oldest') {
                return parseInt(getYearFromTitle(a)) - parseInt(getYearFromTitle(b));
            }
        });

        movieList.innerHTML = '';
        movies.forEach(movie => {
            movieList.appendChild(movie);
        });
    }

    function getYearFromTitle(movie) {
        const title = movie.textContent.trim();
        const yearStartIndex = title.lastIndexOf('(') + 1;
        const yearEndIndex = title.lastIndexOf(')');
        const yearString = title.substring(yearStartIndex, yearEndIndex);
        return yearString;
    }

    dropdown.addEventListener('change', function () {
        const selectedOption = dropdown.value;
        sortMovieList(selectedOption);
    });

    sortMovieList('az');
});

document.addEventListener('DOMContentLoaded', function () {
    const movieList = document.getElementById('movie-list');

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