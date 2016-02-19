// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { PropTypes } from 'react';
import classnames from 'classnames';

const CLASS_ROOT = 'image';

const Image = props => {
  let { size, full } = props;
  let classes = classnames(
    CLASS_ROOT,
    props.className,
    {
      [`${CLASS_ROOT}--${size}`]: size,
      [`${CLASS_ROOT}--full`]: typeof full === 'boolean' && full,
      [`${CLASS_ROOT}--full-${full}`]: typeof full === 'string'
    }
  );

  return <img id={props.id} className={classes} src={props.src} />;
};

Image.propTypes = {
  full: PropTypes.oneOf([true, 'horizontal', 'vertical', false]),
  src: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large', 'thumb'])
};

Image.displayName = 'Image';

export default Image;
