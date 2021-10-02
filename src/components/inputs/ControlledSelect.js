import React from "react";
import PropTypes from "prop-types";

// Import react-hook-form components
import { Controller } from 'react-hook-form';

// Import Mui components
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core//MenuItem';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
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
    '& .MuiListItem-root': {
      '&:hover': {
        color: theme.palette.white.main,
        backgroundColor: theme.palette.gray.light,
      }
    },
    '& .MuiSelect-icon': {
      color: theme.palette.white.main,
    }
  },
  description: {
    color: theme.palette.white.dark,
    margin: "0 0 5px 0",
    fontSize: "16px",
  },
  labelRootError: {
    color: theme.palette.error.main
  },
});

function ControlledSelect(props) {
  const {
    classes,
    control,
    name,
    description,
    id,
    label,
    labelId,
    size,
    defaultValue,
    items, 
    error,
  } = props;

  return (
    <Controller
      name={name}
      id={id}
      labelId={labelId}
      defaultValue={defaultValue}
      control={control}
      render={({ field }) => (
        <>
          <div className={classes.description}>
            {description}
          </div>
          <FormControl variant="outlined" size={size} className={classes.textFieldRoot}>
            <InputLabel id={labelId}>{label}</InputLabel>
            <Select
              {...field}
              label={label}
              MenuProps={{ disablePortal: true }}
            >
              {items.map((item, pos) => {
                return (
                  <MenuItem key={`${item.value}-${pos}`} value={item.value}>
                    {item.name}
                  </MenuItem>
                )
              })}
            </Select>
            {error[name] ?
              <FormHelperText className={classes.labelRootError} id={`error-message-${name}`}>{error[name].message}</FormHelperText>
              : <FormHelperText> </FormHelperText>
            }
          </FormControl>
        </>
      )}
    />
  );
}

ControlledSelect.propTypes = {
  classes: PropTypes.object.isRequired,
  control: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
  id: PropTypes.string,
  labelId: PropTypes.string,
  label: PropTypes.string,
  size: PropTypes.string,
  defaultValue: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  error: PropTypes.object,
};

export default withStyles(styles)(ControlledSelect);