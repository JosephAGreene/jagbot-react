import React from 'react';

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
  trigger: Joi.string().required()
    .messages({
      "string.empty": `"Email" is required`,
      "any.required": `"Email" is required`,
    }),
  description: Joi.string().required(),
  location: Joi.string().required(),
  response: Joi.string().required(),
});

function CustomCommandSingle(props) {
  const { register, handleSubmit, control, formState:{ errors } } = useForm({resolver: joiResolver(schema)});

  const {classes} = props;
  

  const onSubmit = (data) => {
    console.log(data);
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
            labelText="Trigger"
            description="Command Trigger Word"
            id="trigger"
            name="trigger"
            formControlProps={{fullWidth: true}}
            inputProps={{...register("trigger")}}
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
            name="location"
            description="Bot Response Location"
            defaultValue="server"
          >
            <ControlledRadio
              value="server"
              label="Post in Server"
            />
            <ControlledRadio
              value="directmessage"
              label="Direct Message"
            />
          </ControlledRadioGroup>
          <OutlinedInput
            labelText="Response"
            description="The response your bot will give."
            id="response"
            name="response"
            multiline
            rows={10}
            formControlProps={{fullWidth: true}}
            inputProps={{...register("response")}}
            error={errors}
          />
          <GridContainer justifyContent="flex-end">
            <GridItem>
              <Button
                onClick={()=>console.log('hit')}
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