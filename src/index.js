import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from './modules/theme';
import React from 'react';
import ReactDOM from 'react-dom';
import AppAppBar from './modules/views/AppAppBar';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppAppBar />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);