import React from 'react';
import Layer from './Layer';

export default (props) => {
  console.warn(
    'Overlay has been renamed to Layer.' +
    ' Plese update your import statement.'
  );
  return <Layer {...props} />;
};
