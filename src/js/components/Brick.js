// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { PropTypes } from 'react';
import classnames from 'classnames';
import Anchor from './Anchor';

const CLASS_ROOT = 'brick';
const TYPE_SMALL = 'small';
const TYPE_LARGE = 'large';
const TYPE_WIDE = 'wide';
const TYPE_TALL = 'tall';

const Brick = props => {
  let widthUnit = 1;
  let heightUnit = 1;

  switch (props.type) {
    case TYPE_LARGE:
      widthUnit = 2;
      heightUnit = 2;
      break;
    case TYPE_WIDE:
      widthUnit = 2;
      heightUnit = 1;
      break;
    case TYPE_TALL:
      widthUnit = 1;
      heightUnit = 2;
      break;
  }

  let classes = classnames(
    CLASS_ROOT,
    `${CLASS_ROOT}--${widthUnit}-${heightUnit}`,
    {
      [`background-color-index-${props.colorIndex}`]: props.colorIndex
    },
    props.className
  );

  let label = (
    <div className={`${CLASS_ROOT}--label`}>
      <span>{props.label}</span>
    </div>
  );

  if (props.href || props.onClick) {
    label = (
      <Anchor href={props.href} onClick={props.onClick} className={`${CLASS_ROOT}--label`}>
        <span>{props.label}</span>
      </Anchor>
    );
  }

  let style = {};
  if (props.texture && 'string' === typeof props.texture) {
    style.background = "url(" + props.texture + ") no-repeat center center";
    style.backgroundSize = "cover";
  } else if (props.backgroundImage) {
    style.background = "url(" + props.backgroundImage + ") no-repeat center center";
    style.backgroundSize = "cover";
  }
  let texture;
  if ('object' === typeof props.texture) {
    texture = <div className={CLASS_ROOT + "__texture"}>{props.texture}</div>;
  }

  return (
    <div className={classes} style={style}>
      <div className={`${CLASS_ROOT}--content-wrapper`}>
        {texture}
        {props.children}
      </div>
      {label}
    </div>
  );
};

Brick.propTypes = {
  colorIndex: PropTypes.string,
  href: PropTypes.string,
  label: PropTypes.string,
  onClick: PropTypes.func,
  texture: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string
  ]),
  type: PropTypes.oneOf([TYPE_SMALL, TYPE_LARGE, TYPE_WIDE, TYPE_TALL])
};

Brick.defaultProps = {
  type: TYPE_SMALL
};

Brick.displayName = 'Brick';

export default Brick;
