import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

// Import API service
import BotService from "../services/BotService.js";

// Import layouts
import ContentWrapper from '../layouts/ContentWrapper';

// Import Mui components
import { withStyles } from '@material-ui/core/styles';

// Import custom components
import GridContainer from '../components/grid/GridContainer';
import GridItem from '../components/grid/GridItem';
import TitlePanel from './panels/TitlePanel';
import BotPanel from './panels/BotPanel';
import CircularBackdrop from '../components/progress/CircularBackdrop.js';
import Button from '../components/buttons/Button';

// Import images
import stashImage from '../assets/images/stash.png';

const styles = (theme) => ({
  empty: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(2),
    color: theme.palette.white.main,
    fontSize: 24,
  },
  links: {
    textDecoration: "none",
  },
});

function Stash(props) {
  const { classes, warningAcknowledged, handleBotSelection, setApiAlert } = props;
  const [bots, setBots] = React.useState([]);
  const [loading, setLoading] = React.useState({ loading: false, message: '' });
  const history = useHistory();

  React.useEffect(() => {
    if (!warningAcknowledged) {
      history.push('newbot');
    }

    setLoading({ loading: true, message: 'Grabbing stashed bots...' });
    const getBotSummary = async () => {
      const res = await BotService.getBotSummary();

      if (res.status === 200) {
        setBots(res.data);
      } else {
        console.log("No Bots!")
      }
    }

    getBotSummary();

    setLoading({ loading: false, message: '' });

  }, [history, warningAcknowledged]);

  const selectBot = async (bot) => {
    setLoading({ loading: true, message: `Unpacking ${bot.name}` });
    const payload = {
      _id: bot._id,
      avatarURL: bot.avatarURL,
      name: bot.name,
      enabled: bot.enabled,
    }
    const res = await BotService.checkoutBot(payload);

    if (res.status === 200) {
      setLoading({ loading: false, message: '' });
      handleBotSelection(res.data);
    } else {
      console.log(res);
      setLoading({ loading: false, message: '' });
      setApiAlert({
        status: true,
        duration: 2500,
        severity: "error",
        message: `Something went wrong. Check console.`
      });
    }
  }

  const returnBots = () => {
    if (bots.length > 0) {
      return (
        <GridContainer>
          {bots && bots.map((bot, key) => {
            return <BotPanel
              key={key}
              bot={bot}
              onClick={() => selectBot(bot)}
            />
          })}
        </GridContainer>
      );
    } else {
      return (
        <>
          <GridContainer justifyContent="center">
            <GridItem>
              <div className={classes.empty}>
                You don't have any bots!
              </div>
            </GridItem>
          </GridContainer>
          <GridContainer justifyContent="center">
            <GridItem>
              <Link
                className={classes.links}
                to={{
                  pathname: 'newbot',
                }}
              >
                <Button color="teal">
                  Add New Bot
                </Button>
              </Link>
            </GridItem>
          </GridContainer>
        </>
      );
    }
  }

  return (
    <ContentWrapper>
      <TitlePanel
        title="The Stash"
        description="This is where your bots are stashed. Take one to The Lab to teach it new tricks!"
        image={stashImage}
      />
      {returnBots()}
      <CircularBackdrop loading={loading.loading} message={loading.message} />
    </ContentWrapper>
  );
}

Stash.propTypes = {
  classes: PropTypes.object.isRequired,
  warningAcknowledged: PropTypes.bool.isRequired,
  handleBotSelection: PropTypes.func.isRequired,
  setApiAlert: PropTypes.func.isRequired,
};

export default withStyles(styles)(Stash);