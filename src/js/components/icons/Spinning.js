// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React from 'react';
import classnames from 'classnames';

var CLASS_ROOT = 'icon-spinning';

const Spinning = props => {
  let classes = classnames(
    CLASS_ROOT,
    props.className,
    {
      [`${CLASS_ROOT}--small}`]: props.small
    }
  );

  return (
    <svg className={classes} viewBox="0 0 48 48" version="1.1" >
      <circle stroke="#ddd" strokeWidth="4" strokeDasharray="24px 8px" fill="none" cx="24" cy="24" r="20"></circle>
      <circle stroke="#333" strokeWidth="4" strokeDasharray="24px 104px" fill="none" cx="24" cy="24" r="20"></circle>
    </svg>
  );
};

Spinning.displayName = 'Spinning';

export default Spinning;
