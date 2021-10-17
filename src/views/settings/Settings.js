import React from 'react';

// Import layouts
import ContentWrapper from '../../layouts/ContentWrapper';

// Import custom components
import TitlePanel from '../panels/TitlePanel';


// Import images
import settingsImage from '../../assets/images/settings.png';


function Settings(props) {

  return (
    <ContentWrapper>
      <TitlePanel
        title="Settings"
        description="Your bot's settings."
        image={settingsImage}
        docs={true}
      />
    </ContentWrapper>
  );
}



export default Settings;