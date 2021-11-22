import React from 'react';
import PropTypes from "prop-types";

// Import MUI components
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';

// Import custom components
import GridContainer from '../../components/grid/GridContainer';
import GridItem from '../../components/grid/GridItem';

// Default discord avatar image
import defaultDiscord from '../../assets/images/defaultDiscord.png';

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: "20px",
    marginBottom: theme.spacing(3),
    backgroundColor: theme.palette.gray.main,
    overflow: "hidden",
    cursor: "pointer",
    color: theme.palette.white.main,
    '&:hover' : {
      boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)',
    },
  },
  avatar: {
    width: theme.spacing(8),
    height: theme.spacing(8),
    backgroundColor: theme.palette.gray.main,
  },
  trait: {
    margin: "5px 0 0 10px",
    fontWeight: 500,
    color: theme.palette.white.main,
  },
  info: {
    marginLeft: "10px",
    color: theme.palette.white.dark,
  },
  online: {
    color: theme.palette.green.main,
  },
  offline: {
    color: theme.palette.error.main,
  }
});

function BotPanel(props) {
  const {classes, bot, onClick} = props;
  const {name, creationDate, enabled, avatarURL} = bot;

  return (
    <GridItem sm={12} md={6} lg={4} classes={{root: classes.root}}>
      <Paper elevation={2} className={classes.paper} onClick={onClick} >
        <GridContainer>
          <GridItem>
            {avatarURL
              ? <Avatar className={classes.avatar} src={avatarURL} />
              : <Avatar className={classes.avatar} src={defaultDiscord} />
            }
          </GridItem>
          <GridContainer item direction="column">
            <GridItem>
              <Typography variant="h6">
                {name}
              </Typography>
            </GridItem>
            <GridItem>
              <div className={classes.trait}>
                Creation Date
              </div>
              <div className={classes.info}>
                {new Date(creationDate).toLocaleDateString('en-US')}
              </div>
              <div className={classes.trait}>
                Modules Assigned
              </div>
              <div className={classes.info}>
                {bot.moduleCount}
              </div>
              <div className={classes.trait}>
                Status
              </div>
              <div className={classes.info}>
                {enabled
                  ? <div className={classes.online}>online</div> 
                  : <div className={classes.offline}>offline</div>
                }
              </div>
            </GridItem>
          </GridContainer>
        </GridContainer>
      </Paper>
    </GridItem>
  );
}

BotPanel.propTypes = {
  classes: PropTypes.object.isRequired,
  bot: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default withStyles(styles)(BotPanel);