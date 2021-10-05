import React from 'react';
import PropTypes from "prop-types";

// Import Mui components
import { makeStyles, withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Pagination from '@material-ui/lab/Pagination';
import Hidden from '@material-ui/core/Hidden';

// Import custom views
import EmbedPreviewPanel from '../../panels/EmbedPreviewPanel';

// Import custom components
import GridContainer from '../../../components/grid/GridContainer';
import GridItem from '../../../components/grid/GridItem';
import SearchInput from '../../../components/inputs/SearchInput';
import Button from '../../../components/buttons/Button';

// Import icons
import ExpandMore from '@material-ui/icons/ExpandMore';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { BsExclamationOctagonFill } from 'react-icons/bs';
import { ImSortAlphaAsc } from 'react-icons/im';
import { ImSortAlphaDesc } from 'react-icons/im';
import { BiMessageAdd } from 'react-icons/bi';

const listItemStyles = makeStyles((theme) => ({
  menuRoot: {
    '& .MuiPaper-root': {
      backgroundColor: theme.palette.gray.dark,
      borderRadius: 2,
    },
    '& .MuiButtonBase-root': {
      color: theme.palette.white.dark,
      '&:hover': {
        backgroundColor: theme.palette.gray.light,
      },

    },
  },
  edit: {
    color: theme.palette.purple.main,
    '&:hover': {
      color: theme.palette.purple.dark,
    }
  },
  delete: {
    color: theme.palette.error.main,
    '&:hover': {
      color: theme.palette.error.dark,
    },
  },
  buttonSpacer: {
    marginLeft: theme.spacing(2),
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  expandMore: {
    transform: 'rotate(-90deg)',
  },
}));

const optionedResponseListStyles = (theme) => ({
  root: {
    width: '100%',
    backgroundColor: "inherit",
    '& .MuiListItemText-root': {
      color: theme.palette.white.main,
    },
    '& .MuiTypography-colorTextSecondary': {
      color: theme.palette.white.dark,
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
    marginBottom: theme.spacing(6),
  },
  smallSpacer: {
    height: theme.spacing(1),
    width: "100%",
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
  optionsError: {
    width: "inherit",
    color: theme.palette.error.main,
    fontSize: '0.75rem',
    marginTop: theme.spacing(1),
    textAlign: 'center',
    fontFamily: "Roboto, Helvetica, Arial, sans-serif",
    fontWeight: 400,
  },
});

function returnResponseSlice(response) {
  if (response.length <= 13) {
    return response;
  } else {
    return `${response.slice(0, 13)}...`;
  }
}

function ReturnListItem(props) {
  const classes = listItemStyles();
  const [open, setOpen] = React.useState(false);
  const [deleteMenuAnchor, setDeleteMenuAnchor] = React.useState(null);
  const { deleteResponse, response, openResponseDialog } = props;

  const embedObject = {
    title: response.embedTitle,
    linkURL: response.embedLinkURL,
    color: response.embedColor,
    thumbnailURL: response.embedThumbnailURL,
    mainImageURL: response.embedMainImageURL,
    description: response.embedDescription,
    fields: response.embedFields,
    footer: response.embedFooter,
    footerThumbnailURL: response.embedFooterThumbnailURL,
  }

  const handleClick = () => {
    setOpen(!open);
  };

  const handleDeleteClick = (event) => {
    setDeleteMenuAnchor(event.currentTarget);
  };

  const closeDeleteMenu = () => {
    setDeleteMenuAnchor(null);
  }

  const handleDeleteConfirm = () => {
    deleteResponse();
    closeDeleteMenu();
  }

  return (
    <React.Fragment>
      <ListItem button onClick={handleClick}>
        <ListItemIcon>
          {open ? <ExpandMore /> : <ExpandMore className={classes.expandMore} />}
        </ListItemIcon>
        {response.responseType === "basic"
          ? <ListItemText primary={returnResponseSlice(response.response)} />
          : <ListItemText primary={returnResponseSlice(response.embedTitle)} />
        }

        <ListItemSecondaryAction  >
          <IconButton aria-label="edit" onClick={openResponseDialog}>
            <EditIcon className={classes.edit} />
          </IconButton>
          <IconButton className={classes.buttonSpacer} aria-label="delete" onClick={handleDeleteClick} >
            <DeleteIcon className={classes.delete} />
          </IconButton>
          <Menu
            id="delete-menu"
            anchorEl={deleteMenuAnchor}
            open={Boolean(deleteMenuAnchor)}
            onClose={closeDeleteMenu}
            className={classes.menuRoot}
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
            <MenuItem onClick={handleDeleteConfirm}>
              Confirm
            </MenuItem>
            <MenuItem onClick={closeDeleteMenu}>
              Cancel
            </MenuItem>
          </Menu>
        </ListItemSecondaryAction>
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem className={classes.nested}>
            {response.responseType === "basic"
              ? <ListItemText secondary={response.response} />
              : <EmbedPreviewPanel embedObject={embedObject} />
            }
          </ListItem>
        </List>
      </Collapse>
    </React.Fragment>
  );
}

ReturnListItem.propTypes = {
  deleteResponse: PropTypes.func.isRequired,
  response: PropTypes.object.isRequired,
  openResponseDialog: PropTypes.func.isRequired,
};

function sortResponses(responsesArray, orderBy) {
  let results = responsesArray.splice(0);

  const comparator = (a, b) => {
    if (a.response.toLowerCase() < b.response.toLowerCase()) { return -1; }
    if (a.response.toLowerCase() > b.response.toLowerCase()) { return 1; }
    return 0;
  }

  results.sort((a, b) => {
    return orderBy === 'asc' ? comparator(a, b) : -comparator(a, b);
  });

  return results;
}

function searchResponses(value, responsesArray) {
  let results = [];

  for (let i = 0; i < responsesArray.length; i++) {
    if (responsesArray[i].response.toLowerCase().search(value.trim().toLowerCase()) > -1) {
      results.push(responsesArray[i]);
    }
  }
  return results;
}

function RandomResponseList(props) {
  const { classes, responsesArray, setResponsesArray, error, openResponseDialog } = props;
  const [sort, setSort] = React.useState('asc')
  const [searchValue, setSearchValue] = React.useState('');
  const [page, setPage] = React.useState(1);

  const responsesPerPage = 5;
  const searchedResponses = sortResponses(searchResponses(searchValue, responsesArray), sort);
  const responseCount = searchedResponses.length;
  const paginationCount = Math.ceil(responseCount / responsesPerPage);

  React.useEffect(() => {
    // Decrement page if it's value is beyond what optionCount can display
    // This will result in a page value of 0 if a search turns up empty
    if ((responseCount <= (page - 1) * responsesPerPage) && page !== 0) {
      setPage(page - 1);
    }
    // Reset page to 1 after an empty search is reset
    else if (!page && responseCount > 0) {
      setPage(1);
    }
  }, [responseCount, page]);

  const handlePaginationChange = (event, value) => {
    setPage(value);
  };

  const handleSearch = (value) => {
    setSearchValue(value);
  }

  const toggleSort = () => {
    setSort(sort === 'asc' ? 'desc' : 'asc');
  }

  const deleteResponse = (responseId) => {
    let newResponsesArray = [];

    for (let i = 0; i < responsesArray.length; i++) {
      if (responsesArray[i]._id !== responseId) {
        newResponsesArray.push(responsesArray[i]);
      }
    }
    setResponsesArray(newResponsesArray);
  }

  const returnVisibleResponses = () => {

    if (responsesArray.length < 1) {
      return (
        <div className={classes.noneContainer}>
          <div className={classes.noneMessage}>No responses exist!</div>
          <div className={classes.optionsError} >
            {error ? error.message : null}
          </div>
        </div>
      );
    }

    if (responseCount === 0) {
      return (
        <div className={classes.noneContainer}>
          <div className={classes.noneMessage}>No matching responses found!</div>
          <div className={classes.exclamationIcon}>
            <BsExclamationOctagonFill />
          </div>
        </div>
      );
    }

    return (
      searchedResponses
        .slice((page - 1) * responsesPerPage, (page - 1) * responsesPerPage + responsesPerPage)
        .map((response, pos) => {
          return (
            <ReturnListItem
              key={`${Date.now()}-${pos}`}
              deleteResponse={() => deleteResponse(response._id)}
              response={response}
              openResponseDialog={() => openResponseDialog(response)}
            />
          );
        })
    );
  }

  return (
    <div>
      <GridContainer
        justifyContent="space-between"
        alignItems="center"
      >
        <GridItem xs={9} sm={8} md={10} lg={3}>
          <Button
            color="orange"
            startIcon={<BiMessageAdd />}
            onClick={() => openResponseDialog(false)}
          >
            Potential Response
          </Button>
        </GridItem>
        <Hidden mdDown>
          <GridItem lg={8}>
            <SearchInput
              label="Search Responses"
              value={searchValue}
              onChange={(e) => handleSearch(e.target.value)}
              handleSearch={handleSearch}
            />
          </GridItem>
        </Hidden>
        <GridItem xs={3} sm={4} md={2} lg={1} right>
          <IconButton aria-label="edit" onClick={toggleSort} >
            {sort === 'asc'
              ? <ImSortAlphaAsc className={classes.sort} />
              : <ImSortAlphaDesc className={classes.sort} />
            }
          </IconButton>
        </GridItem>
        <Hidden lgUp>
          <div className={classes.smallSpacer} />
          <GridItem xs={12}>
            <SearchInput
              label="Search Responses"
              value={searchValue}
              onChange={(e) => handleSearch(e.target.value)}
              handleSearch={handleSearch}
            />
          </GridItem>
        </Hidden>
      </GridContainer>
      <List
        component="ul"
        aria-labelledby="optioned-response-list"
        className={classes.root}
      >
        {returnVisibleResponses()}
      </List>
      {(responseCount) > 5 &&
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
    </div>
  );
}

RandomResponseList.propTypes = {
  classes: PropTypes.object.isRequired,
  responsesArray: PropTypes.array.isRequired,
  setResponsesArray: PropTypes.func.isRequired,
  error: PropTypes.object,
  openResponseDialog: PropTypes.func.isRequired,
};

export default withStyles(optionedResponseListStyles)(RandomResponseList);