// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React from 'react';
import classnames from 'classnames';

const CLASS_ROOT = 'form-fields';

const FormFields = props => {
  let classes = classnames(CLASS_ROOT, props.className);

  return (
    <div className={classes}>
      {props.children}
    </div>
  );
};

FormFields.displayName = 'FormFields';

export default FormFields;
