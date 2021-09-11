import React from "react";
import PropTypes from "prop-types";

// @material-ui/core components
import { withStyles } from '@material-ui/core/styles';
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from '@material-ui/core/FormHelperText';
import TextField from '@material-ui/core/TextField';
import Chip from "@material-ui/core/Chip";

const styles = (theme) => ({
  textFieldRoot: {
    '& .MuiInputBase-input': {
      paddingTop: theme.spacing(3),
    },
    '& .MuiChip-root': {
      display: "inline-flex",
    },
    '& .MuiOutlinedInput-adornedStart': {
      display: "inline",
    },
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
      paddingTop: 0,
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
      },
    },
  },
  labelRootError: {
    color: theme.palette.error.main
  },
  formControl: {
    paddingBottom: "5px",
    margin: "5px 0 0 0",
    position: "relative",
    verticalAlign: "unset",
  },
  description: {
    color: theme.palette.white.dark,
    margin: "0 0 10px 0",
    fontSize: "16px",
  },
  textarea: {
    width: "inherit",
    resize: "none",
    dragable: false,
    fontSize: "16px",
  },
  chip: {
    display: "inline-block",
    float: "left",
    verticalAlign: "top",
    margin: theme.spacing(2, 1, 0, 0),
    color: theme.palette.white.main,
    backgroundColor: theme.palette.teal.dark,
    borderColor: theme.palette.teal.main,
    '&:focus': {
      backgroundColor: theme.palette.teal.dark,
    }
  }
});

function WordChipInput(props) {
  const [inputValue, setInputValue] = React.useState('');
  const {
    value,
    setValue,
    formControlProps,
    labelText,
    description,
    id,
    name,
    inputProps,
    register,
    error,
    classes
  } = props;

  const setNewValue = (value) => {
    setValue(name, value, { shouldValidate: true });
  }

  // Assume multiple words might be sent (e.x. user pastes in a list)
  // Convert string into array, then push one by one into new value
  const insertWord = (word) => {
    // create copy of current value array
    const newValue = [...value];
    // create array of word(s)
    const words = word.split(' ');

    // Only push new words into newValue
    for (let i = 0; i < words.length; i++) {
      if (!value.includes(words[i].trim().toLowerCase())) {
        newValue.push(words[i].toLowerCase());
      }
    }

    setNewValue(newValue);
  }

  const handleDelete = (word) => {
    const newValue = [...value];
    newValue.splice(newValue.indexOf(word), 1);
    setNewValue(newValue);
  }

  const deleteLastElementOfValue = () => {
    if (value.length > 0) {
      setNewValue(value.slice(0, -1));
    }
  }

  const handleChange = (event) => {
    setInputValue(event.target.value.trim());
  }

  const handleKeyDown = (event) => {
    const empty = (event.target.value.trim().length < 1 ? true : false);
    if ((event.key === "Enter" || event.key === " ") && !empty) {
      insertWord(event.target.value.trim());
      setInputValue('');
      return;
    }
    if (event.key === "Backspace" && event.target.value.trim() === "") {
      deleteLastElementOfValue();
    }
  }

  return (
    <React.Fragment>
      <FormControl
        {...formControlProps}
        className={classes.formControl}
        variant="outlined"
      >
        <div className={classes.description} >
          {description}
        </div>
        <TextField
          className={classes.textFieldRoot}
          id={id}
          multiline
          name={name}
          label={labelText}
          inputProps={{ ...inputProps, className: classes.textarea }}
          error={error[name] ? true : false}
          variant="outlined"
          value={inputValue}
          InputProps={{
            onChange: event => {
              handleChange(event);
            },
            onKeyDown: event => {
              handleKeyDown(event);
            },
            startAdornment:
              value.map((role, index) => {
                return (
                  <Chip
                    key={index}
                    label={role}
                    className={classes.chip}
                    onDelete={() => handleDelete(role)}
                  />
                );
              })
          }}
        />
        {error[name] ?
          <FormHelperText className={classes.labelRootError} id={`error-message-${name}`}>{error[name].message}</FormHelperText>
          : <FormHelperText> </FormHelperText>
        }
        {/* Hidden input used to host react-hook-form register object because the
          "Word Chip TextField" is really only displayed for looks.
          I.E. It holds no value and only displays an array of startAdornments
        */}
        <input {...register} type="hidden" />
      </FormControl>
    </React.Fragment>
  );
}

WordChipInput.propTypes = {
  classes: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.array.isRequired,
  setValue: PropTypes.func.isRequired,
  register: PropTypes.object.isRequired,
  labelText: PropTypes.node,
  description: PropTypes.string,
  id: PropTypes.string,
  inputProps: PropTypes.object,
  formControlProps: PropTypes.object,
  error: PropTypes.object,
};

export default withStyles(styles)(WordChipInput);