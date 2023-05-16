import logo from './logo.svg';
import './App.css';

import { CssBaseline, ThemeProvider } from '@mui/material';
import { Routes, Route } from "react-router-dom"
import theme from './styling/theme';

function App() {
  return (
    <ThemeProvider theme={theme} >
      <CssBaseline />
      <Routes>
        <Route path='/' element={<div><h1>HELLO WORLD</h1></div>} />
        <Route path='/search' element={<div></div>} />
        <Route path='/film' element={<div></div>} />
        <Route path='/trending' element={<div></div>} />
        <Route path='/genres' element={<div></div>} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
