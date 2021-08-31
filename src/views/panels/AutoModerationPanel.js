import React from 'react';
import { Link } from 'react-router-dom';
//import PropTypes from "prop-types";

// Import MUI components
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

// Import custom components
import GridContainer from '../../components/grid/GridContainer';
import GridItem from '../../components/grid/GridItem';
import Button from '../../components/buttons/Button';

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: "20px",
    marginBottom: theme.spacing(3),
    backgroundColor: theme.palette.gray.main,
    overflow: "hidden",
    color: theme.palette.white.main,
  },
  avatar: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    backgroundColor: 'inherit',
  },
  description: {
    color: theme.palette.white.dark,
  },
  spacer: {
    marginBottom: theme.spacing(3),
  },
  enabled: {
    color: theme.palette.green.main,
  },
  disabled: {
    color: theme.palette.error.main,
  },
  buttons: {
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(1),
    textDecoration: "none",
  },
});

function getPathname(moduleType) {
  switch (moduleType) {
    case "invite-filter":
      return "/dashboard/develop/automoderation/invitelinks";
    case "word-filter":
      return "/dashboard/develop/automoderation/bannedwords";
    case "masscaps-filter":
      return "/dashboard/develop/automoderation/masscaps";
    case "massmentions-filter":
      return "/dashboard/develop/automoderation/massmentions";
    default:
      return "/dashboard";
  }
}

function AutoModerationPanel(props) {
  const { classes, title, description, module } = props;

  const pathname = getPathname(module.type);
  console.log(pathname)

  return (
    <GridItem sm={12} md={6} lg={4} classes={{ root: classes.root }}>
      <Paper elevation={2} className={classes.paper} >
        <GridContainer>
          <GridItem>
            <Typography variant="h6">
              {title}
            </Typography>
          </GridItem>
          <GridItem>
            <div className={classes.description}>
              {description}
            </div>
          </GridItem>
        </GridContainer>
        <div className={classes.spacer} />
        <GridContainer alignItems="flex-end" justifyContent="space-between">
          <GridItem>
            {module.enabled
              ? <div>Status: <span className={classes.enabled}>Enabled</span></div>
              : <div>Status: <span className={classes.disabled}>Disabled</span></div>
            }

          </GridItem>
          <GridItem right>
            <Link
              className={classes.buttons}
              to={{
                pathname: pathname,
                module: module,
              }}
            >
              <Button color="purple">Settings</Button>
            </Link>
          </GridItem>
        </GridContainer>
      </Paper>
    </GridItem>
  );
}

// AutoModerationPanel.propTypes = {
//   title: PropTypes.string.isRequired,
//   description: PropTypes.string.isRequired,
//   path: PropTypes.string.isRequired,
//   Icon: PropTypes.elementType,
//   image: PropTypes.string,
//   color: PropTypes.string,
// };

export default withStyles(styles)(AutoModerationPanel);