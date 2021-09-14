import React from 'react';
import PropTypes from "prop-types";

// Import Mui components
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';

const styles = (theme) => ({
  dialogRoot: {
    '& .MuiDialog-container': {
      minWidth: "300px",
      margin: "0 6px 0 250px",
      [theme.breakpoints.down('sm')]: {
        margin: "0 0 0 0",
      },
    },
    '& .MuiDialogContent-root': {
      padding: 0,
    },
    '& .MuiPaper-root': {
      padding: "0",
      color: theme.palette.white.main,
      backgroundColor: theme.palette.gray.main,
    }
  },
});

function MinDialog(props) {
  const { classes, open, setOpen, keepMounted, children } = props;

  return (
    <Dialog
      className={classes.dialogRoot}
      open={open}
      onClose={() => setOpen(false)}
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

MinDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  keepMounted: PropTypes.bool.isRequired,
  children: PropTypes.node,
};

export default withStyles(styles)(MinDialog);