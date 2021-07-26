import React from 'react';

// Import react-hook-form components
import { Controller } from 'react-hook-form';

// Import Mui components
import { withStyles } from '@material-ui/core/styles';
import RadioGroup from "@material-ui/core/RadioGroup";

const styles = (theme) => ({
  description: {
    color: theme.palette.white.dark,
    margin: "0 0 0 10px",
    fontSize: "16px",
  },
  spacer: {
    marginBottom: "15px",
  }
});

function ControlledRadioGroup (props) {
  const {classes, control, name, description, defaultValue, children} = props;

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
      <div className={classes.spacer}/>
    </React.Fragment>

  );
}

export default withStyles(styles)(ControlledRadioGroup);