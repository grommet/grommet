// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { PropTypes } from 'react';
import classnames from 'classnames';

const CLASS_ROOT = 'headline';

const Headline = props => {
  let classes = classnames(
    CLASS_ROOT,
    props.className,
    {
      [`${CLASS_ROOT}--${props.size}`]: props.size,
      [`${CLASS_ROOT}--align-${props.align}`]: props.align,
      [`${CLASS_ROOT}--margin-${props.margin}`]: props.margin,
      [`${CLASS_ROOT}--large`]: props.large,
      [`${CLASS_ROOT}--small`]: props.small,
      [`${CLASS_ROOT}--strong`]: props.strong
    }
  );
  if (props.large) {
    console.warn('The "large" property of Headline is deprecated. Use size="large" instead.');
  }
  if (props.small) {
    console.warn('The "small" property of Headline is deprecated. Use size="small" instead.');
  }

  return (
    <div className={classes}>
      {props.children}
    </div>
  );
};

Headline.propTypes = {
  align: PropTypes.oneOf(['start', 'center', 'end']),
  margin: PropTypes.oneOf(['none', 'small', 'medium', 'large']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  large: PropTypes.bool, // deprecated
  small: PropTypes.bool, // deprecated
  strong: PropTypes.bool
};

Headline.displayName = 'Headline';

export default Headline;
