import React from 'react';
import PropTypes from 'prop-types';

// Import API service
import BotService from "../services/BotService.js";

// Import layouts
import ContentWrapper from '../layouts/ContentWrapper';

// Import Mui components
import { withStyles } from '@material-ui/core/styles';
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";

// Import custom components
import GridContainer from '../components/grid/GridContainer';
import TitlePanel from './panels/TitlePanel';
import BotPanel from './panels/BotPanel';

// Temporary flat image/icon for testing
import stashImage from '../assets/images/stash.png';

const styles = (theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: theme.palette.teal.main,
    [theme.breakpoints.up('sm')]: {
      paddingLeft: "250px",
    },
  },
  loadingMessage: {
    textAlign: "center",
  }
});

function Stash(props) {
  const {classes, bots, handleBotSelection, setApiAlert } = props;
  const [loading, setLoading] = React.useState(false);

  const selectBot = async (id) => {
    setLoading(true);

    const res = await BotService.getBot(id);

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
                onClick={() => selectBot(bot._id)}
              />
      })}
      </GridContainer>
      <Backdrop className={classes.backdrop} open={loading}>
        <div className={classes.loadingMessage}>
          <CircularProgress size={50} color="inherit" />
        </div>
      </Backdrop>
    </ContentWrapper>
  );
}

Stash.propTypes = {
  bots: PropTypes.array.isRequired,
  handleBotSelection: PropTypes.func.isRequired,
};

export default withStyles(styles)(Stash);