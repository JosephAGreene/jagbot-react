import React from 'react';

// Import MUI components
import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles((theme) => ({
  mainHeading: {
    fontSize: 28,
    color: theme.palette.white.main,
    borderBottom: `1px solid ${theme.palette.white.dark}`,
    marginBottom: theme.spacing(3),
  },
  textContent: {
    color: theme.palette.white.dark,
  }
}));

export function SingleResponseDoc() {
  const classes = styles();

  return (
    <div>
      <div className={classes.mainHeading}>Custom Command: Single Response</div>
      <div className={classes.textContent}>
        A single response custom command allows your bot to return a single response of your choosing 
        when a user enters the bots prefix combined with the command trigger word in chat.
      </div>
    </div>
  );
}

export function OptionedResponseDoc() {

  return (
    <div>Double</div>
  );
}

export function RandomResponseDoc() {
  return (
    <div>Random</div>
  );
}

export function CustomCommands() {
return (
  <div>CustomCommands</div>
)
}

export default function OverView() {
  const classes = styles();
  return (
    <div>
      <div className={classes.mainHeading}>Custom Commands</div>
      <div>Custom commands allow you to </div>

    </div>
  );
}