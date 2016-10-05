import React from 'react';
import SocialVisa from './SocialVisa';

export default (props) => {
  console.warn(
    'PaymentVisa has been renamed to SocialVisa.' +
    ' Plese update your import statement.'
  );
  return <SocialVisa {...props} />;
};
