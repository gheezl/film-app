import './App.css';

import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import theme from './styling/theme';

import { Routes, Route } from "react-router-dom"

import Header from './navigation/top-nav';
import SideNav from './navigation/side-nav';

import RecentlyViewed from './pages/recently-viewed';
import Recommendations from './pages/trending';
import Home from './pages/home';
import Film from './pages/individual-film';
import Search from './pages/search';
import { useContext, useEffect } from 'react';
import { TmdbContext } from './contexts/TmdbProvider';

const App = () => {
  return (
    <ThemeProvider theme={theme} >
      <CssBaseline />
      <Box display="flex" justifyContent="row" height="100vh" >
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
            <Route path='/film' element={<Film />} />
            <Route path='/recommendations' element={<Recommendations />} />
            <Route path='/recently-viewed' element={<RecentlyViewed />} />
          </Routes>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;