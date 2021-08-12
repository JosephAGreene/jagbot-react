import React from 'react';
import PropTypes from "prop-types";

// Import Mui components
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';

// Import icons
import SearchIcon from '@material-ui/icons/Search';
import CancelIcon from '@material-ui/icons/Cancel';

const styles = (theme) => ({
  inputRoot: {
    '& .MuiOutlinedInput-root': {
      borderRadius: 0,
      backgroundColor: theme.palette.gray.dark,
      color: theme.palette.white.dark,
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: theme.palette.gray.main,
      },
      '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.gray.main,
      },
      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: theme.palette.gray.main,
      },
    },
  },
  cancelIcon: {
    cursor: "pointer",
  },
});

function EmojiSearchInput (props) {
  const {classes, id, searchInput, onChange, handleSearchClear} = props;

  return (
    <TextField 
      id={id} 
      variant="outlined"
      className={classes.inputRoot}
      size="small"
      value={searchInput}
      onChange={onChange}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            {!searchInput ? <SearchIcon /> : <CancelIcon className={classes.cancelIcon} onClick={handleSearchClear} />}
          </InputAdornment>
        ),
      }} 
      inputProps={{autoComplete: "off"}}
    />
  );
}
EmojiSearchInput.propTypes = {
  classes: PropTypes.object.isRequired,
  id: PropTypes.string,
  searchInput: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  handleSearchClear: PropTypes.func.isRequired,
};

export default withStyles(styles)(EmojiSearchInput);