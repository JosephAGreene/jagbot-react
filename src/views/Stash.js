import React from 'react';
import { Link, Redirect } from 'react-router-dom';
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
  const [loading, setLoading] = React.useState(true);
  const [unpacking, setUnpacking] = React.useState({ unpacking: false, message: '' });

  React.useEffect(() => {
    let mounted = true;

    const getBotSummary = async () => {
      if (mounted) setLoading(true);
      const res = await BotService.getBotSummary();
      if (mounted) {
        if (res.status === 200) {
          setBots(res.data);
        } else {
          console.log("No Bots!")
        }
        setLoading(false);
      }
    }

    getBotSummary();

    // cleanup function
    return () => {
      mounted = false;
    }
  }, []);

  const selectBot = async (bot) => {
    setUnpacking({ unpacking: true, message: `Unpacking ${bot.name}` });
    const payload = {
      _id: bot._id,
      avatarURL: bot.avatarURL,
      name: bot.name,
      enabled: bot.enabled,
    }
    const res = await BotService.checkoutBot(payload);

    if (res.status === 200) {
      setUnpacking({ unpacking: false, message: '' });
      handleBotSelection(res.data);
    } else {
      console.log(res);
      setUnpacking({ unpacking: false, message: '' });
      setApiAlert({
        status: true,
        duration: 2500,
        severity: "error",
        message: `Something went wrong. Check console.`
      });
    }
  }

  const returnBots = () => {
    if (loading) {
      return (
        <CircularBackdrop loading={true} message='Grabbing stashed bots...' />
      );
    }
    // If user has no bots, and has never acknowledged the terms of service 
    // warning, then we can assume they are new and should forward them to newbot
    else if (bots.length < 1 && !warningAcknowledged) {
      return <Redirect to="newbot" />
    } 
    // If user has bots, display them
    else if (bots.length > 0) {
      return (
        <GridContainer>
          {bots && bots.map((bot, key) => {
            return <BotPanel
              key={key}
              bot={bot}
              onClick={() => selectBot(bot)}
            />
          })}
          <CircularBackdrop loading={unpacking.unpacking} message={unpacking.message} />
        </GridContainer>
      );
    }
    // User currently has no bots, but has in the past, so we can show them
    // an empty bot stash area
    else {
      return (
        <div>
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
        </div>
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