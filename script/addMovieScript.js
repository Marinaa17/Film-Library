const loggedInUsername = localStorage.getItem('loggedInUser');

document.getElementById('movie-form').addEventListener('submit',async function(event) {
    event.preventDefault();
    
    const title = document.getElementById('title').value;
    const year = document.getElementById('year').value;

    const newMovie = { 
        title: title, 
        year: year 
    };

    const existsInJson = await checkIfMovieExistsInJson(title, year);
    const existsInLocalStorage = checkIfMovieExistsInLocalStorage(title, year);
    const existsInOMDb = await checkIfMovieExistsInOMDb(title, year);

    if (!existsInJson && !existsInLocalStorage && existsInOMDb) {
        addMovieToLocalStorage(newMovie);
    } else {
        alert("Movie already exists or not found in the OMDb database.");
    }
});

async function checkIfMovieExistsInOMDb(title, year) {
    try {
        const apiKey = 'ff43acd6';
        const apiUrl = `http://www.omdbapi.com/?apikey=${apiKey}&t=${encodeURIComponent(title)}&y=${year}`;

        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.Response === 'True') {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error('Error checking if movie exists in OMDb:', error);
        return false;
    }
}

async function checkIfMovieExistsInJson(movieTitle, movieYear) {
    try {
        const response = await fetch("../json/movies.json");
        if (!response.ok) {
            throw new Error('Failed to fetch movies data.');
        }

        const movies = await response.json();

        const movieExists = movies.some(movie => movie.title === movieTitle && movie.year === movieYear);

        return movieExists;

    } catch (error) {
        console.error('Error checking if movie exists in the JSON  file with movies:', error);
        return false; 
    }
}

function checkIfMovieExistsInLocalStorage(movieTitle, movieYear) {
    const userData = getUserData(loggedInUsername);
    if (!userData.username) {
        console.error('User not found.');
        return false; 
    }

    try {
        const localMovies = userData.addedMovies || [];
        const movieExists = localMovies.some(movie => movie.title === movieTitle && movie.year === movieYear);

        return movieExists;
    } catch (error) {
        console.error('Error checking if movie exists in local storage:', error);
        return false; 
    }
}

function addMovieToLocalStorage(newMovie) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userIndex = users.findIndex(user => user.username === loggedInUsername);

    if (userIndex === -1) {
        console.error('User not found.');
        return;
    }

    try {
        const existingMovies = users[userIndex].addedMovies || [];
        existingMovies.push(newMovie);
        
        users[userIndex].addedMovies = existingMovies;
        localStorage.setItem('users', JSON.stringify(users));

        alert('Movie added successfully.');
    } catch (error) {
        console.error('Error adding movie to local storage array:', error);
    }
}


function getUserData(loggedInUsername) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    return users.find(user => user.username === loggedInUsername) || { username: '', email: '', password: '', favourites: [], watched: [], addedMovies: [] };
}