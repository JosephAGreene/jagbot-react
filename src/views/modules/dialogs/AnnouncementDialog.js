import React from 'react';
import PropTypes from "prop-types";

// Import API service
import AnnouncementService from "../../../services/AnnouncementService.js";

// Import react-hook-form
import { useForm, useFieldArray, useWatch } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';

// Import MUI components
import { withStyles } from '@material-ui/core/styles';
import FormHelperText from '@material-ui/core/FormHelperText';

// Import custom components
import ResponsiveDialog from '../../../components/dialogs/ResponsiveDialog';
import GridContainer from '../../../components/grid/GridContainer';
import GridItem from '../../../components/grid/GridItem';
import Button from '../../../components/buttons/Button';
import ResponseEditor from '../../../components/inputs/ResponseEditor';
import EmbedEditor from '../editors/EmbedEditor';
import ControlledRadioGroup from '../../../components/inputs/ControlledRadioGroup';
import ControlledRadio from '../../../components/inputs/ControlledRadio';
import ChannelSelect from '../../../components/inputs/ChannelSelect';
import ControlledSelect from '../../../components/inputs/ControlledSelect.js';

const styles = (theme) => ({
  categoryHeader: {
    marginBottom: theme.spacing(2),
    color: theme.palette.white.dark,
    fontSize: 24,
  },
  new: {
    color: theme.palette.green.main,
  },
  edit: {
    color: theme.palette.purple.main,
  },
  largeSpacer: {
    marginTop: theme.spacing(6),
  },
  smallSpacer: {
    marginTop: theme.spacing(2),
  },
  labelRootError: {
    width: "100%",
    textAlign: "right",
    color: theme.palette.error.main
  },
});

const schema = Joi.object({
  type: Joi.string().trim().valid('join', 'leave', 'banned').required()
    .messages({
      "string.empty": "Type is required",
      "any.only": 'Type is required',
      "any.required": "Type is required",
    }),
  responseChannel: Joi.object().keys({
    serverId: Joi.string().trim().required(),
    serverName: Joi.string().trim().required(),
    channelId: Joi.string().trim().required(),
    channelName: Joi.string().trim().required(),
  }).required()
    .messages({
      "object.base": 'Channel is required',
      "any.required": 'Channel is required',
    }),
  responseType: Joi.string().trim().required()
    .messages({
      "string.empty": 'Announcement Type is required',
      "any.required": 'Annoucement Type is required',
    }),
  response: Joi.when('responseType', {
    is: Joi.string().trim().valid("basic"),
    then: Joi.string().trim().max(1500).required(),
    otherwise: Joi.string().allow('').trim().optional(),
  })
    .messages({
      "string.empty": 'Announcement is required',
      "string.max": 'Announcement cannot be greater than 1500 characters',
      "any.required": 'Annoucement is required',
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
  (data.embedFields ? data.embedFields : []).forEach((field) => {
    count += field.name.trim().length;
    count += field.value.trim().length;
  })

  if (count > 5500) { return true; }
  return false;
}

function setDefaultValues(module) {
  if (module) {
    return {
      type: module.type,
      responseChannel: module.responseChannel,
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
      type: "",
      responseChannel: "",
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

function AnnouncementDialog(props) {
  const { 
    classes, 
    announcementDialog, 
    closeAnnouncementDialog, 
    module, 
    selectedBot, 
    setSelectedBot, 
    setApiAlert 
  } = props;

  const { register, handleSubmit, control, watch, setValue, reset, setError, trigger, formState: { errors } } = useForm({
    resolver: joiResolver(schema),
    defaultValues: setDefaultValues(module),
  });

  const { fields, append, swap, remove } = useFieldArray({ control, name: "embedFields" });

  // Reseting useForm hook with defaultValues inside useEffect 
  // as defaultValues from the previous dialog render remain otherwise
  React.useEffect(() => {
    reset(setDefaultValues(module));
  }, [reset, module, closeAnnouncementDialog]);

  const watchFields = useWatch({ control, name: "embedFields" }, fields);
  const watchResponse = watch("response", (module ? module.response : ''));
  const watchEmbedDescription = watch("embedDescription", (module ? module.embedDescription : ''));
  const watchResponseType = watch("responseType");
  const watchEmbedColor = watch("embedColor");

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
    // Set form error if character count of embed fields exceeds 5,500
    if (data.responseType === "embed" && validMaxCharCount(data)) {
      setError("maxChar", { type: "manual" });
      return;
    }

    let payload = {};
    if (data.responseType === "basic") {
      payload = {
        "botId": selectedBot._id,
        type: data.type,
        responseChannel: data.responseChannel,
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
        type: data.type,
        responseChannel: data.responseChannel,
        responseType: data.responseType,
        response: "",
        embedTitle: data.embedTitle,
        embedLinkURL: data.embedLinkURL,
        embedColor: data.embedColor,
        embedThumbnailURL: data.embedThumbnailURL,
        embedMainImageURL: data.embedMainImageURL,
        embedDescription: data.embedDescription,
        embedFields: data.embedFields ? data.embedFields : [],
        embedFooter: data.embedFooter,
        embedFooterThumbnailURL: data.embedFooterThumbnailURL,
      }
    }

    if (module) {
      submitUpdateModule({ ...payload, "moduleId": module._id });
    } else {
      submitNewModule(payload);
    }

  }

  const submitNewModule = async (payload) => {
    const res = await AnnouncementService.addNewAnnouncement(payload);

    if (res.status === 200) {
      setSelectedBot(res.data);
      setApiAlert({
        status: true,
        duration: 2500,
        severity: "success",
        message: `A new ${payload.type} announcement has been added!`
      });
      closeAnnouncementDialog();
    }

    if (res.status === 409 && res.data === "duplicate server") {
      setError("responseChannel", { type: "manual", message: `Server is already assigned a ${payload.type} announcement.` });
    }

  }

  const submitUpdateModule = async (payload) => {
    const res = await AnnouncementService.updateAnnouncement(payload);

    if (res.status === 200) {
      setSelectedBot(res.data);
      setApiAlert({
        status: true,
        duration: 2500,
        severity: "success",
        message: `The ${payload.type} announcement has been updated!`
      });
      closeAnnouncementDialog();
    }

    if (res.status === 409 && res.data === "duplicate server") {
      setError("responseChannel", { type: "manual", message: `Server is already assigned a ${payload.type} announcement.` });
    }
  }

  const returnResponseEditor = () => {
    if (watchResponseType === "basic") {
      return (
        <ResponseEditor
          labelText="Announcement"
          description="The announcement your bot will give."
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
    <ResponsiveDialog
      open={announcementDialog}
      keepMounted={true}
    >
      <div className={classes.categoryHeader}>
        {module ? <span className={classes.edit}>Edit</span> : <span className={classes.new}>New</span>} Announcement
      </div>
      <form autoComplete="off" onSubmit={handleSubmit(onSubmit)} >
        <ControlledSelect 
          name="type"
          description="Announcement type"
          id="type"
          label="Type"
          labelId="type-select-label"
          defaultValue=""
          items={[
            { value: "", name: "none" }, 
            { value: "join", name: "join" }, 
            { value: "leave", name: "leave" },
            { value: "banned", name: "banned"}
          ]}
          control={control}
          error={errors}
        />
        <ChannelSelect
          selectedBot={selectedBot}
          setApiAlert={setApiAlert}
          control={control}
          name="responseChannel"
          label="Channel"
          description="Channel to post announcement"
          error={errors}
        />
        <ControlledRadioGroup
          control={control}
          name="responseType"
          description="Announcement Type"
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
        {errors.maxChar
          ? <FormHelperText className={classes.labelRootError} id={`error-message-maxChar`}>
            The combined character count of embed title, description, fields, and footer cannot exceed 5,500!
          </FormHelperText>
          : <FormHelperText> </FormHelperText>
        }
        <GridContainer justifyContent="flex-end">
          <GridItem>
            <Button
              onClick={closeAnnouncementDialog}
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
    </ResponsiveDialog>
  );
}

AnnouncementDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  announcementDialog: PropTypes.bool.isRequired,
  closeAnnouncementDialog: PropTypes.func.isRequired,
  module: PropTypes.object,
  selectedBot: PropTypes.object.isRequired,
  setSelectedBot: PropTypes.func.isRequired,
  setApiAlert: PropTypes.func.isRequired,
};

export default withStyles(styles)(AnnouncementDialog);