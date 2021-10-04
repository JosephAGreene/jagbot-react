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
    '& .MuiFormLabel-root': {
      color: theme.palette.white.dark,
    },
    '& label.Mui-focused': {
      color: theme.palette.white.main,
    },
    '& label.Mui-error': {
      color: theme.palette.error.main,
    },
    '& .MuiOutlinedInput-root': {
      backgroundColor: theme.palette.gray.main,
      color: theme.palette.white.main,
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: theme.palette.teal.dark,
      },
      '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.teal.light,
      },
      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: theme.palette.teal.main
      },
      "&.Mui-error .MuiOutlinedInput-notchedOutline": {
        borderColor: theme.palette.error.main
      }
    },
    minWidth: "200px",
  },
  cancelIcon: {
    cursor: "pointer",
  },
});

function SearchInput (props) {
  const {classes, id, label, value, onChange, handleSearch} = props;

  return (
    <TextField 
      id={id}
      label={label}
      variant="outlined"
      fullWidth={true}
      className={classes.inputRoot}
      size="small"
      value={value}
      onChange={onChange}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            {!value ? <SearchIcon /> : <CancelIcon className={classes.cancelIcon} onClick={() => handleSearch('')} />}
          </InputAdornment>
        ),
      }} 
      inputProps={{autoComplete: "off"}}
    />
  );
}

SearchInput.propTypes = {
  classes: PropTypes.object.isRequired,
  id: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired,
  value: PropTypes.string,
};

export default withStyles(styles)(SearchInput);