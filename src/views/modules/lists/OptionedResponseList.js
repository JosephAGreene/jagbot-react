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

// Import custom components
import GridContainer from '../../../components/grid/GridContainer';
import GridItem from '../../../components/grid/GridItem';
import SearchInput from '../../../components/inputs/SearchInput';

// Import icons
import ExpandMore from '@material-ui/icons/ExpandMore';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { BsExclamationOctagonFill } from 'react-icons/bs';
import {ImSortAlphaAsc} from 'react-icons/im';
import {ImSortAlphaDesc} from 'react-icons/im';

const listItemStyles = makeStyles((theme) => ({
  menuRoot: {
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
  edit: {
    color: theme.palette.purple.main,
    '&:hover' :{
      color: theme.palette.purple.dark,
    }
  },
  delete: {
    color: theme.palette.error.main,
    '&:hover' :{
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
    '&:hover' :{
      color: theme.palette.white.dark,
    }
  },
  pagination: {
    '& .MuiPaginationItem-root' : {
      color: theme.palette.white.dark,
    },
    '& .Mui-selected' : {
      backgroundColor: theme.palette.gray.dark,
    },
    marginBottom: theme.spacing(6),
  },
  emptySearchContainer: {
    width: "inherit",
    height: "inherit",
    paddingTop: "40px",
    textAlign: "center",
  },
  emptySearchMessage: {
    fontSize: "18px",
    color: theme.palette.white.dark,
  },
  exclamationIcon: {
    fontSize: "180px",
    color: theme.palette.gray.dark,
  },
  optionsError: {
    marginLeft: "14px",
    color: theme.palette.error.main,
    fontSize: '0.75rem',
    marginTop: '1px',
    textAlign: 'left',
    fontFamily: "Roboto, Helvetica, Arial, sans-serif",
    fontWeight: 400,
    lineHeight: 1.66,
    letterSpacing: '0.03333em',
  },
});

function ReturnListItem (props) {
  const classes = listItemStyles();
  const [open, setOpen] = React.useState(false);
  const [deleteMenuAnchor, setDeleteMenuAnchor] = React.useState(null);
  const {deleteOption, keyword, response, openOptionedDialog} = props;

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
    deleteOption();
    closeDeleteMenu();
  }

  return (
    <React.Fragment>
      <ListItem button onClick={handleClick}>
        <ListItemIcon>
          {open ? <ExpandMore  /> : <ExpandMore className={classes.expandMore} />}
        </ListItemIcon>
        <ListItemText primary={keyword} />
        <ListItemSecondaryAction  >
          <IconButton aria-label="edit" onClick={openOptionedDialog}>
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
          <ListItem button className={classes.nested}>
            <ListItemText secondary={response} />
          </ListItem>
        </List>
      </Collapse>
    </React.Fragment>
  );
}

ReturnListItem.propTypes = {
  deleteOption: PropTypes.func.isRequired,
  keyword: PropTypes.string.isRequired,
  response: PropTypes.string.isRequired,
  openOptionedDialog: PropTypes.func.isRequired,
};

function sortOptions (optionsArray, orderBy) {
  let results = optionsArray.splice(0);

  const comparator = (a, b) => {
    if(a.keyword.toLowerCase() < b.keyword.toLowerCase()) { return -1; }
    if(a.keyword.toLowerCase() > b.keyword.toLowerCase()) { return 1; }
    return 0;
  }

  results.sort((a, b) => {
    return orderBy === 'asc' ? comparator(a, b) : -comparator(a, b);
  });

  return results;
}

function searchOptions (value, optionsArray) {
  let results = [];

  for (let i=0; i < optionsArray.length; i++) {
    if(optionsArray[i].keyword.toLowerCase().search(value.trim().toLowerCase()) > -1) {
      results.push(optionsArray[i]);
    }
  }
  return results;
}

function OptionedResponseList(props) {
  const {classes, optionsArray, setOptionsArray, error, openOptionedDialog} = props;
  const [sort, setSort] = React.useState('asc')
  const [searchValue, setSearchValue] = React.useState('');
  const [page, setPage] = React.useState(1);

  const optionsPerPage = 5;
  const optionCount = searchOptions(searchValue, optionsArray).length;
  const paginationCount = Math.ceil(optionCount / optionsPerPage);

  React.useEffect(() => {
    // Decrement page if it's value is beyond what optionCount can display
    // This will result in a page value of 0 if a search turns up empty
    if ((optionCount <= (page - 1 ) * optionsPerPage) && page !== 0) 
    {
      setPage(page - 1);
    } 
    // Reset page to 1 after an empty search is reset
    else if (!page && optionCount > 0)
    {
      setPage(1);
    }
  }, [optionCount, page]);

  const handlePaginationChange = (event, value) => {
    setPage(value);
  };

  const handleSearch = (value) => {
    setSearchValue(value);
  }

  const toggleSort = () => {
    setSort(sort === 'asc' ? 'desc' : 'asc');
  }

  const deleteOption = (optionId) => {
    let newOptionsArray = [];

    for (let i=0; i < optionsArray.length; i++) {
      if (optionsArray[i]._id !== optionId) {
        newOptionsArray.push(optionsArray[i]);
      }
    }
    setOptionsArray(newOptionsArray);
  }

  const returnVisibleOptions = () => {

    if (optionsArray.length < 1) {
      return (
        <div className={classes.optionsError} >
          {error ? error.message : null}
        </div>
      );
    }

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
      sortOptions(searchOptions(searchValue, optionsArray), sort)
        .slice((page - 1 ) * optionsPerPage, (page - 1) * optionsPerPage + optionsPerPage)
        .map((option, pos) => {
          return (
            <ReturnListItem 
              key={`${option.keyword}-${pos}`} 
              deleteOption={() => deleteOption(option._id)}
              keyword={option.keyword} 
              response={option.response}
              openOptionedDialog={() => openOptionedDialog(option)} 
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
        <GridItem xs={10} >
          <SearchInput
            value={searchValue} 
            onChange={(e) => handleSearch(e.target.value)} 
            handleSearch={handleSearch} 
          />
        </GridItem>
        <GridItem xs={2} right>
          <IconButton aria-label="edit" onClick={toggleSort} >
            {sort === 'asc' 
              ? <ImSortAlphaAsc className={classes.sort} />
              : <ImSortAlphaDesc className={classes.sort} /> 
            }
          </IconButton>
        </GridItem>
      </GridContainer>
      <List
        component="ul"
        aria-labelledby="optioned-response-list"
        className={classes.root}
      >
        {returnVisibleOptions()}
      </List>
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
    </div>
  );
}

OptionedResponseList.propTypes = {
  classes: PropTypes.object.isRequired,
  optionsArray: PropTypes.array.isRequired,
  setOptionsArray: PropTypes.func.isRequired,
  error: PropTypes.object,
  openOptionedDialog: PropTypes.func.isRequired,
};

export default withStyles(optionedResponseListStyles)(OptionedResponseList);