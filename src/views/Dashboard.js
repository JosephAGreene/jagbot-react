import React from 'react';
import AuthService from "../services/AuthService.js";
import { Redirect } from 'react-router-dom';

export default function Dashboard () {
    if(!AuthService.getCurrentUser()) {
        return <Redirect to="/home" />
    }

    return(
        <React.Fragment>
            This is the dashboard.
        </React.Fragment>
    );
}