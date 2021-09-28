import React from 'react';
import { useHistory } from 'react-router-dom';

// Import react-hook-form
import { useForm, useFieldArray, useWatch } from 'react-hook-form';

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

function setDefaultValues(module) {
  // if (module) {
  //   return {
  //     command: module.command,
  //     description: module.description,
  //     responseLocation: module.responseLocation,
  //     responseType: module.responseType,
  //     response: module.response,
  //     embedTitle: module.embedTitle,
  //     embedLinkURL: module.embedLinkURL,
  //     embedColor: module.embedColor,
  //     embedThumbnailURL: module.embedThumbnailURL,
  //     embedMainImageURL: module.embedMainImageURL,
  //     embedDescription: module.embedDescription,
  //     embedFields: module.embedFields,
  //     embedFooter: module.embedFooter,
  //     embedFooterThumbnailURL: module.embedFooterThumbnailURL,
  //   }
  // } else {
    return {
      channel: "",
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
  // }
}


function AnnouncementsJoin(props) {
  const { classes, selectedBot, setApiAlert } = props;
  const history = useHistory();

  const { register, handleSubmit, control, watch, setValue, trigger, formState: { errors } } = useForm({
    // resolver: joiResolver(schema),
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

  const onSubmit = (data) => {
    console.log(data);
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
            name="channel"
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