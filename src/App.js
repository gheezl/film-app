import './App.css';
import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import { Routes, Route } from "react-router-dom"
import theme from './styling/theme';

import Header from './navigation/top-nav';
import SideNav from './navigation/side-nav';

import Genres from './pages/genres';
import Trending from './pages/trending';
import Home from './pages/home';
import Film from './pages/individual-film';
import Search from './pages/search';

function App() {
  return (
    <ThemeProvider theme={theme} >
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
    </ThemeProvider>
  );
}

export default App;