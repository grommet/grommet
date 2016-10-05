import React from 'react';
import SocialSquare from './SocialSquare';

export default (props) => {
  console.warn(
    'PaymentSquare has been renamed to SocialSquare.' +
    ' Plese update your import statement.'
  );
  return <SocialSquare {...props} />;
};
