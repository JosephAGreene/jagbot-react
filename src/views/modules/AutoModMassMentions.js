import React from 'react';
import PropTypes from "prop-types";
import { useHistory, useLocation } from 'react-router-dom';

// Import API service
import AutoModService from "../../services/AutoModService.js";

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
import ResponseEditor from '../../components/inputs/ResponseEditor';
import RoleChipInput from '../../components/inputs/RoleChipInput';
import Button from '../../components/buttons/Button';
import GridContainer from '../../components/grid/GridContainer';
import GridItem from '../../components/grid/GridItem';
import ControlledRadioGroup from '../../components/inputs/ControlledRadioGroup';
import ControlledRadio from '../../components/inputs/ControlledRadio';
import ControlledCheckbox from '../../components/inputs/ControlledCheckbox';
import OutlinedInput from '../../components/inputs/OutlinedInputDark.js';

// Import images
import massMentionsImage from '../../assets/images/massmentions.png';

const styles = (theme) => ({
  paper: {
    padding: "20px",
    marginBottom: theme.spacing(3),
    backgroundColor: theme.palette.gray.main,
    overflow: "hidden",
    color: theme.palette.white.main,
  },
});

const schema = Joi.object({
  enabled: Joi.bool().required(),
  limit: Joi.when('enabled', {
    is: Joi.boolean().valid(true), then: Joi.number().integer().min(3).max(20).required(),
    otherwise: Joi.number().integer().allow(null, '').min(3).max(20).optional()
  })
    .messages({
      "number.min": "Limit must be at least 3",
      "number.max": "Limit cannot be greater than 20",
      "number.base": "Limit must be a number",
    }),
  delete: Joi.when('enabled', {
    is: Joi.boolean().valid(true),
    then: Joi.when('warn', {
      is: Joi.boolean().valid(false),
      then: Joi.boolean().valid(true).required(),
      otherwise: Joi.bool().required(),
    })
  })
    .messages({
      "any.only": 'Delete and/or Warn must be checked when Enabled is checked'
    }),
  warn: Joi.when('enabled', {
    is: Joi.boolean().valid(true),
    then: Joi.when('delete', {
      is: Joi.boolean().valid(false),
      then: Joi.boolean().valid(true).required(),
      otherwise: Joi.bool().required(),
    })
  })
    .messages({
      "any.only": 'Delete and/or Warn must be checked when Enabled is checked'
    }),
  location: Joi.string().trim().required()
    .messages({
      "string.empty": 'Response Location is required',
      "any.required": 'Response Location is required',
    }),
  response: Joi.when('warn', {
    is: Joi.boolean().valid(true), then: Joi.string().trim().max(1000).required(),
    otherwise: Joi.string().allow('').default('').trim().optional().max(1000)
  })
    .messages({
      "string.empty": 'Warning is required',
      "string.max": 'Warning cannot be greater than 1000 characters',
      "any.required": 'Warning is required',
    }),
  ignoredRoles: Joi.array().required(),
});

// In practice, a value for the module param will always exist
// for automoderation modules. Even so, backup values that match
// the default mongoDB module model are provided. 
function setDefaultValues(module) {
  if (module) {
    return {
      enabled: module.enabled,
      limit: module.limit,
      delete: module.delete,
      warn: module.warn,
      location: module.location,
      response: module.response,
      ignoredRoles: module.ignoredRoles,
    }
  } else {
    return {
      enabled: false,
      limit: 5,
      delete: false,
      warn: false,
      location: 'server',
      response: '',
      ignoredRoles: [],
    }
  }
}

function AutoModMassMentions(props) {
  const { classes, selectedBot, setSelectedBot, setApiAlert } = props;
  const { module } = useLocation();
  const history = useHistory();

  const { register, handleSubmit, control, watch, setValue, trigger, formState: { errors, isSubmitted } } = useForm({
    resolver: joiResolver(schema),
    defaultValues: setDefaultValues(module),
  });

  const watchResponse = watch("response", (module ? module.response : ''));
  const watchIgnoredRoles = watch('ignoredRoles');
  const watchWarn = watch("warn");
  const watchDelete = watch("delete");
  const watchEnabled = watch("enabled");

  // useEffect required in order to trigger revalidation of field
  // values that rely on other field values for validation 
  React.useEffect(() => {
    const triggerValidate = async () => {
      await trigger();
    }

    if (isSubmitted) {
      triggerValidate();
    }
  }, [isSubmitted, trigger, watchWarn, watchDelete, watchEnabled]);

  const onSubmit = async (data) => {
    const payload = {
      _id: selectedBot._id,
      ...data
    };

    const res = await AutoModService.updateMassMentionsFilter(payload);

    if (res.status === 200) {
      setSelectedBot(res.data);
      setApiAlert({
        status: true,
        duration: 2500,
        severity: "success",
        message: "The mass mentions filter has been udpated!"
      });
      history.push('/dashboard/develop/automoderation');
    } else {
      console.log(res);
      setApiAlert({
        status: true,
        duration: 2500,
        severity: "error",
        message: "Something went wrong. Check console."
      });
    }
  }

  const handleCancel = () => {
    history.push('/dashboard/develop/automoderation');
  }

  const showResponseOptions = () => {
    if (watchWarn) {
      return (
        <React.Fragment>
          <ControlledRadioGroup
            control={control}
            name="location"
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
            labelText="Warning"
            description="The warning your bot will give."
            id="response"
            name="response"
            watch={watchResponse}
            setValue={setValue}
            maxLength={1000}
            multiline
            rows={4}
            formControlProps={{ fullWidth: true }}
            inputProps={{ ...register("response"), maxLength: 1000 }}
            error={errors}
          />
        </React.Fragment>
      );
    }
  }

  return (
    <ContentWrapper>
      <TitlePanel
        title="Mass Mentions"
        description="Take action when a member has gone overboard with the mentions. You decide what overboard is."
        image={massMentionsImage}
        docs={true}
      />
      <Paper className={classes.paper}>
        <form autoComplete="off" onSubmit={handleSubmit(onSubmit)} >
          <ControlledCheckbox
            control={control}
            name="enabled"
            error={errors}
            label="Enable auto-moderation for mass mentions."
          />
          <OutlinedInput
            labelText="Max Mentions (3-20)"
            description="Max number of mentions before auto moderation."
            id="limit"
            name="limit"
            formControlProps={{ fullWidth: true }}
            inputProps={{ ...register("limit"), type: "number" }}
            error={errors}
          />
          <ControlledCheckbox
            control={control}
            name="delete"
            error={errors}
            label="Delete messages containing mass mentions."
          />
          <ControlledCheckbox
            control={control}
            name="warn"
            error={errors}
            label="Warn users that post mass mentions."
          />
          {showResponseOptions()}
          <RoleChipInput
            value={watchIgnoredRoles}
            setValue={setValue}
            labelText="Roles"
            description="Roles not subject to this moderation."
            id="ignoredRoles"
            name="ignoredRoles"
            serverRoles={selectedBot.serverRoles}
            formControlProps={{ fullWidth: true }}
            register={{ ...register("ignoredRoles") }}
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

AutoModMassMentions.propTypes = {
  classes: PropTypes.object.isRequired,
  selectedBot: PropTypes.object.isRequired,
  setSelectedBot: PropTypes.func.isRequired,
  setApiAlert: PropTypes.func.isRequired,
};

export default withStyles(styles)(AutoModMassMentions);