import React, { createContext, useState, useEffect } from 'react';

import { getGenres, getNowPlayingFilms, getPopularFilms, getTopRatedFilms, getTrendingFilms, getUpcomingFilms } from '../services/TmdbServices';
import { removeDuplicateObjects, removeSpecificObject } from '../utilities/utilities';

export const TmdbContext = createContext();

export const TmdbProvider = ({ children }) => {
    const [nowPlaying, setNowPlaying] = useState({});
    const [popularFilms, setPopularFilms] = useState({});
    const [topRatedFilms, setTopRatedFilms] = useState({});
    const [upcomingFilms, setUpcomingFilms] = useState({});
    const [trendingFilms, setTrendingFilms] = useState({});
    const [recentlyViewed, setRecentlyViewed] = useState([]);
    const [searchedFilms, setSearchedFilms] = useState({ headLine: "", films: [] })
    const [genres, setGenres] = useState();

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
                    setGenres(await getGenres());
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        const getLocalStorageData = () => {
            const films = localStorage.getItem("viewedFilms");
            if (films) {
                setRecentlyViewed(JSON.parse(films));
            }
        }

        fetchDataFromApi();
        getLocalStorageData();

        return () => {
            mounted = false
        };
    }, []);

    useEffect(() => {
        localStorage.setItem("viewedFilms", JSON.stringify(recentlyViewed));
    }, [recentlyViewed])

    const removeRecentlyViewed = () => {
        if (recentlyViewed) {
            localStorage.removeItem("viewedFilms")
            setRecentlyViewed([])
        }
    }

    const addFilmToRecentlyViewed = (film) => {
        if (recentlyViewed.some(viewed => viewed.id === film.id)) {
            const filtered = removeSpecificObject(recentlyViewed, film.title);
            setRecentlyViewed([film, ...filtered]);
        }
        else if (recentlyViewed[0]) {
            setRecentlyViewed([film, ...recentlyViewed]);
        }
        else {
            setRecentlyViewed([film])
        }
    }


    return (
        <TmdbContext.Provider value={{
            nowPlaying,
            popularFilms,
            topRatedFilms,
            upcomingFilms,
            trendingFilms,
            recentlyViewed,
            removeRecentlyViewed,
            addFilmToRecentlyViewed,
            searchedFilms,
            setSearchedFilms,
            genres
        }}>
            {children}
        </TmdbContext.Provider>
    );
};