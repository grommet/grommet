import React from 'react';
import { Link } from './Link';

const Anchor = props => {
  if (process.env.NODE_ENV !== 'production') {
    console.warn(
      'This component will be deprecated in an upcoming release. ' +
        'Please see https://github.com/grommet/grommet/pull/3299',
    );
  }
  return <Link {...props} />;
};

export { Link, Anchor };
