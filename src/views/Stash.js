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
  const { handleBotSelection, setApiAlert } = props;
  const [bots, setBots] = React.useState([]);
  const [loading, setLoading] = React.useState({loading: false, message: ''});

  React.useEffect(() => {
    setLoading({loading: true, message: 'Grabbing stashed bots...'});
    const getBotSummary = async () => {
      const res = await BotService.getBotSummary();

      if (res.status === 200) {
        setBots(res.data);
      } else {
        console.log("No Bots!")
      }
    }

    getBotSummary();
    setLoading({loading: false, message: ''});
  }, []);

  const selectBot = async (bot) => {
    setLoading({loading: true, message: `Unpacking ${bot.name}`});
    const payload = {
      _id: bot._id,
      avatarURL: bot.avatarURL,
      name: bot.name,
      enabled: bot.enabled,
    }
    const res = await BotService.checkoutBot(payload);

    if (res.status === 200) {
      setLoading({loading: false, message: ''});
      handleBotSelection(res.data);
    } else {
      console.log(res);
      setLoading({loading: false, message: ''});
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
      <CircularBackdrop loading={loading.loading} message={loading.message} />
    </ContentWrapper>
  );
}

Stash.propTypes = {
  handleBotSelection: PropTypes.func.isRequired,
  setApiAlert: PropTypes.func.isRequired,
};

export default Stash;