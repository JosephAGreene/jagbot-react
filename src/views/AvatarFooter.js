import React from 'react';
import {useHistory} from 'react-router-dom';

// Import API services
import AuthService from '../services/AuthService';

// Import MUI components
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

// Import custom components
import GridContainer from '../components/grid/GridContainer';
import GridItem from '../components/grid/GridItem';

// Import Icons
import {RiLogoutBoxRLine} from 'react-icons/ri';

const styles = (theme) => ({
  bottomPush: {
    position: "fixed",
    bottom: 0,
    padding: 10,
    width: "inherit",
    cursor: "pointer",
    backgroundColor: theme.palette.gray.dark,
    '&:hover,&:focus': {
      backgroundColor: 'rgba(255, 255, 255, 0.08)',
    },
    boxShadow: '0px -1px 1px -2px rgba(0,0,0,0.2),0px -2px 2px 0px rgba(0,0,0,0.14),0px -4px 5px 0px rgba(0,0,0,0.12)',
  },
  avatar: {
    width: theme.spacing(5),
    height: theme.spacing(5),
  },
  icon: {
    color: theme.palette.white.dark,
    width: '20px',
    height: '20px',
  },
  discordName: {
    color: theme.palette.white.main,
  },
  discordId: {
    color: theme.palette.white.dark,
  },

});

function getUserName(discordTag) {
  return discordTag.split("#")[0];
}

function getUserId(discordTag) {
  return `#${discordTag.split('#')[1]}`;
}

function AvatarFooter(props) {
  const {classes, user} = props;
  const {discordTag, avatar} = user;

  const history = useHistory();

  const handleLogOut = async () => {
    await AuthService.logout();
    history.push('/');
  }

  return (
    <div onClick={handleLogOut} className={classes.bottomPush}>
      <GridContainer alignContent="space-between">
        <GridItem>
          <Avatar src={avatar} className={classes.avatar} />
        </GridItem>
        <GridItem xs>
          <div className={classes.discordName}>
            {getUserName(discordTag)}
          </div>
          <div className={classes.discordId}>
            {getUserId(discordTag)}
          </div>
        </GridItem>
        <GridItem verticalCenter>
          <RiLogoutBoxRLine className={classes.icon} />
        </GridItem>
      </GridContainer>
    </div>
  );
}

export default withStyles(styles)(AvatarFooter);