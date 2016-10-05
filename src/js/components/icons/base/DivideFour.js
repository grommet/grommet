import React from 'react';
import Columns from './Columns';

export default (props) => {
  console.warn(
    'DivideFour has been renamed to Columns.' +
    ' Plese update your import statement.'
  );
  return <Columns {...props} />;
};
