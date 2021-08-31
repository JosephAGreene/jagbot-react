import React from 'react';

// Import layouts
import ContentWrapper from '../../layouts/ContentWrapper';

// Import custom components
import TitlePanel from '../panels/TitlePanel';
import AutoModerationPanel from '../panels/AutoModerationPanel';
import GridContainer from '../../components/grid/GridContainer';

// Temporary flat image/icon for testing
import autoModerator from '../../assets/images/automoderator.png';

function AutoModeration(props) {
  const { selectedBot } = props;

  return (
    <ContentWrapper>
      <TitlePanel
        title="Auto Moderation"
        description="Automatically moderate your server."
        image={autoModerator}
        docs={true}
      />
      <GridContainer>
        <AutoModerationPanel
          title="Banned Words"
          description="Create of a list of banned words. Tell your bot what to do when someone posts those words."
          module={selectedBot.scanModules.find(module => module.type === "word-filter")}
        />
        <AutoModerationPanel
          title="Discord Invite Links"
          description="Have your bot take action when someone posts discord invite links in your server."
          module={selectedBot.scanModules.find(module => module.type === "invite-filter")}
        />
        <AutoModerationPanel
          title="Mass Caps"
          description="Have some users with a stuck capslock key? Give them motivation to change."
          module={selectedBot.scanModules.find(module => module.type === "masscaps-filter")}
        />
        <AutoModerationPanel
          title="Mass Mentions"
          description="Take action when a member has gone overboard with the mentions. You decide what overboard is."
          module={selectedBot.scanModules.find(module => module.type === "massmentions-filter")}
        />
      </GridContainer>
    </ContentWrapper>
  );
}

export default AutoModeration;