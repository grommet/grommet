import React from 'react';
import CaretNext from './CaretNext';

export default (props) => {
  console.warn(
    'TabNext has been renamed to CaretNext.' +
    ' Plese update your import statement.'
  );
  return <CaretNext {...props} />;
};
