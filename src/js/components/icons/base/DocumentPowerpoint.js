import React from 'react';
import DocumentPpt from './DocumentPpt';

export default (props) => {
  console.warn(
    'DocumentPowerpoint has been renamed to DocumentPpt.' +
    ' Plese update your import statement.'
  );
  return <DocumentPpt {...props} />;
};
