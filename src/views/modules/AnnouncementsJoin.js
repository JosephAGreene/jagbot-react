import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';

// Import API service
import AnnouncementService from "../../services/AnnouncementService.js";

// Import react-hook-form
import { useForm, useFieldArray, useWatch } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';

// Import layouts
import ContentWrapper from '../../layouts/ContentWrapper';

// Import MUI components
import { withStyles } from '@material-ui/core/styles';
import FormHelperText from '@material-ui/core/FormHelperText';
import Paper from '@material-ui/core/Paper';

// Import custom components
import TitlePanel from '../panels/TitlePanel';
import GridContainer from '../../components/grid/GridContainer';
import GridItem from '../../components/grid/GridItem';
import Button from '../../components/buttons/Button';
import ResponseEditor from '../../components/inputs/ResponseEditor';
import EmbedEditor from './editors/EmbedEditor';
import ControlledRadioGroup from '../../components/inputs/ControlledRadioGroup';
import ControlledRadio from '../../components/inputs/ControlledRadio';
import ChannelSelect from '../../components/inputs/ChannelSelect';

// Import Icons
import { FaUserPlus } from "react-icons/fa";

const styles = (theme) => ({
  paper: {
    padding: "20px",
    marginBottom: theme.spacing(3),
    backgroundColor: theme.palette.gray.main,
    overflow: "hidden",
    color: theme.palette.white.main,
  },
  categoryHeader: {
    marginLeft: theme.spacing(1),
    color: theme.palette.white.dark,
    fontSize: 24,
  },
  largeSpacer: {
    marginTop: theme.spacing(6),
  },
  smallSpacer: {
    marginTop: theme.spacing(2),
  },
});

const schema = Joi.object({
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

function AnnouncementsJoin(props) {
  const { classes, selectedBot, setSelectedBot, setApiAlert } = props;
  const { module } = useLocation();
  const history = useHistory();

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
        type: "join",
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
        type: "join",
        responseChannel: data.responseChannel,
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

      submitNewModule(payload);

  }

  const submitNewModule = async (payload) => {
    const res = await AnnouncementService.addNewAnnouncement(payload);

    if (res.status === 200) {
      setSelectedBot(res.data);
      setApiAlert({
        status: true,
        duration: 2500,
        severity: "success",
        message: "A new join announcement has been added!"
      });
      history.push('/dashboard/develop/announcements');
    }

    if (res.status === 409 && res.data === "duplicate server") {
      setError("responseChannel", { type: "manual", message: "Server is already assigned a join announcement."});
    }

  }

  const submitUpdateModule = async (payload) => {
    const res = await AnnouncementService.editAnnouncement(payload);

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
    history.push('/dashboard/develop/announcements');
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
    <ContentWrapper>
      <TitlePanel
        title="Join Announcement"
        description="This message will be posted when a user joins the server."
        Icon={FaUserPlus}
        color="#98c379"
        docs={true}
      />
      <Paper className={classes.paper}>
        <form autoComplete="off" onSubmit={handleSubmit(onSubmit)} >
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

export default withStyles(styles)(AnnouncementsJoin);