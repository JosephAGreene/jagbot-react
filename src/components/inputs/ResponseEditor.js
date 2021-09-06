import React from "react";
import PropTypes from "prop-types";

// Import Mui components
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from '@material-ui/core/FormHelperText';
import TextField from '@material-ui/core/TextField';
import {withStyles} from '@material-ui/core/styles';


// Import Custom components
import Button from '../../components/buttons/Button';
import VariableMenu from '../../components/inputs/VariableMenu';
import EmojiMenu from '../../components/inputs/EmojiMenu';

// Import icons
import AssignmentIcon from '@material-ui/icons/Assignment';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';

const styles = (theme) => ({
  labelRoot: {
    float: "left",
    width: "60%",
  },
  labelRootError: {
    color: theme.palette.error.main,
    float: "left",
    width: "60%",
  },
  formControl: {
    paddingBottom: "5px",
    margin: "5px 0 0 0",
    position: "relative",
    verticalAlign: "unset",
  },
  description: {
    float: 'left',
    width: "70%",
    color: theme.palette.white.dark,
    margin: "0 0 10px 10px",
    fontSize: "16px",
  },
  injectorContainer: {
    float: "right",
    width: "15%",
  },
  injector: {
    float: "right",
    marginRight: "10px",
  },
  counterContainer: {
    float: "right",
    width: "20%",
  },
  counter: {
    color: theme.palette.white.dark,
    float: "right",
    marginRight: "10px",
  },
});

const OutlinedInput = withStyles((theme) => ({
  root: {
    '& .MuiFormLabel-root': {
      color: theme.palette.white.dark,
    },
    '& label.Mui-focused': {
      color: theme.palette.white.main,
    },
    '& label.Mui-error': {
      color: theme.palette.error.main,
    },
    '& .MuiOutlinedInput-root': {
      backgroundColor: theme.palette.gray.main,
      color: theme.palette.white.main,
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: theme.palette.teal.dark,
      },
      '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.teal.light,
      },
      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: theme.palette.teal.main
      },
      "&.Mui-error .MuiOutlinedInput-notchedOutline": {
        borderColor: theme.palette.error.main
      }
    },
  },
}))(TextField);

function getCharacterCount(watch, maxLength) {
  return `${watch.trim().length}/${maxLength}`;
}

function ResponseEditor(props) {
  const inputRef = React.useRef();
  // Position of cursor inside of text field
  const [selectionStart, setSelectionStart] = React.useState();
  const [variableAnchorEl, setVariableAnchorEl] = React.useState(null);
  const [emojiAnchorEl, setEmojiAnchorEl] = React.useState(null);

  const {
    formControlProps,
    labelText,
    description,
    id,
    name,
    maxLength,
    watch,
    setValue,
    type,
    inputProps,
    error,
    multiline,
    rows,
    classes
  } = props;

  const handleVariableClick = (event) => {
    setVariableAnchorEl(event.currentTarget);
  };

  const handleVariableMenuClose = () => {
    setVariableAnchorEl(null);
  };

  // EmojiMenu is a memooized component due to it's extensive array mapping.
  // useCallback functions are necessary 
  const handleEmojiClick = (event) => {
    setEmojiAnchorEl(event.currentTarget);
  };

  const handleEmojiMenuClose = () => {
    setEmojiAnchorEl(null);
  };

  // Sets position of cursor inside of text field
  const updateSelectionStart = () => {
    setSelectionStart(inputRef.current.selectionStart);
  }

  // Inserts a value into the current response value at the location
  // of the cursor inside the ResponseEditor
  const insertValue = (value) => {
    const valueBefore = watch.slice(0, (selectionStart ? selectionStart : 0)).trim();
    const valueAfter = watch.slice(selectionStart).trim();
    const newValue = `${valueBefore}${valueBefore ? ' ' : ''}${value} ${valueAfter}`;
    setValue(name, newValue, { shouldValidate: true });
  }

  return (
    <FormControl
      {...formControlProps}
      className={formControlProps.className + " " + classes.formControl }
      variant="outlined"
    >
      <div>
        <div className={classes.description}>
          {description}
        </div>
        <div className={classes.injectorContainer}>
          <div className={classes.injector}>
            <Button onClick={handleEmojiClick} justIcon size="sm" round ><InsertEmoticonIcon /></Button>
            <EmojiMenu
              anchorEl={emojiAnchorEl}
              handleClose={handleEmojiMenuClose}
              insertValue={insertValue}
            />
          </div>
          <div className={classes.injector}>
            <Button onClick={handleVariableClick} justIcon size="sm" round ><AssignmentIcon /></Button>
            <VariableMenu
              anchorEl={variableAnchorEl}
              handleClose={handleVariableMenuClose}
              insertValue={insertValue}
            />
          </div>
        </div>
      </div>
      <OutlinedInput
        id={id}
        multiline={multiline ? true : false}
        rows={multiline && rows ? rows : 1}
        type={type}
        name={name}
        onSelect={updateSelectionStart}
        inputRef={inputRef}
        inputProps={{...inputProps,
          maxLength: (maxLength ? maxLength : null)}}
        label={labelText}
        InputLabelProps={watch ? {shrink: true} : null}
        error={error[name] ? true : false}
        variant="outlined"
      />
      {error[name] 
        ? <div>
            <FormHelperText className={classes.labelRootError} id={`error-message-${name}`}>
              {error[name].message}
            </FormHelperText>
            <div className={classes.counterContainer}>
              <div className={classes.counter}>
                {getCharacterCount(watch, maxLength)}
              </div>
            </div>
          </div>
        : <div>
            <FormHelperText className={classes.labelRoot}>
              &nbsp;
            </FormHelperText>
            <div className={classes.counterContainer}>
              <div className={classes.counter}>
                {getCharacterCount(watch, maxLength)}
              </div>
            </div>
          </div>
      }
    </FormControl>
  );
}

ResponseEditor.propTypes = {
  labelText: PropTypes.node,
  description: PropTypes.string,
  labelProps: PropTypes.object,
  id: PropTypes.string,
  name: PropTypes.string,
  watch: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
  maxLength: PropTypes.number,
  inputProps: PropTypes.object,
  formControlProps: PropTypes.object,
  error: PropTypes.object,
  success: PropTypes.bool,
  multiline: PropTypes.bool,
  rows: PropTypes.number,
};

export default withStyles(styles)(ResponseEditor);