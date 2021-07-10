import React from 'react';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '../components/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import OutlinedInput from '../components/inputs/OutlinedInput';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
        <Typography component="h1" variant="h5">
            Sign in
        </Typography>
        <form className={classes.form} noValidate>
            <OutlinedInput
            labelText="E-Mail"
            id="email"
            formControlProps={{fullWidth: true}}
            name="email"
            //refObject={register}
            error={false}
            />
            <OutlinedInput
            labelText="Password"
            id="password"
            type="password"
            formControlProps={{fullWidth: true}}
            name="email"
            //refObject={register}
            error={false}
            />
            <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
            >
            Sign In
            </Button>
            <Grid container>
            <Grid item xs>
                <Link href="#" variant="body2">
                Forgot password?
                </Link>
            </Grid>
            <Grid item>
                <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
                </Link>
            </Grid>
            </Grid>
        </form>
        </div>
    </Container>
  );
}