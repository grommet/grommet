import React, { PropTypes } from 'react';
import Add from './icons/base/Add';
import CSSClassnames from '../utils/CSSClassnames';

const CLASS_ROOT = CSSClassnames.HOTSPOT;

export default function Hotspot (props) {
  return (
    <div className={CLASS_ROOT} onClick={props.onClick}>
      <div className={`${CLASS_ROOT}__icon`}>
        <Add />
      </div>
      <div className={`${CLASS_ROOT}__icon-pulse`}></div>
    </div>
  );
}

Hotspot.propTypes = {
  onClick: PropTypes.func
};
