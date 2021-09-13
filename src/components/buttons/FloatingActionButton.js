import React from 'react';
import PropTypes from "prop-types";

// Import Mui components
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';

const styles = (theme) => ({
  fabButton: {
    position: "fixed",
    zIndex: 1000,
    padding: 0,
    bottom: theme.spacing(2),
    marginLeft: theme.spacing(1),
    color: theme.palette.white.main,
    backgroundColor: theme.palette.purple.dark,
    '&:hover': {
      color: theme.palette.white.dark,
      backgroundColor: theme.palette.purple.dark,
    },
    [theme.breakpoints.down('md')]: {
      merginLeft: 0,
      right: theme.spacing(2),
    },
  },
});

function FloatingActionButton(props) {
  const {classes, onClick, children} = props;

  return (
    <Fab className={classes.fabButton} onClick={onClick}>
      {children}
    </Fab>
  );
}

FloatingActionButton.propTypes = {
  classes: PropTypes.object.isRequired,
  onClick: PropTypes.func,
  children: PropTypes.node,
};

export default withStyles(styles)(FloatingActionButton);