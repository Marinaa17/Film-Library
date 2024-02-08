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

document.addEventListener('DOMContentLoaded', function () {
    const movieList = document.getElementById('movie-list');
    const sortButton = document.querySelector('.sort-btn');
    let ascendingOrder = false;

    // Function to sort the movie list
    function sortMovieList(order) {
        const movies = Array.from(movieList.children);
        movies.sort((a, b) => {
            const titleA = a.textContent.toLowerCase();
            const titleB = b.textContent.toLowerCase();
            return order ? titleA.localeCompare(titleB) : titleB.localeCompare(titleA);
        });

        // Clear the current movie list
        movieList.innerHTML = '';

        // Append the sorted movies to the list
        movies.forEach(movie => {
            movieList.appendChild(movie);
        });
    }
    // Toggle sorting order when the button is clicked
    sortButton.addEventListener('click', function () {
        sortMovieList(ascendingOrder);
        ascendingOrder = !ascendingOrder;
        if (ascendingOrder) {
            sortButton.textContent = 'Sort A->Z';
        } else {
            sortButton.textContent = 'Sort Z->A';
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const movieList = document.getElementById('movie-list');
    const modal = document.createElement('div');
    modal.id = 'myModal';
    modal.classList.add('modal');
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close">&times;</span>
            <h2 id="modal-title"></h2>
            <p><strong>Year:</strong> <span id="modal-year"></span></p>
            <p><strong>Director:</strong> <span id="modal-director"></span></p>
            <p><strong>Runtime:</strong> <span id="modal-runtime"></span></p>
            <p><strong>Plot:</strong> <span id="modal-plot"></span></p>
            <img id="modal-poster" src="" alt="Movie Poster">
        </div>
    `;
    document.body.appendChild(modal);

    // Get the <span> element that closes the modal
    const span = modal.querySelector('.close');

    // Event listener for closing the modal
    span.onclick = function () {
        modal.style.display = "none";
    }

    // Event listener for clicking anywhere outside of the modal to close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

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
                // Display movie info in the popup modal
                modal.style.display = "block";
                document.getElementById('modal-title').textContent = movieInfo.Title;
                document.getElementById('modal-year').textContent = movieInfo.Year;
                document.getElementById('modal-director').textContent = movieInfo.Director;
                document.getElementById('modal-runtime').textContent = movieInfo.Runtime;
                document.getElementById('modal-plot').textContent = movieInfo.Plot;
                document.getElementById('modal-poster').src = movieInfo.Poster;
            } else {
                alert('Failed to fetch movie info. Please try again later.');
            }
        }
    });
});

//after clicking the "add to favourites" button on the more info page

document.addEventListener('DOMContentLoaded', function () {
    const addToFavoritesBtn = document.getElementById('.add-to-favourites');
    
    btn.addEventListener("click", () => {
        addMovieToFavourites();
    });
});

function addMovieToFavourites() {

    const title = document.getElementById("title").value;
    const year = document.getElementById("year").value;

    //save this movie info in json file "favouriteMovies"
    const movieInfo = {
        title: title,
        year: year
    };

    // Fetch existing data from favouriteMovies.json
    fetch('../json/favouriteMovies.json')
        .then(response => response.json())
        .then(data => {
            // Append new movie object to existing data
            data.push(movieInfo);

            // Convert updated data to JSON string
            const updatedData = JSON.stringify(data);

            // Write updated data back to favouriteMovies.json
            return fetch('favouriteMovies.json', {
                method: 'PUT', // Use PUT method to replace entire file
                body: updatedData,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        })
        .then(response => {
            if (response.ok) {
                console.log("Movie added to favourites successfully!");
            } else {
                console.error("Failed to add movie to favourites.");
            }
        })
        .catch(error => {
            console.error("Error:", error);
        });
}
//


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