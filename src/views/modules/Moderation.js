import React from 'react';
import PropTypes from "prop-types";

// Import layouts
import ContentWrapper from '../../layouts/ContentWrapper';

// Import custom components
import TitlePanel from '../panels/TitlePanel';
import ModerationPanel from '../panels/ModerationPanel';
import GridContainer from '../../components/grid/GridContainer';

// Temporary flat image/icon for testing
import moderationImage from '../../assets/images/moderation.png';
import banUserImage from '../../assets/images/banuser.png';
import softBanUserImage from '../../assets/images/softbanuser.png';
import kickUserImage from '../../assets/images/kickuser.png'
import purgeImage from '../../assets/images/purge.png';
import pingImage from '../../assets/images/ping.png';
import helpImage from '../../assets/images/help.png';

function Moderation(props) {
  const { selectedBot } = props;

  return (
    <ContentWrapper>
      <TitlePanel
        title="Moderation"
        description="Moderate your server with a set of powerful commands."
        image={moderationImage}
        docs={[]}
      />
      <GridContainer>
        <ModerationPanel
          title="Help"
          description="Provides overview of available bot commands, their descriptions, and how to use them."
          prefix={selectedBot.prefix}
          module={selectedBot.moderationModules.find(module => module.type === "help")}
          pathname="/dashboard/develop/moderation/help"
          image={helpImage}
        />
        <ModerationPanel
          title="Ping"
          description="Returns the latency of your bot and the discord API."
          prefix={selectedBot.prefix}
          module={selectedBot.moderationModules.find(module => module.type === "ping")}
          pathname="/dashboard/develop/moderation/ping"
          image={pingImage}
        />
        <ModerationPanel
          title="Purge"
          description="Bulk deletes up to 100 messages at a time in a single channel."
          prefix={selectedBot.prefix}
          module={selectedBot.moderationModules.find(module => module.type === "purge")}
          pathname="/dashboard/develop/moderation/purge"
          image={purgeImage}
        />
        <ModerationPanel
          title="Ban"
          description="Bans a user from your server, deletes their messages from the last 7 days, and sends them a ban notice."
          prefix={selectedBot.prefix}
          module={selectedBot.moderationModules.find(module => module.type === "ban")}
          pathname="/dashboard/develop/moderation/ban"
          image={banUserImage}
        />
        <ModerationPanel
          title="Soft Ban"
          description="Kicks a user from your server, deletes their messages from the last 7 days, and sends them a soft-ban notice."
          prefix={selectedBot.prefix}
          module={selectedBot.moderationModules.find(module => module.type === "soft-ban")}
          pathname="/dashboard/develop/moderation/softban"
          image={softBanUserImage}
        />
        <ModerationPanel
          title="Kick"
          description="Kicks a user from your server."
          prefix={selectedBot.prefix}
          module={selectedBot.moderationModules.find(module => module.type === "kick")}
          pathname="/dashboard/develop/moderation/kick"
          image={kickUserImage}
        />
      </GridContainer>
    </ContentWrapper>
  );
}

Moderation.propTypes = {
  selectedBot: PropTypes.object.isRequired,
};

export default Moderation;