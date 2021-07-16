import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import { useForm } from 'react-hook-form';
import OutlinedInput from '../components/inputs/OutlinedInputDark';

const styles = (theme) => ({
  paper: {
    maxWidth: 1200,
    margin: 'auto',
    overflow: 'hidden',
    background: theme.palette.gray.light,
    boxShadow: "none",
  },
  contentWrapper: {
    margin: '40px 16px',
    color: '#fff'
  },
});

function CreateBot(props) {
  const { classes } = props;
  const { register, handleSubmit, formState:{ errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  }

  return (
    <Paper className={classes.paper}>
      <div className={classes.contentWrapper}>
        <form autoComplete="off" onSubmit={handleSubmit(onSubmit)} >
          <OutlinedInput
            labelText="E-Mail"
            id="email"
            name="email"
            formControlProps={{fullWidth: true}}
            inputProps={{...register("email")}}
            error={errors}
          />
        </form>
      </div>
    </Paper>
  );
}

CreateBot.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CreateBot);