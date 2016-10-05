import React from 'react';
import Services from './Services';

export default (props) => {
  console.warn(
    'Soa has been renamed to Services.' +
    ' Plese update your import statement.'
  );
  return <Services {...props} />;
};
