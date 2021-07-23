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
  paper: {
    padding: "20px",
    marginBottom: theme.spacing(3),
    backgroundColor: theme.palette.gray.main,
    overflow: "hidden",
  },
  command: {
    fontSize: 18,
    letterSpacing: 0.5,
    color: theme.palette.white.main,
  },
  description: {
    color: theme.palette.white.dark,
  },
  buttons: {
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(1),
  },
});

function AssignedCommandPanel(props) {
  const {classes, command, description} = props;

  return (
    <GridContainer>
      <GridItem sm={12}>
        <Paper elevation={2} className={classes.paper} >
          <GridContainer>
            <GridItem sm={12} md={10} lg={8}>
              <GridContainer>
                <GridItem xs>
                  <div className={classes.command}>
                    {command}
                  </div>
                  <div className={classes.description}>
                    {description}
                  </div>
                </GridItem>
              </GridContainer>
            </GridItem>
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
    </GridContainer>
  );
}

AssignedCommandPanel.propTypes = {
  classes: PropTypes.object.isRequired,
  command: PropTypes.string.isRequired,
  description: PropTypes.string,
};

export default withStyles(styles)(AssignedCommandPanel);