import React from 'react';
import AppAppBar from './views/AppAppBar';
import DashboardView from './views/Dashboard';

export default function Dashboard(props) {

  return (
    <React.Fragment>
      <AppAppBar />
      <DashboardView/>
    </React.Fragment>
  );
}