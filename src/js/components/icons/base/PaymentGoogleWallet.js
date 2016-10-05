import React from 'react';
import SocialGoogleWallet from './SocialGoogleWallet';

export default (props) => {
  console.warn(
    'PaymentGoogleWallet has been renamed to SocialGoogleWallet.' +
    ' Plese update your import statement.'
  );
  return <SocialGoogleWallet {...props} />;
};
