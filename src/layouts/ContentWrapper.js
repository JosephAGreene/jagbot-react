import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
  outterWrapper: {
    maxWidth: 1200,
    margin: 'auto',
    overflow: 'hidden',
  },
  innerWrapper: {
    margin: '60px 16px',
    color: '#fff'
  },
  [theme.breakpoints.down('sm')]: {
    innerWrapper: {
      margin: '60px 10px',
    },
  },
});

function ContentWrapper(props) {
  const { classes } = props;

  return (
    <div className={classes.outterWrapper}>
      <div className={classes.innerWrapper}>
        {props.children}
      </div>
    </div>
  );
}

ContentWrapper.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ContentWrapper);