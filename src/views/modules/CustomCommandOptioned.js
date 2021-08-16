import React from 'react';
import {useHistory, useLocation} from 'react-router-dom';

// Import react-hook-form
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';

// Import layouts
import ContentWrapper from '../../layouts/ContentWrapper';

// Import Mui components
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper'

// Import custom components
import TitlePanel from '../panels/TitlePanel';
import OutlinedInput from '../../components/inputs/OutlinedInputDark';
import Button from '../../components/buttons/Button';
import GridContainer from '../../components/grid/GridContainer';
import GridItem from '../../components/grid/GridItem';
import ControlledRadioGroup from '../../components/inputs/ControlledRadioGroup';
import ControlledRadio from '../../components/inputs/ControlledRadio';
import OptionedResponseList from './lists/OptionedResponseList';
import AddOptionDialog from './dialogs/AddOptionDialog';

// Import icons
import { TiMessages } from 'react-icons/ti';
import { BiMessageAdd } from 'react-icons/bi';

const styles = (theme) => ({
  paper: {
    padding: "20px",
    marginBottom: theme.spacing(3),
    backgroundColor: theme.palette.gray.main,
    overflow: "hidden",
    color: theme.palette.white.main,
  },
  categoryHeader: {
    marginTop: theme.spacing(6),
    marginBottom: theme.spacing(2),
    marginLeft: theme.spacing(1),
    color: theme.palette.white.dark,
    fontSize: 24,
  },
  addOptionButton: {
    marginLeft: theme.spacing(1),
    marginBottom: theme.spacing(2),
  },
  new: {
    color: theme.palette.green.main,
  },
  edit: {
    color: theme.palette.purple.main,
  }
});

const schema = Joi.object({
  command: Joi.string().required()
    .messages({
      "string.empty": `"Command" is required`,
      "any.required": `"Command" is required`,
    }),
  description: Joi.string().required()
    .messages({
      "string.empty": `"Description" is required`,
      "any.required": `"Description" is required`,
    }),
  responseLocation: Joi.string().required()
    .messages({
      "string.empty": `"Response Location" is required`,
      "any.required": `"Response Location" is required`,
    }),
  options: Joi.array().min(1).required()
  .messages({
    "array.min": `At least one optioned response is required`,
    "any.required": `At least one optioned response is required`,
  }),
});

function setDefaultValues(module) {
  if (module) {
    return {
      command: module.command,
      description: module.description,
      responseLocation: module.responseLocation,
      options: module.options,
    }
  } else {
    return {
      command: '',
      description: '',
      responseLocation: 'server',
      options: [],
    }
  }
} 

function CustomCommandOptioned (props) {
  const {classes, bots, selectedBot, setBots, setApiAlert} = props;
  const {module} = useLocation();
  const [optionDialog, setOptionDialog] = React.useState(false);
  const [editOption, setEditOption] = React.useState(false);

  const {register, handleSubmit, control, setValue, watch, formState:{errors}} = useForm({
    resolver: joiResolver(schema),
    defaultValues: setDefaultValues(module),
  });

  const watchOptions = watch("options");

  const history = useHistory();

  const onSubmit = (data) => {
    console.log(data);
  }

  const handleCancel = () => {
    history.push('/dashboard/develop/customcommands');
  }

  const openOptionedDialog = (option) => {
    setEditOption(option);
    setOptionDialog(true);
  }

  const closeOptionedDialog = (callback) => {
    setOptionDialog(false);
    callback();
  }

  const setOptionsArray = (newArray) => {
    setValue('options', newArray);
  }

  return (
    <ContentWrapper>
      <TitlePanel 
        title="Optioned Responses"
        description="A single command with a supplied option keyword, for which a range of multiple responses can be returned."
        Icon={TiMessages}
        docs={true}
        color="#de8f4d"
      />
      <div className={classes.categoryHeader}>
        {module ? <span className={classes.edit}>Edit</span> : <span className={classes.new}>New</span>}  Optioned Responses
      </div>
      <Paper className={classes.paper}>
        <form autoComplete="off">
          <OutlinedInput
            labelText="Command"
            description="Command Trigger Word"
            id="command"
            name="command"
            formControlProps={{fullWidth: true}}
            inputProps={{...register("command")}}
            error={errors}
          />
          <OutlinedInput
            labelText="Description"
            description="Short description of the command."
            id="description"
            name="description"
            formControlProps={{fullWidth: true}}
            inputProps={{...register("description")}}
            error={errors}
          />
          <ControlledRadioGroup 
            control={control} 
            name="responseLocation"
            description="Where should the bot respond?"
            defaultValue="server"
            error={errors}
          >
            <ControlledRadio
              value="server"
              label="Post in Server"
            />
            <ControlledRadio
              value="directmessage"
              label="Direct Message the User"
            />
          </ControlledRadioGroup>
          <input type="hidden" id="options" name="options" {...register("options")} value={watchOptions} />
          <Button 
            color="orange"
            startIcon={<BiMessageAdd />}
            className={classes.addOptionButton}
            onClick={() => openOptionedDialog(false)}  
          >
            Optioned Response
          </Button> 
        </form>
        <OptionedResponseList 
          setOptionsArray={setOptionsArray} 
          optionsArray={watchOptions} 
          error={errors.options}
          openOptionedDialog={openOptionedDialog}
        />
        <GridContainer justifyContent="flex-end">
          <GridItem>
            <Button
              onClick={handleCancel}
              variant="contained"
              color="danger"
            >
              Cancel
            </Button>
          </GridItem>
          <GridItem>
            <Button
              onClick={handleSubmit(onSubmit)}
              variant="contained"
              color="teal"
            >
              Save
            </Button>
          </GridItem>
        </GridContainer>
      </Paper>
      <AddOptionDialog 
        optionsArray={watchOptions}
        setOptionsArray={setOptionsArray} 
        optionDialog={optionDialog}
        closeOptionedDialog={closeOptionedDialog} 
        setOptionDialog={setOptionDialog}
        editOption={editOption}
        setEditOption={setEditOption} 
      />
    </ContentWrapper>
  );
}

export default withStyles(styles)(CustomCommandOptioned);