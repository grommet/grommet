// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { PropTypes } from 'react';
import classnames from 'classnames';

const CLASS_ROOT = 'headline';

const Headline = props => {
  let classes = classnames(
    CLASS_ROOT,
    props.className,
    {
      [`${CLASS_ROOT}--large`]: props.large,
      [`${CLASS_ROOT}--small`]: props.small,
      [`${CLASS_ROOT}--strong`]: props.strong
    }
  );

  return (
    <div className={classes}>
      {props.children}
    </div>
  );
};

Headline.propTypes = {
  large: PropTypes.bool,
  small: PropTypes.bool,
  strong: PropTypes.bool
};

Headline.displayName = 'Headline';

export default Headline;
