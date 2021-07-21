import React from 'react';
import { Link, useHistory } from 'react-router-dom';
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

import Headline from '../components/Headline.js';

// Import Icons
import { GoBeaker } from 'react-icons/go';
import { FaWarehouse } from 'react-icons/fa';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

// Impot default discord avatar image
import defaultDiscord from '../assets/images/defaultDiscord.png';

// Import navigator styles
import {styles} from "./../jss/navigatorStyle.js";


function Navigator(props) {
  const { classes, routes, activePath, activeSubDirectory, selectedBot, setSelectedBot, ...other } = props;

  const history = useHistory();

  const bannedSubDirectory = (activeSubDirectory === 'develop') ? 'garage' : 'develop';

  const handleBackToGarage = () => {
    history.push("/dashboard/garage/mybots");
    setSelectedBot(false);
  }

  return (
    <Drawer variant="permanent" onClick={other.onClose} {...other}>
      <List disablePadding>
        <ListItem className={clsx(classes.firebase, classes.item, classes.itemCategory)}>
        {(selectedBot && activeSubDirectory === 'develop') 
          ? <Headline 
              iconComponent={GoBeaker}
              start="The"
              end="Lab"
              color="#edc374"
            />
          : <Headline 
              iconComponent={FaWarehouse}
              start="The"
              end="Bunker"
              color="#4fc3f7"
            />
        }
          
        </ListItem>
        {(selectedBot && activeSubDirectory === 'develop') &&
          <React.Fragment>
            <ListItem 
              className={clsx(classes.item, classes.itemCategory)}
              onClick={handleBackToGarage}
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
                Back To Bunker 
              </ListItemText>
            </ListItem>
            <ListItem className={clsx(classes.selectedBot, classes.itemCategory)}>
              <ListItemAvatar>
                {selectedBot.avatar
                  ? <Avatar className={classes.avatar} src={selectedBot.avatar} />
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
        {routes.map(({ name, path, children }, pos) => (
          (path !== bannedSubDirectory && 
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
    </Drawer>
  );
}

Navigator.propTypes = {
  classes: PropTypes.object.isRequired,
  routes: PropTypes.array.isRequired,
};

export default withStyles(styles)(Navigator);