import React from 'react';

// Import layouts
import ContentWrapper from '../../layouts/ContentWrapper';

// Import MUI components
import { withStyles } from '@material-ui/core/styles';

// Import custom components
import TitlePanel from '../panels/TitlePanel';

// Import Icons
import { FaUserPlus } from "react-icons/fa";

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


function AnnouncementsJoin(props) {

  return (
    <ContentWrapper>
      <TitlePanel
        title="Join Announcement"
        description="This message will be posted when a user joins the server."
        Icon={FaUserPlus}
        color="#98c379"
        docs={true}
      />

    </ContentWrapper>
  );
}

export default withStyles(styles)(AnnouncementsJoin);