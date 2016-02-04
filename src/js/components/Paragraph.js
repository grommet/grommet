// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { PropTypes } from 'react';
import classnames from 'classnames';

const CLASS_ROOT = 'paragraph';

const Paragraph = props => {
  var classes = classnames(
    CLASS_ROOT,
    {
      [`${CLASS_ROOT}--${props.size}`]: props.size
    }
  );

  return (
    <p id={props.id} className={classes}>
      {props.children}
    </p>
  );
};

Paragraph.propTypes = {
  id: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large'])
};

Paragraph.displayName = 'Paragraph';

export default Paragraph;
