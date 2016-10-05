import React from 'react';
import Cli from './Cli';

export default (props) => {
  console.warn(
    'CommandLine has been renamed to Cli.' +
    ' Plese update your import statement.'
  );
  return <Cli {...props} />;
};
