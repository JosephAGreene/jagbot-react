import React from 'react';
import AppAppBar from './views/AppAppBar';
import SignInForm from './views/SignInForm';


export default function SignIn() {

  return (
    <React.Fragment>
      <AppAppBar />
      <SignInForm />
    </React.Fragment>
  );
}