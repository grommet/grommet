import React from 'react';
import Announce from './Announce';

export default (props) => {
  console.warn(
    'Announcement has been renamed to Announce.' +
    ' Plese update your import statement.'
  );
  return <Announce {...props} />;
};
