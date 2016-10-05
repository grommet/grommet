import React from 'react';
import Configure from './Configure';

export default (props) => {
  console.warn(
    'Configuration has been renamed to Configure.' +
    ' Plese update your import statement.'
  );
  return <Configure {...props} />;
};
