import React from 'react';
import { Controller } from "react-hook-form";

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

export default function GroupedSelect(props) {
  const { control } = props;
  const options = [
    { server: "111", channel: "test" },
    { server: "222", channel: "general" },
    { server: "111", channel: "something" }
  ];

  return (
    <Controller
    control={control}
    name="channel"
    render={({ field: { onChange, value } }) => (
      <Autocomplete
        onChange={(event, item) => {
          onChange(item);
        }}
        value={value}
        options={options.sort((a, b) => -b.server.localeCompare(a.server))}
        groupBy={(option) => option.server}
        getOptionLabel={(option) => (option.channel ? option.channel : "")}
        getOptionSelected={option => option}
        renderInput={(params) => (
          <TextField
            {...params}
            label="items"
            margin="normal"
            variant="outlined"
          />
        )}
      />
    )}
  />


  );
}