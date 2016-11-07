import React from 'react';
import Validate from './Validate';

export default (props) => {
  console.warn(
    'Validation has been renamed to Validate.' +
    ' Plese update your import statement.'
  );
  return <Validate {...props} />;
};
