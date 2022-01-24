import React from 'react';
import PropTypes from "prop-types";
import clsx from 'clsx';

// Import MUI components
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Collapse from '@material-ui/core/Collapse';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const styles = (theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.gray.dark,
    '& .MuiCardHeader-action': {
      alignSelf: "flex-end",
      '& .MuiIconButton-root': {
        color: theme.palette.white.main,
      },
    },
    '& .MuiCardHeader-title': {
      color: theme.palette.white.main,
    },
    '& .MuiCardHeader-subheader': {
      color: theme.palette.white.dark,
    },
  },
  header: {
    cursor: "pointer",
  },
  expand: {
    transform: 'rotate(0deg)',
    marginTop: 'auto',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  icon: {
    fontSize: "34px"
  },
  primary: {
    color: theme.palette.primary.main,
  },
  secondary: {
    color: theme.palette.secondary.main,
  },
  danger: {
    color: theme.palette.error.main,
  },
  purple: {
    color: theme.palette.purple.dark,
  },
  teal: {
    color: theme.palette.teal.dark,
  },
  orange: {
    color: theme.palette.orange.dark,
  },
});

function InfoCardExpand(props) {
  const { classes, color, icon, title, subheader, content } = props;
  const [expanded, setExpanded] = React.useState(false);

  const iconClasses = clsx({
    [classes.icon]: true,
    [classes[color]]: color,
  });

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        className={classes.header}
        onClick={handleExpandClick}
        avatar={
          <Icon className={iconClasses}>
            {icon}
          </Icon>
        }
        action={
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}

            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        }
        title={title}
        subheader={subheader}
      />

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          {content}
        </CardContent>
      </Collapse>
    </Card>
  );
}

InfoCardExpand.propTypes = {
  classes: PropTypes.object.isRequired,
  color: PropTypes.string,
  icon: PropTypes.object,
  title: PropTypes.string.isRequired,
  subheader: PropTypes.string,
};

export default withStyles(styles)(InfoCardExpand);