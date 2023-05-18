import React, { createContext, useState } from 'react';

import { getNowPlayingFilms, getPopularFilms, getTopRatedFilms, getUpcomingFilms } from '../services/tmdbServices';

// Create a new context
export const TmdbContext = createContext();

// Create a provider component
export const TmdbProvider = ({ children }) => {
    const [nowPlaying, setNowPlaying] = useState({});
    const [popularFilms, setPopularFilms] = useState({});
    const [topRatedFilms, setTopRatedFilms] = useState({});
    const [upcomingFilms, setUpcomingFilms] = useState({});

    const getNowPlaying = () => {
        setNowPlaying(getNowPlayingFilms())
    }

    const getPopular = () => {
        setPopularFilms(getPopularFilms())
    }

    const getTopRated = () => {
        setTopRatedFilms(getTopRatedFilms())
    }

    const getUpcoming = () => {
        setUpcomingFilms(getUpcomingFilms())
    }

    return (
        <TmdbContext.Provider value={{
            nowPlaying,
            getNowPlaying,
            popularFilms,
            getPopular,
            topRatedFilms,
            getTopRated,
            upcomingFilms,
            getUpcoming
        }}>
            {children}
        </TmdbContext.Provider>
    );
};
