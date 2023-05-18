const GETOPTIONS = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYjZmM2I3YzRjMTg2YjkxMGM5NDJlZTE3MzU4MTQ2YSIsInN1YiI6IjY0NjM4YmQ4ZGJiYjQyMDBmYzg5MThiMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3Uclsrx78iyyEzeGWIz5rs6iwWaRteSoeNhLolesB6k'
    }
};

// Calls made for the home page display
export const getNowPlayingFilms = async () => {
    const response = await fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', GETOPTIONS);
    const jsonData = await response.json();
    return jsonData;
}

export const getPopularFilms = async () => {
    const response = await fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', GETOPTIONS);
    const jsonData = await response.json();
    return jsonData;
}

export const getTopRatedFilms = async () => {
    const response = await fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', GETOPTIONS);
    const jsonData = await response.json();
    return jsonData;
}

export const getUpcomingFilms = async () => {
    const response = await fetch('https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1', GETOPTIONS);
    const jsonData = await response.json();
    return jsonData;

}

// Calls made for the trending page
export const getTrendingFilms = async () => {
    const response = await fetch('https://api.themoviedb.org/3/trending/all/day?language=en-US', GETOPTIONS);
    const jsonData = await response.json();
    return jsonData;
}

// Calls made for the search page
export const getIndividualFilm = async (filmNameQuery) => {
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${filmNameQuery}&include_adult=false&language=en-US&page=1`, GETOPTIONS);
    const jsonData = await response.json();
    return jsonData;
}

export const getGenre = async (genreId) => {
    // const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${filmNameQuery}&include_adult=false&language=en-US&page=1`, GETOPTIONS);
    // const jsonData = await response.json();
    // return jsonData;
}