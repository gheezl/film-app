import React, { createContext, useState } from 'react';

// Create a new context
const TmdbContext = createContext();

// Create a provider component
export const TmdbProvider = ({ children }) => {
    const [filmInfo, setFilmInfo] = useState({
        nowPlaying: {},
        popularFilms: {},
        topRatedFilms: {},
        upcomingFilms: {}
    });

    const handleChange = (newValue) => {
        setFilmInfo(newValue);
    };

    return (
        <TmdbContext.Provider value={{ filmInfo, handleChange }}>
            {children}
        </TmdbContext.Provider>
    );
};
