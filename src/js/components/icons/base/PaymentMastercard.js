import React from 'react';
import SocialMastercard from './SocialMastercard';

export default (props) => {
  console.warn(
    'PaymentMastercard has been renamed to SocialMastercard.' +
    ' Plese update your import statement.'
  );
  return <SocialMastercard {...props} />;
};
