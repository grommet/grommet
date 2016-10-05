import React from 'react';
import SearchAdvanced from './SearchAdvanced';

export default (props) => {
  console.warn(
    'AdvancedSearch has been renamed to SearchAdvanced.' +
    ' Plese update your import statement.'
  );
  return <SearchAdvanced {...props} />;
};
