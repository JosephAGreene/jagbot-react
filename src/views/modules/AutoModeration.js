import React from 'react';
import PropTypes from "prop-types";

// Import layouts
import ContentWrapper from '../../layouts/ContentWrapper';

// Import custom components
import TitlePanel from '../panels/TitlePanel';
import ModerationPanel from '../panels/ModerationPanel';
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
        docs={[]}
      />
      <GridContainer>
        <ModerationPanel
          title="Auto Roles"
          description="Automatically assign roles to members when they first join your server."
          module={selectedBot.autoModModules.find(module => module.type === "auto-role")}
          pathname="/dashboard/develop/automoderation/autoroles"
          image={autoroleImage}
        />
        <ModerationPanel
          title="Banned Words"
          description="Create of a list of banned words. Tell your bot what to do when someone posts those words."
          module={selectedBot.autoModModules.find(module => module.type === "word-filter")}
          pathname="/dashboard/develop/automoderation/bannedwords"
          image={bannedwordsImage}
        />
        <ModerationPanel
          title="Discord Invite Links"
          description="Have your bot take action when someone posts discord invite links in your server."
          module={selectedBot.autoModModules.find(module => module.type === "invite-filter")}
          pathname="/dashboard/develop/automoderation/invitelinks"
          image={invitelinksImage}
        />
        <ModerationPanel
          title="Mass Caps"
          description="Have a member with an infatuation for the capslock key? Give them motivation to change."
          module={selectedBot.autoModModules.find(module => module.type === "masscaps-filter")}
          pathname="/dashboard/develop/automoderation/masscaps"
          image={masscapsImage}
        />
        <ModerationPanel
          title="Mass Mentions"
          description="Take action when a member has gone overboard with the mentions. You decide what overboard is."
          module={selectedBot.autoModModules.find(module => module.type === "massmentions-filter")}
          pathname="/dashboard/develop/automoderation/massmentions"
          image={massmentionsImage}
        />
      </GridContainer>
    </ContentWrapper>
  );
}

AutoModeration.propTypes = {
  selectedBot: PropTypes.object.isRequired,
};

export default AutoModeration;