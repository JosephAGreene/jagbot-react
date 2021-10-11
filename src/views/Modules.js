import React from 'react';

// Import layouts
import ContentWrapper from '../layouts/ContentWrapper';

// Import custom components
import GridContainer from '../components/grid/GridContainer';
import ModulePanel from './panels/ModulePanel';

// Import icons
import { FiCommand } from 'react-icons/fi';

// Import Images
import moderationImage from '../assets/images/moderation.png';
import automoderatorImage from '../assets/images/automoderator.png';
import announcementsImage from '../assets/images/announcements.png';

function Modules() {

  return (
    <ContentWrapper>
      <GridContainer>
        <ModulePanel
          title="Custom Commands"
          description="Assign your own custom commands to your bot. Have it respond to commands in your own unique way."
          path="/dashboard/develop/customcommands"
          Icon={FiCommand}
          color="#F45142"
        />
        <ModulePanel
          title="Moderation"
          description="Moderate your server with a set of powerful commands."
          path="/dashboard/develop/moderation"
          image={moderationImage}
        />
        <ModulePanel
          title="Auto Moderation"
          description="Setup your bot to automatically moderate your server according to your specifications."
          path="/dashboard/develop/automoderation"
          image={automoderatorImage}
        />
        <ModulePanel
          title="Announcements"
          description="Make an announcement when a member joins, leaves, or get's kicked from your server."
          path="/dashboard/develop/announcements"
          image={announcementsImage}
        />
      </GridContainer>
    </ContentWrapper>
  );
}

export default Modules;