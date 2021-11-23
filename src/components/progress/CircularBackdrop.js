import React from 'react';
import PropTypes from 'prop-types';

// Import Mui components
import { withStyles } from '@material-ui/core/styles';
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = (theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: theme.palette.teal.main,
    [theme.breakpoints.up('sm')]: {
      paddingLeft: "250px",
    },
  },
  progress: {
    textAlign: "center",
  }, 
  message: {
    textAlign: "center",
    fontSize: 18,
    letterSpacing: 0.5,
    marginTop: theme.spacing(1),
  }
});

function CircularBackdrop(props) {
  const { classes, loading, message } = props;

  return (
    <Backdrop className={classes.backdrop} open={loading}>
      <div className={classes.progress}>
        <CircularProgress size={50} color="inherit" />
        <div className={classes.message}>
        {message}
      </div>
      </div>
      
    </Backdrop>
  );
}

CircularBackdrop.propTypes = {
  classes: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  message: PropTypes.string,
};

export default withStyles(styles)(CircularBackdrop);