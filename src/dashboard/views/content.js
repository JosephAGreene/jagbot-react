import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';


const styles = (theme) => ({
  paper: {
    maxWidth: 1200,
    margin: 'auto',
    overflow: 'hidden',
    background: theme.palette.gray.light,
    boxShadow: "none",
  },
  contentWrapper: {
    margin: '40px 16px',
    color: '#fff'
  },
});

function Content(props) {
  const { classes } = props;

  return (
    <Paper className={classes.paper}>
      <div className={classes.contentWrapper}>
        Content Goes Here
      </div>
    </Paper>
  );
}

Content.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Content);