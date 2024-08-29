const loggedInUser = getLoggedInUser();
const userData = getUserData(loggedInUser);

document.addEventListener('DOMContentLoaded', function () {
    const movieList = document.getElementById('movie-list');

    fetch('../json/movies.json')
        .then(response => response.json())
        .then(jsonMovies => {
            const localMovies = userData.addedMovies || [];

            const allMovies = [...jsonMovies, ...localMovies];

            allMovies.sort((a, b) => a.title.localeCompare(b.title));

            allMovies.forEach(movie => {

                const apiKey = 'ff43acd6';
                const apiUrl = `https://www.omdbapi.com/?t=${movie.title}&y=${movie.year}&apikey=${apiKey}`;

                fetch(apiUrl)
                    .then(response => response.json())
                    .then(apiData => {
                        // Check if the API returned a valid movie object
                        if (apiData.Response === "True") {
                            // Create a list item for each movie
                            const movieItem = document.createElement('li');
                            movieItem.className = 'movie-item';

                            const movieImage = document.createElement('img');
                            movieImage.src = apiData.Poster !== "N/A" ? apiData.Poster : 'placeholder.jpg'; // Use a placeholder if no poster found
                            movieImage.alt = movie.title;

                            const movieTitle = document.createElement('label');
                            movieTitle.textContent = `${movie.title} (${movie.year})`;

                            const buttonMoreInfo = document.createElement('button');
                            buttonMoreInfo.textContent = 'More Info';
                            buttonMoreInfo.classList.add('more-info-btn');

                            movieItem.appendChild(movieImage);
                            movieItem.appendChild(movieTitle);
                            movieItem.appendChild(buttonMoreInfo);

                            movieList.appendChild(movieItem);

                            //default sorting 
                            const movies = Array.from(movieList.children);
                            movies.sort((a, b) => a.textContent.trim().toLowerCase().localeCompare(b.textContent.trim().toLowerCase()));
                            movieList.innerHTML = '';
                            movies.forEach(movie => {
                                movieList.appendChild(movie);
                            });
                            
                        } else {
                            console.error(`No data found for ${movie.title}`);
                        }
                    })
                    .catch(error => console.error('Error fetching movie data:', error));
            });
        })
        .catch(error => console.error('Error fetching or displaying movies:', error));
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
        const apiKey = '19171878';
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

function getUserData(loggedInUser) {
    const allUsersString = localStorage.getItem("users");
    const allUsers = JSON.parse(allUsersString);
    const userData = allUsers.find(user => user.username === loggedInUser);
    return userData || { username: '', email: '', password: '', favourites: [], watched: [], addedMovies: [] };
}

function getLoggedInUser() {
    return localStorage.getItem('loggedInUser');
}

let currentSlide = 0;
const slides = document.querySelectorAll('.carousel__slide');
const totalSlides = slides.length;
const slideInterval = 6000; // 6 seconds

function showSlide(index) {
    if (index >= totalSlides) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = totalSlides - 1;
    } else {
        currentSlide = index;
    }
    const newTransform = `translateX(-${currentSlide * 100}%)`;
    document.querySelector('.carousel__viewport').style.transform = newTransform;
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

function prevSlide() {
    showSlide(currentSlide - 1);
}

// Initialize the carousel to show the first slide
showSlide(currentSlide);

// Set interval to automatically change slides
setInterval(nextSlide, slideInterval);
