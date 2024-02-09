document.addEventListener('DOMContentLoaded', function () {
    fetch('../json/watchedMovies.json')
    .then(response => response.json())
    .then(data => {
        var favoutieMoviesMain = document.getElementById('watched-movies');
        if (!data || data.length === 0) {
            var message = document.createElement('p');
            message.textContent = "You don't have any favourite movies yet.";
            favoutieMoviesMain.appendChild(message);
            return;
        }
        var favoutieMoviesList = document.createElement('ul');
        data.forEach(favMovie => {
            var url = `https://www.omdbapi.com/?t=${favMovie.title}&y=${favMovie.year}&apikey=ff43acd6`;

            fetch(url)
            .then(response => response.json())
            .then(movie => {
                const listItem = document.createElement('li');
                listItem.textContent = `${movie.Title} (${movie.Year})`;
                var buttonMoreInfo = document.createElement('button');
                buttonMoreInfo.textContent = 'More info';
                buttonMoreInfo.classList.add('more-info-btn');
                listItem.appendChild(buttonMoreInfo);
                favoutieMoviesList.appendChild(listItem);

                // // Assign event listeners to the buttons
                // listItem.querySelector('.remove-from-favourites').addEventListener('click', function () {
                //     // Implement removal logic
                //     console.log('Remove from favourites button clicked.');
                // });

                // listItem.querySelector('.mark-as-watched').addEventListener('click', function () {
                //     // Implement mark as watched logic
                //     console.log('Mark as watched button clicked.');
                // });
            })
            .catch(error => {
                console.error('Error fetching movie details:', error);
            });
        });
        favoutieMoviesMain.appendChild(favoutieMoviesList); // Append the list to the DOM
    })
    .catch(error => {
        console.error('Error loading favorites:', error);
    });
});
