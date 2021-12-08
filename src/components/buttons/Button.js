import React from "react";
import PropTypes from "prop-types";
import clsx from 'clsx';

// Import MUI components
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import CircularProgress from '@material-ui/core/CircularProgress';

// Converts from hex color to rgb color
const hexToRgb = input => {
  input = input + "";
  input = input.replace("#", "");
  let hexRegex = /[0-9A-Fa-f]/g;
  if (!hexRegex.test(input) || (input.length !== 3 && input.length !== 6)) {
    throw new Error("input is not a valid hex color.");
  }
  if (input.length === 3) {
    let first = input[0];
    let second = input[1];
    let last = input[2];
    input = first + first + second + second + last + last;
  }
  input = input.toUpperCase();
  let first = input[0] + input[1];
  let second = input[2] + input[3];
  let last = input[4] + input[5];
  return (
    parseInt(first, 16) +
    ", " +
    parseInt(second, 16) +
    ", " +
    parseInt(last, 16)
  );
};

const shadowModifier = "#424242";

const styles = (theme) => ({
  button: {
    minHeight: "auto",
    minWidth: "auto",
    backgroundColor: theme.palette.gray.main,
    color: theme.palette.white.main,
    boxShadow:
      "0 2px 2px 0 rgba(" +
      hexToRgb(theme.palette.gray.main) +
      ", 0.14), 0 3px 1px -2px rgba(" +
      hexToRgb(theme.palette.gray.main) +
      ", 0.2), 0 1px 5px 0 rgba(" +
      hexToRgb(theme.palette.gray.main) +
      ", 0.12)",
    border: "none",
    borderRadius: "3px",
    position: "relative",
    padding: "8px 24px",
    margin: ".3125rem 1px",
    fontSize: "14px",
    fontWeight: "400",
    textTransform: "uppercase",
    letterSpacing: "0",
    willChange: "box-shadow, transform",
    transition:
      "box-shadow 0.2s cubic-bezier(0.4, 0, 1, 1), background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
    lineHeight: "1.42857143",
    textAlign: "center",
    whiteSpace: "nowrap",
    verticalAlign: "middle",
    touchAction: "manipulation",
    cursor: "pointer",
    "&:hover,&:focus": {
      color: theme.palette.white.dark,
      backgroundColor: theme.palette.gray.main,
      boxShadow:
        "0px 2px 4px -1px rgba(" +
        hexToRgb(theme.palette.gray.main) +
        ", 0.2), 0px 4px 5px 0px rgba(" +
        hexToRgb(shadowModifier) +
        ", 0.14), 0px 1px 10px 0px rgba(" +
        hexToRgb(theme.palette.gray.main) +
        ", 0.12)"
    },
    "& .fab,& .fas,& .far,& .fal, &.material-icons": {
      position: "relative",
      display: "inline-block",
      top: "0",
      marginTop: "-1em",
      marginBottom: "-1em",
      fontSize: "1.1rem",
      marginRight: "4px",
      verticalAlign: "middle"
    },
    "& svg": {
      position: "relative",
      display: "inline-block",
      top: "0",
      width: "18px",
      height: "18px",
      marginRight: "4px",
      verticalAlign: "middle"
    },
  },
  primary: {
    backgroundColor: theme.palette.primary.main,
    boxShadow:
      "0 2px 2px 0 rgba(" +
      hexToRgb(theme.palette.primary.main) +
      ", 0.14), 0 3px 1px -2px rgba(" +
      hexToRgb(theme.palette.primary.main) +
      ", 0.2), 0 1px 5px 0 rgba(" +
      hexToRgb(theme.palette.primary.main) +
      ", 0.12)",
    "&:hover,&:focus": {
      backgroundColor: theme.palette.primary.main,
      boxShadow:
        "0px 2px 4px -1px rgba(" +
        hexToRgb(theme.palette.primary.main) +
        ", 0.42), 0px 4px 5px 0px rgba(" +
        hexToRgb(shadowModifier) +
        ", 0.12), 0px 1px 10px 0px rgba(" +
        hexToRgb(theme.palette.primary.main) +
        ", 0.2)"
    }
  },
  secondary: {
    backgroundColor: theme.palette.secondary.main,
    boxShadow:
      "0 2px 2px 0 rgba(" +
      hexToRgb(theme.palette.secondary.main) +
      ", 0.14), 0 3px 1px -2px rgba(" +
      hexToRgb(theme.palette.secondary.main) +
      ", 0.2), 0 1px 5px 0 rgba(" +
      hexToRgb(theme.palette.secondary.main) +
      ", 0.12)",
    "&:hover,&:focus": {
      backgroundColor: theme.palette.secondary.main,
      boxShadow:
        "0px 2px 4px -1px rgba(" +
        hexToRgb(theme.palette.secondary.main) +
        ", 0.42), 0px 4px 5px 0px rgba(" +
        hexToRgb(shadowModifier) +
        ", 0.12), 0px 1px 10px 0px rgba(" +
        hexToRgb(theme.palette.secondary.main) +
        ", 0.2)"
    }
  },
  danger: {
    backgroundColor: theme.palette.error.dark,
    boxShadow:
      "0 2px 2px 0 rgba(" +
      hexToRgb(theme.palette.error.dark) +
      ", 0.14), 0 3px 1px -2px rgba(" +
      hexToRgb(theme.palette.error.dark) +
      ", 0.2), 0 1px 5px 0 rgba(" +
      hexToRgb(theme.palette.error.dark) +
      ", 0.12)",
    "&:hover,&:focus": {
      backgroundColor: theme.palette.error.dark,
      boxShadow:
        "0px 2px 4px -1px rgba(" +
        hexToRgb(theme.palette.error.dark) +
        ", 0.42), 0px 4px 5px 0px rgba(" +
        hexToRgb(shadowModifier) +
        ", 0.12), 0px 1px 10px 0px rgba(" +
        hexToRgb(theme.palette.error.dark) +
        ", 0.2)"
    }
  },
  purple: {
    backgroundColor: theme.palette.purple.dark,
    boxShadow:
      "0 2px 2px 0 rgba(" +
      hexToRgb(theme.palette.purple.dark) +
      ", 0.14), 0 3px 1px -2px rgba(" +
      hexToRgb(theme.palette.purple.dark) +
      ", 0.2), 0 1px 5px 0 rgba(" +
      hexToRgb(theme.palette.purple.dark) +
      ", 0.12)",
    "&:hover,&:focus": {
      backgroundColor: theme.palette.purple.dark,
      boxShadow:
        "0px 2px 4px -1px rgba(" +
        hexToRgb(theme.palette.purple.dark) +
        ", 0.42), 0px 4px 5px 0px rgba(" +
        hexToRgb(shadowModifier) +
        ", 0.12), 0px 1px 10px 0px rgba(" +
        hexToRgb(theme.palette.purple.dark) +
        ", 0.2)"
    }
  },
  teal: {
    backgroundColor: theme.palette.teal.dark,
    boxShadow:
      "0 2px 2px 0 rgba(" +
      hexToRgb(theme.palette.teal.dark) +
      ", 0.14), 0 3px 1px -2px rgba(" +
      hexToRgb(theme.palette.teal.dark) +
      ", 0.2), 0 1px 5px 0 rgba(" +
      hexToRgb(theme.palette.teal.dark) +
      ", 0.12)",
    "&:hover,&:focus": {
      backgroundColor: theme.palette.teal.dark,
      boxShadow:
        "0px 2px 4px -1px rgba(" +
        hexToRgb(theme.palette.teal.dark) +
        ", 0.42), 0px 4px 5px 0px rgba(" +
        hexToRgb(shadowModifier) +
        ", 0.12), 0px 1px 10px 0px rgba(" +
        hexToRgb(theme.palette.teal.dark) +
        ", 0.2)"
    }
  },
  orange: {
    backgroundColor: theme.palette.orange.dark,
    boxShadow:
      "0 2px 2px 0 rgba(" +
      hexToRgb(theme.palette.orange.dark) +
      ", 0.14), 0 3px 1px -2px rgba(" +
      hexToRgb(theme.palette.orange.dark) +
      ", 0.2), 0 1px 5px 0 rgba(" +
      hexToRgb(theme.palette.orange.dark) +
      ", 0.12)",
    "&:hover,&:focus": {
      backgroundColor: theme.palette.orange.dark,
      boxShadow:
        "0px 2px 4px -1px rgba(" +
        hexToRgb(theme.palette.orange.dark) +
        ", 0.42), 0px 4px 5px 0px rgba(" +
        hexToRgb(shadowModifier) +
        ", 0.12), 0px 1px 10px 0px rgba(" +
        hexToRgb(theme.palette.orange.dark) +
        ", 0.2)"
    }
  },
  gray: {
    backgroundColor: theme.palette.gray.dark,
    boxShadow:
      "0 2px 2px 0 rgba(" +
      hexToRgb(theme.palette.gray.dark) +
      ", 0.14), 0 3px 1px -2px rgba(" +
      hexToRgb(theme.palette.gray.dark) +
      ", 0.2), 0 1px 5px 0 rgba(" +
      hexToRgb(theme.palette.gray.dark) +
      ", 0.12)",
    "&:hover,&:focus": {
      backgroundColor: theme.palette.gray.dark,
      boxShadow:
        "0px 2px 4px -1px rgba(" +
        hexToRgb(theme.palette.gray.dark) +
        ", 0.42), 0px 4px 5px 0px rgba(" +
        hexToRgb(shadowModifier) +
        ", 0.12), 0px 1px 10px 0px rgba(" +
        hexToRgb(theme.palette.gray.dark) +
        ", 0.2)"
    }
  },
  simple: {
    "&,&:focus,&:hover": {
      color: theme.palette.white.main,
      background: "transparent",
      boxShadow: "none"
    },
    "&$primary": {
      "&,&:focus,&:hover,&:visited": {
        color: theme.palette.primary.main,
      }
    },
    "&$teal": {
      "&,&:focus,&:hover,&:visited": {
        color: theme.palette.primary.teal,
      }
    },
  },
  link: {
    "&,&:hover,&:focus": {
      backgroundColor: "transparent",
      color: theme.palette.gray.main,
      boxShadow: "none"
    }
  },
  disabled: {
    opacity: "0.65",
    pointerEvents: "none"
  },
  lg: {
    padding: "1.125rem 2.25rem",
    fontSize: "0.875rem",
    lineHeight: "1.333333",
    borderRadius: "0.2rem",
  },
  sm: {
    padding: "0.40625rem 1.25rem",
    fontSize: "0.6875rem",
    lineHeight: "1.5",
    borderRadius: "0.2rem"
  },
  round: {
    borderRadius: "30px"
  },
  block: {
    width: "100% !important"
  },
  justIcon: {
    padding: "2px",
    height: "41px",
    minWidth: "41px",
    width: "41px",
    "& .fab,& .fas,& .far,& .fal,& svg,& .material-icons": {
      marginRight: 0,
    },
    "&$lg": {
      padding: 0,
      '& .MuiSvgIcon-root': {
        height: "25px",
        width: "25px",
      },
    },
    "&$sm": {
      paddingLeft: "0",
      paddingRight: "0",
      height: "25px",
      minWidth: "25px",
      width: "25px",
      margin: 0,
    },
  },
  progressRoot: {
    display: 'flex',
    alignItems: 'center',
  },
  progressWrapper: {
    position: 'relative',
  },
  progressCircle: {
    color: theme.palette.white.main,
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
});

function CustomButton(props) {

  const {
    classes,
    color,
    round,
    children,
    disabled,
    simple,
    size,
    block,
    link,
    justIcon,
    className,
    loading,
    ...rest
  } = props;

  const btnClasses = clsx({
    [classes.button]: true,
    [classes[size]]: size,
    [classes[color]]: color,
    [classes.round]: round,
    [classes.disabled]: disabled || loading,
    [classes.simple]: simple,
    [classes.block]: block,
    [classes.link]: link,
    [classes.justIcon]: justIcon,
    [className]: className
  });

  return (
    <div className={classes.progressRoot}>
      <div className={classes.progressWrapper}>
        <Button className={btnClasses} {...rest}>
          {children}
        </Button>
        {loading && <CircularProgress size={24} className={classes.progressCircle} />}
      </div>
    </div>
  );
}

CustomButton.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "danger",
    "purple",
    "teal",
    "orange",
    "gray",
  ]),
  size: PropTypes.oneOf(["sm", "lg"]),
  simple: PropTypes.bool,
  round: PropTypes.bool,
  disabled: PropTypes.bool,
  block: PropTypes.bool,
  link: PropTypes.bool,
  justIcon: PropTypes.bool,
  className: PropTypes.string,
  loading: PropTypes.bool,
  children: PropTypes.node
};

export default withStyles(styles)(CustomButton);