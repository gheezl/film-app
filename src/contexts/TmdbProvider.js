import React, { createContext, useState, useEffect } from 'react';

import { getNowPlayingFilms, getPopularFilms, getTopRatedFilms, getUpcomingFilms } from '../services/tmdbServices';

export const TmdbContext = createContext();

export const TmdbProvider = ({ children }) => {
    // this is the data to display on the home page
    const [nowPlaying, setNowPlaying] = useState({});
    const [popularFilms, setPopularFilms] = useState({});
    const [topRatedFilms, setTopRatedFilms] = useState({});
    const [upcomingFilms, setUpcomingFilms] = useState({});
    const [selectedFilm, setSelectedFilm] = useState({});
    const [recentlyViewed, setRecentlyViewed] = useState([]);

    useEffect(() => {
        let mounted = true;

        const fetchData = async () => {
            try {
                if (mounted) {
                    setNowPlaying(await getNowPlayingFilms());
                    setPopularFilms(await getPopularFilms());
                    setTopRatedFilms(await getTopRatedFilms());
                    setUpcomingFilms(await getUpcomingFilms());
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();

        return () => {
            mounted = false
        };
    }, []);

    const selectFilm = (film) => {
        setSelectedFilm(film);
        setRecentlyViewed([...recentlyViewed, film])
        console.log(recentlyViewed)

    }

    return (
        <TmdbContext.Provider value={{
            nowPlaying,
            popularFilms,
            topRatedFilms,
            upcomingFilms,
            selectedFilm,
            selectFilm,
            recentlyViewed
        }}>
            {children}
        </TmdbContext.Provider>
    );
};