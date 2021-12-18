import React from 'react';
import PropTypes from 'prop-types';

// Import MUI components
import { withStyles } from '@material-ui/core/styles';

// Import custom components
import AppBar from '../components/AppBar';
import Toolbar, { styles as toolbarStyles } from '../components/Toolbar';
import Headline from '../components/Headline.js';

// Import Icons
import { AiOutlineRobot } from 'react-icons/ai';

const styles = (theme) => ({
  toolbar: {
    justifyContent: 'space-around',
  },
  placeholder: toolbarStyles(theme).root,
  left: {
    flex: 1,
  },
});

function AppAppBar(props) {
  const { classes } = props;

  return (
    <div>
      <AppBar>
        <Toolbar className={classes.toolbar}>
          <Headline
            iconComponent={AiOutlineRobot}
            start="ez"
            end="bot"
            color="#98c379"
            title
          />
        </Toolbar>
      </AppBar>
      <div className={classes.placeholder} />
    </div>
  );
}

AppAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppAppBar);