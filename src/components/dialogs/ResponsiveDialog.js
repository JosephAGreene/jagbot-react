import React from 'react';
import PropTypes from "prop-types";

// Import Mui components
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';

const styles = (theme) => ({
  dialogRoot: {
    '& .MuiDialog-paperFullWidth': {
      maxWidth: "1150px",
      width: "calc(80% - 64px)",
      margin: "75px 0 75px 255px",
      backgroundColor: theme.palette.gray.main,
      color: theme.palette.white.main,
      [theme.breakpoints.down('sm')]: {
        margin: "75px 0 75px 0",
        width: "90%",
      },
    },
  },
});

function ResponsiveDialog(props) {
  const { classes, open, keepMounted, children } = props;

  return (
    <Dialog
      maxWidth={false}
      fullWidth={true}
      className={classes.dialogRoot}
      open={open}
      aria-labelledby="dialog"
      scroll="body"
      keepMounted={keepMounted}
    >
      <DialogContent>
        {children}
      </DialogContent>
    </Dialog>
  );
}

ResponsiveDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  keepMounted: PropTypes.bool.isRequired,
  children: PropTypes.node,
};

export default withStyles(styles)(ResponsiveDialog);