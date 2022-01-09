import React from "react";
import PropTypes from "prop-types";

// Import Mui components
import { withStyles } from '@material-ui/core/styles';

const styles = () => ({
  videoResponsive: {
    overflow: "hidden",
    paddingBottom: "56.25%",
    position: "relative",
    height: 0,
  },
  iframe: {
    left: 0,
    top: 0,
    height: "100%",
    width: "100%",
    position: "absolute",
  }
});

function YoutubeEmbed(props) {
  const { classes, embedId } = props;

  return (
    <div className={classes.videoResponsive}>
      <iframe
        className={classes.iframe}
        width="853"
        height = "480"
        src = {`https://www.youtube.com/embed/${embedId}`}
        frameBorder = "0"
        allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title = "Embedded youtube"
      />
    </div>
  );
}

YoutubeEmbed.propTypes = {
  classes: PropTypes.object.isRequired,
  embedId: PropTypes.string.isRequired
};

export default withStyles(styles)(YoutubeEmbed);