import React from 'react';
import PropTypes from "prop-types";

// Import Mui components
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';


// Import custom components
import OutlinedInput from '../../../components/inputs/OutlinedInputDark';
import ResponseEditor from '../../../components/inputs/ResponseEditor';
import Button from '../../../components/buttons/Button';
import GridContainer from '../../../components/grid/GridContainer';
import GridItem from '../../../components/grid/GridItem';
import Fab from '../../../components/buttons/FloatingActionButton';
import ControlledCheckbox from '../../../components/inputs/ControlledCheckbox';
import OutlinedFieldInput from '../../../components/inputs/OutlinedFieldInput';

// Import icons
import DeleteIcon from '@material-ui/icons/Delete';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import AddCircleIcon from '@material-ui/icons/AddCircle';

const styles = (theme) => ({
  header: {
    color: theme.palette.white.dark,
    margin: "0 0 10px 0",
    fontSize: "16px",
  },
  fields: {
    backgroundColor: theme.palette.gray.dark,
    marginBottom: theme.spacing(1),
    padding: theme.spacing(1),
    borderRadius: theme.spacing(1),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(1, 2),
    },
  },
  addFieldButton: {
    margin: "5px 0 20px 0",
  },
  arrow: {
    color: theme.palette.white.main,
    '&:hover': {
      color: theme.palette.white.dark,
    }
  },
  delete: {
    color: theme.palette.error.main,
    '&:hover': {
      color: theme.palette.error.dark,
    },
  },
});

function EmbedEditor(props) {
  const {
    classes,
    fields,
    control,
    register,
    errors,
    append,
    swap,
    remove,
    watchEmbedDescription,
    setValue
  } = props;

  const addNewfield = () => {
    if (fields.length < 9) {
      append({ heading: "", content: "", inline: false });
    }
  }

  const moveUp = (index) => {
    if (index > 0) {
      swap(index, index - 1);
    }
  }

  const moveDown = (index) => {
    if (index < (fields.length - 1)) {
      swap(index, index + 1);
    }
  }

  return (
    <>
      <OutlinedInput
        labelText="Title"
        description="Title of embed"
        id="embedTitle"
        name="embedTitle"
        formControlProps={{ fullWidth: true }}
        inputProps={{ ...register("embedTitle") }}
        error={errors}
      />
      <OutlinedInput
        labelText="link url"
        description="Turn the title into a link (optional)"
        id="embedLinkURL"
        name="embedLinkURL"
        formControlProps={{ fullWidth: true }}
        inputProps={{ ...register("embedLinkURL") }}
        error={errors}
      />
      <OutlinedInput
        labelText="image url"
        description="Title thumbnail image (optional)"
        id="embedThumbnailImageURL"
        name="embedThumbnailImageURL"
        formControlProps={{ fullWidth: true }}
        inputProps={{ ...register("embedThumbnailURL") }}
        error={errors}
      />
      <OutlinedInput
        labelText="image url"
        description="Main embed image (optional)"
        id="embedMainImageURL"
        name="embedMainImageURL"
        formControlProps={{ fullWidth: true }}
        inputProps={{ ...register("embedMainImageURL") }}
        error={errors}
      />
      <ResponseEditor
        labelText="Embed Description"
        description="Main description of embed (optional)"
        placeholder="test"
        id="embedDescription"
        name="embedDescription"
        watch={watchEmbedDescription}
        setValue={setValue}
        maxLength={1000}
        multiline
        rows={5}
        formControlProps={{ fullWidth: true }}
        inputProps={{ ...register("embedDescription"), maxLength: 1000 }}
        error={errors}
      />
      <div className={classes.header}>
        Fields
      </div>
      {fields.map((item, index) => {
        return (
          <div className={classes.fields} key={item.id}>
            <GridContainer justifyContent="space-between" alignItems="flex-start">
              <GridItem xs={12} sm={12} md={12} lg={4}>
                <OutlinedFieldInput
                  labelText="Heading"
                  id={`${item.id}-heading`}
                  name="heading"
                  index={index}
                  formControlProps={{ fullWidth: true }}
                  inputProps={{ ...register(`embedFields.${index}.heading`) }}
                  error={errors.embedFields && errors.embedFields[index] ? errors.embedFields[index] : {}}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={12} lg={8}>
                <OutlinedFieldInput
                  labelText="Content"
                  id={`${item.id}-content`}
                  name="content"
                  index={index}
                  formControlProps={{ fullWidth: true }}
                  inputProps={{ ...register(`embedFields.${index}.content`) }}
                  error={errors.embedFields && errors.embedFields[index] ? errors.embedFields[index] : {}}
                  multiline
                  textarea
                />
              </GridItem>
              <GridItem xs={6}>
                <ControlledCheckbox
                  control={control}
                  name={`embedFields.${index}.inline`}
                  error={errors.embedFields && errors.embedFields[index] ? errors.embedFields[index] : {}}
                  label="Inline"
                  removeHelper
                />
              </GridItem>
              <GridItem xs={6} right>
                <IconButton aria-label="delete" onClick={() => moveUp(index)} >
                  <ArrowUpwardIcon className={classes.arrow} />
                </IconButton>
                <IconButton aria-label="delete" onClick={() => moveDown(index)} >
                  <ArrowDownwardIcon className={classes.arrow} />
                </IconButton>
                <IconButton aria-label="delete" onClick={() => remove(index)} >
                  <DeleteIcon className={classes.delete} />
                </IconButton>
              </GridItem>
            </GridContainer>
          </div>
        );
      })}
      <Button
        className={classes.addFieldButton}
        color="orange"
        startIcon={<AddCircleIcon />}
        onClick={addNewfield}
      >
        Field ({fields.length}/9)
      </Button>
      <OutlinedInput
        labelText="Footer"
        description="Footer text (optional)"
        id="embedFooter"
        name="embedFooter"
        formControlProps={{ fullWidth: true }}
        inputProps={{ ...register("embedFooter") }}
        error={errors}
      />
      <OutlinedInput
        labelText="image url"
        description="Footer thumbnail image (optional)"
        id="embedFooterThumbnailURL"
        name="embedFooterThumbnailURL"
        formControlProps={{ fullWidth: true }}
        inputProps={{ ...register("embedFooterThumbnailURL") }}
        error={errors}
      />
      <Fab />
    </>
  );
}

EmbedEditor.propTypes = {
  classes: PropTypes.object.isRequired,
  control: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  fields: PropTypes.array.isRequired,
  register: PropTypes.func.isRequired,
  append: PropTypes.func.isRequired,
  swap: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  setValue: PropTypes.func.isRequired,
  watchEmbedDescription: PropTypes.string.isRequired,
};

export default withStyles(styles)(EmbedEditor);