import { getFilmsByGenre } from "../services/TmdbServices";

export const getRandomItems = (array, count) => {
    const shuffled = array.slice();
    let currentIndex = array.length;
    let randomIndex, temp;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        temp = shuffled[currentIndex];
        shuffled[currentIndex] = shuffled[randomIndex];
        shuffled[randomIndex] = temp;
    }

    return shuffled.slice(0, count);
}

export const removeDuplicateObjects = (array, property) => {
    const uniqueObjects = [];
    const encounteredValues = new Set();

    for (const obj of array) {
        const value = obj[property];
        if (!encounteredValues.has(value)) {
            encounteredValues.add(value);
            uniqueObjects.push(obj);
        }
    }

    return uniqueObjects;
}

export const removeSpecificObject = (array, toRemove) => {
    return array.filter(item => item.title !== toRemove)
}

export const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date);
    const day = date.getDate();

    let daySuffix;
    if (day >= 11 && day <= 13) {
        daySuffix = 'th';
    } else {
        const lastDigit = day % 10;
        switch (lastDigit) {
            case 1:
                daySuffix = 'st';
                break;
            case 2:
                daySuffix = 'nd';
                break;
            case 3:
                daySuffix = 'rd';
                break;
            default:
                daySuffix = 'th';
                break;
        }
    }

    const year = date.getFullYear();
    const formattedDate = `${month} ${day}${daySuffix}, ${year}`;

    return formattedDate;
};

export const formatRuntime = (runtime) => {
    let formattedRuntime = "";
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;

    if (hours > 0) {
        formattedRuntime += `${hours} hour${hours > 1 ? "s" : ""}`;
    }

    if (minutes > 0) {
        if (hours > 0) {
            formattedRuntime += " and ";
        }
        formattedRuntime += `${minutes} minute${minutes > 1 ? "s" : ""}`;
    }

    return formattedRuntime;
}

export const getRecommendedFilms = async (films) => {
    // we will use the films array argument to determine the other films to recommend.
    // getFilmsByGenre
    const genres = {
        Adventure: 0,
        Animation: 0,
        Western: 0,
    }

    for (let i = 0; i < (films.length < 10 ? films.length : 10); i++) {
        films[i].genres.map(genre => {
            if (genres.genre) {
                genres.genre += 1;
            }
        })
    }
    console.log(films, genres)
}