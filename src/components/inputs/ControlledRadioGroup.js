import React from 'react';
import PropTypes from "prop-types";

// Import react-hook-form components
import { Controller } from 'react-hook-form';

// Import Mui components
import { withStyles } from '@material-ui/core/styles';
import RadioGroup from "@material-ui/core/RadioGroup";
import FormHelperText from '@material-ui/core/FormHelperText';

const styles = (theme) => ({
  labelRootError: {
    color: theme.palette.error.main,
    marginLeft: "15px",
  },
  description: {
    color: theme.palette.white.dark,
    margin: "0 0 0 0",
    fontSize: "16px",
  },
});

function ControlledRadioGroup (props) {
  const {classes, 
         control, 
         name,
         error, 
         description, 
         defaultValue, 
         children} = props;

  return (
    <React.Fragment>
      <div className={classes.description}>
        {description}
      </div>
      <Controller
        control={control}
        name={name}
        defaultValue={defaultValue}
        render={({ field }) => (
          <RadioGroup
            {...field}
            row
          >
            {children}
          </RadioGroup>
        )}
      />
      {error[name] ? 
        <FormHelperText className={classes.labelRootError} id={`error-message-${name}`}>{error[name].message}</FormHelperText>
        : <FormHelperText> </FormHelperText> 
      }
    </React.Fragment>
  );
}

ControlledRadioGroup.propTypes = {
  classes: PropTypes.object.isRequired,
  control: PropTypes.object.isRequired,
  error: PropTypes.object,
  description: PropTypes.string.isRequired,
  defaultValue: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};

export default withStyles(styles)(ControlledRadioGroup);