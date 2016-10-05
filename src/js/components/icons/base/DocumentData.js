import React from 'react';
import DocumentStore from './DocumentStore';

export default (props) => {
  console.warn(
    'DocumentData has been renamed to DocumentStore.' +
    ' Plese update your import statement.'
  );
  return <DocumentStore {...props} />;
};
