import React from 'react';
import PropTypes from "prop-types";

// Import react-hook-form
import { useForm, useFieldArray, useWatch } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';

// Import Mui components
import { withStyles } from '@material-ui/core/styles';
import FormHelperText from '@material-ui/core/FormHelperText';

// Import custom components
import OutlinedInput from '../../../components/inputs/OutlinedInputDark';
import ResponseEditor from '../../../components/inputs/ResponseEditor';
import Button from '../../../components/buttons/Button';
import GridContainer from '../../../components/grid/GridContainer';
import GridItem from '../../../components/grid/GridItem';
import ResponsiveDialog from '../../../components/dialogs/ResponsiveDialog';
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
  },
  labelRootError: {
    width: "100%",
    textAlign: "right",
    color: theme.palette.error.main
  },
});

const addOptionSchema = Joi.object({
  keyword: Joi.string().trim().max(30).required()
    .custom((value, helper) => {
      const wordCount = value.slice(0).trim().split(' ').length;
      if (wordCount > 1) {
        return helper.message('Keyword must be a single word');
      }
      return value;
    })
    .messages({
      "string.empty": 'Keyword is required',
      "string.max": 'Keyword cannot be greater than 30 characters',
      "any.required": 'Keyword is required',
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

function findDuplicateKeyword(keyword, optionsArray, editOption) {
  for (let i = 0; i < optionsArray.length; i++) {
    // Skip checking for duplicate keyword in element currently being edited
    if ((keyword.toLowerCase() === optionsArray[i].keyword.toLowerCase())
      && (editOption._id !== optionsArray[i]._id)) {
      return true;
    }
  }
  return false;
}

function returnArrayWithEditedOption(editedOption, optionsArray) {
  let newArray = optionsArray.slice(0);
  for (let i = 0; i < newArray.length; i++) {
    if (editedOption._id === newArray[i]._id) {
      newArray.splice(i, 1, editedOption);
      return newArray;
    }
  }
}

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

function setOptionDefaultValues(option) {
  if (option) {
    return {
      keyword: option.keyword,
      responseType: option.responseType,
      response: option.response,
      embedTitle: option.embedTitle,
      embedLinkURL: option.embedLinkURL,
      embedColor: option.embedColor,
      embedThumbnailURL: option.embedThumbnailURL,
      embedMainImageURL: option.embedMainImageURL,
      embedDescription: option.embedDescription,
      embedFields: option.embedFields,
      embedFooter: option.embedFooter,
      embedFooterThumbnailURL: option.embedFooterThumbnailURL,
    }
  } else {
    return {
      keyword: "",
      responseType: "basic",
      response: "",
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

function AddOptionDialog(props) {
  const {
    classes,
    optionsArray,
    setOptionsArray,
    optionDialog,
    editOption,
    closeOptionedDialog
  } = props;

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    reset,
    setError,
    trigger,
    formState: { errors }
  } = useForm({
    resolver: joiResolver(addOptionSchema),
  });

  const { fields, append, swap, remove } = useFieldArray({ control, name: "embedFields" });

  // Reseting useForm hook with defaultValues inside useEffect 
  // as defaultValues from older dialog render remain otherwise
  React.useEffect(() => {
    reset(setOptionDefaultValues(editOption));
  }, [reset, editOption, closeOptionedDialog]);

  const watchFields = useWatch({ control, name: "embedFields" }, fields);
  const watchResponse = watch("response", (editOption ? editOption.response : ''));
  const watchEmbedDescription = watch("embedDescription", (editOption ? editOption.embedDescription : ''));
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
    // Set form error if duplicated keyword is detected
    if (findDuplicateKeyword(data.keyword, optionsArray, editOption)) {
      setError("keyword", {
        type: "manual",
        message: "Option keyword already exists."
      });
      return;
    }
    // Set form error if character count of embed fields exceeds 5,500
    if (data.responseType === "embed" && validMaxCharCount(data)) {
      setError("maxChar", { type: "manual" });
      return;
    }

    let dataObject;
    if (data.responseType === "basic") {
      dataObject = {
        keyword: data.keyword,
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
        keyword: data.keyword,
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

    if (!editOption) {
      // Create a fake _id value for the sake of being able to identify
      // and edit the options array while client side. _id will be replaced
      // by mongoose objectIds once sent to the database.
      const newOption = {
        _id: `${data.keyword}-${Date.now()}`,
        ...dataObject,
      }

      let newArray = optionsArray.slice(0);
      newArray.push(newOption);
      setOptionsArray(newArray);
    }
    else {
      const editedOption = {
        _id: editOption._id,
        ...dataObject,
      }
      setOptionsArray(returnArrayWithEditedOption(editedOption, optionsArray));
    }

    closeOptionedDialog(reset);
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
      open={optionDialog}
      keepMounted={false}
    >
      <div className={classes.categoryHeader}>
        {editOption ? <span className={classes.edit}>Edit</span> : <span className={classes.new}>New</span>}  Optioned Response
      </div>
      <form autoComplete="off" onSubmit={handleSubmit(onSubmit)} >
        <OutlinedInput
          labelText="Option Keyword"
          description="Supplied Option Keyword"
          id="keyword"
          name="keyword"
          formControlProps={{ fullWidth: true }}
          inputProps={{ ...register("keyword"), maxLength: 30 }}
          error={errors}
        />
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
        {errors.maxChar
          ? <FormHelperText className={classes.labelRootError} id={`error-message-maxChar`}>
            The combined character count of embed title, description, fields, and footer cannot exceed 5,500!
          </FormHelperText>
          : <FormHelperText> </FormHelperText>
        }
        <GridContainer justifyContent="flex-end">
          <GridItem>
            <Button
              onClick={() => closeOptionedDialog(reset)}
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
              {editOption ? "Update" : "Add"}
            </Button>
          </GridItem>
        </GridContainer>
      </form>
    </ResponsiveDialog>
  );
}

AddOptionDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  optionsArray: PropTypes.array.isRequired,
  setOptionsArray: PropTypes.func.isRequired,
  optionDialog: PropTypes.bool.isRequired,
  editOption: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  closeOptionedDialog: PropTypes.func.isRequired,
};

export default withStyles(styles)(AddOptionDialog);