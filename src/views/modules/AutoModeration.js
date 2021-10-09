import React from 'react';
import PropTypes from "prop-types";

// Import layouts
import ContentWrapper from '../../layouts/ContentWrapper';

// Import custom components
import TitlePanel from '../panels/TitlePanel';
import AutoModerationPanel from '../panels/AutoModerationPanel';
import GridContainer from '../../components/grid/GridContainer';

// Temporary flat image/icon for testing
import autoroleImage from '../../assets/images/autorole.png';
import automoderatorImage from '../../assets/images/automoderator.png';
import bannedwordsImage from '../../assets/images/bannedwords.png';
import invitelinksImage from '../../assets/images/invitelinks.png';
import masscapsImage from '../../assets/images/masscaps.png';
import massmentionsImage from '../../assets/images/massmentions.png';

function AutoModeration(props) {
  const { selectedBot } = props;

  return (
    <ContentWrapper>
      <TitlePanel
        title="Auto Moderation"
        description="Automatically moderate your server."
        image={automoderatorImage}
        docs={true}
      />
      <GridContainer>
        <AutoModerationPanel
          title="Auto Roles"
          description="Automatically assign roles to members when they first join your server"
          module={selectedBot.scanModules.find(module => module.type === "auto-role")}
          image={autoroleImage}
        />
        <AutoModerationPanel
          title="Banned Words"
          description="Create of a list of banned words. Tell your bot what to do when someone posts those words."
          module={selectedBot.scanModules.find(module => module.type === "word-filter")}
          image={bannedwordsImage}
        />
        <AutoModerationPanel
          title="Discord Invite Links"
          description="Have your bot take action when someone posts discord invite links in your server."
          module={selectedBot.scanModules.find(module => module.type === "invite-filter")}
          image={invitelinksImage}
        />
        <AutoModerationPanel
          title="Mass Caps"
          description="Have a member with an infatuation for the capslock key? Give them motivation to change."
          module={selectedBot.scanModules.find(module => module.type === "masscaps-filter")}
          image={masscapsImage}
        />
        <AutoModerationPanel
          title="Mass Mentions"
          description="Take action when a member has gone overboard with the mentions. You decide what overboard is."
          module={selectedBot.scanModules.find(module => module.type === "massmentions-filter")}
          image={massmentionsImage}
        />
      </GridContainer>
    </ContentWrapper>
  );
}

AutoModeration.propTypes = {
  selectedBot: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool
  ]).isRequired,
};

export default AutoModeration;