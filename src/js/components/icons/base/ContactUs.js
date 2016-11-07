import React from 'react';
import Contact from './Contact';

export default (props) => {
  console.warn(
    'ContactUs has been renamed to Contact.' +
    ' Plese update your import statement.'
  );
  return <Contact {...props} />;
};
