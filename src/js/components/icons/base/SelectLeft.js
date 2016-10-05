import React from 'react';
import Selection from './Selection';

export default (props) => {
  console.warn(
    'SelectLeft has been renamed to Selection.' +
    ' Plese update your import statement.'
  );
  return <Selection {...props} />;
};
