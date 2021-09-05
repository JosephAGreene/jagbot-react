import React from 'react';
//import PropTypes from "prop-types";

// Import react-hook-form components
import { Controller } from 'react-hook-form';

// Import Mui components
import { withStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const styles = (theme) => ({
  labelRoot: {
      marginLeft: 0,
  },
  switchRoot: {
    '& .MuiSwitch-colorSecondary.Mui-checked': {
      color: theme.palette.teal.main,
      "&.Mui-checked + .MuiSwitch-track": {
        backgroundColor: theme.palette.teal.main,
      },
    },
    '&:hover .MuiSwitch-colorSecondary.Mui-checked': {
      backgroundColor: 'rgb(79, 195, 247, 0.04)',
    },
  },
  description: {
    color: theme.palette.white.dark,
    margin: "0 0 0 10px",
    fontSize: "16px",
  },
  labelRootError: {
    color: theme.palette.error.main,
    marginLeft: "15px",
  },
});

function ControlledSwitch(props) {
  const { classes, control, name, error, description, label, labelPlacement } = props;

  return (
    <React.Fragment>
      <div className={classes.description}>
        {description}
      </div>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <FormControlLabel
            className={classes.labelRoot}
            control={
              <Switch
                className={classes.switchRoot}
                onChange={(e) => field.onChange(e.target.checked)}
                checked={field.value}
              />
            }
            label={label}
            labelPlacement={labelPlacement}
          />
        )}
      />
      {error[name] ?
        <FormHelperText className={classes.labelRootError} id={`error-message-${name}`}>{error[name].message}</FormHelperText>
        : <FormHelperText> </FormHelperText>
      }
    </React.Fragment>
  );
}

// ControlledRadioGroup.propTypes = {
//   classes: PropTypes.object.isRequired,
//   control: PropTypes.object.isRequired,
//   error: PropTypes.object,
//   description: PropTypes.string.isRequired,
//   defaultValue: PropTypes.string.isRequired,
//   children: PropTypes.node.isRequired
// };

export default withStyles(styles)(ControlledSwitch);