import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from './modules/theme';
import React from 'react';
import ReactDOM from 'react-dom';
import Home from './Home.js';


ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Home />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);