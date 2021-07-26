import React from 'react';

// Import Mui components
import { withStyles } from '@material-ui/core/styles';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";

const TealRadio =  withStyles((theme) =>({
  root: {
    color: theme.palette.teal.dark,
    '&$checked': {
      color: theme.palette.teal.main,
    },
  },
  checked: {},
}))((props) => <Radio color="default" {...props} />);

function ControlledRadio (props) {
  const {value, label} = props;

  return (
    <FormControlLabel
      value={value}
      control={<TealRadio />}
      label={label}
    />
  );
}

export default ControlledRadio;