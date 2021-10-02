import React from 'react';
import PropTypes from "prop-types";

// Import Mui components
import {withStyles} from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core//MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core//Select';

const styles = (theme) => ({
  textFieldRoot: {
    width: "100%",
    margin: "5px 0 5px 0",
    position: "relative",
    verticalAlign: "unset",
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
    '& .MuiPopover-paper': {
      color: theme.palette.white.dark,
      backgroundColor: theme.palette.gray.dark,
    },
    '& .MuiListItem-root':{
      '&:hover': {
        color: theme.palette.white.main,
        backgroundColor: theme.palette.gray.light,
      }
    },
    '& .MuiSelect-icon': {
      color: theme.palette.white.main,
    }
  },
});

function FreeSelect(props) {
  const {classes, value, id, labelId, label, onChange, size, items} = props;

  return (
    <FormControl variant="outlined" size={size} className={classes.textFieldRoot}>
      <InputLabel id={labelId}>{label}</InputLabel>
      <Select
        defaultValue=""
        value={value}
        labelId={labelId}
        id={id}
        label={label}
        onChange={onChange}
        MenuProps={{disablePortal: true}}
      >
        {items.map((item, pos) => {
          return (
            <MenuItem key={`${item.value}-${pos}`} value={item.value}>
              {item.name}
            </MenuItem>
          )
        })}
      </Select>
    </FormControl>
  );
}

FreeSelect.propTypes = {
  classes: PropTypes.object.isRequired,
  value: PropTypes.string.isRequired,
  id: PropTypes.string,
  labelId: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  size: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
};

export default withStyles(styles)(FreeSelect);