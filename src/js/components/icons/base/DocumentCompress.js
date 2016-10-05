import React from 'react';
import DocumentZip from './DocumentZip';

export default (props) => {
  console.warn(
    'DocumentCompress has been renamed to DocumentZip.' +
    ' Plese update your import statement.'
  );
  return <DocumentZip {...props} />;
};
