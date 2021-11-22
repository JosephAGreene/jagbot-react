import React from 'react';
import PropTypes from 'prop-types';

// Import API service
import BotService from "../services/BotService.js";

// Import layouts
import ContentWrapper from '../layouts/ContentWrapper';

// Import custom components
import GridContainer from '../components/grid/GridContainer';
import TitlePanel from './panels/TitlePanel';
import BotPanel from './panels/BotPanel';
import CircularBackdrop from '../components/progress/CircularBackdrop.js';

// Temporary flat image/icon for testing
import stashImage from '../assets/images/stash.png';

function Stash(props) {
  const { bots, handleBotSelection, setApiAlert } = props;
  const [loading, setLoading] = React.useState(false);

  const selectBot = async (bot) => {
    setLoading(true);
    const payload = {
      _id: bot._id,
      avatarURL: bot.avatarURL,
      name: bot.name,
      enabled: bot.enabled,
    }
    const res = await BotService.checkoutBot(payload);

    if (res.status === 200) {
      setLoading(false);
      handleBotSelection(res.data);
    } else {
      console.log(res);
      setLoading(false);
      setApiAlert({
        status: true,
        duration: 2500,
        severity: "error",
        message: `Something went wrong. Check console.`
      });
    }
  }

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
                onClick={() => selectBot(bot)}
              />
      })}
      </GridContainer>
      <CircularBackdrop loading={loading} />
    </ContentWrapper>
  );
}

Stash.propTypes = {
  bots: PropTypes.array.isRequired,
  handleBotSelection: PropTypes.func.isRequired,
};

export default Stash;