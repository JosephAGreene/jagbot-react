import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import GridContainer from '../components/grid/GridContainer';
import ModulePanel from '../components/ModulePanel';
import { FiCommand } from 'react-icons/fi';
import { SiSteam } from 'react-icons/si';
import autoModerator from '../assets/images/automoderator.png';

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

function Modules(props) {
  const { classes } = props;

  return (
    <Paper className={classes.paper}>
      <div className={classes.contentWrapper}>
        <GridContainer>
        <ModulePanel 
          title="Custom Commands"
          description="Set up your own custom commands. Both single and library response options available." 
          path="/dashboard/content"
          Icon={FiCommand}
          color="#F45142"
        />
        <ModulePanel 
          title="Steam News"
          description="Need to know what's happening with your favorite game? Your bot could keep up with one, a few, or ALL steam titles." 
          path="/dashboard"
          Icon={SiSteam}
          color="#52B1E9"
        />
        <ModulePanel 
          title="Auto Moderation"
          description="Make your bot swing his billy club on the baddies of your server." 
          path="/dashboard"
          image={autoModerator}
        />
        <ModulePanel 
          title="Word Filters"
          description="Wash your sailor talking member mouths out with soap!"
          path="/dashboard" 
        />
        <ModulePanel 
          title="Generic Module"
          description="Use this space to describe what the module does."
          path="/dashboard" 

        />
        <ModulePanel 
          title="Generic Module"
          description="Use this space to describe what the module does."
          path="/dashboard" 

        />
        <ModulePanel 
          title="Generic Module"
          description="Use this space to describe what the module does."
          path="/dashboard" 

        />
        <ModulePanel 
          title="Generic Module"
          description="Use this space to describe what the module does."
          path="/dashboard" 
        />
        </GridContainer>
      </div>
    </Paper>
  );
}

Modules.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Modules);