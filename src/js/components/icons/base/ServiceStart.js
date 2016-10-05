import React from 'react';
import ServicePlay from './ServicePlay';

export default (props) => {
  console.warn(
    'ServiceStart has been renamed to ServicePlay.' +
    ' Plese update your import statement.'
  );
  return <ServicePlay {...props} />;
};
