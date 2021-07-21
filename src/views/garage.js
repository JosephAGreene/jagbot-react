import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridContainer from '../components/grid/GridContainer';
import TitlePanel from '../components/panels/TitlePanel';
import BotPanel from '../components/panels/BotPanel';

// test image
import stashImage from '../assets/images/stash.png';

const styles = (theme) => ({
  outterWrapper: {
    maxWidth: 1200,
    margin: 'auto',
    overflow: 'hidden',
  },
  innerWrapper: {
    margin: '10px 16px',
    color: '#fff'
  },
});

function Garage(props) {
  const { classes, bots, handleBotSelection } = props;

  return (
    <div className={classes.outterWrapper}>
      <div className={classes.innerWrapper}>
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
                  onClick={() => handleBotSelection(bot)}
                />
        })}
        </GridContainer>
      </div>
    </div>
  );
}

Garage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Garage);