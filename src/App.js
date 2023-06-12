import { useContext, useEffect } from 'react';

import './App.css';

import { CssBaseline, ThemeProvider } from '@mui/material';

import { Routes, Route } from "react-router-dom"

import Header from './navigation/top-nav';

import RecentlyViewed from './pages/recently-viewed';
import Recommendations from './pages/recommendations';
import Home from './pages/home';
import Film from './pages/individual-film';
import Search from './pages/search';
import Genre from './pages/genre';
import PageBorder from './pages/page-border';

import { StylingContext } from './contexts/StylingProvider';
import Loader from './components/loader';



const App = () => {
  const { theme } = useContext(StylingContext);

  useEffect(() => {
    console.log(theme);
  }, [theme])

  return (
    <ThemeProvider theme={theme} >
      <CssBaseline />
      {
        theme.hasOwnProperty("palette")
          ?
          (
            <PageBorder>
              <Header />
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/search' element={<Search />} />
                <Route path='/film/:id' element={<Film />} />
                <Route path='/genre/:name/:id' element={<Genre />} />
                <Route path='/recently-viewed' element={<RecentlyViewed />} />
                <Route path='/recommendations' element={<Recommendations />} />
              </Routes>
            </PageBorder>
          )
          : <Loader />
      }

    </ThemeProvider>
  );
}

export default App;