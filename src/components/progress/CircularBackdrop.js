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
  loadingMessage: {
    textAlign: "center",
  }
});

function CircularBackdrop(props) {
  const { classes, loading } = props;

  return (
    <Backdrop className={classes.backdrop} open={loading}>
      <div className={classes.loadingMessage}>
        <CircularProgress size={50} color="inherit" />
      </div>
    </Backdrop>
  );
}

CircularBackdrop.propTypes = {
  classes: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default withStyles(styles)(CircularBackdrop);