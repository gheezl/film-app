import React, { createContext, useState, useEffect } from 'react';

import { getNowPlayingFilms, getPopularFilms, getTopRatedFilms, getUpcomingFilms } from '../services/tmdbServices';

export const TmdbContext = createContext();

export const TmdbProvider = ({ children }) => {
    // this is the data to display on the home page
    const [nowPlaying, setNowPlaying] = useState({});
    const [popularFilms, setPopularFilms] = useState({});
    const [topRatedFilms, setTopRatedFilms] = useState({});
    const [upcomingFilms, setUpcomingFilms] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                setNowPlaying(await getNowPlayingFilms());
                setPopularFilms(await getPopularFilms());
                setTopRatedFilms(await getTopRatedFilms());
                setUpcomingFilms(await getUpcomingFilms());
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();

        return () => {
            // will add clean up here later
        };
    }, []);

    return (
        <TmdbContext.Provider value={{
            nowPlaying,
            popularFilms,
            topRatedFilms,
            upcomingFilms,
        }}>
            {children}
        </TmdbContext.Provider>
    );
};