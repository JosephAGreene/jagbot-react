import React from 'react';
import PropTypes from "prop-types";

// Import react-hook-form components
import { Controller } from 'react-hook-form';

// Import Mui components
import { withStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const styles = (theme) => ({
  labelRootError: {
    color: theme.palette.error.main,
    marginLeft: "15px",
  },
});

const CustomCheckbox =  withStyles((theme) =>({
  root: {
    color: theme.palette.teal.dark,
    '&$checked': {
      color: theme.palette.teal.main,
    },
  },
  checked: {},
}))((props) => <Checkbox color="default" {...props} />);

function ControlledCheckbox(props) {
  const { classes, control, name, error, label, labelPlacement, removeHelper } = props;

  return (
    <React.Fragment>
      <Controller
        name={name}
        control={control}
        defaultValue={false}
        render={({ field }) => (
          <>
          <FormControlLabel
            control={
              <CustomCheckbox
                onChange={(e) => field.onChange(e.target.checked)}
                checked={field.value}
              />
            }
            label={label}
            labelPlacement={labelPlacement ? labelPlacement : "end"}
          />
          </>
        )}
      />
      {error[name] ?
        <FormHelperText className={classes.labelRootError} id={`error-message-${name}`}>{error[name].message}</FormHelperText>
        : !removeHelper
          ? <FormHelperText> </FormHelperText>
          : null
      }
    </React.Fragment>
  );
}

ControlledCheckbox.propTypes = {
  classes: PropTypes.object.isRequired,
  control: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  error: PropTypes.object,
  label: PropTypes.string,
  labelPlacement: PropTypes.string,
  removeHelper: PropTypes.bool,
};

export default withStyles(styles)(ControlledCheckbox);