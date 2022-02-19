import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';

// Import MUI components
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { ListItemAvatar } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';

// Import custom components
import Headline from '../components/Headline.js';
import AvatarFooter from './AvatarFooter';

// Import icons
import { GoBeaker } from 'react-icons/go';
import { FaWarehouse } from 'react-icons/fa';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

// Impot default discord avatar image
import defaultDiscord from '../assets/images/defaultDiscord.png';

const styles = (theme) => ({
  categoryHeader: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  spacingHeader: {
    paddingBottom: theme.spacing(2),
  },
  categoryHeaderPrimary: {
    color: theme.palette.common.white,
  },
  item: {
    paddingTop: 1,
    paddingBottom: 1,
    color: 'rgba(255, 255, 255, 0.7)',
    '&:hover,&:focus': {
      backgroundColor: 'rgba(255, 255, 255, 0.08)',
    },
  },
  psuedoItem: {
    paddingTop: 1,
    paddingBottom: 1,
  },
  selectedBot: {
    paddingTop: 1,
    paddingBottom: 1,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  avatar: {
    width: theme.spacing(5),
    height: theme.spacing(5),
    backgroundColor: theme.palette.gray.dark,
  },
  itemCategory: {
    backgroundColor: theme.palette.gray.dark,
    boxShadow: '0 -1px 0 #404854 inset',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  firebase: {
    fontSize: 24,
    color: theme.palette.common.white,
  },
  itemActiveItem: {
    color: theme.palette.purple.main,
  },
  itemPrimary: {
    fontSize: 'inherit',
  },
  itemIcon: {
    minWidth: 'auto',
    marginRight: theme.spacing(2),
  },
  divider: {
    marginTop: theme.spacing(2),
  },
});

function isEmptyObject(obj){
  return JSON.stringify(obj) === '{}';
}
function Navigator(props) {
  const { classes, 
          routes, 
          activePath,
          activeSubDirectory, 
          selectedBot, 
          setSelectedBot, 
          user,
          handleLogoutDialogOpen, 
          ...other } = props;

  const bannedSubDirectory = (activeSubDirectory === 'develop') ? 'stash' : 'develop';

  return (
    <Drawer variant="permanent" onClick={other.onClose} {...other}>
      <List disablePadding>
        <ListItem className={clsx(classes.firebase, classes.psuedoItem, classes.itemCategory)}>
          {(!isEmptyObject(selectedBot) && activeSubDirectory === 'develop') 
            ? <Headline 
                iconComponent={GoBeaker}
                start="The"
                end="Lab"
                color="#edc374"
              />
            : <Headline 
                iconComponent={FaWarehouse}
                start="The"
                end="Stash"
                color="#4fc3f7"
              />
          }
        </ListItem>
        {(!isEmptyObject(selectedBot) && activeSubDirectory === 'develop') &&
          <React.Fragment>
            <ListItem 
              className={clsx(classes.item, classes.itemCategory)}
              onClick={() => setSelectedBot({})}
              button
            >
              <ListItemIcon className={classes.itemIcon}>
                <ArrowBackIcon />
              </ListItemIcon>
              <ListItemText
                classes={{
                  primary: classes.itemPrimary,
                }}
              >
                Back To The Stash
              </ListItemText>
            </ListItem>
            <ListItem className={clsx(classes.selectedBot, classes.itemCategory)}>
              <ListItemAvatar>
                {selectedBot.avatarURL
                  ? <Avatar className={classes.avatar} src={selectedBot.avatarURL} />
                  : <Avatar className={classes.avatar} src={defaultDiscord} />
                }
              </ListItemAvatar>
              <ListItemText
                classes={{
                  primary: classes.itemPrimary,
                }}
              >
               {selectedBot.name} 
              </ListItemText>
            </ListItem>
          </React.Fragment>
        }
        {routes.map(({ name, path, internal, children }, pos) => (
          ((path !== bannedSubDirectory && !internal) && 
            <React.Fragment key={name + pos}>
              {(name === 'hidden')
                ? <div className={classes.spacingHeader} />
                : <ListItem className={classes.categoryHeader}>
                    <ListItemText
                      classes={{
                        primary: classes.categoryHeaderPrimary,
                      }}
                    >
                      {name}
                    </ListItemText>
                  </ListItem>
              }
              {children.map(({ path: childPath, name, icon }, pos) => (
                <ListItem
                  key={childPath + pos}
                  className={clsx(classes.item, childPath === activePath && classes.itemActiveItem )}
                  component={Link}
                  to={`/dashboard/${childPath}`}
                >
                  <ListItemIcon className={classes.itemIcon}>{icon}</ListItemIcon>
                  <ListItemText
                    classes={{
                      primary: classes.itemPrimary,
                    }}
                  >
                    {name}
                  </ListItemText>
                </ListItem>
              ))}
              <Divider className={classes.divider} />
            </React.Fragment>
          )
        ))}
      </List>
      <AvatarFooter handleLogoutDialogOpen={handleLogoutDialogOpen} user={user}/>
    </Drawer>
  );
}

Navigator.propTypes = {
  classes: PropTypes.object.isRequired,
  routes: PropTypes.array.isRequired,
};

export default withStyles(styles)(Navigator);