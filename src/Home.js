import React from 'react';
import AppAppBar from './views/AppAppBar';
import MainLanding from './views/MainLanding';

export default function Home() {
    return (
        <React.Fragment>
            <AppAppBar />
            <MainLanding />
        </React.Fragment>
    );
}