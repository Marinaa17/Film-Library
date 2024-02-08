function loadMoviesData(callback) {
    // Fetch the movies.json file
    fetch('movies.json')
        .then(response => response.json())
        .then(data => {
            // Call the provided callback function with the loaded data
            callback(data);
        })
        .catch(error => console.error('Error fetching movies:', error));
}
