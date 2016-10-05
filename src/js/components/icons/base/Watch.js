import React from 'react';
import CirclePlay from './CirclePlay';

export default (props) => {
  console.warn(
    'Watch has been renamed to CirclePlay.' +
    ' Plese update your import statement.'
  );
  return <CirclePlay {...props} />;
};
