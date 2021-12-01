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
import Paper from '@material-ui/core/Paper';
import InputAdornment from '@material-ui/core/InputAdornment';

// Import custom components
import TitlePanel from './panels/TitlePanel';
import OutlinedInput from '../components/inputs/OutlinedInputDark';
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
  paper: {
    padding: "20px",
    marginBottom: theme.spacing(3),
    backgroundColor: theme.palette.gray.main,
    overflow: "hidden",
    color: theme.palette.white.main,
  },
});

function NewBot(props) {
  const { classes, setApiAlert } = props;
  const [visibility, setVisibility] = React.useState(false);
  const { register, handleSubmit, setError, formState: { errors } } = useForm({
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
      })
    ),
    defaultValues: {
      token: "",
    },
  });
  let history = useHistory();

  const onSubmit = async (data) => {
    const res = await BotService.addNewBot({ 
      prefix: data.prefix,
      botToken: data.token, 
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
        title="Create New Bot"
        description="Generic descript to take up room for now."
        image={newBotImage}
        docs={true}
      />
      <Paper className={classes.paper}>
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
            description="Bot application token from Discord's developer portal."
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
      </Paper>
    </ContentWrapper>
  );
}

export default withStyles(styles)(NewBot);