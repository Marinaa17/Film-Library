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


// Define the URL of the OMDb API
const apiUrl = 'http://www.omdbapi.com/?s=movie&type=movie&apikey=ff43acd6';

// Function to fetch movie data from the OMDb API
async function fetchMovies() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data.Search; // Return an array of movie objects
    } catch (error) {
        console.error('Error fetching movies:', error);
        return []; // Return an empty array if an error occurs
    }
}

// Function to create HTML elements for each movie
function createMovieElements(movie) {
    const movieElement = document.createElement('section');
    movieElement.classList.add('movie-section');
    movieElement.innerHTML = `
        <img src="${movie.Poster}" alt="${movie.Title}">
        <h3>${movie.Title}</h3>
        <p>${movie.Year} | ${movie.Type}</p>
        <button>Add to favourites</button>
        <button>Mark as watched</button>
    `;
    return movieElement;
}

// Function to render movies on the page
async function renderMovies() {
    const movieList = document.getElementById('movieList');
    const movies = await fetchMovies();
    if (movies.length === 0) {
        movieList.textContent = 'No movies found.';
        return;
    }
    movieList.innerHTML = ''; // Clear previous movie elements
    movies.forEach(movie => {
        const movieElement = createMovieElements(movie);
        movieList.appendChild(movieElement);
    });
}

document.addEventListener('DOMContentLoaded', function () {
    if (window.location.pathname.includes('/home.html')) { // Check for home.html
        renderMovies();
    }
});


document.addEventListener('DOMContentLoaded', function () {
    const btn = document.getElementById('signUp');
    btn.addEventListener("click", () => {
        validateAndRegister();
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const btn = document.getElementById('logIn');
    btn.addEventListener("click", () => {
        loginUser();
    });
});