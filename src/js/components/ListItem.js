// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { PropTypes } from 'react';
import classnames from 'classnames';
import Box from './Box';
import Props from '../utils/Props';

const CLASS_ROOT = 'list-item';

const ListItem = props => {
  let classes = classnames(
    CLASS_ROOT,
    props.className,
    {
      [`${CLASS_ROOT}--selected`]: props.selected,
      [`${CLASS_ROOT}--selectable`]: props.onClick
    }
  );

  let children;

  if (props.label) {
    let image;
    if (props.image) {
      image = (
        <span className={`${CLASS_ROOT}__image`}>
          {props.image}
        </span>
      );
    }
    children = [
      image,
      <span key="label" className={`${CLASS_ROOT}__label`}>
        {props.label}
      </span>,
      <span key="annotation" className={`${CLASS_ROOT}__annotation`}>
        {props.annotation}
      </span>
    ];
  } else {
    children = props.children;
  }

  let boxProps = Props.pick(props, Box);

  return (
    <Box {...boxProps} tag="li" className={classes} onClick={props.onClick}>
      {children}
    </Box>
  );
};

ListItem.propTypes = {
  onClick: PropTypes.func,
  selected: PropTypes.bool,
  ...Box.propTypes,
  // deprecated properties
  annotation: PropTypes.node,
  image: PropTypes.node,
  label: PropTypes.node
};

ListItem.defaultProps = {
  align: 'center',
  direction: 'row',
  pad: {horizontal: 'medium', vertical: 'small'},
  separator: 'bottom'
};

ListItem.displayName = 'ListItem';

export default ListItem;
