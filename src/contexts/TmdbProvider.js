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
        console.log("HERE", film)
        setSelectedFilm(film);
        if (recentlyViewed.includes(film)) {
            return;
        }
        else {
            setRecentlyViewed([...recentlyViewed, film]);
            localStorage.setItem('viewedFilms', JSON.stringify(recentlyViewed));
        }
    }

    return (
        <TmdbContext.Provider value={{
            nowPlaying,
            popularFilms,
            topRatedFilms,
            upcomingFilms,
            selectedFilm,
            selectFilm,
            recentlyViewed,
            searchedFilms,
            setSearchedFilms
        }}>
            {children}
        </TmdbContext.Provider>
    );
};