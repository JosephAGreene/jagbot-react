import React from 'react';

// Import layouts
import ContentWrapper from '../layouts/ContentWrapper';

// Import MUI components
import { withStyles } from '@material-ui/core/styles';

// Import custom components
import TitlePanel from '../components/panels/TitlePanel';
import ModulePanel from '../components/panels/ModulePanel';
import AssignedCommandPanel from '../components/panels/AssignedCommandPanel';
import GridContainer from '../components/grid/GridContainer';

// Import icons
import { FiCommand } from 'react-icons/fi';
import { TiMessage } from 'react-icons/ti';
import { TiMessages } from 'react-icons/ti';
import { GiPerspectiveDiceSixFacesRandom } from 'react-icons/gi';

const styles = (theme) => ({
  categoryHeader: {
    marginTop: theme.spacing(6),
    marginBottom: theme.spacing(2),
    marginLeft: theme.spacing(1),
    color: theme.palette.white.dark,
    fontSize: 24,
  }
});

function CustomCommands(props) {
  const {classes} = props;

  return (
    <ContentWrapper>
      <TitlePanel 
        title="Custom Commands"
        description="Assign custom commands to make your bot unique."
        Icon={FiCommand}
        color="#F45142"
      />
      <div className={classes.categoryHeader}>
        Assign a Command
      </div>
      <GridContainer>
        <ModulePanel 
          title="Single Response"
          description="A single command that returns a single response." 
          path="/dashboard/develop/customcommands/single"
          Icon={TiMessage}
          color="#98c379"
        />
        <ModulePanel 
          title="Multiple Optioned Response"
          description="A single command with a supplied option, for which a range of multiple responses can be returned." 
          path="/dashboard/develop/customcommands/single"
          Icon={TiMessages}
          color="#de8f4d"
        />
        <ModulePanel 
          title="Randomized Response"
          description="A single command that returns a randomly choosen response from a list of potential responses." 
          path="/dashboard/develop/customcommands/single"
          Icon={GiPerspectiveDiceSixFacesRandom}
          color="#c678DD"
        />
      </GridContainer>
      <div className={classes.categoryHeader}>
        Assigned Commands
      </div>
      <GridContainer>
        <AssignedCommandPanel 
          command="!Test"
          description="This is a description of the test command, foo!"
        />
      </GridContainer>
    </ContentWrapper>
  );
}

export default withStyles(styles)(CustomCommands);