import React from 'react';

// Import layouts
import ContentWrapper from '../layouts/ContentWrapper';

// Import custom components
import GridContainer from '../components/grid/GridContainer';
import ModulePanel from './panels/ModulePanel';

// Import icons
import { FiCommand } from 'react-icons/fi';
import { SiSteam } from 'react-icons/si';

// Import Images
import autoModerator from '../assets/images/automoderator.png';
import announcementsImage from '../assets/images/announcements.png';

function Modules() {

  return (
    <ContentWrapper>
      <GridContainer>
        <ModulePanel 
          title="Custom Commands"
          description="Set up your own custom commands. Both single and library response options available." 
          path="/dashboard/develop/customcommands"
          Icon={FiCommand}
          color="#F45142"
        />
        <ModulePanel 
          title="Steam News"
          description="Need to know what's happening with your favorite game? Your bot could keep up with one, a few, or ALL steam titles." 
          path="/dashboard"
          Icon={SiSteam}
          color="#52B1E9"
        />
        <ModulePanel 
          title="Auto Moderation"
          description="Make your bot swing his billy club on the baddies of your server." 
          path="/dashboard/develop/automoderation"
          image={autoModerator}
        />
        <ModulePanel 
          title="Announcements"
          description="Make an announcement when a member joins, leaves, or get's kicked from your server."
          path="/dashboard/develop/announcements" 
          image={announcementsImage}
        />
        <ModulePanel 
          title="Generic Module"
          description="Use this space to describe what the module does."
          path="/dashboard" 

        />
      </GridContainer>
    </ContentWrapper>
  );
}

export default Modules;