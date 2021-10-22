import React from 'react';

// Import react-hook-form
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';

// Import API service
import BotService from "../../services/BotService.js";

// Import layouts
import ContentWrapper from '../../layouts/ContentWrapper';

// Import MUI components
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

// Import custom components
import TitlePanel from '../panels/TitlePanel';
import GridContainer from '../../components/grid/GridContainer';
import GridItem from '../../components/grid/GridItem';
import Button from '../../components/buttons/Button';
import OutlinedInput from '../../components/inputs/OutlinedInputDark';

// Import images
import settingsImage from '../../assets/images/settings.png';


const updateStyles = makeStyles((theme) => ({
  paper: {
    padding: "20px",
    marginBottom: theme.spacing(3),
    backgroundColor: theme.palette.gray.main,
  },
  button: {
    marginLeft: theme.spacing(1),
  }
}));

function isDifferent(originalValue, currentValue) {
  if (originalValue.trim().localeCompare(currentValue.trim()) === 0) {
    return false;
  } else {
    return true;
  }
}

function UpdatePrefix(props) {
  const { botPrefix, botId, setSelectedBot, setApiAlert } = props;
  const classes = updateStyles();

  const { register, handleSubmit, watch, reset, setError, formState: { errors } } = useForm({
    resolver: joiResolver(
      Joi.object({
        prefix: Joi.string().trim().max(4).required()
          .messages({
            "string.empty": 'Prefix is required',
            "string.max": 'Prefix cannot be greater than 4 characters',
            "any.required": 'Prefix is required',
          }),
      })
    ),
    defaultValues: {
      prefix: botPrefix ? botPrefix : "",
    },
  });

  const currentPrefix = watch("prefix");
  const edited = isDifferent(botPrefix, currentPrefix);

  const onSubmit = async (data) => {
    const payload = {
      botId: botId,
      prefix: data.prefix
    }
    const res = await BotService.updateBotPrefix(payload);

    if (res.status === 200) {
      setSelectedBot(res.data);
      setApiAlert({
        status: true,
        duration: 2500,
        severity: "success",
        message: "Bot prefix has been updated!"
      });
    } else 

    if (res.status === 409 && res.data === "duplicate prefix") {
      setError("prefix", { type: "manual", message: "Another bot you own already has this prefix!" });
    }
  }

  const resetField = () => {
    reset();
  }

  return (
    <Paper elevation={2} className={classes.paper} >
      <form autoComplete="off" onSubmit={handleSubmit(onSubmit)} >
        <GridContainer justifyContent="flex-end" alignItems="center">
          <GridItem xs={12}>
            <OutlinedInput
              value={currentPrefix}
              labelText="Prefix"
              description="The prefix used to trigger bot commands."
              id="prefix"
              name="prefix"
              formControlProps={{ fullWidth: true }}
              inputProps={{ ...register("prefix"), maxLength: 4}}
              error={errors}
              labelProps={{shrink: true}}
            />
          </GridItem>
          <GridItem right>
            {edited
              ?
              <>
                <Button
                  onClick={resetField}
                  variant="contained"
                  color="orange"
                  className={classes.button}
                >
                  Reset
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="purple"
                  className={classes.button}
                >
                  Update
                </Button>
              </>
              :
              <>
                <Button
                  variant="contained"
                  color="gray"
                  disabled
                  className={classes.button}
                >
                  Reset
                </Button>
                <Button
                  variant="contained"
                  color="gray"
                  disabled
                  className={classes.button}
                >
                  Update
                </Button>
              </>
            }
          </GridItem>
        </GridContainer>
      </form>
    </Paper >
  )
}

function Settings(props) {
  const { selectedBot, setSelectedBot, setApiAlert } = props;

  return (
    <ContentWrapper>
      <TitlePanel
        title="Settings"
        description="Your bot's settings."
        image={settingsImage}
        docs={true}
      />
      <UpdatePrefix
        botPrefix={selectedBot.prefix}
        botId={selectedBot._id}
        setSelectedBot={setSelectedBot}
        setApiAlert={setApiAlert}
      />
    </ContentWrapper>
  );
}



export default Settings;