import React, { createContext, useState, useEffect } from 'react';

import { getNowPlayingFilms, getPopularFilms, getTopRatedFilms, getTrendingFilms, getUpcomingFilms } from '../services/TmdbServices';

export const TmdbContext = createContext();

export const TmdbProvider = ({ children }) => {
    const [nowPlaying, setNowPlaying] = useState({});
    const [popularFilms, setPopularFilms] = useState({});
    const [topRatedFilms, setTopRatedFilms] = useState({});
    const [upcomingFilms, setUpcomingFilms] = useState({});
    const [trendingFilms, setTrendingFilms] = useState({});
    const [selectedFilm, setSelectedFilm] = useState({});
    const [recentlyViewed, setRecentlyViewed] = useState([]);
    const [searchedFilms, setSearchedFilms] = useState({ headLine: "", films: [] })

    useEffect(() => {
        let mounted = true;

        const fetchDataFromApi = async () => {
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

        const getLocalStorageData = () => {
            const previousViews = localStorage.getItem("viewedFilms");
            console.log(previousViews)
            if (previousViews) {
                setRecentlyViewed(JSON.parse(previousViews));
            }
        }

        fetchDataFromApi();
        getLocalStorageData();

        return () => {
            mounted = false
        };
    }, []);

    const selectFilm = (film) => {
        setSelectedFilm(film);
        if (recentlyViewed.includes(film)) {
            return;
        }
        else {
            const viewed = [...recentlyViewed, film].reverse();
            setRecentlyViewed(viewed);
            localStorage.setItem('viewedFilms', JSON.stringify(viewed));
        }
    }

    const removeRecentlyViewed = () => {
        if (recentlyViewed) {
            localStorage.removeItem("viewedFilms")
            setRecentlyViewed([])
        }
    }

    return (
        <TmdbContext.Provider value={{
            nowPlaying,
            popularFilms,
            topRatedFilms,
            upcomingFilms,
            trendingFilms,
            selectedFilm,
            selectFilm,
            recentlyViewed,
            removeRecentlyViewed,
            searchedFilms,
            setSearchedFilms
        }}>
            {children}
        </TmdbContext.Provider>
    );
};