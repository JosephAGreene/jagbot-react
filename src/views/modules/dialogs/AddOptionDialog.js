import React from 'react';
import PropTypes from "prop-types";

// Import react-hook-form
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';

// Import Mui components
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';

// Import custom components
import OutlinedInput from '../../../components/inputs/OutlinedInputDark';
import ResponseEditor from '../../../components/inputs/ResponseEditor';
import Button from '../../../components/buttons/Button';
import GridContainer from '../../../components/grid/GridContainer';
import GridItem from '../../../components/grid/GridItem';

const styles = (theme) => ({
  dialogRoot: {
    '& .MuiDialog-paper': {
      minWidth: "300px",
      maxWidth: "1000px",
      margin: "unset",
      marginLeft: "16px",
      marginRight: "16px",
      backgroundColor: theme.palette.gray.main,
      [theme.breakpoints.up('sm')]: {
        margin: "unset",
        marginLeft: "250px",
      },
    }
  },
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
  keyword: Joi.string().required()
    .messages({
      "string.empty": `"Option keyword" is required`,
      "any.required": `"Option keyword" is required`,
    }),
  response: Joi.string().required()
    .messages({
      "string.empty": `"Response" is required`,
      "any.required": `"Response" is required`,
    }),
});

function findDuplicateKeyword (keyword, optionsArray, editOption) {
  for (let i=0; i < optionsArray.length; i++) {
    // Skip checking for duplicate keyword in element currently being edited
    if ((keyword.toLowerCase() === optionsArray[i].keyword.toLowerCase()) 
        && (editOption._id !== optionsArray[i]._id)) 
      {
        return true;
      }
  }
  return false;
}

function returnArrayWithEditedOption (editedOption, optionsArray) {
  let newArray = optionsArray.slice(0);
  for (let i=0; i < newArray.length; i++) {
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

function AddOptionDialog (props) {
  const {classes, optionsArray, setOptionsArray, optionDialog, editOption, closeOptionedDialog} = props;
  const {register, handleSubmit, watch, setValue, reset, setError, formState:{errors}} = useForm({
    resolver: joiResolver(addOptionSchema),
  });

  const watchResponse = watch("response", (editOption ? editOption.response : ''));

  // Inserts a value into the current response value at the location
  // of the cursor inside the ResponseEditor
  const insertValueIntoResponse = (insertLocation, insertValue) => {
    const valueBefore = watchResponse.slice(0, (insertLocation ? insertLocation : 0)).trim();
    const valueAfter = watchResponse.slice(insertLocation).trim();
    const newValue = `${valueBefore}${valueBefore ? ' ' : ''}${insertValue} ${valueAfter}`;
    setValue('response', newValue, { shouldValidate: true });
  }

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
    <Dialog
      className={classes.dialogRoot} 
      open={optionDialog}
      aria-labelledby="form-dialog-title"
      scroll="body"
      keepMounted={false}
    >
      <DialogContent>
        <div className={classes.categoryHeader}>
          {editOption ? <span className={classes.edit}>Edit</span> : <span className={classes.new}>New</span>}  Optioned Response
        </div>
        <form autoComplete="off" onSubmit={handleSubmit(onSubmit)} >
          <OutlinedInput
            labelText="Option Keyword"
            description="Supplied Option Keyword"
            id="keyword"
            name="keyword"
            formControlProps={{fullWidth: true}}
            inputProps={{...register("keyword")}}
            error={errors}
          />
          <ResponseEditor
            labelText="Response"
            description="The response your bot will give."
            id="response"
            name="response"
            watch={watchResponse ? watchResponse : ''}
            insert={insertValueIntoResponse}
            maxLength={2000}
            multiline
            rows={10}
            formControlProps={{fullWidth: true}}
            inputProps={{...register("response")}}
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
                  {editOption ? "Update" : "Add" }
                </Button>
              </GridItem>
            </GridContainer>
        </form>
      </DialogContent>
    </Dialog>
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