import React from 'react';
import DocumentExe from './DocumentExe';

export default (props) => {
  console.warn(
    'DocumentExecutable has been renamed to DocumentExe.' +
    ' Plese update your import statement.'
  );
  return <DocumentExe {...props} />;
};
