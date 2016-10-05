import React from 'react';
import PlatformGoogle from './PlatformGoogle';

export default (props) => {
  console.warn(
    'SocialGoogle has been renamed to PlatformGoogle.' +
    ' Plese update your import statement.'
  );
  return <PlatformGoogle {...props} />;
};
