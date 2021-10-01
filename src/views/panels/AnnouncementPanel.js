import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";

// Import API service
import AnnouncementService from "../../services/AnnouncementService.js";

// Import MUI components
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

// Import custom components
import GridContainer from '../../components/grid/GridContainer';
import GridItem from '../../components/grid/GridItem';
import Button from '../../components/buttons/Button';

const styles = (theme) => ({
  menuRoot: {
    '& .MuiPaper-root': {
      backgroundColor: theme.palette.gray.dark,
      borderRadius: 2,
    },
    '& .MuiButtonBase-root': {
      color: theme.palette.white.dark,
      '&:hover' : {
        backgroundColor: theme.palette.gray.light,
      },
      
    },
  },
  paper: {
    padding: "20px",
    marginBottom: theme.spacing(3),
    backgroundColor: theme.palette.gray.main,
  },
  server: {
    fontSize: 18,
    letterSpacing: 0.5,
    color: theme.palette.white.main,
  },
  type: {
    color: theme.palette.white.dark,
  },
  buttons: {
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(1),
    textDecoration: "none",
  },
});

function getPathname (moduleType) {
  switch(moduleType) {
    case "join":
      return "/dashboard/develop/announcements/join";
    case "optioned-response":
      return "/dashboard/develop/announcements/leave";
    case "random-response":
      return "/dashboard/develop/announcements/banned";
    default: 
      return "/dashboard";
  }
}

function AnnouncementPanel(props) {
  const {classes, botId, module, setSelectedBot, setApiAlert} = props;
  const [deleteAnchor, setDeleteAnchor] = React.useState(null);

  const pathname = getPathname(module.type);

  const handleDeleteClick = (event) => {
    setDeleteAnchor(event.currentTarget);
  };

  const handleDeleteClose = () => {
    setDeleteAnchor(null);
  };

  const handleDeleteConfirm = async () => {
    console.log('Confirmed');
    const payload = {
      "botId": botId,
      "moduleId": module._id,
    }

    const res = await AnnouncementService.deleteAnnouncementModule(payload);

    if (res.status === 200) {
      setSelectedBot(res.data);
      setApiAlert({
        status: true,
        duration: 2500,
        severity: "success",
        message: "Announcement module deleted!"
      });
    }
  }

  return (
    <GridContainer>
      <GridItem xs>
        <Paper elevation={2} className={classes.paper} >
          <GridContainer>
            <GridItem xs={12} sm={12} md={8} lg={8}>
              <div className={classes.server}>
                Server: {module.responseChannel.serverName}
              </div>
              <div className={classes.type}>
                Channel: {module.responseChannel.channelName}
                Type: {module.type}
              </div>
            </GridItem>
            <GridItem xs={12} sm={12} md={4} lg={4} right>

                <Link 
                  className={classes.buttons}
                  to={{
                    pathname: pathname, 
                    module: module,
                  }} 
                >
                  <Button color="purple">Edit</Button>
                </Link>

              <div className={classes.buttons}>
                <Button onClick={handleDeleteClick} color="danger">Delete</Button>
              </div>
              <Menu
                id="delete-menu"
                anchorEl={deleteAnchor}
                open={Boolean(deleteAnchor)}
                onClose={handleDeleteClose}
                className={classes.menuRoot}
                getContentAnchorEl={null}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                <MenuItem onClick={handleDeleteConfirm}>
                    Confirm
                </MenuItem>
                <MenuItem onClick={handleDeleteClose}>Cancel</MenuItem>
              </Menu>
            </GridItem>
          </GridContainer>
        </Paper>
      </GridItem>
    </GridContainer>
  );
}

AnnouncementPanel.propTypes = {
  classes: PropTypes.object.isRequired,
  botId: PropTypes.string.isRequired,
  setSelectedBot: PropTypes.func.isRequired,
  module: PropTypes.object.isRequired,
  setApiAlert: PropTypes.func.isRequired,
};

export default withStyles(styles)(AnnouncementPanel);