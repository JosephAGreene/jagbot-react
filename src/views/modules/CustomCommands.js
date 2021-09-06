import React from 'react';
import PropTypes from "prop-types";

// Import layouts
import ContentWrapper from '../../layouts/ContentWrapper';

// Import MUI components
import { withStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

// Import custom components
import TitlePanel from '../panels/TitlePanel';
import ModulePanel from '../panels/ModulePanel';
import AssignedCommandPanel from '../panels/AssignedCommandPanel';
import GridContainer from '../../components/grid/GridContainer';
import GridItem from '../../components/grid/GridItem';
import SearchInput from '../../components/inputs/SearchInput';
import Button from '../../components/buttons/Button';

// Import icons
import { FiCommand } from 'react-icons/fi';
import { TiMessage } from 'react-icons/ti';
import { TiMessages } from 'react-icons/ti';
import { GiPerspectiveDiceSixFacesRandom } from 'react-icons/gi';
import { BsExclamationOctagonFill } from 'react-icons/bs';
import FilterListIcon from '@material-ui/icons/FilterList';

const styles = (theme) => ({
  categoryHeader: {
    marginLeft: theme.spacing(1),
    color: theme.palette.white.dark,
    fontSize: 24,
  },
  largeSpacer: {
    marginTop: theme.spacing(6),
  },
  smallSpacer: {
    marginTop: theme.spacing(2),
  },
  icon: {
    marginLeft: "15px",
  },
  pagination: {
    '& .MuiPaginationItem-root' : {
      color: theme.palette.white.dark,
    },
    '& .Mui-selected' : {
      backgroundColor: theme.palette.gray.dark,
    },
  },
  filterMenuRoot: {
    '& .MuiPaper-root': {
      backgroundColor: theme.palette.gray.dark,
      borderRadius: 2,
    },
    '& .MuiButtonBase-root': {
      color: theme.palette.white.dark,
      '&:hover' : {
        backgroundColor: theme.palette.gray.light,
      },
      
    },
  },
  infoBar: {
    float: 'right',
    marginLeft: "15px",
    marginRight: "5px",
    color: theme.palette.white.dark,
  },
  emptySearchContainer: {
    width: "inherit",
    height: "inherit",
    paddingTop: "50px",
    textAlign: "center",
  },
  emptySearchMessage: {
    fontSize: "18px",
    color: theme.palette.white.dark,
  },
  exclamationIcon: {
    fontSize: "200px",
    color: theme.palette.gray.dark,
  },
});

// Filter out any module that isn't a custom command type
function targetTypes (moduleArray) {
  // Array of module types allowed
  const moduleTypes = ["single-response", "optioned-response", "random-response"];
  let results = [];

  moduleArray.forEach((module) => {
    if(moduleTypes.includes(module.type)) {
      results.push(module);
    }
  });
  return results;
}

function searchModules (value, moduleArray) {
  let results = [];

  for (let i=0; i < moduleArray.length; i++) {
    if(moduleArray[i].command.toLowerCase().search(value.trim().toLowerCase()) > -1) {
      results.push(moduleArray[i]);
    }
  }
  return results;
}

function filterModules (value, moduleArray) {
  if (value === "None") {
    return moduleArray;
  }

  let filter = "";

  switch(value) {
    case "Single Response":
      filter="single-response"
      break;
    case "Optioned Response":
      filter="optioned-response";
      break;
    case "Random Response":
      filter="random-response";
      break;
    default:
      filter="None";
  }

  let results = [];

  for (let i=0; i < moduleArray.length; i++) {
    if(moduleArray[i].type === filter) {
      results.push(moduleArray[i]);
    }
  }
  return results;
}

function CustomCommands(props) {
  const {classes, selectedBot, setSelectedBot, setApiAlert} = props;
  const [filterAnchor, setFilterAnchor] = React.useState(null);
  const [filter, setFilter] = React.useState('None');
  const [moduleSearchInput, setModuleSearchInput] = React.useState('');
  const [page, setPage] = React.useState(1);

  const modulesPerPage = 5;
  const moduleCount = targetTypes(filterModules(filter, searchModules(moduleSearchInput, selectedBot.commandModules))).length;
  console.log(moduleCount);
  const paginationCount = Math.ceil(moduleCount / modulesPerPage);

  React.useEffect(() => {
    // Decrement page if it's value is beyond what moduleCount can display
    // This will result in a page value of 0 if a search turns up empty
    if ((moduleCount <= (page - 1 ) * modulesPerPage) && page !== 0) 
    {
      setPage(page - 1);
    } 
    // Reset page to 1 after an empty search is reset
    else if (!page && moduleCount > 0)
    {
      setPage(1);
    }
  }, [moduleCount, page]);

  const handleFilterOpen = (event) => {
    setFilterAnchor(event.currentTarget);
  };

  const handleFilterClose = () => {
    setFilterAnchor(null);
  };

  const handleFilterChange = (value) => {
    setFilter(value);
    handleFilterClose();
  };

  const handlePaginationChange = (event, value) => {
    setPage(value);
  };

  const handleModuleSearch = (value) => {
    setModuleSearchInput(value);
  }

  const returnVisibleModules = () => {
    if (page === 0) {
      return (
        <div className={classes.emptySearchContainer}>
          <div className={classes.emptySearchMessage}>No matches found!</div>
          <div className={classes.exclamationIcon}>
            <BsExclamationOctagonFill />
          </div>
          
        </div>
      );
    }

    return (
      targetTypes(filterModules(filter, searchModules(moduleSearchInput, selectedBot.commandModules)))
        .slice((page - 1 ) * modulesPerPage, (page - 1) * modulesPerPage + modulesPerPage)
        .map((module, pos) => {
          return(
            <AssignedCommandPanel 
              key={`${module.command}_${pos}`}
              module={module}
              botId={selectedBot._id}
              setSelectedBot={setSelectedBot}
              setApiAlert={setApiAlert}
            />
          );
        })
    );
  }

  return (
    <ContentWrapper>
      <TitlePanel 
        title="Custom Commands"
        description="Assign custom commands to make your bot unique."
        Icon={FiCommand}
        docs={true}
        color="#F45142"
      />
      <div className={classes.largeSpacer} />
      <div className={classes.categoryHeader}>
        Assign a Command
      </div>
      <div className={classes.smallSpacer} />
      <GridContainer>
        <ModulePanel 
          title="Single Response"
          description="A single command that returns a single response." 
          path="/dashboard/develop/customcommands/single"
          Icon={TiMessage}
          color="#98c379"
        />
        <ModulePanel 
          title="Optioned Responses"
          description="A single command with a supplied option keyword, for which a range of multiple responses can be returned." 
          path="/dashboard/develop/customcommands/optioned"
          Icon={TiMessages}
          color="#de8f4d"
        />
        <ModulePanel 
          title="Randomized Response"
          description="A single command that returns a randomly choosen response from a list of potential responses." 
          path="/dashboard/develop/customcommands/random"
          Icon={GiPerspectiveDiceSixFacesRandom}
          color="#c678DD"
        />
      </GridContainer>
      <div className={classes.largeSpacer} />
      <GridContainer alignItems="flex-end">
        <GridItem sm={12} md={6} lg={4}>
          <div className={classes.categoryHeader}>
            Assigned Commands
          </div>
        </GridItem>
        <GridItem xs sm={12} md={6} lg={8} verticalCenter right>
          <SearchInput 
            value={moduleSearchInput} 
            onChange={(e) => handleModuleSearch(e.target.value)}
            handleSearch={handleModuleSearch}
          />
          <Button 
            className={classes.icon}
            onClick={handleFilterOpen}
            round 
            justIcon
          >
            <FilterListIcon/>
          </Button>
          <Menu
            id="filter-menu"
            anchorEl={filterAnchor}
            open={Boolean(filterAnchor)}
            onClose={handleFilterClose}
            className={classes.filterMenuRoot}
            getContentAnchorEl={null}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <MenuItem onClick={() => handleFilterChange('None')}>No Filter</MenuItem>
            <MenuItem onClick={() => handleFilterChange('Single Response')}>Single Response</MenuItem>
            <MenuItem onClick={() => handleFilterChange('Optioned Response')}>Optioned Response</MenuItem>
            <MenuItem onClick={() => handleFilterChange('Random Response')}>Random Response</MenuItem>
          </Menu>
        </GridItem>
        <GridItem xs={12}>
        <div className={classes.infoBar}>Filter: {filter}</div>
          <div className={classes.infoBar}>Search: {moduleSearchInput ? moduleSearchInput : 'None'}</div>
        </GridItem>
      </GridContainer>
      <div className={classes.smallSpacer} />
        {returnVisibleModules()}
        <GridContainer>
          <GridItem xs right>
            <Pagination 
              className={classes.pagination} 
              page={page} 
              count={paginationCount} 
              onChange={handlePaginationChange}
            />
          </GridItem>
        </GridContainer>
    </ContentWrapper>
  );
}

CustomCommands.propTypes = {
  classes: PropTypes.object.isRequired,
  setApiAlert: PropTypes.func.isRequired,
  selectedBot: PropTypes.object.isRequired,
  setSelectedBot: PropTypes.func.isRequired,
};

export default withStyles(styles)(CustomCommands);