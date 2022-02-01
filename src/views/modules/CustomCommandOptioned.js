import React from 'react';
import PropTypes from "prop-types";
import {useHistory, useLocation} from 'react-router-dom';

// Import API service
import CustomModuleService from "../../services/CustomModuleService.js";

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
  new: {
    color: theme.palette.green.main,
  },
  edit: {
    color: theme.palette.purple.main,
  }
});

const schema = Joi.object({
  command: Joi.string().trim().max(30).required()
    .custom((value, helper) => {
      const wordCount = value.slice(0).trim().split(' ').length;
      if (wordCount > 1) {
        return helper.message('Command must be a single word');
      }
      return value;
    })
    .messages({
      "string.empty": 'Command is required',
      "string.max" : 'Command cannot be greater than 30 characters',
      "any.required": 'Command is required',
    }),
  description: Joi.string().trim().max(250).required()
    .messages({
      "string.empty": 'Description is required',
      "string.max" : 'Description cannot be greater than 250 characters',
      "any.required": 'Description is required',
    }),
  responseLocation: Joi.string().trim().valid('server','directmessage').required()
    .messages({
      "string.empty": 'Response Location is required',
      "any.only": 'Response Location must be either "server" or "directmessage"',
      "any.required": 'Response Location is required',
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
  const {classes, selectedBot, setSelectedBot, setApiAlert} = props;
  const {module} = useLocation();
  const [optionDialog, setOptionDialog] = React.useState(false);
  const [editOption, setEditOption] = React.useState(false);

  const {register, handleSubmit, control, setValue, watch, setError, formState:{errors}} = useForm({
    resolver: joiResolver(schema),
    defaultValues: setDefaultValues(module),
  });

  const watchOptions = watch("options");

  const history = useHistory();

  const onSubmit = async (data) => {
    if (module) {
      submitUpdateModule(data);
    } else {
      submitNewModule(data);
    }
  }

  const submitNewModule = async (data) => {
    const payload = {
      ...data,
      "botId": selectedBot._id,
    }

    const res = await CustomModuleService.addOptionedResponseModule(payload);

    if (res.status === 200) {
      setSelectedBot(res.data);
      setApiAlert({
        status: true,
        duration: 2500,
        severity: "success",
        message: `${data.command} command has been added!`
      });
      history.push('/dashboard/develop/customcommands');
    } 

    if (res.status === 409 && res.data === "duplicate command") {
      setError("command", {type: "manual", message: "Command trigger word already exists."});
    }
  }

  const submitUpdateModule = async (data) => {
    const payload = {
      ...data,
      "botId": selectedBot._id,
      "moduleId": module._id,
    }

    const res = await CustomModuleService.updateOptionedResponseModule(payload);

    if (res.status === 200) {
      setSelectedBot(res.data);
      setApiAlert({
        status: true,
        duration: 2500,
        severity: "success",
        message: `${module.command} command has been updated!`
      });
      history.push('/dashboard/develop/customcommands');
    }
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
    setOptionDialog(false);
  }

  const setOptionsArray = (newArray) => {
    setValue('options', newArray);
  }

  return (
    <ContentWrapper>
      <TitlePanel 
        title="Optioned Responses"
        description="A single command with a supplied option keyword, for which a range of multiple responses can be returned."
        listItems={["Max 50 options"]}
        Icon={TiMessages}
        docs={[]}
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
            inputProps={{...register("command"), maxLength: 30}}
            error={errors}
          />
          <OutlinedInput
            labelText="Description"
            description="Short description of the command."
            id="description"
            name="description"
            formControlProps={{fullWidth: true}}
            inputProps={{...register("description"), maxLength: 250}}
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
        editOption={editOption}
        setEditOption={setEditOption} 
      />
    </ContentWrapper>
  );
}

CustomCommandOptioned.propTypes = {
  classes: PropTypes.object.isRequired,
  selectedBot: PropTypes.object.isRequired,
  setSelectedBot: PropTypes.func.isRequired,
  setApiAlert: PropTypes.func.isRequired,
};

export default withStyles(styles)(CustomCommandOptioned);