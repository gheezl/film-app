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

const App = () => {
  const [currentTheme, setCurrentTheme] = useState();
  const [selectedMode, setSelectedMode] = useState("dark");

  useEffect(() => {
    setCurrentTheme(createTheme(toggleMode(selectedMode)));
  }, [])

  return (
    <ThemeProvider theme={currentTheme} >
      <CssBaseline />
      <Box
        display="flex"
        justifyContent="row"
        height="100vh"
        backgroundColor={currentTheme.palette.background.main}
      >
        <SideNav
          currentTheme={currentTheme}
          setCurrentTheme={setCurrentTheme}
          selectedMode={selectedMode}
          setSelectedMode={setSelectedMode}
        />
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
      </Box>
    </ThemeProvider>
  );
}

export default App;