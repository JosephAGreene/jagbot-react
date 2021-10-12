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
import kickUserImage from '../../assets/images/kickuser.png'

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
          description="Bans a user from your server."
          prefix={selectedBot.prefix}
          module={selectedBot.moderationModules.find(module => module.type === "ban")}
          image={banUserImage}
        />
        <ModerationPanel
          title="Kick"
          description="Kicks a user from your server."
          prefix={selectedBot.prefix}
          module={selectedBot.moderationModules.find(module => module.type === "kick")}
          image={kickUserImage}
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