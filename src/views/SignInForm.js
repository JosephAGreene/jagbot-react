import React from 'react';
import { Redirect } from 'react-router-dom';

// Import react-hook-form
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';

// Import API services
import AuthService from "../services/AuthService.js";

// Import MUI components
//import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

// Import custom components
import Typography from '../components/Typography';
import OutlinedInput from '../components/inputs/OutlinedInputLight';
import Alert from '../components/alerts/alert';
import Button from '../components/buttons/Button';

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

const schema = Joi.object({
    password: Joi.string()
      .empty()
      .required()
      .messages({
        "string.base": `"Password" should be a type of 'text'`,
        "string.empty": `"Password" is required`,
        "any.required": `"Password" is required`,
      }),
    email: Joi.string().required().email({tlds: {allow: false }})
      .messages({
        "string.empty": `"Email" is required`,
        "any.required": `"Email" is required`,
        "string.email": `"Email" must be a valid e-mail`,
      })
  });

export default function SignIn() {
    const user = AuthService.getCurrentUser();
    const [isLoggedIn, setIsLoggedIn] = React.useState((user ? true : false));
    const { register, handleSubmit, setError, formState:{ errors } } = useForm({resolver: joiResolver(schema)});
    const [ failureOpen, setFailureOpen ] = React.useState(false);
    
    const classes = useStyles();

    if (isLoggedIn) {
      return <Redirect to="/dashboard" />;
    }

    const onSubmit = (data) => {
        AuthService.login(data.email, data.password)
          .then( (res) => {
            if(res.status === 200) {
              setIsLoggedIn(true);
            } 
            else if(res.status === 400) {
              setError("email", {
                type: "manual",
                message: "Invalid Email and/or Passowrd"
              });
              setError("password", {
                type: "manual",
                message: "Invalid Email and/or Password"
              });
            } 
            else {
              setFailureOpen(true);
            }
          });
    }

    const failureClose= () => {
      setFailureOpen(false);
    }

    return (
      <Container component="main" maxWidth="xs">
          <div className={classes.paper}>
          <Typography component="h1" variant="h5">
              Sign in
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)} >
              <OutlinedInput
                labelText="E-Mail"
                id="email"
                name="email"
                formControlProps={{fullWidth: true}}
                inputProps={{...register("email")}}
                error={errors}
              />
              <OutlinedInput
                labelText="Password"
                id="password"
                name="password"
                type="password"
                formControlProps={{fullWidth: true}}
                inputProps={{...register("password")}}
                error={errors}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="teal"
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
        <Alert open={failureOpen} autoHideDuration={4000} onClose={failureClose} severity='error'>
          Server busy or offline, try again later!
        </Alert>
      </Container>
    );
}