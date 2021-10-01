import React from 'react';

// Import layouts
import ContentWrapper from '../../layouts/ContentWrapper';

// Import MUI components
import { withStyles } from '@material-ui/core/styles';

// Import custom components
import TitlePanel from '../panels/TitlePanel';
import AnnouncementPanel from '../panels/AnnouncementPanel';
import ModulePanel from '../panels/ModulePanel';
import GridContainer from '../../components/grid/GridContainer';

// Import Images
import announcementsImage from '../../assets/images/announcements.png';

// Import Icons
import { FaUserSlash, FaUserMinus, FaUserPlus } from "react-icons/fa";

const styles = (theme) => ({
  categoryHeader: {
    marginLeft: theme.spacing(1),
    color: theme.palette.white.dark,
    fontSize: 24,
  },
  largeSpacer: {
    marginTop: theme.spacing(6),
  },
  smallSpacer: {
    marginTop: theme.spacing(2),
  },
});


function Announcements(props) {
  const { classes, selectedBot, setSelectedBot, setApiAlert } = props;

  const returnAnnouncements = () => {
    return (
      selectedBot.announcementModules.map((module, pos) => {
        return (
          <AnnouncementPanel
            key={`${module.command}_${pos}`}
            module={module}
            botId={selectedBot._id}
            setSelectedBot={setSelectedBot}
            setApiAlert={setApiAlert}
          />
        )
      })
    )
  }

  return (
    <ContentWrapper>
      <TitlePanel
        title="Announcements"
        description="Make an announcement when a member joins, leaves, get's banned, or get's kicked from your server."
        image={announcementsImage}
        docs={true}
      />
      <div className={classes.largeSpacer} />
      <div className={classes.categoryHeader}>
        Assign an Announcement
      </div>
      <div className={classes.smallSpacer} />
      <GridContainer>
        <ModulePanel
          title="Join"
          description="Post an announcement when a new member joins the server."
          path="/dashboard/develop/announcements/join"
          Icon={FaUserPlus}
          color="#98c379"
        />
        <ModulePanel
          title="Leave"
          description="Post an announcement when a member leaves the server."
          path="/dashboard/develop/announcements/leave"
          Icon={FaUserMinus}
          color="#de8f4d"
        />
        <ModulePanel
          title="Banned"
          description="Post an announcement when a member is banned from the server."
          path="/dashboard/develop/announcements/banned"
          Icon={FaUserSlash}
          color="#f44336"
        />
      </GridContainer>
      {returnAnnouncements()}
    </ContentWrapper>
  );
}

export default withStyles(styles)(Announcements);