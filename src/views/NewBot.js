import React from 'react';
import { useHistory } from "react-router-dom";

// Import react-hook-form
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';

// Import API service
import BotService from "../services/BotService.js";

// Import MUI components
import { withStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';

// Import custom components
import TitlePanel from './panels/TitlePanel';
import ContentPanel from './panels/ContentPanel';
import OutlinedInput from '../components/inputs/OutlinedInputDark';
import ControlledCheckbox from '../components/inputs/ControlledCheckbox';
import Button from '../components/buttons/Button';
import GridContainer from '../components/grid/GridContainer';
import GridItem from '../components/grid/GridItem';

// Import layouts
import ContentWrapper from '../layouts/ContentWrapper';

// Import images
import newBotImage from '../assets/images/newbot.png';

// Import icons
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

const styles = (theme) => ({
  warningHeading: {
    color: theme.palette.white.main,
    margin: "25px 0 10px 0",
    fontSize: "18px",
  },
  warningBody: {
    color: theme.palette.white.dark,
    margin: "0 0 10px 0",
    fontSize: "16px",
  },
});

function NewBot(props) {
  const { classes, setApiAlert } = props;
  const [visibility, setVisibility] = React.useState(false);
  const { register, handleSubmit, control, setError, formState: { errors } } = useForm({
    resolver: joiResolver(
      Joi.object({
        prefix: Joi.string().trim().max(4).required()
          .messages({
            "string.empty": 'Prefix is required',
            "string.max": 'Prefix cannot be greater than 4 characters',
            "any.required": 'Prefix is required',
          }),
        token: Joi.string().trim().max(100).required()
          .messages({
            "string.empty": 'Token is required',
            "string.max": "Token cannot be greater than 100 characters",
            "any.required": 'Token is required',
          }),
        warningAcknowledged: Joi.boolean().required().invalid(false)
          .messages({
            "string.empty": 'Acknowledgement is required!',
            "any.invalid": 'Acknowledgement is required!',
            "any.required": 'Acknowledgement is required!',
          }),
      })
    ),
    defaultValues: {
      prefix: "",
      token: "",
      warningAcknowledged: false,
    },
  });
  let history = useHistory();

  const onSubmit = async (data) => {
    console.log(data);
    const res = await BotService.addNewBot({
      prefix: data.prefix,
      botToken: data.token,
      warningAcknowledged: data.warningAcknowledged,
    });

    if (res.status === 200) {
      setApiAlert({
        status: true,
        duration: 2500,
        severity: "success",
        message: `New bot added: ${res.data.name}`
      });
      history.push('stash/mybots');
    } else if (res.status === 418) {
      setError(res.data.error, { type: "manual", message: res.data.message });
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

  const toggleVisibility = () => {
    setVisibility(!visibility);
  }

  return (
    <ContentWrapper>
      <TitlePanel
        title="Add New Bot"
        description={"We only need a few things from you in order to setup your new bot. Please refer to the docs or watch the setup video if you need help."}
        listItems={[
          "Bot prefix must be unique", 
          "Generate a bot token through the Discord Developer Portal",
        ]}
        image={newBotImage}
      />
      <ContentPanel>
        <form autoComplete="off" onSubmit={handleSubmit(onSubmit)} >
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
          <OutlinedInput
            labelText="Token"
            description="Bot token from Discord Developer Portal."
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
          />

              <div className={classes.warningHeading}>
                Use Of Service Acknowledgement  
              </div>
              <div className={classes.warningBody}>
                EzBot exists soley as a "show of skill" for it's developer to attract employement.
                Your account, and any data related to it, may be lost at any time due to revisions, updates, server costs, or etc.
                No warranties or gaurantees are made in relation to EzBot. 
                You are free to enjoy the services offered by EzBot for as long as they exist.  
              </div>

              <ControlledCheckbox
                control={control}
                name="warningAcknowledged"
                error={errors}
                label="Acknowledged"
              />

          <GridContainer justifyContent="flex-end">
            <GridItem>
              <Button
                type="submit"
                variant="contained"
                color="teal"
              >
                Submit
              </Button>
            </GridItem>
          </GridContainer>
        </form>
      </ContentPanel>
    </ContentWrapper>
  );
}

export default withStyles(styles)(NewBot);