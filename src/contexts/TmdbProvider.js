import React, { createContext, useState, useEffect } from 'react';

import { getNowPlayingFilms, getPopularFilms, getTopRatedFilms, getTrendingFilms, getUpcomingFilms } from '../services/TmdbServices';

export const TmdbContext = createContext();

export const TmdbProvider = ({ children }) => {
    // this is the data to display on the home page
    const [nowPlaying, setNowPlaying] = useState({});
    const [popularFilms, setPopularFilms] = useState({});
    const [topRatedFilms, setTopRatedFilms] = useState({});
    const [upcomingFilms, setUpcomingFilms] = useState({});
    const [trendingFilms, setTrendingFilms] = useState({});
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
                    setTrendingFilms(await getTrendingFilms());
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
        setRecentlyViewed([...recentlyViewed, film]);
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