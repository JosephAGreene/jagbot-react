import React from 'react';

// Import react-hook-form
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';

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
  const { classes } = props;
  const [ visibility, setVisibility ] = React.useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: joiResolver(
      Joi.object({
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

  const onSubmit = (data) => {
    console.log(data);
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
            labelText="Token"
            description="Bot application token from Discord's developer portal."
            id="token"
            name="token"
            formControlProps={{ fullWidth: true }}
            inputProps={{ ...register("token"), type: (visibility ? "text" : "password"), maxLength: 100 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end" onClick={toggleVisibility} style={{cursor: "pointer",}}>
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
                Save
              </Button>
            </GridItem>
          </GridContainer>
        </form>
      </Paper>
    </ContentWrapper>
  );
}

export default withStyles(styles)(NewBot);