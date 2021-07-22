import React from 'react';

// Import react-hook-form
import { useForm } from 'react-hook-form';

// Import custom components
import OutlinedInput from '../components/inputs/OutlinedInputDark';

// Import layouts
import ContentWrapper from '../layouts/ContentWrapper';

function CreateBot() {
  const { register, handleSubmit, formState:{ errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  }

  return (
    <ContentWrapper>
        <form autoComplete="off" onSubmit={handleSubmit(onSubmit)} >
          <OutlinedInput
            labelText="E-Mail"
            id="email"
            name="email"
            formControlProps={{fullWidth: true}}
            inputProps={{...register("email")}}
            error={errors}
          />
        </form>
    </ContentWrapper>
  );
}

export default CreateBot;