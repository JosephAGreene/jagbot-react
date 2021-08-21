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
import Paper from '@material-ui/core/Paper';

// Import custom components
import TitlePanel from '../panels/TitlePanel';
import OutlinedInput from '../../components/inputs/OutlinedInputDark';
import ResponseEditor from '../../components/inputs/ResponseEditor';
import Button from '../../components/buttons/Button';
import GridContainer from '../../components/grid/GridContainer';
import GridItem from '../../components/grid/GridItem';
import ControlledRadioGroup from '../../components/inputs/ControlledRadioGroup';
import ControlledRadio from '../../components/inputs/ControlledRadio';

// Import icons
import { TiMessage } from 'react-icons/ti';

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
  responseLocation: Joi.string().trim().required()
    .messages({
      "string.empty": 'Response Location is required',
      "any.required": 'Response Location is required',
    }),
  response: Joi.string().trim().max(2000).required()
    .messages({
      "string.empty": 'Response is required',
      "string.max" : 'Response cannot be greater than 2000 characters',
      "any.required": 'Response is required',
    }),
});

function setDefaultValues(module) {
  if (module) {
    return {
      command: module.command,
      description: module.description,
      responseLocation: module.responseLocation,
      response: module.response,
    }
  } else {
    return {
      command: '',
      description: '',
      responseLocation: 'server',
      response: '',
    }
  }
} 

function CustomCommandSingle(props) {
  const {classes, bots, selectedBot, setBots, setApiAlert} = props;
  const {module} = useLocation();

  const {register, handleSubmit, control, watch, setValue, setError, formState:{errors}} = useForm({
    resolver: joiResolver(schema),
    defaultValues: setDefaultValues(module),
  });

  const watchResponse = watch("response", (module ? module.response : ''));
  const history = useHistory();

  // Inserts a value into the current response value at the location
  // of the cursor inside the ResponseEditor
  const insertValueIntoResponse = (insertLocation, insertValue) => {
    const valueBefore = watchResponse.slice(0, (insertLocation ? insertLocation : 0)).trim();
    const valueAfter = watchResponse.slice(insertLocation).trim();
    const newValue = `${valueBefore}${valueBefore ? ' ' : ''}${insertValue} ${valueAfter}`;
    setValue('response', newValue, { shouldValidate: true });
  }

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

    const res = await CustomModuleService.addSingleResponseModule(payload);

    if (res.status === 200) {
      let newBots = [...bots];
      for (let i=0; i < bots.length; i++) {
        if(bots[i]._id === selectedBot._id) {
          newBots[i] = res.data;
          break;
        }
      }

      setBots(newBots);
      setApiAlert({
        status: true,
        duration: 5000,
        severity: "success",
        message: "A new single-response command has been added!"
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

    const res = await CustomModuleService.updateSingleResponseModule(payload);

    if (res.status === 200) {
      let newBots = [...bots];
      for (let i=0; i < bots.length; i++) {
        if(bots[i]._id === selectedBot._id) {
          newBots[i] = res.data;
          break;
        }
      }

      setBots(newBots);
      setApiAlert({
        status: true,
        duration: 5000,
        severity: "success",
        message: "Your single-response command has been updated!"
      });
      history.push('/dashboard/develop/customcommands');
    }
  }

  const handleCancel = () => {
    history.push('/dashboard/develop/customcommands');
  }

  return (
    <ContentWrapper>
      <TitlePanel 
        title="Single Response"
        description="A single command that returns a single response"
        Icon={TiMessage}
        docs={true}
        color="#98c379"
      />
      <div className={classes.categoryHeader}>
        {module ? <span className={classes.edit}>Edit</span> : <span className={classes.new}>New</span>}  Single Response
      </div>
      <Paper className={classes.paper}>
        <form autoComplete="off" onSubmit={handleSubmit(onSubmit)} >
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
          <ResponseEditor
            labelText="Response"
            description="The response your bot will give."
            id="response"
            name="response"
            watch={watchResponse}
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
                onClick={handleCancel}
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
                color="teal"
              >
                Save
              </Button>
            </GridItem>
          </GridContainer>

        </form>
      </Paper>
    </ContentWrapper>
  );
}

CustomCommandSingle.propTypes = {
  classes: PropTypes.object.isRequired,
  bots: PropTypes.array.isRequired,
  setBots: PropTypes.func.isRequired,
  setApiAlert: PropTypes.func.isRequired,
  selectedBot: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomCommandSingle);