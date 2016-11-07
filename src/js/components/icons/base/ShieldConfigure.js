import React from 'react';
import ShieldSecurity from './ShieldSecurity';

export default (props) => {
  console.warn(
    'ShieldConfigure has been renamed to ShieldSecurity.' +
    ' Plese update your import statement.'
  );
  return <ShieldSecurity {...props} />;
};
