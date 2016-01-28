// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { PropTypes } from 'react';
import classnames from 'classnames';
import Anchor from './Anchor';
import Props from '../utils/Props';

const CLASS_ROOT = 'tag';

const Tag = props => {
  let classes = classnames(CLASS_ROOT, props.className);
  let anchorProps = Props.pick(props, Anchor);

  return (
    <div className={classes} onClick={props.onClick}>
      {props.children}
      <Anchor {...anchorProps} className={`${CLASS_ROOT}--label`}>
        <span>{props.label}</span>
      </Anchor>
    </div>
  );
};

Tag.propTypes = {
  label: PropTypes.string,
  ...Anchor.propTypes
};

Tag.displayName = 'Tag';

export default Tag;
