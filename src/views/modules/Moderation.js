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

function Moderation(props) {
  const { selectedBot } = props;

  return (
    <ContentWrapper>
      <TitlePanel
        title="Moderation"
        description="Moderate your server with a set of powerful commands."
        image={moderationImage}
        docs={true}
      />
      <GridContainer>
        <ModerationPanel
          title="Ban"
          description="Bans a user from your server, deletes their messages from the last 7 days, and sends them a ban notice."
          prefix={selectedBot.prefix}
          module={selectedBot.moderationModules.find(module => module.type === "ban")}
          image={banUserImage}
        />
        <ModerationPanel
          title="Soft Ban"
          description="Kicks a user from your server, deletes their messages from the last 7 days, and sends them a soft-ban notice."
          prefix={selectedBot.prefix}
          module={selectedBot.moderationModules.find(module => module.type === "soft-ban")}
          image={softBanUserImage}
        />
        <ModerationPanel
          title="Kick"
          description="Kicks a user from your server."
          prefix={selectedBot.prefix}
          module={selectedBot.moderationModules.find(module => module.type === "kick")}
          image={kickUserImage}
        />
        <ModerationPanel
          title="Purge"
          description="Bulk deletes up to 100 messages at a time in a single channel."
          prefix={selectedBot.prefix}
          module={selectedBot.moderationModules.find(module => module.type === "purge")}
          image={purgeImage}
        />
      </GridContainer>
    </ContentWrapper>
  );
}

Moderation.propTypes = {
  selectedBot: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool
  ]).isRequired,
};

export default Moderation;