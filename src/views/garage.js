import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import GridContainer from '../components/grid/GridContainer';
import BotPanel from '../components/BotPanel';


const styles = (theme) => ({
  paper: {
    maxWidth: 1200,
    margin: 'auto',
    overflow: 'hidden',
    background: theme.palette.gray.light,
    boxShadow: "none",
  },
  contentWrapper: {
    margin: '40px 16px',
    color: '#fff'
  },
});

function Garage(props) {
  const { classes, bots, handleBotSelection } = props;

  return (
    <Paper className={classes.paper}>
      <div className={classes.contentWrapper}>
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
    </Paper>
  );
}

Garage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Garage);