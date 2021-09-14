import React from 'react';
import PropTypes from "prop-types";
import { useHistory, useLocation } from 'react-router-dom';

// Import API service
import CustomModuleService from "../../services/CustomModuleService.js";

// Import react-hook-form
import { useForm, useFieldArray, useWatch } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';

// Import layouts
import ContentWrapper from '../../layouts/ContentWrapper';

// Import Mui components
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

// Import custom components
import TitlePanel from '../panels/TitlePanel';
import OutlinedInput from '../../components/inputs/OutlinedInputDark';
import ResponseEditor from '../../components/inputs/ResponseEditor';
import EmbedEditor from './editors/EmbedEditor';
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
  new: {
    color: theme.palette.green.main,
  },
  edit: {
    color: theme.palette.purple.main,
  },
});

const schema = Joi.object({
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
  description: Joi.string().trim().max(250).required()
    .messages({
      "string.empty": 'Description is required',
      "string.max": 'Description cannot be greater than 250 characters',
      "any.required": 'Description is required',
    }),
  responseLocation: Joi.string().trim().required()
    .messages({
      "string.empty": 'Response Location is required',
      "any.required": 'Response Location is required',
    }),
  responseType: Joi.string().trim().required()
    .messages({
      "string.empty": 'Response Type is required',
      "any.required": 'Response Type is required',
    }),
  response: Joi.when('responseType', {
    is: Joi.string().trim().valid("basic"),
    then: Joi.string().trim().max(1500).required(),
    otherwise: Joi.string().allow('').trim().optional(),
  })
    .messages({
      "string.empty": 'Response is required',
      "string.max": 'Response cannot be greater than 1500 characters',
      "any.required": 'Response is required',
    }),
  embedTitle: Joi.when('responseType', {
    is: Joi.string().trim().valid("embed"),
    then: Joi.string().trim().max(240).required(),
    otherwise: Joi.string().trim().allow('').optional(),
  })
    .messages({
      "string.empty": 'Title is required',
      "string.max": "Title cannot be greater than 240 characters",
      "any.required": 'Title is required',
    }),
  embedLinkURL: Joi.when('responseType', {
    is: Joi.string().trim().valid("embed"),
    then: Joi.string().trim().regex(RegExp(/\b(https?:\/\/.*?\.[a-z]{2,4}\b)/)).max(2040).allow('').optional(),
    otherwise: Joi.string().trim().allow('').optional(),
  })
    .messages({
      "string.pattern.base": "Urls must be valid and well formed (http or https)",
      "string.max": "Urls cannot be greater than 2040 characters",
    }),
  embedColor: Joi.when('responseType', {
    is: Joi.string().trim().valid("embed"),
    then: Joi.string().trim().regex(RegExp(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i)).max(7).allow('').optional(),
    otherwise: Joi.string().trim().allow('').optional(),
  })
    .messages({
      "string.pattern.base": "Color must be a valid hex code",
      "string.max": "Color must be a valid hex code",
    }),
  embedThumbnailURL: Joi.when('responseType', {
    is: Joi.string().trim().valid("embed"),
    then: Joi.string().trim().regex(RegExp(/\b(https?:\/\/.*?\.[a-z]{2,4}\b)/)).max(2040).allow('').optional(),
    otherwise: Joi.string().trim().allow('').optional(),
  })
    .messages({
      "string.pattern.base": "Urls must be valid and well formed (http or https)",
      "string.max": "Urls cannot be greater than 2040 characters",
    }),
  embedMainImageURL: Joi.when('responseType', {
    is: Joi.string().trim().valid("embed"),
    then: Joi.string().trim().regex(RegExp(/\b(https?:\/\/.*?\.[a-z]{2,4}\b)/)).max(2040).allow('').optional(),
    otherwise: Joi.string().trim().allow('').optional(),
  })
    .messages({
      "string.pattern.base": "Urls must be valid and well formed (http or https)",
      "string.max": "Urls cannot be greater than 2040 characters",
    }),
  embedDescription: Joi.when('responseType', {
    is: Joi.string().trim().valid("embed"),
    then: Joi.string().trim().max(3000).allow('').optional(),
    otherwise: Joi.string().trim().allow('').optional(),
  })
    .messages({
      "string.max": "Description cannot be greater than 3000 characters",
    }),
  embedFields: Joi.when('responseType', {
    is: Joi.string().trim().valid("embed"),
    then: Joi.array().items(Joi.object({
      name: Joi.string().trim().max(240).required()
        .messages({
          "string.empty": "Name is required",
          "string.max": "Name cannot be greater than 240 characters",
        }),
      value: Joi.string().trim().max(750).required()
        .messages({
          "string.empty": "Value is required",
          "string.max": "Value cannot be greater than 750 characters"
        }),
      inline: Joi.bool().required(),
    })),
    otherwise: Joi.array().items(Joi.object({
      name: Joi.string().trim().allow('').optional(),
      value: Joi.string().trim().allow('').optional(),
      inline: Joi.bool().default(false).optional(),
    })),
  }),
  embedFooter: Joi.when('responseType', {
    is: Joi.string().trim().valid("embed"),
    then: Joi.string().trim().max(500).allow('').optional(),
    otherwise: Joi.string().trim().allow('').optional(),
  })
    .messages({
      "string.max": "Footer cannot be greater than 3000 characters",
    }),
  embedFooterThumbnailURL: Joi.when('responseType', {
    is: Joi.string().trim().valid("embed"),
    then: Joi.string().trim().regex(RegExp(/\b(https?:\/\/.*?\.[a-z]{2,4}\b)/)).max(2040).allow('').optional(),
    otherwise: Joi.string().trim().allow('').optional(),
  })
    .messages({
      "string.pattern.base": "Urls must be valid and well formed (http or https)",
      "string.max": "Urls cannot be greater than 2040 characters",
    }),
});

// Returns true is max char count of embed fields
// is greater than 5,500 characters
function validMaxCharCount(data) {
  let count = 0;

  count += data.embedTitle.trim().length;
  count += data.embedDescription.trim().length;
  count += data.embedFooter.trim().length;
  data.embedFields.forEach((field) => {
    count += field.name.trim().length;
    count += field.value.trim().length;
  })

  if (count > 5500) { return true; }
  return false;
}

function setDefaultValues(module) {
  if (module) {
    return {
      command: module.command,
      description: module.description,
      responseLocation: module.responseLocation,
      responseType: module.responseType,
      response: module.response,
      embedTitle: module.embedTitle,
      embedLinkURL: module.embedLinkURL,
      embedColor: module.embedColor,
      embedThumbnailURL: module.embedThumbnailURL,
      embedMainImageURL: module.embedMainImageURL,
      embedDescription: module.embedDescription,
      embedFields: module.embedFields,
      embedFooter: module.embedFooter,
      embedFooterThumbnailURL: module.embedFooterThumbnailURL,
    }
  } else {
    return {
      command: '',
      description: '',
      responseLocation: 'server',
      responseType: "basic",
      response: '',
      embedTitle: "",
      embedLinkURL: "",
      embedColor: "#ffffff",
      embedThumbnailURL: "",
      embedMainImageURL: "",
      embedDescription: "",
      embedFields: [],
      embedFooter: "",
      embedFooterThumbnailURL: "",
    }
  }
}

function CustomCommandSingle(props) {
  const { classes, selectedBot, setSelectedBot, setApiAlert } = props;
  const { module } = useLocation();

  const { register, handleSubmit, control, watch, setValue, setError, trigger, formState: { errors } } = useForm({
    resolver: joiResolver(schema),
    defaultValues: setDefaultValues(module),
  });

  const { fields, append, swap, remove } = useFieldArray({ control, name: "embedFields" });
  const watchFields = useWatch({ control, name: "embedFields" }, fields);
  const watchResponse = watch("response", (module ? module.response : ''));
  const watchEmbedDescription = watch("embedDescription", (module ? module.embedDescription : ''));
  const watchResponseType = watch("responseType");
  const watchEmbedColor = watch("embedColor");
  const history = useHistory();

  const embedObject = {
    title: watch("embedTitle"),
    linkURL: watch("embedLinkURL"),
    color: watchEmbedColor,
    thumbnailURL: watch('embedThumbnailURL'),
    mainImageURL: watch('embedMainImageURL'),
    description: watchEmbedDescription,
    fields: watchFields,
    footer: watch('embedFooter'),
    footerThumbnailURL: watch('embedFooterThumbnailURL'),
  }

  const onSubmit = async (data) => {
    if (validMaxCharCount(data)) {
      setApiAlert({
        status: true,
        duration: 6000,
        severity: "error",
        message: "The combined character count of embed title, description, fields, and footer cannot exceed 5,500!"
      });
      return;
    }

    let payload = {};
    if (data.responseType === "basic") {
      payload = {
        "botId": selectedBot._id,
        command: data.command,
        description: data.description,
        responseLocation: data.responseLocation,
        responseType: data.responseType,
        response: data.response,
        embedTitle: "",
        embedLinkURL: "",
        embedColor: "#ffffff",
        embedThumbnailURL: "",
        embedMainImageURL: "",
        embedDescription: "",
        embedFields: [],
        embedFooter: "",
        embedFooterThumbnailURL: "",
      }
    } else {
      payload = {
        "botId": selectedBot._id,
        command: data.command,
        description: data.description,
        responseLocation: data.responseLocation,
        responseType: data.responseType,
        response: "",
        embedTitle: data.embedTitle,
        embedLinkURL: data.embedLinkURL,
        embedColor: data.embedColor,
        embedThumbnailURL: data.embedThumbnailURL,
        embedMainImageURL: data.embedMainImageURL,
        embedDescription: data.embedDescription,
        embedFields: data.embedFields,
        embedFooter: data.embedFooter,
        embedFooterThumbnailURL: data.embedFooterThumbnailURL,
      }
    }

    if (module) {
      submitUpdateModule({ ...payload, "moduleId": module._id});
    } else {
      submitNewModule(payload);
    }
  }

  const submitNewModule = async (payload) => {
    const res = await CustomModuleService.addSingleResponseModule(payload);

    if (res.status === 200) {
      setSelectedBot(res.data);
      setApiAlert({
        status: true,
        duration: 2500,
        severity: "success",
        message: "A new single-response command has been added!"
      });
      history.push('/dashboard/develop/customcommands');
    }

    if (res.status === 409 && res.data === "duplicate command") {
      setError("command", { type: "manual", message: "Command trigger word already exists." });
    }
  }

  const submitUpdateModule = async (payload) => {
    const res = await CustomModuleService.updateSingleResponseModule(payload);

    if (res.status === 200) {
      setSelectedBot(res.data);
      setApiAlert({
        status: true,
        duration: 2500,
        severity: "success",
        message: "Your single-response command has been updated!"
      });
      history.push('/dashboard/develop/customcommands');
    }
  }

  const handleCancel = () => {
    history.push('/dashboard/develop/customcommands');
  }

  const returnResponseEditor = () => {
    if (watchResponseType === "basic") {
      return (
        <ResponseEditor
          labelText="Response"
          description="The response your bot will give."
          id="response"
          name="response"
          watch={watchResponse}
          setValue={setValue}
          maxLength={1500}
          multiline
          rows={10}
          formControlProps={{ fullWidth: true }}
          inputProps={{ ...register("response"), maxLength: 1500 }}
          error={errors}
        />
      )
    }
    return (
      <EmbedEditor
        fields={fields}
        control={control}
        register={register}
        watchEmbedDescription={watchEmbedDescription}
        watchEmbedColor={watchEmbedColor}
        embedObject={embedObject}
        setValue={setValue}
        trigger={trigger}
        errors={errors}
        append={append}
        swap={swap}
        remove={remove}
      />
    );
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
        {module ? <span className={classes.edit}>Edit</span> : <span className={classes.new}>New</span>}  Single Response
      </div>
      <Paper className={classes.paper}>
        <form autoComplete="off" onSubmit={handleSubmit(onSubmit)} >
          <OutlinedInput
            labelText="Command"
            description="Command Trigger Word"
            id="command"
            name="command"
            formControlProps={{ fullWidth: true }}
            inputProps={{ ...register("command"), maxLength: 30 }}
            error={errors}
          />
          <OutlinedInput
            labelText="Description"
            description="Short description of the command."
            id="description"
            name="description"
            formControlProps={{ fullWidth: true }}
            inputProps={{ ...register("description"), maxLength: 250 }}
            error={errors}
          />
          <ControlledRadioGroup
            control={control}
            name="responseLocation"
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
          <ControlledRadioGroup
            control={control}
            name="responseType"
            description="Response Type"
            defaultValue="basic"
            error={errors}
          >
            <ControlledRadio
              value="basic"
              label="Basic"
            />
            <ControlledRadio
              value="embed"
              label="Embed"
            />
          </ControlledRadioGroup>
          {returnResponseEditor()}
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

CustomCommandSingle.propTypes = {
  classes: PropTypes.object.isRequired,
  selectedBot: PropTypes.object.isRequired,
  setSelectedBot: PropTypes.func.isRequired,
  setApiAlert: PropTypes.func.isRequired,
};

export default withStyles(styles)(CustomCommandSingle);