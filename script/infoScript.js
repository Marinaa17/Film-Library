const loggedInUserEmail = getLoggedInUserEmail();
const userData = getUserData(loggedInUserEmail);

document.addEventListener('DOMContentLoaded', async function () {
    const urlParams = new URLSearchParams(window.location.search);
    const title = urlParams.get('title');
    const year = urlParams.get('year');

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

    const movieInfo = await fetchMovieInfo(title, year);
    if (movieInfo) {
        const metascoreStyles = getMetascoreColor(movieInfo.Metascore);
        // document.getElementById('title').innerHTML = movieInfo.Title + ` (${movieInfo.Year})`;
        // document.getElementById('img').innerHTML = `<img src="${movieInfo.Poster}" alt="${movieInfo.Title} Poster">`;
        document.getElementById('info-section').innerHTML = `
            <h2 id="title">${movieInfo.Title} (${movieInfo.Year})</h2>
            <section id="info">
                <p id="director"><strong>Directed by:</strong> ${movieInfo.Director}</p>
                <p id="writer"><strong>Written by:</strong> ${movieInfo.Writer}</p>
                <p id="genre"><strong>Genre:</strong> ${movieInfo.Genre}</p>
                <p id="actors"><strong>Actors:</strong> ${movieInfo.Actors}</p>
                <p id="runtime"><strong>Runtime:</strong> ${movieInfo.Runtime}</p>
                <p id="language"><strong>Language:</strong> ${movieInfo.Language}</p>
                <p id="country"><strong>Country:</strong> ${movieInfo.Country}</p>
                <p id="released"><strong>Released:</strong> ${movieInfo.Released}</p>
                <p id="awards"><strong>Awards:</strong> ${movieInfo.Awards}</p>
                <p id="box-office"><strong>Box Office:</strong> ${movieInfo.BoxOffice}</p>
                <p id="plot"><strong>Plot:</strong> ${movieInfo.Plot}</p>
                <p id="production"><strong>Production:</strong> ${movieInfo.Production}</p>
            </section>
        `;
        document.getElementById('movie-info-left').innerHTML += `
                <img id="movie-poster" src="${movieInfo.Poster}" alt="${movieInfo.Title} Poster">
                <p id="imdb-rating"><strong>IMDB Rating:</strong> 
                    <span class="stars">${generateStars(movieInfo.imdbRating)}</span>
                    <span class="rating-text">${movieInfo.imdbRating}/10</span>
                </p>
                <p id="metascore"><strong>Metascore:</strong>
                    <span class="score-bar" 
                        style="background-color: ${metascoreStyles.background}; 
                        color: ${metascoreStyles.color};
                        padding: 4px; 
                        border-radius: 4px;">
                    ${movieInfo.Metascore}
                </span>
                </p>
                <button id="toggle-favourites" class="${movieInFavourites(movieInfo.Title, movieInfo.Year) ? 'remove-from-favourites' : 'add-to-favourites'}">${movieInFavourites(movieInfo.Title, movieInfo.Year) ? 'Remove from favourites' : 'Add to favourites'}</button>
                <button id="toggle-watched" class="${movieInWatched(movieInfo.Title, movieInfo.Year) ? 'remove-from-watched' : 'add-to-watched'}">${movieInWatched(movieInfo.Title, movieInfo.Year) ? 'Remove from watched' : 'Add to watched'}</button>
            </section>
        `;
        var documentMain = document.getElementById('movie-info');
        documentMain.innerHTML += `
        <section id="comments-section-add" style="display: ${movieInFavourites(movieInfo.Title, movieInfo.Year) ? 'flex' : 'none'};">
            <h3>Leave a comment</h3>
            <section id="leave-comment-section">
                <section id="comment-textarea">
                    <textarea id="comment-input" placeholder="Add a comment (Max 200 characters)" maxlength="200" rows="4"></textarea>
                    <div id="characters-count">0/200</div>
                </section>
                <button id="save-comment-btn">Save Comment</button>
            </section>
        </section>
        
        <section id="comments-section">
            <h3>Comments</h3>
            <ul id="comments-list"></ul>
        </section>`;

        const toggleFavouritesBtn = document.getElementById('toggle-favourites');
        toggleFavouritesBtn.addEventListener('click', function () {
            toggleFavourites(movieInfo.Title, movieInfo.Year, toggleFavouritesBtn);
        });

        const toggleWatchedBtn = document.getElementById('toggle-watched');
        toggleWatchedBtn.addEventListener('click', function () {
            toggleWatched(movieInfo.Title, movieInfo.Year, toggleWatchedBtn);
            toggleCommentSection(movieInfo.Title, movieInfo.Year);
        });

        const saveCommentBtn = document.getElementById('save-comment-btn');
        saveCommentBtn.addEventListener('click', function () {
            saveComment(movieInfo.Title, movieInfo.Year);
        });

        const commentInput = document.getElementById('comment-input');

        commentInput.addEventListener('input', function () {
            const charactersCount = document.getElementById('characters-count');
            charactersCount.textContent = `${commentInput.value.length}/200`;
        });
        displayComments(movieInfo.Title, movieInfo.Year);
    } else {
        alert('Failed to fetch movie info. Please try again later.');
    }
});


function toggleCommentSection(title, year) {
    const commentSection = document.getElementById('comments-section-add');
    const isWatched = movieInWatched(title, year);
    commentSection.style.display = isWatched ? 'block' : 'none';
}

function movieInFavourites(title, year) {
    const favourites = userData.favourites || [];
    return favourites.some(movie => movie.title === title && movie.year === year);
}

function movieInWatched(title, year) {
    const watched = userData.watched || [];
    return watched.some(movie => movie.title === title && movie.year === year);
}

function toggleFavourites(title, year, button) {
    if (button.classList.contains('add-to-favourites')) {
        addMovieToFavourites(title, year);
        button.textContent = 'Remove from favourites';
        button.classList.remove('add-to-favourites');
        button.classList.add('remove-from-favourites');
    } else if (button.classList.contains('remove-from-favourites')) {
        removeMovieFromFavourites(title, year);
        button.textContent = 'Add to favourites';
        button.classList.remove('remove-from-favourites');
        button.classList.add('add-to-favourites');
    }
}

function toggleWatched(title, year, button) {
    if (button.classList.contains('add-to-watched')) {
        addMovieToWatched(title, year);
        button.textContent = 'Remove from watched';
        button.classList.remove('add-to-watched');
        button.classList.add('remove-from-watched');
    } else if (button.classList.contains('remove-from-watched')) {
        removeMovieFromWatched(title, year);
        button.textContent = 'Add to watched';
        button.classList.remove('remove-from-watched');
        button.classList.add('add-to-watched');
    }
}

function addMovieToFavourites(title, year) {
    const movieInfo = { title: title, year: year };
    if (movieInfo){
        userData.favourites.push(movieInfo);
        
        localStorage.setItem(loggedInUserEmail, JSON.stringify(userData));
    }
}

function removeMovieFromFavourites(title, year) {
    const favourites = userData.favourites || [];
    const indexToRemove = favourites.findIndex(movie => movie.title === title && movie.year === year);
    if (indexToRemove !== -1) {
        favourites.splice(indexToRemove, 1);
        localStorage.setItem(loggedInUserEmail, JSON.stringify(userData));
    }
}

function addMovieToWatched(title, year) {
    const movieInfo = { title: title, year: year};
    if (movieInfo){
        userData.watched.push(movieInfo);
        
        localStorage.setItem(loggedInUserEmail, JSON.stringify(userData));
    }
}

function removeMovieFromWatched(title, year) {
    const watched = userData.watched || [];
    const indexToRemove = watched.findIndex(movie => movie.title === title && movie.year === year);
    if (indexToRemove !== -1) {
        watched.splice(indexToRemove, 1);
        localStorage.setItem(loggedInUserEmail, JSON.stringify(userData));
    }
}

function saveComment(title, year) {
    const commentInput = document.getElementById('comment-input');
    const comment = commentInput.value.trim();
    
    if (comment.length > 0 && comment.length <= 200) {
        const allComments = JSON.parse(localStorage.getItem('comments')) || []; 
        let movieComments = allComments.find(movie => movie.title === title && movie.year === year);
        
        if (!movieComments) {
            movieComments = { title: title, year: year, comments: [] };
            allComments.push(movieComments);
        }

        movieComments.comments.push({
            author: loggedInUserEmail,
            date: new Date().toISOString(),
            text: comment
        });

        localStorage.setItem('comments', JSON.stringify(allComments));

        commentInput.value = '';
        displayComments(title, year);
    } else {
        alert('Comment must be between 1 and 200 characters.');
    }
}

function displayComments(title, year) {
    const commentsList = document.getElementById('comments-list');
    commentsList.innerHTML = ''; 

    const allComments = JSON.parse(localStorage.getItem('comments')) || [];
    const movieComments = allComments.find(movie => movie.title === title && movie.year === year);

    if (movieComments && movieComments.comments.length > 0) {
        movieComments.comments.forEach(comment => {
            const li = document.createElement('li');
            li.textContent = `${comment.author} (${new Date(comment.date).toLocaleString()}): ${comment.text}`;
            commentsList.appendChild(li);
        });
    } else {
        const li = document.createElement('li');
        li.textContent = "Be the first one to leave a comment for this movie! (After you've watched it, of course :) )";
        commentsList.appendChild(li);
    }
}

function getUserData(loggedInUserEmail) {
    const userDataString = localStorage.getItem(loggedInUserEmail);
    return userDataString ? JSON.parse(userDataString) : { email: '', password: '', favourites: [], watched: [], addedMovies: [] };
}

function getLoggedInUserEmail() {
    return localStorage.getItem('loggedInUserEmail');
}

function generateStars(rating) {
    const starFull = '★';
    const starEmpty = '☆';
    const stars = Math.round(rating / 2);
    return starFull.repeat(stars) + starEmpty.repeat(5 - stars);
}

function getMetascoreColor(metascore) {
    if (metascore >= 75) {
        return { background: 'green', color: 'white' };
    } else if (metascore >= 50) {
        return { background: 'yellow', color: 'black' };
    } else {
        return { background: 'red', color: 'white' };
    }
}