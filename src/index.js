import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route, 
  Redirect
} from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import {theme} from './jss/theme';
import Home from './Home.js';
import SignIn from './SignIn.js';
import Dashboard from './layouts/dashboard.js';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Switch>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
          <Route path="/home" component={Home} />
          <Route path="/sign-in" component={SignIn} />
          <Route path="/dashboard" component={Dashboard} />
        </Switch>
      </Router>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);