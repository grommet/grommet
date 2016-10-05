import React from 'react';
import CaretUp from './CaretUp';

export default (props) => {
  console.warn(
    'TabUp has been renamed to CaretUp.' +
    ' Plese update your import statement.'
  );
  return <CaretUp {...props} />;
};
