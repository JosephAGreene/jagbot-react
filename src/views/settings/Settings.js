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
import InputAdornment from '@material-ui/core/InputAdornment';

// Import custom components
import TitlePanel from '../panels/TitlePanel';
import GridContainer from '../../components/grid/GridContainer';
import GridItem from '../../components/grid/GridItem';
import Button from '../../components/buttons/Button';
import OutlinedInput from '../../components/inputs/OutlinedInputDark';
import ControlledSelect from '../../components/inputs/ControlledSelect';
import MinDialoag from '../../components/dialogs/MinDialog';

// Import images
import settingsImage from '../../assets/images/settings.png';

// Import icons
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';


const updateStyles = makeStyles((theme) => ({
  paper: {
    padding: "20px",
    marginBottom: theme.spacing(3),
    backgroundColor: theme.palette.gray.main,
  },
  button: {
    marginLeft: theme.spacing(1),
  },
  heading: {
    fontSize: 18,
    letterSpacing: 0.5,
    color: theme.palette.white.main,
  },
  content: {
    color: theme.palette.white.dark,
  },
  online: {
    color: theme.palette.success.main,
  },
  offline: {
    color: theme.palette.error.main,
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
  const [loading, setLoading] = React.useState(false);

  const { register, handleSubmit, watch, setValue, setError, formState: { errors } } = useForm({
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
    setLoading(true);
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
    } else if (res.status === 418) {
      setError("name", { type: "manual", message: res.data });
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
    setLoading(false);
  }

  const resetField = () => {
    setValue('name', botName, { shouldValidate: true });
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
                  className={classes.button}
                  onClick={resetField}
                  variant="contained"
                  color="orange"
                  disabled={loading}
                >
                  Reset
                </Button>
                <Button
                  className={classes.button}
                  type="submit"
                  variant="contained"
                  color="purple"
                  loading={loading}
                >
                  Update
                </Button>
              </>
              :
              <>
                <Button
                  className={classes.button}
                  variant="contained"
                  color="gray"
                  disabled
                >
                  Reset
                </Button>
                <Button
                  className={classes.button}
                  variant="contained"
                  color="gray"
                  disabled
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

function UpdateAvatar(props) {
  const { botId, setSelectedBot, setApiAlert } = props;
  const classes = updateStyles();

  const { register, handleSubmit, reset, setError, formState: { errors } } = useForm({
    resolver: joiResolver(
      Joi.object({
        avatar: Joi.custom((value, helper) => {
          if (value[0] === undefined) {
            return helper.message("Avatar must be an image file");
          }
          else if (value[0].size > 8000000) {
            return helper.message("Avater must be less than 8mb");
          } else {
            return value;
          }
        })
      })
    ),
    defaultValues: {
      avatar: "",
    },
  });

  const onSubmit = async (data) => {
    const payload = {
      botId: botId,
      avatar: data.avatar[0],
    }
    const res = await BotService.updateBotAvatar(payload);

    if (res.status === 200) {
      setSelectedBot(res.data);
      setApiAlert({
        status: true,
        duration: 2500,
        severity: "success",
        message: "Bot avatar has been updated!"
      });
      reset();
    } else if (res.status === 418) {
      setError("avatar", { type: "manual", message: res.data });
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

  return (
    <Paper elevation={2} className={classes.paper} >
      <form autoComplete="off" onSubmit={handleSubmit(onSubmit)} >
        <GridContainer justifyContent="flex-end" alignItems="center">
          <GridItem xs={12}>
            <OutlinedInput
              labelText="New avatar"
              description="Your bot's avatar"
              id="avatar"
              name="avatar"
              formControlProps={{ fullWidth: true }}
              inputProps={{ ...register("avatar") }}
              error={errors}
              labelProps={{ shrink: true }}
              type="file"
            />
          </GridItem>
          <GridItem right>
            <Button
              type="submit"
              variant="contained"
              color="purple"
              className={classes.button}
            >
              Update
            </Button>
          </GridItem>
        </GridContainer>
      </form>
    </Paper >
  )
}

UpdateAvatar.propTypes = {
  botId: PropTypes.string.isRequired,
  setSelectedBot: PropTypes.func.isRequired,
  setApiAlert: PropTypes.func.isRequired,
};

function UpdatePrefix(props) {
  const { botPrefix, botId, setSelectedBot, setApiAlert } = props;
  const classes = updateStyles();
  const [loading, setLoading] = React.useState(false);

  const { register, handleSubmit, watch, setValue, setError, formState: { errors } } = useForm({
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
    setLoading(true);
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
    } else if (res.status === 418) {
      setError("prefix", { type: "manual", message: res.data });
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
    setLoading(false);
  }

  const resetField = () => {
    setValue('prefix', botPrefix, { shouldValidate: true });
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
                  className={classes.button}
                  onClick={resetField}
                  variant="contained"
                  color="orange"
                  disabled={loading}
                >
                  Reset
                </Button>
                <Button
                  className={classes.button}
                  type="submit"
                  variant="contained"
                  color="purple"
                  loading={loading}
                >
                  Update
                </Button>
              </>
              :
              <>
                <Button
                  className={classes.button}
                  variant="contained"
                  color="gray"
                  disabled
                >
                  Reset
                </Button>
                <Button
                  className={classes.button}
                  variant="contained"
                  color="gray"
                  disabled
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
  const [loading, setLoading] = React.useState(false);
  const [visibility, setVisibility] = React.useState(false);

  const { register, handleSubmit, watch, setValue, setError, formState: { errors } } = useForm({
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
    setLoading(true);
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
    setLoading(false);
  }

  const resetField = () => {
    setValue('token', botToken, { shouldValidate: true });
  }

  const toggleVisibility = () => {
    setVisibility(!visibility);
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
              inputProps={{ ...register("token"), type: (visibility ? "text" : "password"), maxLength: 100 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end" onClick={toggleVisibility} style={{ cursor: "pointer", }}>
                    {visibility ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </InputAdornment>
                ),
              }}
              error={errors}
              labelProps={{ shrink: true }}
            />
          </GridItem>
          <GridItem right>
            {edited
              ?
              <>
                <Button
                  className={classes.button}
                  onClick={resetField}
                  variant="contained"
                  color="orange"
                  disabled={loading}
                >
                  Reset
                </Button>
                <Button
                  className={classes.button}
                  type="submit"
                  variant="contained"
                  color="purple"
                  loading={loading}
                >
                  Update
                </Button>
              </>
              :
              <>
                <Button
                  className={classes.button}
                  variant="contained"
                  color="gray"
                  disabled
                >
                  Reset
                </Button>
                <Button
                  className={classes.button}
                  variant="contained"
                  color="gray"
                  disabled
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

function UpdateActivity(props) {
  const { botActivityType, botActivityText, botId, setSelectedBot, setApiAlert } = props;
  const classes = updateStyles();
  const [loading, setLoading] = React.useState(false);

  const { register, handleSubmit, watch, reset, control, setError, formState: { isSubmitSuccessful, errors } } = useForm({
    resolver: joiResolver(
      Joi.object({
        activityType: Joi.string().trim().valid('none', 'playing', 'listening', 'watching', 'competing').required()
          .messages({
            "string.empty": 'Activity type is required ("None" is valid)',
            "any.required": 'Activity type is required ("None" is valid)',
          }),
        activityText: Joi.when('activityType', {
          is: Joi.string().trim().valid("none"),
          then: Joi.string().allow('').trim().max(30).optional(),
          otherwise: Joi.string().trim().max(30),
        })
          .messages({
            "string.empty": 'Activity name is required',
            "string.max": 'Activity name cannot be greater than 30 characters',
            "any.required": 'Activity name property is required',
          }),
      })
    ),
    defaultValues: {
      activityType: botActivityType,
      activityText: botActivityText,
    },
  });

  const currentActivityType = watch("activityType");
  const currentActivityText = watch("activityText");
  const edited = isDifferent(botActivityType, currentActivityType) || isDifferent(botActivityText, currentActivityText);

  // Memoized with useCallback so that the function maybe be used
  // in conjuction with useEffect in order to maintain updated values for 
  // botActivityType and botActivityText without forcing unceccessary re-renders.
  const resetFields = React.useCallback(() => {
    reset({
      activityType: botActivityType,
      activityText: botActivityText,
    });
  }, [botActivityType, botActivityText, reset]);

  // useEffect required in order to reset field values once setSelectedBot
  // has been called on submission.
  React.useEffect(() => {
    if (isSubmitSuccessful) {
      resetFields();
    }
  }, [isSubmitSuccessful, resetFields])

  const onSubmit = async (data) => {
    setLoading(true);
    const payload = {
      botId: botId,
      activityType: data.activityType,
      activityText: data.activityText,
    }
    const res = await BotService.updateBotActivity(payload);

    if (res.status === 200) {
      setSelectedBot(res.data);
      setApiAlert({
        status: true,
        duration: 2500,
        severity: "success",
        message: "Bot activity has been updated!"
      });
    } else if (res.status === 418) {
      setError("activityText", { type: "manual", message: res.data });
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
    setLoading(false);
  }

  return (
    <Paper elevation={2} className={classes.paper} >
      <form autoComplete="off" onSubmit={handleSubmit(onSubmit)} >
        <GridContainer justifyContent="flex-end" alignItems="center">
          <GridItem xs={12}>
            <ControlledSelect
              name="activityType"
              description="Your bot's activity type (Select 'none' to remove current activity)"
              id="activityType"
              label="Type"
              labelId="type-select-label"
              defaultValue=""
              items={[
                { value: "none", name: "None" },
                { value: "playing", name: "Playing" },
                { value: "listening", name: "Listening" },
                { value: "watching", name: "Watching" },
                { value: "competing", name: "Competing" },
              ]}
              control={control}
              error={errors}
            />
            <OutlinedInput
              labelText="Activity name"
              description="The name of your bot's activity"
              id="activityText"
              name="activityText"
              formControlProps={{ fullWidth: true }}
              inputProps={{ ...register("activityText"), maxLength: 30 }}
              error={errors}
              labelProps={{ shrink: true }}
            />
          </GridItem>
          <GridItem right>
            {edited
              ?
              <>
                <Button
                  className={classes.button}
                  onClick={resetFields}
                  variant="contained"
                  color="orange"
                  disabled={loading}
                >
                  Reset
                </Button>
                <Button
                  className={classes.button}
                  type="submit"
                  variant="contained"
                  color="purple"
                  loading={loading}
                >
                  Update
                </Button>
              </>
              :
              <>
                <Button
                  className={classes.button}
                  variant="contained"
                  color="gray"
                  disabled
                >
                  Reset
                </Button>
                <Button
                  className={classes.button}
                  variant="contained"
                  color="gray"
                  disabled
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

UpdateActivity.propTypes = {
  botActivityType: PropTypes.string.isRequired,
  botActivityText: PropTypes.string.isRequired,
  botId: PropTypes.string.isRequired,
  setSelectedBot: PropTypes.func.isRequired,
  setApiAlert: PropTypes.func.isRequired,
};

function UpdateEnabled(props) {
  const { botEnabled, botId, setSelectedBot, setApiAlert } = props;
  const classes = updateStyles();
  const [loading, setLoading] = React.useState(false);

  const updateEnabled = async (enabled) => {
    setLoading(true);
    const payload = {
      botId: botId,
      enabled: enabled,
    }
    const res = await BotService.updateBotEnabled(payload);

    if (res.status === 200) {
      setSelectedBot(res.data);
      setApiAlert({
        status: true,
        duration: 2500,
        severity: "success",
        message: enabled ? "Bot has been enabled!" : "Bot has been disabled!",
      });
    } else if (res.status === 418) {
      setApiAlert({
        status: true,
        duration: 4000,
        severity: "error",
        message: res.data,
      });
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
    setLoading(false);
  }

  return (
    <Paper elevation={2} className={classes.paper} >
      <GridContainer>
        <GridItem xs={12} sm={12} md={8} lg={8}>
          <div className={classes.heading}>
            Bot Status
          </div>
          <div className={botEnabled ? classes.online : classes.offline}>
            {botEnabled ? 'Online' : 'Offline'}
          </div>
        </GridItem>
        <GridItem xs={12} sm={12} md={4} lg={4} right>
          {botEnabled
            ?
            <Button
              className={classes.button}
              onClick={() => updateEnabled(false)}
              variant="contained"
              color="danger"
              loading={loading}
            >
              Disable
            </Button>
            :
            <Button
              className={classes.button}
              onClick={() => updateEnabled(true)}
              variant="contained"
              color="teal"
              loading={loading}
            >
              Enable
            </Button>
          }
        </GridItem>
      </GridContainer>
    </Paper >
  )
}

UpdateEnabled.propTypes = {
  botEnabled: PropTypes.bool.isRequired,
  botId: PropTypes.string.isRequired,
  setSelectedBot: PropTypes.func.isRequired,
  setApiAlert: PropTypes.func.isRequired,
};

function DeleteBot(props) {
  const { botId, botName, setSelectedBot, setApiAlert } = props;
  const classes = updateStyles();
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const deleteBot = async () => {
    setLoading(true);
    const res = await BotService.deleteBot(botId);
    if (res.status === 200) {
      const name = botName;
      setSelectedBot(false);
      setApiAlert({
        status: true,
        duration: 2500,
        severity: "success",
        message: `${name} bot has been deleted!`,
      });
    }
    setLoading(false);
  }

  return (
    <Paper elevation={2} className={classes.paper} >
      <GridContainer>
        <GridItem xs={12} sm={12} md={8} lg={8}>
          <div className={classes.heading}>
            Delete Bot
          </div>
          <div className={classes.content}>
            Permanently delete this bot.
          </div>
        </GridItem>
        <GridItem xs={12} sm={12} md={4} lg={4} right>
          <Button
            onClick={() => setOpen(true)}
            variant="contained"
            color="danger"
            className={classes.button}
          >
            Delete Bot
          </Button>
        </GridItem>
      </GridContainer>
      <MinDialoag
        open={open}
        setOpen={setOpen}
        keepMounted={false}
      >
        <div style={{ padding: "20px" }}>
          <div className={classes.heading}>
            You are about to delete the following bot:
          </div>
          <div className={classes.content} style={{ marginBottom: "20px" }}>
            {botName}
          </div>
          <GridContainer>
            <GridItem xs={12} right>
              <Button
                className={classes.button}
                onClick={() => setOpen(false)}
                variant="contained"
                color="danger"
                loading={loading}
              >
                Cancel
              </Button>
              <Button
                className={classes.button}
                onClick={deleteBot}
                variant="contained"
                color="teal"
                loading={loading}
              >
                Confirm Deletion
              </Button>
            </GridItem>
          </GridContainer>
        </div>
      </MinDialoag>
    </Paper >
  )
}

DeleteBot.propTypes = {
  botId: PropTypes.string.isRequired,
  botName: PropTypes.string.isRequired,
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
        docs={[]}
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
      <UpdateAvatar
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
      <UpdateActivity
        botActivityType={selectedBot.activityType}
        botActivityText={selectedBot.activityText}
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
      <UpdateEnabled
        botEnabled={selectedBot.enabled}
        botId={selectedBot._id}
        setSelectedBot={setSelectedBot}
        setApiAlert={setApiAlert}
      />
      <DeleteBot
        botId={selectedBot._id}
        botName={selectedBot.name}
        setSelectedBot={setSelectedBot}
        setApiAlert={setApiAlert}
      />
    </ContentWrapper>
  );
}

Settings.propTypes = {
  setSelectedBot: PropTypes.func.isRequired,
  selectedBot: PropTypes.object.isRequired,
  setApiAlert: PropTypes.func.isRequired,
};

export default Settings;