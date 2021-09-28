import React from 'react';
import PropTypes from "prop-types";

// Import react-hook-form
import { Controller } from "react-hook-form";

// Import API service
import BotService from "../../services/BotService.js";

// @material-ui/core components
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from '@material-ui/core/FormHelperText';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import CircularProgress from '@material-ui/core/CircularProgress';

// Import icons
import SyncIcon from '@material-ui/icons/Sync';

const styles = (theme) => ({
  autocompleteRoot: {
    '& .MuiIconButton-root': {
      color: theme.palette.white.main,
    }
  },
  textFieldRoot: {
    '& .MuiFormLabel-root': {
      color: theme.palette.white.dark,
    },
    '& label.Mui-focused': {
      color: theme.palette.white.main,
    },
    '& label.Mui-error': {
      color: theme.palette.error.main,
    },
    '& .MuiOutlinedInput-root': {
      backgroundColor: theme.palette.gray.main,
      color: theme.palette.white.main,
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: theme.palette.teal.dark,
      },
      '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.teal.light,
      },
      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: theme.palette.teal.main
      },
      "&.Mui-error .MuiOutlinedInput-notchedOutline": {
        borderColor: theme.palette.error.main
      }
    },
  },
  dropdownPaper: {
    backgroundColor: theme.palette.gray.dark,
    boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)',
  },
  dropdownLabel: {
    color: theme.palette.white.main,
    backgroundColor: theme.palette.gray.dark,
  },
  dropdownOption: {
    color: theme.palette.white.dark,
    '&:hover': {
      backgroundColor: theme.palette.gray.light,
    }
  },
  dropdownUl: {
    backgroundColor: theme.palette.gray.dark,
  },
  dropdownNoOptions: {
    color: theme.palette.white.dark,
  },
  labelRootError: {
    color: theme.palette.error.main
  },
  formControl: {
    paddingBottom: "5px",
    margin: "5px 0 0 0",
    position: "relative",
    verticalAlign: "unset",
    width: "100%",
  },
  description: {
    color: theme.palette.white.dark,
    margin: "0 0 10px 0",
    fontSize: "16px",
  },
  syncButton: {
    padding: 0,
    margin: 0,
  },
  syncIcon: {
    color: theme.palette.teal.dark,
    '&:hover': {
      color: theme.palette.teal.light,
    },
  },
  progress: {
    color: theme.palette.teal.light,
    padding: 0,
    marginLeft: "2px",
    marginRight: "2px",
  }
});

function ChannelSelect(props) {
  const { 
    classes, 
    control, 
    name, 
    label, 
    description, 
    formControlProps, 
    error, 
    selectedBot, 
    setApiAlert 
  } = props;

  const [loading, setLoading] = React.useState(false);
  const [channels, setChannels] = React.useState(selectedBot.serverChannels ? selectedBot.serverChannels : []);

  const handleBotChannelsSync = async () => {
    setLoading(true);

    const payload = {
      botId: selectedBot._id,
    };

    const res = await BotService.getBotChannels(payload);

    if(res.status === 200) {
      setChannels(res.data);
    }

    if(res.status === 'dead') {
      setApiAlert({
        status: true,
        duration: 4000,
        severity: "error",
        message: "Server is down or busy!"
      });
    }

    setLoading(false);
  }

  return (
    <FormControl
      {...formControlProps}
      className={classes.formControl}
      variant="outlined"
    >
      <div className={classes.description}>
        {description}
      </div>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <Autocomplete
            className={classes.autocompleteRoot}
            classes={{
              paper: classes.dropdownPaper,
              groupLabel: classes.dropdownLabel,
              groupUl: classes.dropdownUl,
              option: classes.dropdownOption,
              noOptions: classes.dropdownNoOptions,
            }}
            onChange={(event, option) => {
              onChange(option);
            }}
            value={value}
            options={loading ? [] : channels.sort((a, b) => -b.serverName.localeCompare(a.serverName))}
            groupBy={(option) => `Server: ${option.serverName}`}
            renderOption={(option) => (option.channelName ? option.channelName : "")}
            getOptionLabel={(option) => (option.channelName ? `${option.serverName}: ${option.channelName}` : "")}
            getOptionSelected={option => option}
            noOptionsText={loading ?  "Fetching channels..." : "No channels found. Try refreshing."}
            renderInput={(params) => (
              <TextField
                {...params}
                className={classes.textFieldRoot}
                label={label}
                variant="outlined"
                InputProps={{
                  ...params.InputProps,
                  startAdornment: (
                    <InputAdornment position="start">
                      {loading
                        ? <CircularProgress className={classes.progress} style={{ height: "20px", width: "20px" }} />
                        : <IconButton className={classes.syncButton} aria-label="sync channels" onClick={handleBotChannelsSync} >
                            <SyncIcon className={classes.syncIcon} />
                          </IconButton>
                      }
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />

        )}
      />
      {error[name] ?
        <FormHelperText className={classes.labelRootError} id={`error-message-${name}`}>{error[name].message}</FormHelperText>
        : <FormHelperText> </FormHelperText>
      }
    </FormControl>
  );
}

ChannelSelect.propTypes = {
  classes: PropTypes.object.isRequired,
  control: PropTypes.object.isRequired,
  name: PropTypes.string,
  label: PropTypes.string,
  description: PropTypes.string,
  formControlProps: PropTypes.object,
  error: PropTypes.object,
  selectedBot: PropTypes.object.isRequired,
  setApiAlert: PropTypes.func.isRequired,
};

export default withStyles(styles)(ChannelSelect);