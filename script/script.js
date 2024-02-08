function validateSignUp() {

    var passed = true;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirmPassword").value;

    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        document.getElementById("emailErrorMessage").innerText = "Please enter a valid email address.";
        passed=false;
    }

    if (password.length < 6) {
        document.getElementById("passwordErrorMessage").innerText = "Password should be at least 6 characters.";
        passed=false;
    }

    if (password !== confirmPassword) {
        document.getElementById("confirmPasswordErrorMessage").innerText = "Passwords do not match. Please confirm the password.";
        passed=false;
    }

    // Validation passed
    return passed;
}

// Function to save user data after registration
function registerUser(email, password) {
    // Check if the user already exists
    if (getUserData(email)) {
        document.getElementById("signUpErrorMessage").innerText = "User with this email already exists.";
        return;
    }

    const userData = {
        email: email,
        password: password
    };

    // Convert the data to a JSON string
    const userDataString = JSON.stringify(userData);

    // Save the data to local storage using the email as the key
    localStorage.setItem(email, userDataString);

    window.location.href = "home.html";
    alert("You have registered successfully!");
}

function validateAndRegister() {
    if (validateSignUp()) {
        // Validation successful, proceed with registration
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        registerUser(email, password);
    } else {
        // Validation failed, handle accordingly (e.g., show an error message)
        // alert("Sign-up validation failed. Please check your inputs.");
    }
}


function getUserData(email) {
    // Get the data from local storage using the email as the key
    const userDataString = localStorage.getItem(email);

    // If user data is found, parse the JSON string back to an object
    return userDataString ? JSON.parse(userDataString) : null;
}


// Function to check login credentials
function loginUser() {
    
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const userData = getUserData(email);

    // Check if the user exists
    if (!userData) {
        document.getElementById("emailErrorMessage").innerText = "User with this email does not exist.";
        return;
    }

    // Check if the entered password matches the stored password
    if (userData.password !== password) {
        document.getElementById("passwordErrorMessage").innerText = "Incorrect password.";
        return;
    }

    // Redirect to home.html
    window.location.href = "home.html";

    // Show alert after the page has fully loaded (window.onload event)
    //window.onload = function () {
    //    alert("You have logged in successfully!");
    //}
}

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


// document.addEventListener('DOMContentLoaded', function () {
//     const btn = document.getElementById('signUp');
//     btn.addEventListener("click", () => {
//         validateAndRegister();
//     });
// });

// document.addEventListener('DOMContentLoaded', function () {
//     const btn = document.getElementById('logIn');
//     btn.addEventListener("click", () => {
//         loginUser();
//     });
// });

//Няма бутони с тези id-та, затова ги закоментирам.