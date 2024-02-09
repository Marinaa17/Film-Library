document.addEventListener('DOMContentLoaded', function () {
    const movieList = document.getElementById('movie-list');

    // Fetch movies from movies.json
    fetch('../json/movies.json')
        .then(response => response.json())
        .then(data => {
            // Sort movies by title
            data.sort((a, b) => a.title.localeCompare(b.title));
            
            // Populate the movie list
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

//НЕ ТРИЙ!!!!

// document.addEventListener('DOMContentLoaded', function () {
//     const movieList = document.getElementById('movie-list');
//     const sortButton = document.querySelector('.sort-btn');
//     let ascendingOrder = false;

//     // Function to sort the movie list
//     function sortMovieList(order) {
//         const movies = Array.from(movieList.children);
//         movies.sort((a, b) => {
//             const titleA = a.textContent.toLowerCase();
//             const titleB = b.textContent.toLowerCase();
//             return order ? titleA.localeCompare(titleB) : titleB.localeCompare(titleA);
//         });

//         // Clear the current movie list
//         movieList.innerHTML = '';

//         // Append the sorted movies to the list
//         movies.forEach(movie => {
//             movieList.appendChild(movie);
//         });
//     }
//     // Toggle sorting order when the button is clicked
//     sortButton.addEventListener('click', function () {
//         sortMovieList(ascendingOrder);
//         ascendingOrder = !ascendingOrder;
//         if (ascendingOrder) {
//             sortButton.textContent = 'Sort A->Z';
//         } else {
//             sortButton.textContent = 'Sort Z->A';
//         }
//     });
// });

//НЕ ТРИЙ ГОРНОТО!!!! Може да видиш дали ще намериш бъга тук

document.addEventListener('DOMContentLoaded', function () {
    const dropdown = document.querySelector('.dropdown');
    const movieList = document.getElementById('movie-list');

    // Function to sort the movie list
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

        // Clear the current movie list
        movieList.innerHTML = '';

        // Append the sorted movies to the list
        movies.forEach(movie => {
            movieList.appendChild(movie);
        });
    }

    // Function to extract year from title
    function getYearFromTitle(movie) {
        const title = movie.textContent.trim();
        const yearStartIndex = title.lastIndexOf('(') + 1;
        const yearEndIndex = title.lastIndexOf(')');
        const yearString = title.substring(yearStartIndex, yearEndIndex);
        return yearString;
    }

    // Event listener for dropdown selection
    dropdown.addEventListener('change', function () {
        const selectedOption = dropdown.value;
        sortMovieList(selectedOption);
    });

    // Initial sort based on default option
    sortMovieList('az');
});

  

document.addEventListener('DOMContentLoaded', function () {
    const movieList = document.getElementById('movie-list');

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

    // Event listener for "More info" buttons
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


// Define the URL of the OMDb API
//const apiUrl = 'http://www.omdbapi.com/?s=movie&type=movie&apikey=ff43acd6';

// Function to fetch movie data from the OMDb API
// async function fetchMovies() {
//     try {
//         const response = await fetch(apiUrl);
//         if (!response.ok) {
//             throw new Error('Network response was not ok');
//         }
//         const data = await response.json();
//         return data.Search; // Return an array of movie objects
//     } catch (error) {
//         console.error('Error fetching movies:', error);
//         return []; // Return an empty array if an error occurs
//     }
// }

// // Function to create HTML elements for each movie
// function createMovieElements(movie) {
//     const movieElement = document.createElement('section');
//     movieElement.classList.add('movie-section');
//     movieElement.innerHTML = `
//         <img src="${movie.Poster}" alt="${movie.Title}">
//         <h3>${movie.Title}</h3>
//         <p>${movie.Year} | ${movie.Type}</p>
//         <p class="hidden-info">ID: ${movie.imdbID}</p>
//         <button class="add-to-favs-btn">Add to favourites</button>
//         <button class="add-to-watched-btn">Mark as watched</button>
//     `;
//     //promenih clasovete i addnah skrito ID, за да може да се вземе ID-то на филма
//     return movieElement;
// }

// // Function to render movies on the page
// async function renderMovies() {
//     const movieList = document.getElementById('movieList');
//     const movies = await fetchMovies();
//     if (movies.length === 0) {
//         movieList.textContent = 'No movies found.';
//         return;
//     }
//     movieList.innerHTML = ''; // Clear previous movie elements
//     movies.forEach(movie => {
//         const movieElement = createMovieElements(movie);
//         movieList.appendChild(movieElement);
//     });
// }

// document.addEventListener('DOMContentLoaded', function () {
//     if (window.location.pathname.includes('/home.html')) { // Check for home.html
//         renderMovies();
//     }
// });

//Ani
// document.addEventListener('DOMContentLoaded', function () {
//     const sections = document.querySelectorAll('.movie-section');

//     sections.forEach(section => {
//         const addToFavsButton = section.getElementsByClassName('.add-to-favs-btn');
//         const removeFromFavsButton = section.getElementsByClassName('.remove-from-favs-btn');
//         const addToWatchedButton = section.getElementsByClassName('.add-to-watched-btn');
//         const removeFromWatchedButton = section.getElementsByClassName('.remove-from-watched-btn');
//         const movieIdParagraph = section.getElementsByClassName('.hidden-info');

//         addToFavsButton.addEventListener('click', function () {
//             this.classList.add('remove-from-favs-btn');
//             this.classList.remove('add-to-favs-btn');
//             this.textContent = 'Remove from favourites';
//             const movieId = movieIdParagraph.textContent;
//             saveToJSON('favoritesID.json', movieId);
//         });

//         removeFromFavsButton.addEventListener('click', function () {
//             this.classList.remove('remove-from-favs-btn');
//             this.classList.add('add-to-favs-btn');
//             this.textContent = 'Add to favourites';
//             const movieId = movieIdParagraph.textContent;
//             removeFromJSON('favoritesID.json', movieId);
//         });

//         addToWatchedButton.addEventListener('click', function () {
//             this.classList.add('remove-from-watched-btn');
//             this.classList.remove('add-to-watched-btn');
//             this.textContent = 'Remove from Watched';
//             const movieId = movieIdParagraph.textContent;
//             saveToJSON('watchedID.json', movieId);
//         });

//         removeFromWatchedButton.addEventListener('click', function () {
//             this.classList.remove('remove-from-watched-btn');
//             this.classList.add('add-to-watched-btn');
//             this.textContent = 'Mark as watched';
//             const movieId = movieIdParagraph.textContent;
//             removeFromJSON('watchedID.json', movieId);
//         });
//     });

//     function saveToJSON(filename, movieId) {
//         fetch(filename)
//             .then(response => response.json())
//             .then(data => {
//                 data.push(movieId);
//                 const jsonData = JSON.stringify(data);
//                 saveJSON(filename, jsonData);
//             })
//             .catch(error => console.error('Error fetching data:', error));
//     }

//     function removeFromJSON(filename, movieId) {
//         fetch(filename)
//             .then(response => response.json())
//             .then(data => {
//                 const index = data.indexOf(movieId);
//                 if (index > -1) {
//                     data.splice(index, 1);
//                     const jsonData = JSON.stringify(data);
//                     saveJSON(filename, jsonData);
//                 }
//             })
//             .catch(error => console.error('Error fetching data:', error));
//     }

//     function saveJSON(filename, jsonData) {
//         // Here you can implement code to save jsonData to the specified filename
//         console.log(`Saving data to ${filename}:`, jsonData);
//     }
// });