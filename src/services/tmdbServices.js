const GETOPTIONS = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYjZmM2I3YzRjMTg2YjkxMGM5NDJlZTE3MzU4MTQ2YSIsInN1YiI6IjY0NjM4YmQ4ZGJiYjQyMDBmYzg5MThiMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3Uclsrx78iyyEzeGWIz5rs6iwWaRteSoeNhLolesB6k'
    }
};

// Calls made for the home page display
export const getNowPlayingFilms = () => {
    fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', GETOPTIONS)
        .then(response => response.json())
        .then(response => console.log("playing", response))
        .catch(err => console.error(err));
}

export const getPopularFilms = () => {
    fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', GETOPTIONS)
        .then(response => response.json())
        .then(response => console.log("Popular", response))
        .catch(err => console.error(err));
}

export const getTopRatedFilms = () => {
    fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', GETOPTIONS)
        .then(response => response.json())
        .then(response => console.log("Top Rated", response))
        .catch(err => console.error(err));
}

export const getUpcomingFilms = () => {
    fetch('https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1', GETOPTIONS)
        .then(response => response.json())
        .then(response => console.log("Upcoming films", response))
        .catch(err => console.error(err));
}

// Calls made for the trending page
export const getTrendingFilms = () => {
    fetch('https://api.themoviedb.org/3/trending/all/day?language=en-US', GETOPTIONS)
        .then(response => response.json())
        .then(response => console.log("trending", response))
        .catch(err => console.error(err));
}

// Calls made for the search page
export const getIndividualFilm = (filmNameQuery) => {
    fetch(`https://api.themoviedb.org/3/search/movie?query=${filmNameQuery}&include_adult=false&language=en-US&page=1`, GETOPTIONS)
        .then(response => response.json())
        .then(response => console.log("individual film", response))
        .catch(err => console.error(err));
}