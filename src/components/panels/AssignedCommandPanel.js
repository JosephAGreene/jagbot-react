import React from 'react';
import PropTypes from "prop-types";

// Import MUI components
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

// Import custom components
import GridContainer from '../grid/GridContainer';
import GridItem from '../grid/GridItem';
import Button from '../buttons/Button';

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: "20px",
    marginBottom: theme.spacing(3),
    backgroundColor: theme.palette.gray.main,
    overflow: "hidden",
  },
  command: {
    marginLeft: theme.spacing(2),
    fontSize: 18,
    letterSpacing: 0.5,
    color: theme.palette.white.main,
  },
  description: {
    marginLeft: theme.spacing(2),
    color: theme.palette.white.dark,
  },
  buttons: {
    marginLeft: theme.spacing(1),
  },
});

function AssignedCommandPanel(props) {
  const {classes, command, description} = props;

  return (
    <GridItem classes={{root: classes.root}}>
      <Paper elevation={2} className={classes.paper} >
        <GridContainer>
          <GridContainer item sm={12} md={8} lg={6} direction="column">
            <GridItem>
              <div className={classes.command}>
                {command}
              </div>
            </GridItem>
            <GridItem>
              <div className={classes.description}>
                {description}
              </div>
            </GridItem>
          </GridContainer>
          <GridItem xs right>
            <div className={classes.buttons}>
              <Button color="purple">Edit</Button>
            </div>
            <div className={classes.buttons}>
              <Button color="danger">Delete</Button>
            </div>
          </GridItem>
        </GridContainer>
      </Paper>
    </GridItem>
  );
}

AssignedCommandPanel.propTypes = {
  classes: PropTypes.object.isRequired,
  command: PropTypes.string.isRequired,
  description: PropTypes.string,
};

export default withStyles(styles)(AssignedCommandPanel);