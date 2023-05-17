import { useEffect } from 'react';

import './App.css';

import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import theme from './styling/theme';

import { Routes, Route } from "react-router-dom"

import Header from './navigation/top-nav';
import SideNav from './navigation/side-nav';

import Genres from './pages/genres';
import Trending from './pages/trending';
import Home from './pages/home';
import Film from './pages/individual-film';
import Search from './pages/search';

import { getTrendingFilms, getNowPlayingFilms, getIndividualFilm, getPopularFilms, getTopRatedFilms, getUpcomingFilms } from './services/tmdbServices';

import { TmdbProvider } from './contexts/TmdbProvider';

const App = () => {
  useEffect(() => {
    getTrendingFilms();
    getNowPlayingFilms();
    getIndividualFilm("Avengers");
    getPopularFilms();
    getTopRatedFilms();
    getUpcomingFilms();
  }, [])

  return (
    <ThemeProvider theme={theme} >
      <TmdbProvider>
        <CssBaseline />
        <Box display="flex" justifyContent="row" height="100vh" >
          <SideNav />
          <Box width="100%">
            <Header />
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/search' element={<Search />} />
              <Route path='/film' element={<Film />} />
              <Route path='/trending' element={<Trending />} />
              <Route path='/genres' element={<Genres />} />
            </Routes>
          </Box>
        </Box>
      </TmdbProvider>
    </ThemeProvider>
  );
}

export default App;