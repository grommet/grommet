import React from 'react';
import SocialPaypal from './SocialPaypal';

export default (props) => {
  console.warn(
    'PaymentPaypal has been renamed to SocialPaypal.' +
    ' Plese update your import statement.'
  );
  return <SocialPaypal {...props} />;
};
