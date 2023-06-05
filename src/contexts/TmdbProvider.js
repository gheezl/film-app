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
            console.log("GETTING", JSON.parse(films));
            if (films) {
                setRecentlyViewed(JSON.parse(films));
                console.log("GETTTING AGAIN", recentlyViewed)
            }
        }

        fetchDataFromApi();
        getLocalStorageData();

        return () => {
            mounted = false
        };
    }, []);

    const removeRecentlyViewed = () => {
        if (recentlyViewed) {
            localStorage.removeItem("viewedFilms")
            setRecentlyViewed([])
        }
    }

    const addFilmToRecentlyViewed = (film) => {
        if (recentlyViewed.some(viewed => viewed.id === film.id)) {
            console.log("FIRST CASE")
            const filtered = removeSpecificObject(recentlyViewed, film.title);
            setRecentlyViewed([film, ...filtered]);
            localStorage.setItem("viewedFilms", JSON.stringify(recentlyViewed))
        }
        else if (recentlyViewed[0]) {
            console.log("SECOND CASE", recentlyViewed)
            setRecentlyViewed([film, ...recentlyViewed]);
            localStorage.setItem("viewedFilms", JSON.stringify(recentlyViewed))
        }
        else {
            console.log("THIRD CASE")
            setRecentlyViewed([film])
            localStorage.setItem("viewedFilms", JSON.stringify(recentlyViewed))
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