// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { PropTypes } from 'react';
import classnames from 'classnames';

const CLASS_ROOT = 'paragraph';

const Paragraph = props => {
  var classes = classnames(
    CLASS_ROOT,
    props.className,
    {
      [`${CLASS_ROOT}--${props.size}`]: props.size,
      [`${CLASS_ROOT}--align-${props.align}`]: props.align,
      [`${CLASS_ROOT}--margin-${props.margin}`]: props.margin
    }
  );

  return (
    <p id={props.id} className={classes}>
      {props.children}
    </p>
  );
};

Paragraph.propTypes = {
  align: PropTypes.oneOf(['start', 'center', 'end']),
  id: PropTypes.string,
  margin: PropTypes.oneOf(['none', 'small', 'medium', 'large']),
  size: PropTypes.oneOf(['small', 'medium', 'large'])
};

Paragraph.displayName = 'Paragraph';

export default Paragraph;
