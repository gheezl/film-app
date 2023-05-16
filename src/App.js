import logo from './logo.svg';
import './App.css';

import { ThemeProvider } from '@mui/material';
import theme from './styling/theme';

function App() {
  return (
    <ThemeProvider theme={theme} >

    </ThemeProvider>
  );
}

export default App;
