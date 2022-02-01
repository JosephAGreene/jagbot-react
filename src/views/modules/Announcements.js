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
import AnnouncementPanel from '../panels/AnnouncementPanel';
import Button from '../../components/buttons/Button';
import FreeSelect from '../../components/inputs/FreeSelect';
import AnnouncementDialog from './dialogs/AnnouncementDialog';
import GridContainer from '../../components/grid/GridContainer';
import GridItem from '../../components/grid/GridItem';

// Import Images
import announcementsImage from '../../assets/images/announcements.png';

// Import Icons
import { BsExclamationOctagonFill } from 'react-icons/bs';
import { ImBullhorn, ImSortAlphaAsc, ImSortAlphaDesc } from "react-icons/im";

const styles = (theme) => ({
  largeSpacer: {
    marginTop: theme.spacing(6),
  },
  smallSpacer: {
    marginTop: theme.spacing(2),
  },
  select: {
    [theme.breakpoints.down('md')]: {
      marginTop: theme.spacing(1),
    },
  },
  sort: {
    color: theme.palette.white.main,
    '&:hover': {
      color: theme.palette.white.dark,
    }
  },
  pagination: {
    '& .MuiPaginationItem-root': {
      color: theme.palette.white.dark,
    },
    '& .Mui-selected': {
      backgroundColor: theme.palette.gray.dark,
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

function returnServerList(announcements) {
  const serverArray = [];
  // Isolate server information from announcements
  announcements.forEach((announcement) => {
    serverArray.push({
      value: announcement.responseChannel.serverId,
      name: announcement.responseChannel.serverName
    }
    )
  });
  // Sort server information based on server name
  serverArray.sort((a, b) => {
    if (a.name.toLowerCase() < b.name.toLowerCase()) { return -1; }
    if (a.name.toLowerCase() > b.name.toLowerCase()) { return 1; }
    return 0;
  });
  // Remove duplicates based on server id
  const serverList = serverArray.filter((server, index, array) => {
    return index === 0 || server.value !== array[index - 1].value;
  });

  // Add "none" option to list
  serverList.unshift({ value: "", name: "none" })

  return serverList;
}

function sortAnnouncements(announcementsArray, orderBy) {
  let results = [...announcementsArray]

  const comparator = (a, b) => {
    if (a < b) { return -1; }
    if (a > b) { return 1; }
    return 0;
  }

  results.sort((a, b) => {
    return orderBy === 'asc'
      ? comparator(a.responseChannel.serverName.toLowerCase(), b.responseChannel.serverName.toLowerCase())
      : -comparator(a.responseChannel.serverName.toLowerCase(), b.responseChannel.serverName.toLowerCase());
  });

  return results;
}

function filterServer(announcementsArray, serverId) {
  if (!serverId) return announcementsArray;

  let results = [];

  announcementsArray.forEach((announcement) => {
    if (announcement.responseChannel.serverId === serverId) {
      results.push(announcement);
    }
  });

  return results;
}

function filterTypes(announcementsArray, type) {
  if (!type) return announcementsArray;

  let results = [];

  announcementsArray.forEach((announcement) => {
    if (announcement.type === type) {
      results.push(announcement);
    }
  });

  return results;
}


function Announcements(props) {
  const { classes, selectedBot, setSelectedBot, setApiAlert } = props;
  const [announcementDialog, setAnnouncementDialog] = React.useState(false);
  const [module, setModule] = React.useState(null);
  const [sort, setSort] = React.useState('asc');
  const [serverFilter, setServerFilter] = React.useState("");
  const [typeFilter, setTypeFilter] = React.useState("");
  const [page, setPage] = React.useState(1);

  const announcementsArray = sortAnnouncements(filterServer(filterTypes(selectedBot.announcementModules, typeFilter), serverFilter), sort);

  const modulesPerPage = 5;
  const moduleCount = announcementsArray.length;
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

  const onServerChange = (event) => {
    setServerFilter(event.target.value);
  }

  const onTypeChange = (event) => {
    setTypeFilter(event.target.value);
  }

  const editModule = (module) => {
    setModule(module);
    setAnnouncementDialog(true);
  }

  const closeAnnouncementDialog = () => {
    setAnnouncementDialog(false);
    setModule(null);
  }

  const returnAnnouncements = () => {
    if (selectedBot.announcementModules.length === 0) {
      return (
        <div className={classes.noneContainer}>
          <div className={classes.noneMessage}>No announcements exist!</div>
        </div>
      );
    }

    if (announcementsArray.length === 0) {
      return (
        <div className={classes.noneContainer}>
          <div className={classes.noneMessage}>No matching announcements found!</div>
          <div className={classes.exclamationIcon}>
            <BsExclamationOctagonFill />
          </div>
        </div>
      );
    }

    return (
      announcementsArray
        .slice((page - 1) * modulesPerPage, (page - 1) * modulesPerPage + modulesPerPage)
        .map((module, pos) => {
          return (
            <AnnouncementPanel
              key={`${module.command}_${pos}`}
              module={module}
              editModule={() => editModule(module)}
              botId={selectedBot._id}
              setSelectedBot={setSelectedBot}
              setApiAlert={setApiAlert}
            />
          )
        })
    )
  }

  return (
    <ContentWrapper>
      <TitlePanel
        title="Announcements"
        description="Make an announcement when a member joins, leaves, gets kicked, or gets banned from your server."
        listItems={["One announcement type per server"]}
        image={announcementsImage}
        docs={[]}
      />
      <div className={classes.smallSpacer} />
      <GridContainer
        justifyContent="space-between"
        alignItems="center"
      >
        <GridItem sm={11} md={11} lg={3}>
          <Button
            color="orange"
            startIcon={<ImBullhorn />}
            onClick={() => setAnnouncementDialog(true)}
          >
            Add Announcement
          </Button>
        </GridItem>
        <Hidden lgUp>
          <GridItem sm={1} md={1} lg={1} right>
            <IconButton aria-label="edit" onClick={toggleSort} >
              {sort === 'asc'
                ? <ImSortAlphaAsc className={classes.sort} />
                : <ImSortAlphaDesc className={classes.sort} />
              }
            </IconButton>
          </GridItem>
        </Hidden>
        <GridItem xs={12} sm={6} md={6} lg={4}>
          <div className={classes.select}>
            <FreeSelect
              value={serverFilter}
              id="server-select"
              labelId="server-select-label"
              label="Server Filter"
              onChange={onServerChange}
              size="small"
              items={returnServerList(selectedBot.announcementModules)}
            />
          </div>
        </GridItem>
        <GridItem xs={12} sm={6} md={6} lg={4}>
          <div className={classes.select}>
            <FreeSelect
              value={typeFilter}
              id="type-select"
              labelId="type-select-label"
              label="Type Filter"
              onChange={onTypeChange}
              size="small"
              items={[
                { value: "", name: "none" },
                { value: "join", name: "join" },
                { value: "leave", name: "leave" },
                { value: "kicked", name: "kicked" },
                { value: "banned", name: "banned" }
              ]}
            />
          </div>
        </GridItem>
        <Hidden mdDown>
          <GridItem sm={1} md={1} lg={1} right>
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
      {returnAnnouncements()}
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
      <AnnouncementDialog
        announcementDialog={announcementDialog}
        closeAnnouncementDialog={closeAnnouncementDialog}
        module={module}
        selectedBot={selectedBot}
        setSelectedBot={setSelectedBot}
        setApiAlert={setApiAlert}
      />
    </ContentWrapper>
  );
}

Announcements.propTypes = {
  classes: PropTypes.object.isRequired,
  selectedBot: PropTypes.object.isRequired,
  setSelectedBot: PropTypes.func.isRequired,
  setApiAlert: PropTypes.func.isRequired,
};

export default withStyles(styles)(Announcements);