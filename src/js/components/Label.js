// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { PropTypes } from 'react';
import classnames from 'classnames';

const CLASS_ROOT = 'label';

const Label = props => {
  let classes = classnames(
    CLASS_ROOT,
    props.className,
    {
      [`${CLASS_ROOT}--uppercase`]: props.uppercase,
      [`${CLASS_ROOT}--margin-${props.margin}`]: props.margin
    }
  );

  return (
    <label className={classes} htmlFor={props.labelFor}>
      {props.children}
    </label>
  );
};

Label.propTypes = {
  labelFor: PropTypes.string,
  margin: PropTypes.oneOf(['none', 'small', 'medium', 'large']),
  uppercase: PropTypes.bool
};

Label.displayName = 'Label';

export default Label;
