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

// Import custom components
import TitlePanel from '../panels/TitlePanel';
import ContentPanel from '../panels/ContentPanel';
import RoleChipInput from '../../components/inputs/RoleChipInput';
import Button from '../../components/buttons/Button';
import GridContainer from '../../components/grid/GridContainer';
import GridItem from '../../components/grid/GridItem';
import ControlledCheckbox from '../../components/inputs/ControlledCheckbox';

// Import images
import autoroleImage from '../../assets/images/autorole.png';

const schema = Joi.object({
  enabled: Joi.bool().required(),
  roles: Joi.when('enabled', {
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
        "array.base": 'Ignored roles property must be an array',
        "array.min": 'At least 1 role is required when enabled is checked',
        "array.max": 'Number of roles cannot be greater than 50',
        "any.required": `Ignored roles property is required`,
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
        "array.base": 'IgnoredRoles property must be an array',
        "array.max": 'Number of roles cannot be greater than 50',
        "any.required": `Ignored roles property is required`,
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
      roles: module.roles,
    }
  } else {
    return {
      enabled: false,
      ignoredRoles: [],
    }
  }
}

export default function AutoRole(props) {
  const { selectedBot, setSelectedBot, setApiAlert } = props;
  const { module } = useLocation();
  const history = useHistory();

  const { register, handleSubmit, control, watch, setValue, formState: { errors } } = useForm({
    resolver: joiResolver(schema),
    defaultValues: setDefaultValues(module),
  });

  const watchRoles = watch('roles');

  const onSubmit = async (data) => {
    const payload = {
      botId: selectedBot._id,
      ...data
    };

    const res = await AutoModService.updateAutoRole(payload);

    if (res.status === 200) {
      setSelectedBot(res.data);
      setApiAlert({
        status: true,
        duration: 2500,
        severity: "success",
        message: "The auto-role module has been udpated!"
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

  return (
    <ContentWrapper>
      <TitlePanel
        title="Auto Roles"
        description="Automatically assign roles to members when they first join your server."
        listItems={["Roles are server specific", "You may assign multiple roles from multiple servers", "Assigning roles with privledges to new members is dangerous.", "Be careful."]}
        image={autoroleImage}
        docs={[]}
      />
      <ContentPanel>
        <form autoComplete="off" onSubmit={handleSubmit(onSubmit)} >
          <ControlledCheckbox
            control={control}
            name="enabled"
            error={errors}
            label="Enable Auto-Role"
          />
          <RoleChipInput
            value={watchRoles}
            setValue={setValue}
            labelText="Roles"
            description="Roles to assign automatically."
            id="roles"
            name="roles"
            serverRoles={selectedBot.serverRoles}
            formControlProps={{ fullWidth: true }}
            register={{ ...register("roles") }}
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

AutoRole.propTypes = {
  selectedBot: PropTypes.object.isRequired,
  setSelectedBot: PropTypes.func.isRequired,
  setApiAlert: PropTypes.func.isRequired,
};