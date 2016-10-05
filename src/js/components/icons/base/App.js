import React from 'react';
import Apps from './Apps';

export default (props) => {
  console.warn(
    'App has been renamed to Apps.' +
    ' Plese update your import statement.'
  );
  return <Apps {...props} />;
};
