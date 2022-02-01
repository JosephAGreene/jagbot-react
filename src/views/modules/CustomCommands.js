import React from 'react';
import PropTypes from "prop-types";

// Import layouts
import ContentWrapper from '../../layouts/ContentWrapper';

// Import MUI components
import { withStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';

// Import custom components
import TitlePanel from '../panels/TitlePanel';
import ModulePanel from '../panels/ModulePanel';
import AssignedCommandPanel from '../panels/AssignedCommandPanel';
import GridContainer from '../../components/grid/GridContainer';
import GridItem from '../../components/grid/GridItem';
import SearchInput from '../../components/inputs/SearchInput';
import FreeSelect from '../../components/inputs/FreeSelect';

// Import icons
import { FiCommand } from 'react-icons/fi';
import { TiMessage } from 'react-icons/ti';
import { TiMessages } from 'react-icons/ti';
import { GiPerspectiveDiceSixFacesRandom } from 'react-icons/gi';
import { BsExclamationOctagonFill } from 'react-icons/bs';
import { ImSortAlphaAsc, ImSortAlphaDesc } from "react-icons/im";

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
  pagination: {
    '& .MuiPaginationItem-root': {
      color: theme.palette.white.dark,
    },
    '& .Mui-selected': {
      backgroundColor: theme.palette.gray.dark,
    },
  },
  sort: {
    color: theme.palette.white.main,
    '&:hover': {
      color: theme.palette.white.dark,
    }
  },
  select: {
    marginTop: theme.spacing(1),
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(2),
    },
  },
  noneContainer: {
    width: "inherit",
    height: "inherit",
    textAlign: "center",
  },
  noneMessage: {
    fontSize: "18px",
    color: theme.palette.white.dark,
  },
  exclamationIcon: {
    fontSize: "180px",
    color: theme.palette.gray.dark,
  },
});

function searchModules(value, moduleArray, prefix) {
  let results = [];

  for (let i = 0; i < moduleArray.length; i++) {
    if (`${prefix}${moduleArray[i].command}`.toLowerCase().search(value.trim().toLowerCase()) > -1) {
      results.push(moduleArray[i]);
    }
  }
  return results;
}

function filterModules(filter, moduleArray) {
  if (!filter) {
    return moduleArray;
  }

  let results = [];

  for (let i = 0; i < moduleArray.length; i++) {
    if (moduleArray[i].type === filter) {
      results.push(moduleArray[i]);
    }
  }
  return results;
}

function sortModules(moduleArray, orderBy) {
  let results = [...moduleArray]

  const comparator = (a, b) => {
    if (a < b) { return -1; }
    if (a > b) { return 1; }
    return 0;
  }

  results.sort((a, b) => {
    return orderBy === 'asc'
      ? comparator(a.command.toLowerCase(), b.command.toLowerCase())
      : -comparator(a.command.toLowerCase(), b.command.toLowerCase());
  });

  return results;
}

function CustomCommands(props) {
  const { classes, selectedBot, setSelectedBot, setApiAlert } = props;
  const [typeFilter, setTypeFilter] = React.useState('');
  const [sort, setSort] = React.useState('asc');
  const [moduleSearchInput, setModuleSearchInput] = React.useState('');
  const [page, setPage] = React.useState(1);

  const modulesArray = sortModules(filterModules(typeFilter, searchModules(moduleSearchInput, selectedBot.customModules, selectedBot.prefix)), sort);
  
  const modulesPerPage = 5;
  const moduleCount = modulesArray.length;
  const paginationCount = Math.ceil(moduleCount / modulesPerPage);

  React.useEffect(() => {
    // Decrement page if it's value is beyond what moduleCount can display
    // This will result in a page value of 0 if a search turns up empty
    if ((moduleCount <= (page - 1) * modulesPerPage) && page !== 0) {
      setPage(page - 1);
    }
    // Reset page to 1 after an empty search is reset
    else if (!page && moduleCount > 0) {
      setPage(1);
    }
  }, [moduleCount, page]);

  const handlePaginationChange = (event, value) => {
    setPage(value);
  };

  const toggleSort = () => {
    setSort(sort === 'asc' ? 'desc' : 'asc');
  }

  const handleModuleSearch = (value) => {
    setModuleSearchInput(value);
  }

  const returnVisibleModules = () => {
    if (selectedBot.customModules.length === 0) {
      return (
        <div className={classes.noneContainer}>
          <div className={classes.noneMessage}>No commands exist!</div>
        </div>
      );
    }

    if (moduleCount === 0) {
      return (
        <div className={classes.noneContainer}>
          <div className={classes.noneMessage}>No matching commands found!</div>
          <div className={classes.exclamationIcon}>
            <BsExclamationOctagonFill />
          </div>
        </div>
      );
    }

    return (
      modulesArray
        .slice((page - 1) * modulesPerPage, (page - 1) * modulesPerPage + modulesPerPage)
        .map((module, pos) => {
          return (
            <AssignedCommandPanel
              key={`${module.command}_${pos}`}
              prefix={selectedBot.prefix}
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
        listItems={["Max 50 custom commands"]}
        Icon={FiCommand}
        docs={[]}
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
      <GridContainer justifyContent="space-between" alignItems="flex-end">
        <GridItem xs={10} sm={10} md={8} lg={12}>
          <div className={classes.largeSpacer} />
          <div className={classes.categoryHeader}>
            Assigned Commands
          </div>
        </GridItem>
        <Hidden lgUp>
          <GridItem xs={2} sm={2} md={4} right>
            <IconButton aria-label="edit" onClick={toggleSort} >
              {sort === 'asc'
                ? <ImSortAlphaAsc className={classes.sort} />
                : <ImSortAlphaDesc className={classes.sort} />
              }
            </IconButton>
          </GridItem>
        </Hidden>
      </GridContainer>
      <GridContainer justifyContent="space-between" alignItems="center">
        <GridItem xs={12} sm={7} md={8} lg={7}>
          <div className={classes.select}>
            <SearchInput
              label="Search Commands"
              value={moduleSearchInput}
              onChange={(e) => handleModuleSearch(e.target.value)}
              handleSearch={handleModuleSearch}
            />
          </div>
        </GridItem>
        <GridItem xs={12} sm={5} md={4} lg={4}>
          <div className={classes.select}>
            <FreeSelect
              value={typeFilter}
              id="type-select"
              labelId="type-select-label"
              label="Type Filter"
              onChange={(e) => setTypeFilter(e.target.value)}
              size="small"
              items={[
                { value: "", name: "none" },
                { value: "single-response", name: "single response" },
                { value: "optioned-response", name: "optioned response" },
                { value: "random-response", name: "random response" }
              ]}
            />
          </div>
        </GridItem>
        <Hidden mdDown>
          <GridItem lg={1} right>
            <IconButton aria-label="edit" onClick={toggleSort} >
              {sort === 'asc'
                ? <ImSortAlphaAsc className={classes.sort} />
                : <ImSortAlphaDesc className={classes.sort} />
              }
            </IconButton>
          </GridItem>
        </Hidden>
      </GridContainer>
      <div className={classes.smallSpacer} />
      {returnVisibleModules()}
      {(moduleCount) > 5 &&
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
      }
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