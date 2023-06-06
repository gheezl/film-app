import './App.css';

import { Box, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { toggleMode } from './styling/theme';

import { Routes, Route } from "react-router-dom"

import Header from './navigation/top-nav';
import SideNav from './navigation/side-nav';

import RecentlyViewed from './pages/recently-viewed';
import Recommendations from './pages/recommendations';
import Home from './pages/home';
import Film from './pages/individual-film';
import Search from './pages/search';
import Genre from './pages/genre';
import { useContext, useEffect, useState } from 'react';
import { TmdbContext } from './contexts/TmdbProvider';
import { StylingContext } from './contexts/StylingProvider';
import PageBorder from './pages/page-border';

const App = () => {
  const { theme } = useContext(StylingContext);

  return (
    <ThemeProvider theme={theme} >
      <CssBaseline />
      <PageBorder>
        <SideNav />
        <Box
          sx={{
            width: "100%",
            overflow: "scroll"
          }}
        >
          <Header />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/search' element={<Search />} />
            <Route path='/film/:id' element={<Film />} />
            <Route path='/genre/:name/:id' element={<Genre />} />
            <Route path='/recently-viewed' element={<RecentlyViewed />} />
            <Route path='/recommendations' element={<Recommendations />} />
          </Routes>
        </Box>
      </PageBorder>
    </ThemeProvider>
  );
}

export default App;