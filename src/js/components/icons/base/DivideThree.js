import React from 'react';
import Splits from './Splits';

export default (props) => {
  console.warn(
    'DivideThree has been renamed to Splits.' +
    ' Plese update your import statement.'
  );
  return <Splits {...props} />;
};
