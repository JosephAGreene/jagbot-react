import React from 'react';
import PropTypes from "prop-types";

// Import MUI components
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';

// Import custom components
import GridContainer from '../../components/grid/GridContainer';
import GridItem from '../../components/grid/GridItem';
import Button from '../../components/buttons/Button';

// Import icons
import { SiReadthedocs } from 'react-icons/si';

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
  title: {
    color: theme.palette.white.main,
    fontSize: 28,
  },
  description: {
    color: theme.palette.white.dark,
  },
  button: {
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(1),
  },
});

function TitlePanel(props) {
  const {classes, title, description, Icon, image, docs, color} = props;

  return (
    <GridContainer>
      <GridItem sm={12}>
        <Paper elevation={2} className={classes.paper} >
          <GridContainer>
            <GridItem sm={12} md={10} lg={8}>
              <GridContainer>
                <GridItem>
                {image 
                  ? <Avatar className={classes.avatar} variant="rounded" src={image} />
                  : <Avatar className={classes.avatar} style={{"color": color}} variant="rounded" component={Icon} />
                }
                </GridItem>
                <GridItem xs>
                  <div className={classes.title}>
                    {title}
                  </div>
                  <div className={classes.description}>
                    {description}
                  </div>
                </GridItem>
              </GridContainer>
            </GridItem>
            <GridItem xs right>
              {docs &&
                <div className={classes.button}>
                  <Button justIcon round color="teal"><SiReadthedocs /></Button>
                </div>
              }
            </GridItem>
          </GridContainer>
        </Paper>
      </GridItem>
    </GridContainer>
  );
}

TitlePanel.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  docs: PropTypes.bool,
  Icon: PropTypes.elementType,
  image: PropTypes.string,
  color: PropTypes.string,
};

export default withStyles(styles)(TitlePanel);