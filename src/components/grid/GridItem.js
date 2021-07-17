import React from "react";
import clsx from 'clsx';

// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const styles = {
  grid: {
    padding: "0 15px !important",
  },
  right: {
    display: "flex",
    justifyContent: "flex-end",
  },
  left: {
    display: "flex",
    justifyContent: "flex-start",
  }
};

const useStyles = makeStyles(styles);

export default function GridItem(props) {
  const classes = useStyles();
  const { children, right, left, ...rest } = props;

  const itemClasses = clsx({
    [classes.grid]: true,
    [classes.right]: right,
    [classes.left]: left,
  });

  return (
    <Grid item {...rest} className={itemClasses}>
      {children}
    </Grid>
  );
}

GridItem.propTypes = {
  children: PropTypes.node
};