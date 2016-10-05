import React from 'react';
import SocialSkype from './SocialSkype';

export default (props) => {
  console.warn(
    'PlatformSkype has been renamed to SocialSkype.' +
    ' Plese update your import statement.'
  );
  return <SocialSkype {...props} />;
};
