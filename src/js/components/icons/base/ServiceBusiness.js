import React from 'react';
import BusinessService from './BusinessService';

export default (props) => {
  console.warn(
    'ServiceBusiness has been renamed to BusinessService.' +
    ' Plese update your import statement.'
  );
  return <BusinessService {...props} />;
};
