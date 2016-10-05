import React from 'react';
import Nodes from './Nodes';

export default (props) => {
  console.warn(
    'CircularView has been renamed to Nodes.' +
    ' Plese update your import statement.'
  );
  return <Nodes {...props} />;
};
