import React from 'react';
import PropTypes from "prop-types";

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
  },
  header: {
    marginTop: theme.spacing(6),
    marginBottom: theme.spacing(2),
    marginLeft: theme.spacing(1),
    color: theme.palette.white.dark,
    fontSize: 24,
  },
  new: {
    display: "inline",
    color: theme.palette.green.main,
  },
  edit: {
    display: "inline",
    color: theme.palette.purple.main,
  },
});

// headerPhase = New or Edit
// header = the heading of the categorey

function ContentPanel(props) {
  const { classes, headerPhase, header, children } = props;

  return (
    <div>
      {header &&
        <div className={classes.header}>
          {headerPhase === 'New'
            ? <div className={classes.new}>New </div>
            : headerPhase === 'Edit'
              ? <div className={classes.edit}>Edit </div>
              : null
          }
          {header}
        </div>
      }
      <Paper className={classes.paper}>
        {children}
      </Paper>
    </div>
  );
}

ContentPanel.propTypes = {
  classes: PropTypes.object.isRequired,
  headerPhase: PropTypes.string,
  header: PropTypes.string,
};

export default withStyles(styles)(ContentPanel);