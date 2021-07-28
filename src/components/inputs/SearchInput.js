import React from 'react';
import PropTypes from "prop-types";

// Import Mui components
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';

// Import icons
import SearchIcon from '@material-ui/icons/Search';

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
});

function SearchInput (props) {
  const {classes, id, onChange} = props;

  return (
    <TextField 
      id={id} 
      variant="outlined"
      className={classes.inputRoot}
      size="small"
      onChange={onChange}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <SearchIcon />
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
  onChange: PropTypes.func,
};

export default withStyles(styles)(SearchInput);