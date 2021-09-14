import React from 'react';
import PropTypes from "prop-types";

// Import custom views
import EmbedPreviewPanel from "../../panels/EmbedPreviewPanel";

// Import custom components
import MinDialog from '../../../components/dialogs/MinDialog';


function EmbedPreviewDialog(props) {
  const { open, setOpen, keepMounted, embedObject } = props;

  return (
    <MinDialog
      open={open}
      setOpen={setOpen}
      keepMounted={keepMounted}
    >
      <EmbedPreviewPanel embedObject={embedObject} />
    </MinDialog>
  )
}

EmbedPreviewDialog.propTypes = {
  setOpen: PropTypes.func.isRequired,
  keepMounted: PropTypes.bool.isRequired,
  embedObject: PropTypes.object.isRequired,
};

export default EmbedPreviewDialog;