import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";

// Import MUI components
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';

// Import custom components
import GridContainer from './grid/GridContainer';
import GridItem from './grid/GridItem';

const styles = (theme) => ({
  paper: {
    padding: "20px",
    marginBottom: theme.spacing(3),
    backgroundColor: theme.palette.gray.main,
    width: "auto",
    overflow: "hidden",
    color: theme.palette.white.main,
  },
  avatar: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    backgroundColor: theme.palette.gray.main,
  },
  description: {
    color: theme.palette.white.dark,
  },
});

function ModulePanel(props) {
  const {classes, title, description, path, Icon, image, color} = props;

  return (
      <GridItem sm={12} md={6} lg={4}>
        <Link to={`${path}`} style={{textDecoration: 'none'}}>
          <Paper elevation={2} className={classes.paper} >
            <GridContainer>
              <GridItem>
                {image 
                  ? <Avatar className={classes.avatar} variant="rounded" src={image} />
                  : <Avatar className={classes.avatar} style={{"color": color}} variant="rounded" component={Icon} />
                }
              </GridItem>
              <GridContainer item xs direction="column">
                <GridItem className={classes.title}>
                  <Typography variant="h6">
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
        </Link>
      </GridItem>
  );
}

ModulePanel.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  Icon: PropTypes.elementType,
  image: PropTypes.string,
  color: PropTypes.string,
};

export default withStyles(styles)(ModulePanel);