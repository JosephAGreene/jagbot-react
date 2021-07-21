import React from 'react';
import PropTypes from "prop-types";

// Import MUI components
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';

// Import custom components
import GridContainer from '../grid/GridContainer';
import GridItem from '../grid/GridItem';

const styles = (theme) => ({
  paper: {
    padding: "20px",
    marginBottom: theme.spacing(3),
    backgroundColor: theme.palette.gray.main,
    overflow: "hidden",
    color: theme.palette.white.main,
  },
  avatar: {
    width: theme.spacing(9),
    height: theme.spacing(9),
    backgroundColor: theme.palette.gray.main,
  },
  description: {
    color: theme.palette.white.dark,
  },
});

function TitlePanel(props) {
  const {classes, title, description, Icon, image, color} = props;

  return (
    <Paper elevation={2} className={classes.paper} >
      <GridContainer>
        <GridItem>
          {image 
            ? <Avatar className={classes.avatar} variant="rounded" src={image} />
            : <Avatar className={classes.avatar} style={{"color": color}} variant="rounded" component={Icon} />
          }
        </GridItem>
        <GridContainer item xs direction="column">
          <GridItem>
            <Typography variant="h5">
              {title}
            </Typography>
          </GridItem>
          <GridItem>
            <div className={classes.description}>
              {description}
            </div>
          </GridItem>
        </GridContainer>
      </GridContainer>
    </Paper>
  );
}

TitlePanel.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  Icon: PropTypes.elementType,
  image: PropTypes.string,
  color: PropTypes.string,
};

export default withStyles(styles)(TitlePanel);