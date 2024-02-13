document.getElementById('movieForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission
    
    const title = document.getElementById('title').value;
    const year = document.getElementById('year').value;

    const newMovie = { 
        title: title, 
        year: year 
    };

    addMovieToLocalStorage(newMovie);
});

//
// async function logMovies() {
//     const response = await fetch("../json/movies.json");
//     const movies = await response.json(); // това са всички филми в movies.json
//     console.log(movies);
//   }

// async function postJSON(data) {
//     try {
//       const response = await fetch("https://example.com/profile", {
//         method: "POST", // or 'PUT'
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data),
//       });
  
//       const result = await response.json();
//       console.log("Success:", result);
//     } catch (error) {
//       console.error("Error:", error);
//     }
// }
  
//   async function checkOMDb(title, year) {
//     const apiKey = 'ff43acd6';
//     const apiUrl = `http://www.omdbapi.com/?apikey=${apiKey}&t=${encodeURIComponent(title)}&y=${year}`;
    
//     try {
//         const response = await fetch(apiUrl);
//         const data = await response.json();

//         if (data.Response === 'True') {
//             console.log("Movie exists in OMDb API");
//             return true;
//         } else {
//             console.log("Movie does not exist in OMDb API");
//             return false;
//         }
//     } catch (error) {
//         console.error('Error checking OMDb:', error);
//         return false;
//     }
// }

async function checkIfMovieExists(movieTitle, movieYear) {
    // Fetch movies data from movies.json
    const response = await fetch("../json/movies.json");
    const movies = await response.json();

    // Check if any movie matches the provided title and year
    const movieExistsInJson = movies.some(movie => movie.title === movieTitle && movie.year === movieYear);

    // Fetch movies data from local storage
    const localMovies = JSON.parse(localStorage.getItem('movies')) || [];

    // Check if any movie matches the provided title and year in local storage
    const movieExistsInLocalStorage = localMovies.some(movie => movie.title === movieTitle && movie.year === movieYear);

    // Return true if the movie exists in either movies.json or local storage, false otherwise
    return movieExistsInJson || movieExistsInLocalStorage;
}

// function addMovieToLocalStorage(movie) {

//     // Retrieve existing array from local storage
//     const existingMoviesString = localStorage.getItem('movies');
//     let existingMovies = [];

//     // Parse the retrieved JSON string into a JavaScript array
//     if (existingMoviesString) {
//         existingMovies = JSON.parse(existingMoviesString);
//     }

//     if (!Array.isArray(existingArray)) {
//         // If it's not an array, you may want to handle this situation appropriately.
//         // For example, you could reset existingArray to an empty array.
//         existingArray = [];
//     }

//     existingArray.push(movie);

//     // Convert the updated array back to a JSON string
//     const updatedArrayString = JSON.stringify(existingArray);

//     // Store the updated JSON string back into local storage
//     localStorage.setItem('movies', updatedArrayString);

// }

function addMovieToLocalStorage(newMovie) {
    try {
        let existingMovies = JSON.parse(localStorage.getItem('movies')) || [];
        
        // Check for duplicate entries before adding the object
        if (!existingMovies.some(movie => movie.title === newMovie.title && movie.year === newMovie.year)) {
            existingMovies.push(newMovie);
            
            localStorage.setItem('movies', JSON.stringify(existingMovies));
            
            alert('Movie added successfully.');
        } else {
            alert('This movie already exists.');
        }
        console.error('Error adding movie to local storage array:', error);
    }
}