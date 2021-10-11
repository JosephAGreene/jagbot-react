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

function Moderation(props) {
  const { selectedBot } = props;
  const prefix = selectedBot.prefix;

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
          title={`${prefix}Ban`}
          description="Bans a user from your server."
          module={selectedBot.moderationModules.find(module => module.type === "ban")}
          image={banUserImage}
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