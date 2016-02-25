// (C) Copyright 2016 Hewlett Packard Enterprise Development LP

import React from 'react';

const CLASS_ROOT = "grommet";

export default props => {

  return (
    <div className={CLASS_ROOT}>
      {props.children}
    </div>
  );
};
