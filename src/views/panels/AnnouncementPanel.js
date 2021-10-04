import React from 'react';
import PropTypes from "prop-types";

// Import API service
import AnnouncementService from "../../services/AnnouncementService.js";

// Import MUI components
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Collapse from '@material-ui/core/Collapse';

// Import custom views
import EmbedPreviewPanel from './EmbedPreviewPanel';

// Import custom components
import GridContainer from '../../components/grid/GridContainer';
import GridItem from '../../components/grid/GridItem';
import Button from '../../components/buttons/Button';

// Import icons
import ExpandMore from '@material-ui/icons/ExpandMore';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

const styles = (theme) => ({
  menuRoot: {
    '& .MuiPaper-root': {
      backgroundColor: theme.palette.gray.dark,
      borderRadius: 2,
    },
    '& .MuiButtonBase-root': {
      color: theme.palette.white.dark,
      '&:hover': {
        backgroundColor: theme.palette.gray.light,
      },

    },
  },
  list: {
    width: '100%',
    backgroundColor: "inherit",
    '& .MuiListItemText-root': {
      color: theme.palette.white.main,
      margin: 0,
    },
    '& .MuiTypography-colorTextSecondary': {
      color: theme.palette.white.dark,
    },
    '& .MuiListItem-gutters': {
      padding: 0,
    },
    '& .MuiListItemIcon-root': {
      minWidth: "unset !important",
      color: theme.palette.white.main,
    },
    '& .MuiTypography-displayBlock': {
      display: "inline-block",
      marginLeft: theme.spacing(1),
    }
  },
  nested: {
    marginLeft: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
      margin: 0,
    },
  },
  expandMore: {
    transform: 'rotate(-90deg)',
  },
  paper: {
    padding: "20px",
    marginBottom: theme.spacing(3),
    backgroundColor: theme.palette.gray.main,
  },
  buttonSpacer: {
    marginRight: theme.spacing(1),
  },
});

function AnnouncementPanel(props) {
  const { classes, botId, module, editModule, setSelectedBot, setApiAlert } = props;
  const [deleteAnchor, setDeleteAnchor] = React.useState(null);
  const [open, setOpen] = React.useState(false);

  const embedObject = {
    title: module.embedTitle,
    linkURL: module.embedLinkURL,
    color: module.embedColor,
    thumbnailURL: module.embedThumbnailURL,
    mainImageURL: module.embedMainImageURL,
    description: module.embedDescription,
    fields: module.embedFields,
    footer: module.embedFooter,
    footerThumbnailURL: module.embedFooterThumbnailURL,
  }

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
          <GridContainer alignItems="flex-end">
            <GridItem xs={12} sm={12} md={8} lg={9}>
              <List className={classes.list}>
                <ListItem>
                  <ListItemText primary="Server:" secondary={module.responseChannel.serverName} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Channel:" secondary={module.responseChannel.channelName} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Type:" secondary={module.type} />
                </ListItem>
                <ListItem button onClick={() => setOpen(!open)}>
                  <ListItemIcon>
                    {open ? <ExpandMore /> : <ExpandMore className={classes.expandMore} />}
                  </ListItemIcon>
                  <ListItemText primary="Announcement" />
                </ListItem>
              </List>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <List className={classes.list} component="div">
                  <ListItem className={classes.nested}>
                    {module.responseType === "basic"
                      ? <ListItemText secondary={module.response} />
                      : <EmbedPreviewPanel embedObject={embedObject} />
                    }
                  </ListItem>
                </List>
              </Collapse>
            </GridItem>
            <GridItem xs={12} sm={12} md={4} lg={3} right>
              <Button round justIcon size="lg" onClick={editModule} color="purple" className={classes.buttonSpacer}>
                <EditIcon />
              </Button>
              <Button round justIcon size="lg" onClick={handleDeleteClick} color="danger">
                <DeleteIcon />
              </Button>
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
    </GridContainer >
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