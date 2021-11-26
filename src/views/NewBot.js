import React from 'react';

// Import react-hook-form
import { useForm } from 'react-hook-form';

// Import custom components
import TitlePanel from './panels/TitlePanel';
import OutlinedInput from '../components/inputs/OutlinedInputDark';

// Import layouts
import ContentWrapper from '../layouts/ContentWrapper';

function NewBot() {
  const { register, handleSubmit, formState:{ errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  }

  return (
    <ContentWrapper>
      <TitlePanel 
        title="Create New Bot"
        description="This is where your bots are stashed. Take one to The Lab to teach it new tricks!"
        //image={stashImage}
      />
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

export default NewBot;