import React from 'react';
import { useLocation } from 'react-router-dom';

// Import MUI components
import { makeStyles } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';

// Import custom layouts
import ContentWrapper from '../../layouts/ContentWrapper';

// Import custom components
import TitlePanel from '../panels/TitlePanel';
import GridContainer from '../../components/grid/GridContainer';
import GridItem from '../../components/grid/GridItem';

// Import images
import gettingStartedImage from '../../assets/images/gettingStarted.png';
import newUserGreetingImage from '../../assets/images/newUserGreeting.png';

const styles = makeStyles((theme) => ({
  paper: {
    padding: "20px",
    marginBottom: theme.spacing(3),
    backgroundColor: theme.palette.teal.dark,
    overflow: "hidden",
    color: theme.palette.white.main,
  },
  avatar: {
    width: theme.spacing(9),
    height: theme.spacing(9),
  },
  title: {
    color: theme.palette.white.main,
    fontSize: 28,
    width: "100%",
    [theme.breakpoints.down('xs')]: {
      paddingBottom: theme.spacing(1),
    },
  },
  description: {
    color: theme.palette.white.main,
  },
}));

function NewUserGreeting() {
  const classes = styles();

  return (
    <Paper elevation={2} className={classes.paper} >
      <GridContainer>
        <GridItem xs={12} sm={12}>
          <Hidden smUp>
            <GridContainer justifyContent="flex-start">
              <GridItem>
                <Avatar className={classes.avatar} variant="rounded" src={newUserGreetingImage} />
              </GridItem>
              <GridItem xs>
                <div className={classes.title}>
                  Hey!
                </div>
                <div className={classes.description}>
                  It looks like you are new, so we brought you here to get you started on the right foot!
                </div>
              </GridItem>
            </GridContainer>
          </Hidden>
          <Hidden xsDown>
            <GridContainer>
              <GridItem>
                <Avatar className={classes.avatar} variant="rounded" src={newUserGreetingImage} />
              </GridItem>
              <GridItem xs>
                <div className={classes.title}>
                  Hey!
                </div>
                <div className={classes.description}>
                  It looks like you are new, so we brought you here to get you started on the right foot!
                </div>
              </GridItem>
            </GridContainer>
          </Hidden>
        </GridItem>
      </GridContainer >
    </Paper >
  );
}

export default function GettingStarted(props) {
  const { newUser } = useLocation();

  return (
    <ContentWrapper>
      {newUser && <NewUserGreeting />}
      <TitlePanel
        title="Getting Started"
        description="Everything you need to know in order to get your custom bot online and running!"
        image={gettingStartedImage}
      />
    </ContentWrapper>
  );
}