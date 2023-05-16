import './App.css';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { Routes, Route } from "react-router-dom"
import theme from './styling/theme';

import Genres from './pages/genres';
import Trending from './pages/trending';
import Home from './pages/home';
import Film from './pages/individual-film';
import Search from './pages/search';

function App() {
  return (
    <ThemeProvider theme={theme} >
      <CssBaseline />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/search' element={<Search />} />
        <Route path='/film' element={<Film />} />
        <Route path='/trending' element={<Trending />} />
        <Route path='/genres' element={<Genres />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
