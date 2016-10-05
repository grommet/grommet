import React from 'react';
import Optimize from './Optimize';

export default (props) => {
  console.warn(
    'Optimization has been renamed to Optimize.' +
    ' Plese update your import statement.'
  );
  return <Optimize {...props} />;
};
