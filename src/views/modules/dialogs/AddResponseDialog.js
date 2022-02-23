import React from 'react';
import PropTypes from "prop-types";

// Import react-hook-form
import { useForm, useFieldArray, useWatch } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';

// Import Mui components
import { withStyles } from '@material-ui/core/styles';

// Import custom components
import ErrorText from '../../../components/info/ErrorText';
import Button from '../../../components/buttons/Button';
import GridContainer from '../../../components/grid/GridContainer';
import GridItem from '../../../components/grid/GridItem';
import ResponsiveDialog from '../../../components/dialogs/ResponsiveDialog';
import ResponseEditor from '../../../components/inputs/ResponseEditor';
import EmbedEditor from '../editors/EmbedEditor';
import ControlledRadioGroup from '../../../components/inputs/ControlledRadioGroup';
import ControlledRadio from '../../../components/inputs/ControlledRadio';

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
  }
});

const addResponseSchema = Joi.object({
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
  let fields = []

  if (data.embedFields) {
    fields = data.embedFields;
  }

  count += data.embedTitle.trim().length;
  count += data.embedDescription.trim().length;
  count += data.embedFooter.trim().length;
  fields.forEach((field) => {
    count += field.name.trim().length;
    count += field.value.trim().length;
  })

  if (count > 5500) { return true; }
  return false;
}

function returnArrayWithEditedResponse(editedResponse, responsesArray) {
  let newArray = [...responsesArray];
  for (let i = 0; i < newArray.length; i++) {
    if (editedResponse._id === newArray[i]._id) {
      newArray.splice(i, 1, editedResponse);
      return newArray;
    }
  }
}

function setResponseDefaultValues(response) {
  if (response) {
    return {
      responseType: response.responseType,
      response: response.response,
      embedTitle: response.embedTitle,
      embedLinkURL: response.embedLinkURL,
      embedColor: response.embedColor,
      embedThumbnailURL: response.embedThumbnailURL,
      embedMainImageURL: response.embedMainImageURL,
      embedDescription: response.embedDescription,
      embedFields: response.embedFields,
      embedFooter: response.embedFooter,
      embedFooterThumbnailURL: response.embedFooterThumbnailURL,
    }
  } else {
    return {
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

function AddResponseDialog(props) {
  const {
    classes,
    responsesArray,
    setResponsesArray,
    responseDialog,
    editResponse,
    closeResponseDialog,
  } = props;

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    reset,
    trigger,
    setError,
    formState: { errors }
  } = useForm({
    resolver: joiResolver(addResponseSchema),
  });

  const { fields, append, swap, remove } = useFieldArray({ control, name: "embedFields" });

  // Reseting useForm hook with defaultValues inside useEffect 
  // as defaultValues from older dialog render remain otherwise
  React.useEffect(() => {
    reset(setResponseDefaultValues(editResponse));
  }, [reset, editResponse, closeResponseDialog]);

  const watchFields = useWatch({ control, name: "embedFields" }, fields);
  const watchResponse = watch("response", (editResponse ? editResponse.response : ''));
  const watchEmbedDescription = watch("embedDescription", (editResponse ? editResponse.embedDescription : ''));
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

  const onSubmit = (data) => {
    // Set form error if character count of embed fields exceeds 5,500
    if (data.responseType === "embed" && validMaxCharCount(data)) {
      setError("maxChar", { type: "manual" });
      return;
    }

    let dataObject;
    if (data.responseType === "basic") {
      dataObject = {
        responseType: data.responseType,
        response: data.response,
        embedTitle: '',
        embedLinkURL: '',
        embedColor: '',
        embedThumbnailURL: '',
        embedMainImageURL: '',
        embedDescription: '',
        embedFields: [],
        embedFooter: '',
        embedFooterThumbnailURL: '',
      }
    } else {
      dataObject = {
        responseType: data.responseType,
        response: '',
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

    if (!editResponse) {
      // Create a fake _id value for the sake of being able to identify
      // and edit the responses array while client side. _id will be replaced
      // by mongoose objectIds once sent to the database.
      const newResponse = {
        _id: `${data.response.slice(0, 1)}-${Date.now()}`,
        ...dataObject,
      }

      let newArray = responsesArray.slice(0);
      newArray.push(newResponse);
      setResponsesArray(newArray);
    }
    else {
      const editedResponse = {
        _id: editResponse._id,
        ...dataObject,
      }
      setResponsesArray(returnArrayWithEditedResponse(editedResponse, responsesArray));
    }
    closeResponseDialog();
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
    <ResponsiveDialog
      open={responseDialog}
      keepMounted={true}
    >
      <div className={classes.categoryHeader}>
        {editResponse ? <span className={classes.edit}>Edit</span> : <span className={classes.new}>New</span>}  Potential Response
      </div>
      <form autoComplete="off" onSubmit={handleSubmit(onSubmit)} >
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
        <ErrorText
          error={errors.maxChar}
          text="The combined character count of embed title, description, fields, and footer cannot exceed 5,500!"
        />
        <GridContainer justifyContent="flex-end">
          <GridItem>
            <Button
              onClick={closeResponseDialog}
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
              color="orange"
            >
              {editResponse ? "Update" : "Add"}
            </Button>
          </GridItem>
        </GridContainer>
      </form>
    </ResponsiveDialog>
  );
}

AddResponseDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  responsesArray: PropTypes.array.isRequired,
  setResponsesArray: PropTypes.func.isRequired,
  responseDialog: PropTypes.bool.isRequired,
  editResponse: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  closeResponseDialog: PropTypes.func.isRequired,
};

export default withStyles(styles)(AddResponseDialog);