import React from 'react';
import { useLocation } from 'react-router-dom';

// Import layouts
import ContentWrapper from '../../layouts/ContentWrapper';

// Import custom components
import TitlePanel from '../panels/TitlePanel';

// Import images
import gettingStartedImage from '../../assets/images/gettingStarted.png';

export default function GettingStarted(props) {
  const { newUser } = useLocation();

  return (
    <ContentWrapper>
      <TitlePanel
        title="Getting Started"
        description="Everything you need to know in order to get your custom bot online and running!"
        image={gettingStartedImage}
      />
      {newUser && 
        <div>This is a new user</div>
      }
    </ContentWrapper>
  );
}