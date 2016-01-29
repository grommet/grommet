// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { PropTypes } from 'react';

const CLASS_ROOT = 'attribute';

const Attribute = ({ label, children }) => (
  <div className={CLASS_ROOT}>
    <label className={`${CLASS_ROOT}__label`}>
      {label}
    </label>
    <span className={`${CLASS_ROOT}__contents`}>
      {children}
    </span>
  </div>
);

Attribute.propTypes = {
  label: PropTypes.string
};

export default Attribute;
