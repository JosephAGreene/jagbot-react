import React from 'react';
import {useHistory} from 'react-router-dom';

// Import API service
import BotService from "../../services/BotService.js";

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
import TitlePanel from '../../components/panels/TitlePanel';
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
});

const schema = Joi.object({
  command: Joi.string().required()
    .messages({
      "string.empty": `"Command" is required`,
      "any.required": `"Command" is required`,
    }),
  description: Joi.string().required(),
  responseLocation: Joi.string().required(),
  response: Joi.string().trim().required(),
});

function CustomCommandSingle(props) {
  const {classes, bots, selectedBot, setBots, setApiAlert} = props;
  const { register, 
          handleSubmit,
          control, 
          watch, 
          setValue,
          formState:{ errors } } = useForm({resolver: joiResolver(schema)});

  const watchResponse = watch("response", "");

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
    const payload = {
      "_id": selectedBot._id,
      ...data
    }

    const res = await BotService.addSingleResponseModule(payload);

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
        Single Response Command
      </div>
      <Paper className={classes.paper}>
        <form autoComplete="off" onSubmit={handleSubmit(onSubmit)} >
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
            inputProps={{...register("response")}}
            error={errors}
          />
          <GridContainer justifyContent="flex-end">
            <GridItem>
              <Button
                onClick={() => console.log('hit')}
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

export default withStyles(styles)(CustomCommandSingle);