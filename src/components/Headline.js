import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import clsx from 'clsx';

const styles = (theme) => ({
  root: {
    color: theme.palette.common.white,
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  nav: {
    fontSize: 24,
  },
  title: {
    fontSize: 30,
    marginTop: theme.spacing(1),
  },
  icon: {
    marginRight: theme.spacing(1),
  },
  titleIcon: {
    fontSize: 30,
  },
});

function Headline(props) {
  const {classes, iconComponent, color, start, end, title} = props;

  const rootClasses = clsx({
    [classes.root]: true,
    [classes.nav]: !title,
    [classes.title]: title,
  });

  const iconClasses = clsx({
    [classes.icon]: true,
    [classes.titleIcon]: title,
  });

  return (
    <div className={rootClasses}>
      <Icon 
        component={iconComponent} 
        className={iconClasses} 
        style={{"color": color}} 
      />
      {start}<span style={{"color": color}}>{end}</span>
    </div>
  );
}

Headline.propTypes = {
  classes: PropTypes.object.isRequired,
  iconComponent: PropTypes.func.isRequired, // Apparently icon components are functions
  start: PropTypes.string.isRequired,
  end: PropTypes.string.isRequired,
  color: PropTypes.string,
  title: PropTypes.bool,
};

export default withStyles(styles)(Headline);