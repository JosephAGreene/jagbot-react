import React from 'react';
import AppAppBar from './modules/views/AppAppBar';
import MainLanding from './modules/views/MainLanding';

export default function Home() {
    return (
        <React.Fragment>
            <AppAppBar />
            <MainLanding />
        </React.Fragment>
    );
}