import React from 'react';
import PropTypes from "prop-types";

// Import react-hook-form
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';

// Import Mui components
import { withStyles } from '@material-ui/core/styles';

// Import custom components
import OutlinedInput from '../../../components/inputs/OutlinedInputDark';
import ResponseEditor from '../../../components/inputs/ResponseEditor';
import Button from '../../../components/buttons/Button';
import GridContainer from '../../../components/grid/GridContainer';
import GridItem from '../../../components/grid/GridItem';
import ResponsiveDialog from '../../../components/dialogs/ResponsiveDialog';

const styles = (theme) => ({
  categoryHeader: {
    marginBottom: theme.spacing(2),
    color: theme.palette.white.dark,
    fontSize: 24,
  },
  new: {
    color: theme.palette.green.main,
  },
  edit: {
    color: theme.palette.purple.main,
  }
});

const addOptionSchema = Joi.object({
  keyword: Joi.string().trim().max(30).required()
    .custom((value, helper) => {
      const wordCount = value.slice(0).trim().split(' ').length;
      if (wordCount > 1) {
        return helper.message('Keyword must be a single word');
      }
      return value;
    })
    .messages({
      "string.empty": 'Keyword is required',
      "string.max": 'Keyword cannot be greater than 30 characters',
      "any.required": 'Keyword is required',
    }),
  response: Joi.string().trim().max(2000).required()
    .messages({
      "string.empty": 'Response is required',
      "string.max": 'Response cannot be greater than 2000 characters',
      "any.required": 'Response is required',
    }),
});

function findDuplicateKeyword(keyword, optionsArray, editOption) {
  for (let i = 0; i < optionsArray.length; i++) {
    // Skip checking for duplicate keyword in element currently being edited
    if ((keyword.toLowerCase() === optionsArray[i].keyword.toLowerCase())
      && (editOption._id !== optionsArray[i]._id)) {
      return true;
    }
  }
  return false;
}

function returnArrayWithEditedOption(editedOption, optionsArray) {
  let newArray = optionsArray.slice(0);
  for (let i = 0; i < newArray.length; i++) {
    if (editedOption._id === newArray[i]._id) {
      newArray.splice(i, 1, editedOption);
      return newArray;
    }
  }
}

function setOptionDefaultValues(option) {
  return {
    keyword: (option ? option.keyword : ''),
    response: (option ? option.response : ''),
  }
}

function AddOptionDialog(props) {
  const { classes, optionsArray, setOptionsArray, optionDialog, editOption, closeOptionedDialog } = props;
  const { register, handleSubmit, watch, setValue, reset, setError, formState: { errors } } = useForm({
    resolver: joiResolver(addOptionSchema),
  });

  const watchResponse = watch("response", (editOption ? editOption.response : ''));

  // Reseting useForm hook with defaultValues inside useEffect 
  // as defaultValues from older dialog render remain otherwise
  React.useEffect(() => {
    reset(setOptionDefaultValues(editOption));
  }, [reset, editOption]);

  const onSubmit = (data) => {
    // Set form error if duplicated keyword is detected
    if (findDuplicateKeyword(data.keyword, optionsArray, editOption)) {
      setError("keyword", {
        type: "manual",
        message: "Option keyword already exists."
      });
      return;
    }

    if (!editOption) {
      // Create a fake _id value for the sake of being able to identify
      // and edit the options array while client side. _id will be replaced
      // by mongoose objectIds once sent to the database.
      const newOption = {
        _id: `${data.keyword}-${Date.now()}`,
        keyword: data.keyword,
        response: data.response,
      }

      let newArray = optionsArray.slice(0);
      newArray.push(newOption);
      setOptionsArray(newArray);
    }
    else {
      const editedOption = {
        _id: editOption._id,
        keyword: data.keyword,
        response: data.response,
      }
      setOptionsArray(returnArrayWithEditedOption(editedOption, optionsArray));
    }

    closeOptionedDialog(reset);
  }

  return (
    <ResponsiveDialog
      open={optionDialog}
      keepMounted={false}
    >
      <div className={classes.categoryHeader}>
        {editOption ? <span className={classes.edit}>Edit</span> : <span className={classes.new}>New</span>}  Optioned Response
      </div>
      <form autoComplete="off" onSubmit={handleSubmit(onSubmit)} >
        <OutlinedInput
          labelText="Option Keyword"
          description="Supplied Option Keyword"
          id="keyword"
          name="keyword"
          formControlProps={{ fullWidth: true }}
          inputProps={{ ...register("keyword"), maxLength: 30 }}
          error={errors}
        />
        <ResponseEditor
          labelText="Response"
          description="The response your bot will give."
          id="response"
          name="response"
          watch={watchResponse}
          setValue={setValue}
          maxLength={2000}
          multiline
          rows={10}
          formControlProps={{ fullWidth: true }}
          inputProps={{ ...register("response"), maxLength: 2000 }}
          error={errors}
        />
        <GridContainer justifyContent="flex-end">
          <GridItem>
            <Button
              onClick={() => closeOptionedDialog(reset)}
              variant="contained"
              color="danger"
            >
              Cancel
            </Button>
          </GridItem>
          <GridItem>
            <Button
              type="submit"
              variant="contained"
              color="orange"
            >
              {editOption ? "Update" : "Add"}
            </Button>
          </GridItem>
        </GridContainer>
      </form>
    </ResponsiveDialog>
  );
}

AddOptionDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  optionsArray: PropTypes.array.isRequired,
  setOptionsArray: PropTypes.func.isRequired,
  optionDialog: PropTypes.bool.isRequired,
  editOption: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  closeOptionedDialog: PropTypes.func.isRequired,
};

export default withStyles(styles)(AddOptionDialog);