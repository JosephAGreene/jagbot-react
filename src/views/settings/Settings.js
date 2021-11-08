import React from 'react';
import PropTypes from "prop-types";

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
import ControlledSelect from '../../components/inputs/ControlledSelect.js';

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

const settingsStyles = makeStyles((theme) => ({
  categoryHeader: {
    marginTop: theme.spacing(6),
    marginBottom: theme.spacing(2),
    marginLeft: theme.spacing(1),
    color: theme.palette.white.dark,
    fontSize: 24,
  },
}));

function isDifferent(originalValue, currentValue) {
  if (originalValue.trim().localeCompare(currentValue.trim()) === 0) {
    return false;
  } else {
    return true;
  }
}

function UpdateName(props) {
  const { botName, botId, setSelectedBot, setApiAlert } = props;
  const classes = updateStyles();

  const { register, handleSubmit, watch, reset, setError, formState: { errors } } = useForm({
    resolver: joiResolver(
      Joi.object({
        name: Joi.string().trim().max(30).required()
          .messages({
            "string.empty": 'Bot name is required',
            "string.max": "Bot's name cannot be greater than 30 characters",
            "any.required": 'Bot name is required',
          }),
      })
    ),
    defaultValues: {
      name: botName ? botName : "",
    },
  });

  const currentName = watch("name");
  const edited = isDifferent(botName, currentName);

  const onSubmit = async (data) => {
    const payload = {
      botId: botId,
      name: data.name,
    }
    const res = await BotService.updateBotName(payload);

    if (res.status === 200) {
      setSelectedBot(res.data);
      setApiAlert({
        status: true,
        duration: 2500,
        severity: "success",
        message: "Bot name has been updated!"
      });
    } else if (res.status === 429) {
      setError("name", { type: "manual", message: "You've been rate limited. Name changes are limited to 2 per hour." });
    } else if (res.status === 418) {
      setError("name", { type: "manual", message: "Bot's name cannot be changed while it is offline." });
    } else if (res.status === "dead") {
      setApiAlert({
        status: true,
        duration: 2500,
        severity: "error",
        message: "Server is busy or offline. Try again later."
      });
    } else {
      console.log(res.data);
      setApiAlert({
        status: true,
        duration: 2500,
        severity: "error",
        message: "Something went wrong. Hint: Check the console!"
      });
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
              labelText="Name"
              description="Your bot's username"
              id="name"
              name="name"
              formControlProps={{ fullWidth: true }}
              inputProps={{ ...register("name"), maxLength: 30 }}
              error={errors}
              labelProps={{ shrink: true }}
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

UpdateName.propTypes = {
  botName: PropTypes.string.isRequired,
  botId: PropTypes.string.isRequired,
  setSelectedBot: PropTypes.func.isRequired,
  setApiAlert: PropTypes.func.isRequired,
};

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
              labelText="Prefix"
              description="The prefix used to trigger bot commands."
              id="prefix"
              name="prefix"
              formControlProps={{ fullWidth: true }}
              inputProps={{ ...register("prefix"), maxLength: 4 }}
              error={errors}
              labelProps={{ shrink: true }}
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

UpdatePrefix.propTypes = {
  botPrefix: PropTypes.string.isRequired,
  botId: PropTypes.string.isRequired,
  setSelectedBot: PropTypes.func.isRequired,
  setApiAlert: PropTypes.func.isRequired,
};

function UpdateToken(props) {
  const { botToken, botId, setSelectedBot, setApiAlert } = props;
  const classes = updateStyles();

  const { register, handleSubmit, watch, reset, setError, formState: { errors } } = useForm({
    resolver: joiResolver(
      Joi.object({
        token: Joi.string().trim().max(100).required()
          .messages({
            "string.empty": "Bot token is required",
            "string.max": "Bot's token cannot be greater than 100 characters",
            "any.required": 'Bot token is required',
          }),
      })
    ),
    defaultValues: {
      token: botToken ? botToken : "",
    },
  });

  const currentToken = watch("token");
  const edited = isDifferent(botToken, currentToken);

  const onSubmit = async (data) => {
    const payload = {
      botId: botId,
      token: data.token,
    }
    const res = await BotService.updateBotToken(payload);

    if (res.status === 200) {
      setSelectedBot(res.data);
      setApiAlert({
        status: true,
        duration: 2500,
        severity: "success",
        message: "Bot token has been updated!"
      });
    } else if (res.status === 418) {
      setError("token", { type: "manual", message: res.data });
    } else if (res.status === "dead") {
      setApiAlert({
        status: true,
        duration: 2500,
        severity: "error",
        message: "Server is busy or offline. Try again later."
      });
    } else {
      console.log(res.data);
      setApiAlert({
        status: true,
        duration: 2500,
        severity: "error",
        message: "Something went wrong. Hint: Check the console!"
      });
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
              labelText="Token"
              description="Your bot's token"
              id="token"
              name="token"
              formControlProps={{ fullWidth: true }}
              inputProps={{ ...register("token"), type: "password", maxLength: 100 }}
              error={errors}
              labelProps={{ shrink: true }}
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

UpdateToken.propTypes = {
  botToken: PropTypes.string.isRequired,
  botId: PropTypes.string.isRequired,
  setSelectedBot: PropTypes.func.isRequired,
  setApiAlert: PropTypes.func.isRequired,
};

function UpdateStatus(props) {
  const { botStatusType, botStatusName, botId, setSelectedBot, setApiAlert } = props;
  const classes = updateStyles();

  const { register, handleSubmit, watch, reset, control, setError, formState: { errors } } = useForm({
    resolver: joiResolver(
      Joi.object({
        statusType: Joi.string().trim().valid('none', 'playing', 'streaming', 'listening', 'watching', 'competing').required()
          .messages({
            "string.empty": 'Activity type is required ("None" is valid)',
            "any.required": 'Activity type is required ("None" is valid)',
          }),
        statusName: Joi.string().trim().max(30),
      })
    ),
    defaultValues: {
      statusType: botStatusType ? botStatusType : "none",
      statusName: botStatusName ? botStatusName : "",
    },
  });

  const currentStatusType = watch("statusType");
  const currentStatusName = watch("statusName");
  const edited = isDifferent(botStatusType, currentStatusType) || isDifferent(botStatusName, currentStatusName);

  const onSubmit = async (data) => {
    console.log(data);
    // const payload = {
    //   botId: botId,
    //   token: data.token,
    // }
    // const res = await BotService.updateBotToken(payload);

    // if (res.status === 200) {
    //   setSelectedBot(res.data);
    //   setApiAlert({
    //     status: true,
    //     duration: 2500,
    //     severity: "success",
    //     message: "Bot token has been updated!"
    //   });
    // }  else if (res.status === 418) {
    //   setError("token", { type: "manual", message: res.data });
    // } else if (res.status === "dead") {
    //   setApiAlert({
    //     status: true,
    //     duration: 2500,
    //     severity: "error",
    //     message: "Server is busy or offline. Try again later."
    //   });
    // } else {
    //   console.log(res.data);
    //   setApiAlert({
    //     status: true,
    //     duration: 2500,
    //     severity: "error",
    //     message: "Something went wrong. Hint: Check the console!"
    //   });
    // }
  }

  const resetField = () => {
    reset();
  }

  return (
    <Paper elevation={2} className={classes.paper} >
      <form autoComplete="off" onSubmit={handleSubmit(onSubmit)} >
        <GridContainer justifyContent="flex-end" alignItems="center">
          <GridItem xs={12}>
            <ControlledSelect
              name="statusType"
              description="Your bot's status type"
              id="statusType"
              label="Type"
              labelId="type-select-label"
              defaultValue=""
              items={[
                { value: "none", name: "none" },
                { value: "playing", name: "playing" },
                { value: "streaming", name: "streaming" },
                { value: "listening", name: "listening" },
                { value: "watching", name: "watching" },
                { value: "competing", name: "competing" },
                { value: 'invalid', name: "invalid" },
              ]}
              control={control}
              error={errors}
            />
            <OutlinedInput
              labelText="Activity"
              description="Your bot's status text"
              id="statusName"
              name="statusName"
              formControlProps={{ fullWidth: true }}
              inputProps={{ ...register("statusName"), maxLength: 30 }}
              error={errors}
              labelProps={{ shrink: true }}
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

UpdateStatus.propTypes = {
  botStatusType: PropTypes.string.isRequired,
  botStatusName: PropTypes.string.isRequired,
  botId: PropTypes.string.isRequired,
  setSelectedBot: PropTypes.func.isRequired,
  setApiAlert: PropTypes.func.isRequired,
};

function Settings(props) {
  const { selectedBot, setSelectedBot, setApiAlert } = props;
  const classes = settingsStyles();

  return (
    <ContentWrapper>
      <TitlePanel
        title="Settings"
        description="Your bot's settings."
        image={settingsImage}
        docs={true}
      />
      <div className={classes.categoryHeader}>
        General Settings
      </div>
      <UpdateName
        botName={selectedBot.name}
        botId={selectedBot._id}
        setSelectedBot={setSelectedBot}
        setApiAlert={setApiAlert}
      />
      <UpdatePrefix
        botPrefix={selectedBot.prefix}
        botId={selectedBot._id}
        setSelectedBot={setSelectedBot}
        setApiAlert={setApiAlert}
      />
      <UpdateStatus
        botStatusType={selectedBot.botStatusType ? selectedBot.botStatusType : ""}
        botStatusName={selectedBot.botStatusName ? selectedBot.botStatusName : ""}
        botId={selectedBot._id}
        setSelectedBot={setSelectedBot}
        setApiAlert={setApiAlert}
      />
      <div className={classes.categoryHeader}>
        Application Settings
      </div>
      <UpdateToken
        botToken={selectedBot.botToken}
        botId={selectedBot._id}
        setSelectedBot={setSelectedBot}
        setApiAlert={setApiAlert}
      />
    </ContentWrapper>
  );
}

Settings.propTypes = {
  setSelectedBot: PropTypes.func.isRequired,
  selectedBot: PropTypes.oneOfType([
    PropTypes.object.isRequired,
    PropTypes.bool.isRequired,
  ]),
  setApiAlert: PropTypes.func.isRequired,
};

export default Settings;