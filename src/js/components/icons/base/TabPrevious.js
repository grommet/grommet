import React from 'react';
import CaretPrevious from './CaretPrevious';

export default (props) => {
  console.warn(
    'TabPrevious has been renamed to CaretPrevious.' +
    ' Plese update your import statement.'
  );
  return <CaretPrevious {...props} />;
};
