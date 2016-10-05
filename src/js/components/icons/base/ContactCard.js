import React from 'react';
import ContactInfo from './ContactInfo';

export default (props) => {
  console.warn(
    'ContactCard has been renamed to ContactInfo.' +
    ' Plese update your import statement.'
  );
  return <ContactInfo {...props} />;
};
