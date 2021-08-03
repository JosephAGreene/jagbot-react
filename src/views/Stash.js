import React from 'react';
import PropTypes from 'prop-types';

// Import layouts
import ContentWrapper from '../layouts/ContentWrapper';

// Import custom components
import GridContainer from '../components/grid/GridContainer';
import TitlePanel from '../components/panels/TitlePanel';
import BotPanel from '../components/panels/BotPanel';

// Temporary flat image/icon for testing
import stashImage from '../assets/images/stash.png';

function Stash(props) {
  const { bots, handleBotSelection } = props;

  return (
    <ContentWrapper>
      <TitlePanel 
        title="The Stash"
        description="This is where your bots are stashed. Take one to The Lab to teach it new tricks!"
        image={stashImage}
      />
      <GridContainer>
      {bots && bots.map((bot, key) => {
        return <BotPanel 
                key={key}
                bot={bot}
                onClick={() => handleBotSelection(bot._id)}
              />
      })}
      </GridContainer>
    </ContentWrapper>
  );
}

Stash.propTypes = {
  bots: PropTypes.array.isRequired,
  handleBotSelection: PropTypes.func.isRequired,
};

export default Stash;