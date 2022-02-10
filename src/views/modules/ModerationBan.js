import React from 'react';
import PropTypes from "prop-types";
import { useHistory, useLocation } from 'react-router-dom';

// Import API service
import ModerationService from "../../services/ModerationService.js";

// Import react-hook-form
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';

// Import layouts
import ContentWrapper from '../../layouts/ContentWrapper';

// Import custom components
import TitlePanel from '../panels/TitlePanel';
import ContentPanel from '../panels/ContentPanel';
import OutlinedInput from '../../components/inputs/OutlinedInputDark';
import RoleChipInput from '../../components/inputs/RoleChipInput';
import Button from '../../components/buttons/Button';
import GridContainer from '../../components/grid/GridContainer';
import GridItem from '../../components/grid/GridItem';
import ControlledCheckbox from '../../components/inputs/ControlledCheckbox';

// Import images
import banuserImage from '../../assets/images/banuser.png';

const schema = Joi.object({
  enabled: Joi.bool().required(),
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
      "string.max": 'Command cannot be greater than 30 characters',
      "any.required": 'Command is required',
    }),
  allowedRoles: Joi.when('enabled', {
    is: Joi.boolean().valid(true),
    then: Joi.array().min(1).max(50).required().items(
      Joi.object({
        serverId: Joi.string().trim().required()
          .messages({
            "string.empty": 'Server id cannot be blank',
            "any.required": 'Server id property is required',
          }),
        serverName: Joi.string().trim().required()
          .messages({
            "string.empty": 'Server name cannot be blank',
            "any.required": 'Server name property is required',
          }),
        roleId: Joi.string().trim().required()
          .messages({
            "string.empty": 'Role id cannot be blank',
            "any.required": 'Role id property is required',
          }),
        roleName: Joi.string().trim().required()
          .messages({
            "string.empty": 'Role name cannot be blank',
            "any.required": 'Role name property is required',
          }),
      }))
      .messages({
        "array.base": 'Allowed roles property must be an array',
        "array.min": 'At least 1 role is required when enabled is checked',
        "array.max": 'Number of roles cannot be greater than 50',
        "any.required": `Allowed roles property is required`,
      }),
    otherwise: Joi.array().max(50).required().items(
      Joi.object({
        serverId: Joi.string().trim().required()
          .messages({
            "string.empty": 'Server id cannot be blank',
            "any.required": 'Server id property is required',
          }),
        serverName: Joi.string().trim().required()
          .messages({
            "string.empty": 'Server name cannot be blank',
            "any.required": 'Server name property is required',
          }),
        roleId: Joi.string().trim().required()
          .messages({
            "string.empty": 'Role id cannot be blank',
            "any.required": 'Role id property is required',
          }),
        roleName: Joi.string().trim().required()
          .messages({
            "string.empty": 'Role name cannot be blank',
            "any.required": 'Role name property is required',
          }),
      }))
      .messages({
        "array.base": 'Allowed roles property must be an array',
        "array.max": 'Number of roles cannot be greater than 50',
        "any.required": `Allowed roles property is required`,
      }),
  })
});

// In practice, a value for the module param will always exist
// for automoderation modules. Even so, backup values that match
// the default mongoDB module model are provided. 
function setDefaultValues(module) {
  if (module) {
    return {
      enabled: module.enabled,
      command: module.command,
      allowedRoles: module.allowedRoles,
    }
  } else {
    return {
      enabled: false,
      command: "",
      allowedRoles: [],
    }
  }
}

export default function ModerationBan(props) {
  const { selectedBot, setSelectedBot, setApiAlert } = props;
  const { module } = useLocation();
  const history = useHistory();

  const { register, handleSubmit, control, watch, setValue, formState: { errors } } = useForm({
    resolver: joiResolver(schema),
    defaultValues: setDefaultValues(module),
  });

  const watchRoles = watch('allowedRoles');

  const onSubmit = async (data) => {
    const payload = {
      botId: selectedBot._id,
      moduleId: module._id,
      ...data
    };

    const res = await ModerationService.updateBaseModeration(payload);

    if (res.status === 200) {
      setSelectedBot(res.data);
      setApiAlert({
        status: true,
        duration: 2500,
        severity: "success",
        message: "The ban module has been udpated!"
      });
      history.push('/dashboard/develop/moderation');
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
    history.push('/dashboard/develop/moderation');
  }

  return (
    <ContentWrapper>
      <TitlePanel
        title="Ban"
        description="Bans a user from your server."
        listItems={["Roles are server specific", "You may assign multiple roles from multiple servers", "Be careful"]}
        image={banuserImage}
        docs={[]}
      />
      <ContentPanel>
        <form autoComplete="off" onSubmit={handleSubmit(onSubmit)} >
          <ControlledCheckbox
            control={control}
            name="enabled"
            error={errors}
            label="Enable Command"
          />
          <OutlinedInput
            labelText="Command"
            description="Command Trigger Word"
            id="command"
            name="command"
            formControlProps={{ fullWidth: true }}
            inputProps={{ ...register("command"), maxLength: 30 }}
            error={errors}
          />
          <RoleChipInput
            value={watchRoles}
            setValue={setValue}
            labelText="Roles"
            description="Roles that may utilized this command."
            id="allowedRoles"
            name="allowedRoles"
            serverRoles={selectedBot.serverRoles}
            formControlProps={{ fullWidth: true }}
            register={{ ...register("allowedRoles") }}
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
      </ContentPanel>
    </ContentWrapper>
  );
}

ModerationBan.propTypes = {
  selectedBot: PropTypes.object.isRequired,
  setSelectedBot: PropTypes.func.isRequired,
  setApiAlert: PropTypes.func.isRequired,
};