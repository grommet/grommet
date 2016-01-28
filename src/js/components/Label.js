// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { PropTypes } from 'react';

const CLASS_ROOT = 'label';

const Label = props => {
  let icon, text;

  if (props.icon) {
    icon = (
      <span className={`${CLASS_ROOT}__icon control-icon`}>
        {props.icon}
      </span>
    );
  }

  if (props.text) {
    text = <span className={`${CLASS_ROOT}__text`}>{props.text}</span>;
  }

  return (
    <div className={CLASS_ROOT}>
      {icon}
      {text}
    </div>
  );
};

Label.propTypes = {
  icon: PropTypes.node,
  text: PropTypes.string
};

Label.displayName = 'Label';

export default Label;
