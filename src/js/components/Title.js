// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { PropTypes } from 'react';
import classnames from 'classnames';
import Box from './Box';
import Intl from '../utils/Intl';

const CLASS_ROOT = 'title';

const Title = (props, context) => {
  let classes = classnames(
    CLASS_ROOT,
    props.className,
    {
      [`${CLASS_ROOT}--responsive}`]: props.responsive,
      [`${CLASS_ROOT}--interactive}`]: props.onClick
    }
  );

  let a11yTitle = Intl.getMessage(context.intl, props.a11yTitle);

  return (
    <Box align="center" direction="row" responsive={false}
      className={classes} a11yTitle={a11yTitle}
      onClick={props.onClick}>
      {props.children}
    </Box>
  );
};

Title.propTypes = {
  a11yTitle: PropTypes.string,
  onClick: PropTypes.func,
  responsive: PropTypes.bool
};

Title.contextTypes = {
  intl: PropTypes.object
};

Title.defaultProps = {
  responsive: true,
  a11yTitle: 'Title'
};

Title.displayName = 'Title';

export default Title;
