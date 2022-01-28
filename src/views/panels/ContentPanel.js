import React from 'react';

// Import Mui components
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const styles = (theme) => ({
  paper: {
    padding: "20px",
    marginBottom: theme.spacing(3),
    backgroundColor: theme.palette.gray.main,
    overflow: "hidden",
    color: theme.palette.white.main,
  }
});

function ContentPanel(props) {
  const {classes, children} = props;

  return (
    <Paper className={classes.paper}>
      {children}
    </Paper>
  );
}

export default withStyles(styles)(ContentPanel);