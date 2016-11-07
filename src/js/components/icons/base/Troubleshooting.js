import React from 'react';
import Troubleshoot from './Troubleshoot';

export default (props) => {
  console.warn(
    'Troubleshooting has been renamed to Troubleshoot.' +
    ' Plese update your import statement.'
  );
  return <Troubleshoot {...props} />;
};
