import React from 'react';
import PropTypes from "prop-types";

// Import Mui components
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
  embedWrapper: {
    backgroundColor: "#2F3136",
    borderLeft: "4px solid",
    borderRadius: "4px",
    padding: "0",
    minWidth: "150px",
    maxWidth: "520px"
  },
  contentWrapper: {
    overflow: "hidden",
    padding: ".5rem 1rem 1rem .75rem",
    display: "inline-grid",
    gridTemplateColumns: "auto",
    gridTemplateRows: "auto",
  },
  embedTitle: {
    marginTop: "8px",
    fontSize: "1rem",
    fontWeight: "600",
    display: "inline-block",
    gridColumn: "1/1",
  },
  embedDescription: {
    marginTop: "8px",
    fontSize: ".875rem",
    lineHeight: "1.125rem",
    fontWeight: "400",
    whiteSpace: "pre-line",
    gridColumn: "1/1",
    color: "#dcddde",
  },
  embedFields: {
    display: "grid",
    gridColumn: "1/1",
    marginTop: "8px",
    gridGap: "8px",
  },
  embedField: {
    fontSize: ".875rem",
    lineHeight: "1.125rem",
    minWidth: "0",
    fontWeight: "400",
    gridColumn: "1/9",
  },
  embedFieldCol1: {
    fontSize: ".875rem",
    lineHeight: "1.125rem",
    minWidth: "0",
    fontWeight: "400",
    gridColumn: "1/3",
  },
  embedFieldCol2: {
    fontSize: ".875rem",
    lineHeight: "1.125rem",
    minWidth: "0",
    fontWeight: "400",
    gridColumn: "4/6",
  },
  embedFieldCol3: {
    fontSize: ".875rem",
    lineHeight: "1.125rem",
    minWidth: "0",
    fontWeight: "400",
    gridColumn: "7/9",
  },
  embedFieldName: {
    fontWeight: "600",
    lineHeight: "1.125rem",
    minWidth: "0",
    marginBottom: "2px",
  },
  embedFieldValue: {
    fontWeight: "400",
    whiteSpace: "pre-line",
    minWidth: "0",
    color: "#dcddde",
  },
  mainImageWrapper: {
    gridColumn: "1/3",
    marginTop: "16px",
  },
  mainImage: {
    display: "block",
    maxHeight: "300px",
    maxWidth: "inherit",
  },
  embedThubmnailWrapper: {
    gridRow: "1/8",
    gridColumn: "2/2",
    marginLeft: "16px",
    marginTop: "8px",
    flexShrink: 0,
    justifySelf: "end",
  },
  thumbnailImage: {
    maxHeight: "80px",
    maxWidth: "80px",
    display: "block",
  },
  footerWrapper: {
    gridColumn: "1/3",
    minWidth: 0,
    marginTop: "8px"
  },
  footerImage: {
    float: "left",
    maxHeight: "20px",
    maxWidth: "20px",
    display: "block",
    marginRight: "8px",
  },
  footer: {
    float: "left",
    fontSize: ".75rem",
    lineHeight: "1rem",
    fontWeight: "500",
    color: "#dcddde",
    textAlign: "left",
  }
});

function EmbedPreviewPanel(props) {
  const { classes, embedObject } = props;

  // Returns embed fields with their appropriate grid/column styles
  const returnFields = (fields) => {
    let inlineCount = 0;

    return (
      fields.map((field, index) => {
        if (!field.inline) {
          inlineCount = 0;
          return (
            <div key={index} className={classes.embedField}>
              {field.name.trim() &&
                <div className={classes.embedFieldName}>
                  {field.name.trim()}
                </div>
              }
              {field.value.trim() &&
                <div className={classes.embedFieldValue}>
                  {field.value}
                </div>
              }
            </div>
          );
        } else {
          inlineCount++;
          let currentCol = inlineCount;
          let className = classes.embedFieldCol1;
          if (currentCol === 2) { className = classes.embedFieldCol2 }
          if (currentCol === 3) { className = classes.embedFieldCol3 }
          if (inlineCount > 2) { inlineCount = 0; }
          return (
            <div key={index} className={className}>
              {field.name.trim() &&
                <div className={classes.embedFieldName}>
                  {field.name.trim()}
                </div>
              }
              {field.value.trim() &&
                <div className={classes.embedFieldValue}>
                  {field.value.trim()}
                </div>
              }
            </div>
          );
        }
      })
    );
  }

  return (
    <div className={classes.embedWrapper} style={{ borderColor: embedObject.color }}>
      <div className={classes.contentWrapper}>
        {embedObject.title.trim() &&
          <div className={classes.embedTitle}>
            {embedObject.title.trim()}
          </div>
        }
        {embedObject.description.trim() &&
          <div className={classes.embedDescription}>
            {embedObject.description.trim()}
          </div>
        }
        {embedObject.fields.length > 0 &&
          <div className={classes.embedFields}>
            {returnFields(embedObject.fields)}
          </div>
        }
        {embedObject.mainImageURL.trim() &&
          <div className={classes.mainImageWrapper}>
            <img alt="" className={classes.mainImage} src={embedObject.mainImageURL.trim()} />
          </div>
        }
        {embedObject.thumbnailURL.trim() &&
          <div className={classes.embedThubmnailWrapper}>
            <img alt="" className={classes.thumbnailImage} src={embedObject.thumbnailURL.trim()} />
          </div>
        }
        {(embedObject.footer.trim() || embedObject.footerThumbnailURL.trim()) &&
          <div className={classes.footerWrapper}>
            {embedObject.footerThumbnailURL.trim() &&
              <img alt="" className={classes.footerImage} src={embedObject.thumbnailURL.trim()} />
            }
            {embedObject.footer.trim() &&
              <div className={classes.footer}>
                {embedObject.footer.trim()}
              </div>
            }
          </div>
        }
      </div>
    </div>
  )
}

EmbedPreviewPanel.propTypes = {
  classes: PropTypes.object.isRequired,
  embedObject: PropTypes.object.isRequired,
};

export default withStyles(styles)(EmbedPreviewPanel);