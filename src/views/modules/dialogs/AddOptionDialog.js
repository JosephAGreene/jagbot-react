import React from 'react';

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
  option: Joi.string().required()
    .messages({
      "string.empty": `"Option" is required`,
      "any.required": `"Option" is required`,
    }),
  response: Joi.string().required()
    .messages({
      "string.empty": `"Response" is required`,
      "any.required": `"Response" is required`,
    }),
});

function setOptionDefaultValues(module) {
  if (module) {
    return {
      option: module.option,
      response: module.response,
    }
  } else {
    return {
      option: '',
      response: '',
    }
  }
} 

function AddOptionDialog (props) {
  const {classes, optionDialog, setOptionDialog} = props;
  const {register, handleSubmit : handleOptionSubmit, watch, setValue, setError, formState:{errors}} = useForm({
    resolver: joiResolver(addOptionSchema),
    defaultValues: setOptionDefaultValues(module),
  });

  const watchResponse = watch("response", '');

  // Inserts a value into the current response value at the location
  // of the cursor inside the ResponseEditor
  const insertValueIntoResponse = (insertLocation, insertValue) => {
    const valueBefore = watchResponse.slice(0, (insertLocation ? insertLocation : 0)).trim();
    const valueAfter = watchResponse.slice(insertLocation).trim();
    const newValue = `${valueBefore}${valueBefore ? ' ' : ''}${insertValue} ${valueAfter}`;
    setValue('response', newValue, { shouldValidate: true });
  }

  const onSubmit = (data) => {
    console.log(data);
  }

  const handleClose = () => {
    setOptionDialog(false);
  }

  return (
    <Dialog
      className={classes.dialogRoot} 
      open={optionDialog}
      aria-labelledby="form-dialog-title"
      scroll="body"
    >
      <DialogContent>
        <div className={classes.categoryHeader}>
          {false ? <span className={classes.edit}>Edit</span> : <span className={classes.new}>New</span>}  Optioned Response
        </div>
        <form autoComplete="off" onSubmit={handleOptionSubmit(onSubmit)} >
          <OutlinedInput
            labelText="Option"
            description="Supplied Option Word"
            id="option"
            name="option"
            formControlProps={{fullWidth: true}}
            inputProps={{...register("option")}}
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
                  onClick={handleClose}
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
                  {false ? "Update" : "Add" }
                </Button>
              </GridItem>
            </GridContainer>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default withStyles(styles)(AddOptionDialog);