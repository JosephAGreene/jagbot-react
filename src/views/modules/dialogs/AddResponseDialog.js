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
      [theme.breakpoints.up('md')]: {
        minWidth: "600px",
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

const addResponseSchema = Joi.object({
  response: Joi.string().trim().max(2000).required()
    .messages({
      "string.empty": 'Response is required',
      "string.max" : 'Response cannot be greater than 2000 characters',
      "any.required": 'Response is required',
    }),
});


function returnArrayWithEditedResponse (editedResponse, responsesArray) {
  let newArray = responsesArray.slice(0);
  for (let i=0; i < newArray.length; i++) {
    if (editedResponse._id === newArray[i]._id) {
      newArray.splice(i, 1, editedResponse);
      return newArray;
    }
  }
}

function setResponseDefaultValues(response) {
    return {
      response: (response ? response.response : ''),
    }
} 

function AddResponseDialog (props) {
  const {classes, responsesArray, setResponsesArray, responseDialog, editResponse, closeResponseDialog} = props;
  const {register, handleSubmit, watch, setValue, reset, formState:{errors}} = useForm({
    resolver: joiResolver(addResponseSchema),
  });

  const watchResponse = watch("response", (editResponse ? editResponse.response : ''));

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
    reset(setResponseDefaultValues(editResponse));
  }, [reset, editResponse]);

  const onSubmit = (data) => {

    if (!editResponse) {
      // Create a fake _id value for the sake of being able to identify
      // and edit the responses array while client side. _id will be replaced
      // by mongoose objectIds once sent to the database.
      const newResponse = {
        _id: `${data.response.slice(0, 1)}-${Date.now()}`,
        response: data.response,
      }

      let newArray = responsesArray.slice(0);
      newArray.push(newResponse);
      setResponsesArray(newArray);
    } 
    else {
      const editedResponse = {
        _id: editResponse._id,
        response: data.response,
      }
      setResponsesArray(returnArrayWithEditedResponse(editedResponse, responsesArray));
    }

    closeResponseDialog(reset);
  }

  return (
    <Dialog
      className={classes.dialogRoot} 
      open={responseDialog}
      aria-labelledby="form-dialog-title"
      scroll="body"
      keepMounted={false}
    >
      <DialogContent>
        <div className={classes.categoryHeader}>
          {editResponse ? <span className={classes.edit}>Edit</span> : <span className={classes.new}>New</span>}  Potential Response
        </div>
        <form autoComplete="off" onSubmit={handleSubmit(onSubmit)} >
          <ResponseEditor
            labelText="Potential Response"
            description="A potential response your bot might give."
            id="response"
            name="response"
            watch={watchResponse ? watchResponse : ''}
            insert={insertValueIntoResponse}
            maxLength={2000}
            multiline
            rows={10}
            formControlProps={{fullWidth: true}}
            inputProps={{...register("response"), maxLength: 2000}}
            error={errors}
          />
            <GridContainer justifyContent="flex-end">
              <GridItem>
                <Button
                  onClick={() => closeResponseDialog(reset)}
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
                  {editResponse ? "Update" : "Add" }
                </Button>
              </GridItem>
            </GridContainer>
        </form>
      </DialogContent>
    </Dialog>
  );
}

AddResponseDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  responsesArray: PropTypes.array.isRequired,
  setResponsesArray: PropTypes.func.isRequired,
  responseDialog: PropTypes.bool.isRequired,
  editResponse: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  closeResponseDialog: PropTypes.func.isRequired,
};

export default withStyles(styles)(AddResponseDialog);