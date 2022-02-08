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

// Import custom components
import TitlePanel from '../panels/TitlePanel';
import ContentPanel from '../panels/ContentPanel.js';
import OutlinedInput from '../../components/inputs/OutlinedInputDark';
import Button from '../../components/buttons/Button';
import GridContainer from '../../components/grid/GridContainer';
import GridItem from '../../components/grid/GridItem';
import ControlledRadioGroup from '../../components/inputs/ControlledRadioGroup';
import ControlledRadio from '../../components/inputs/ControlledRadio';
import RandomResponseList from './lists/RandomResponseList';
import AddResponseDialog from './dialogs/AddResponseDialog';

// Import icons
import { GiPerspectiveDiceSixFacesRandom } from 'react-icons/gi';

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
  addResponseButton: {
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
      "string.empty": `"Response Location" is required`,
      "any.required": `"Response Location" is required`,
    }),
  responses: Joi.array().min(1).required()
  .messages({
    "array.min": `At least one random response is required`,
    "any.required": `At least one random response is required`,
  }),
});

function setDefaultValues(module) {
  if (module) {
    return {
      command: module.command,
      description: module.description,
      responseLocation: module.responseLocation,
      responses: module.responses,
    }
  } else {
    return {
      command: '',
      description: '',
      responseLocation: 'server',
      responses: [],
    }
  }
} 

function CustomCommandRandom (props) {
  const {selectedBot, setSelectedBot, setApiAlert} = props;
  const {module} = useLocation();
  const [responseDialog, setResponseDialog] = React.useState(false);
  const [editResponse, setEditResponse] = React.useState(false);

  const {register, handleSubmit, control, setValue, watch, setError, formState:{errors}} = useForm({
    resolver: joiResolver(schema),
    defaultValues: setDefaultValues(module),
  });

  const watchResponses = watch("responses");

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

    const res = await CustomModuleService.addRandomResponseModule(payload);

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

    const res = await CustomModuleService.updateRandomResponseModule(payload);

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

  const openResponseDialog = (response) => {
    setEditResponse(response);
    setResponseDialog(true);
  }

  const closeResponseDialog = () => {
    setResponseDialog(false);
    setEditResponse(false);
  }

  const setResponsesArray = (newArray) => {
    setValue('responses', newArray);
  }

  return (
    <ContentWrapper>
      <TitlePanel 
        title="Random Response"
        description="A single command that returns a randomly choosen response from a list of potential responses."
        listItems={["Max 50 responses"]}
        docs={[]}
        Icon={GiPerspectiveDiceSixFacesRandom}
        color="#c678DD"
      />
      <ContentPanel
        headerPhase={module ? "Edit" : "New"}
        header={'Random Response'}
      >
        <form autoComplete="off">
          <OutlinedInput
            labelText="Command"
            description="Command Trigger Word"
            id="command"
            name="command"
            maxLength={30}
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
          <input type="hidden" id="responses" name="responses" {...register("responses")} value={watchResponses} />
        </form>
        <RandomResponseList 
          setResponsesArray={setResponsesArray} 
          responsesArray={watchResponses} 
          error={errors.responses}
          openResponseDialog={openResponseDialog}
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
      </ContentPanel>
      <AddResponseDialog 
        responsesArray={watchResponses}
        setResponsesArray={setResponsesArray} 
        responseDialog={responseDialog}
        closeResponseDialog={closeResponseDialog} 
        setResponseDialog={setResponseDialog}
        editResponse={editResponse}
        setEditResponse={setEditResponse} 
      />
    </ContentWrapper>
  );
}

CustomCommandRandom.propTypes = {
  selectedBot: PropTypes.object.isRequired,
  setSelectedBot: PropTypes.func.isRequired,
  setApiAlert: PropTypes.func.isRequired,
};