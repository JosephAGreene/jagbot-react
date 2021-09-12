import React from 'react';
import PropTypes from "prop-types";

// Import color picker
import { HexColorPicker } from "react-colorful";

// Import Mui components
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from '@material-ui/core/FormHelperText';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Popover from '@material-ui/core/Popover';

// Import Icons
import { FaSquare } from 'react-icons/fa';

const styles = (theme) => ({
  textFieldRoot: {
    '& .MuiIconButton-root': {
      padding: '0',
    },
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
  },
  labelRootError: {
    color: theme.palette.error.main
  },
  formControl: {
    paddingBottom: "5px",
    margin: "5px 0 0 0",
    position: "relative",
    verticalAlign: "unset",
  },
  description: {
    color: theme.palette.white.dark,
    margin: "0 0 10px 0",
    fontSize: "16px",
  },
  popover: {
    '& .MuiPopover-paper': {
      overflow: "unset",
      width: "unset",
      height: "unset",
    },
  },
  startAdornment: {
    marginRight: theme.spacing(1),
  },
  palette: {
    width: theme.spacing(5),
    height: theme.spacing(5),
  }
});

function ColorInput(props) {
  const {
    formControlProps,
    labelText,
    description,
    id,
    name,
    setValue,
    watchColor,
    trigger,
    inputProps,
    error,
    classes
  } = props;

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // trigger validation on color picker close
  // this is required because onBlur validation for
  // the input isn't activated when using a popover menu
  // to force a value into the input
  const handleClose = async () => {
    setAnchorEl(null);
    await trigger(name, { shouldFocus: true });
  };

  const handleColorChange = (color) => {
    setValue(name, color);
  }

  return (
    <>
      <FormControl
        {...formControlProps}
        className={classes.formControl}
        variant="outlined"
      >
        <div className={classes.description}>
          {description}
        </div>
        <TextField
          className={classes.textFieldRoot}
          id={id}
          name={name}
          inputProps={{ ...inputProps }}
          label={labelText}
          error={error[name] ? true : false}
          variant="outlined"
          InputProps={{
            startAdornment:
              <IconButton aria-label="color" className={classes.startAdornment} onClick={handleClick} >
                <FaSquare className={classes.palette} style={{ color: watchColor }} />
              </IconButton>
          }}
        />
        {error[name] ?
          <FormHelperText className={classes.labelRootError} id={`error-message-${name}`}>{error[name].message}</FormHelperText>
          : <FormHelperText> </FormHelperText>
        }
      </FormControl>
      <Popover
        className={classes.popover}
        id={Boolean(anchorEl) ? 'simple-popover' : undefined}
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <HexColorPicker color={watchColor} onChange={handleColorChange} />
      </Popover>
    </>
  )
};

ColorInput.propTypes = {
  classes: PropTypes.object.isRequired,
  formControlProps: PropTypes.object,
  labelText: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
  watchColor: PropTypes.string.isRequired,
  trigger: PropTypes.func.isRequired,
  inputProps: PropTypes.object,
  error: PropTypes.object.isRequired,
};

export default withStyles(styles)(ColorInput);