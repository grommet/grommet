import React from 'react';
import SocialMail from './SocialMail';

export default (props) => {
  console.warn(
    'SocialEmail has been renamed to SocialMail.' +
    ' Plese update your import statement.'
  );
  return <SocialMail {...props} />;
};
