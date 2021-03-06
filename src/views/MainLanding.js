import React from 'react';
import PropTypes from 'prop-types';

// Import MUI components
import { withStyles } from '@material-ui/core/styles';

// Import custom components
import Button from '../components/buttons/Button';
import Typography from '../components/Typography';

// Import layouts
import MainLandingLayout from '../layouts/MainLandingLayout';

const backgroundImage = 'images/bot1.jpg';

const styles = (theme) => ({
  background: {
    backgroundImage: `url(${backgroundImage})`,
    backgroundColor: '#7fc7d9', // Average color of the background image.
    backgroundPosition: 'center',
  },
  button: {
    minWidth: 200,
  },
  h5: {
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(1),
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing(10),
    },
  },
  more: {
    marginTop: theme.spacing(2),
  },
});

function MainLanding(props) {
  const { classes } = props;

  const login = () => window.location.href = 'http://localhost:3900/api/auth/discord';

  return (
    <MainLandingLayout backgroundClassName={classes.background}>
      {/* Increase the network loading priority of the background image. */}
     <img style={{ display: 'none' }} src={backgroundImage} alt="increase priority" />
     <Typography color="inherit" align="center" variant="h2">
        
      </Typography>
      <Typography color="inherit" align="center" variant="h5" className={classes.h5}>
        
  </Typography> 
      <Button
        color="purple"
        variant="contained"
        size="lg"
        className={classes.button}
        component="a"
        onClick={login}
      >
        Login With Discord
      </Button>
      <Typography variant="body2" color="inherit" className={classes.more}>
        Build your own bot
      </Typography>
    </MainLandingLayout>
  );
}

MainLanding.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MainLanding);