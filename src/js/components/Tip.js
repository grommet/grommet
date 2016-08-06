// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import Box from './Box';
import CSSClassnames from '../utils/CSSClassnames';
import Drop from '../utils/Drop';

const CLASS_ROOT = CSSClassnames.TIP;

export default class Tip extends Component {

  componentDidMount () {
    const { targetId, onClose, colorIndex } = this.props;
    const target = document.getElementById(targetId);
    if (target) {
      let classNames = [`${CLASS_ROOT}__drop`];
      const rect = target.getBoundingClientRect();
      let align = {};

      if (rect.left < (window.innerWidth - rect.right)) {
        align.left = 'left';
        classNames.push(`${CLASS_ROOT}__drop--left`);
      } else {
        align.right = 'right';
        classNames.push(`${CLASS_ROOT}__drop--right`);
      }
      if (rect.top < (window.innerHeight - rect.bottom)) {
        align.top = 'bottom';
        classNames.push(`${CLASS_ROOT}__drop--top`);
      } else {
        align.bottom = 'top';
        classNames.push(`${CLASS_ROOT}__drop--bottom`);
      }

      this._drop = Drop.add(target, this._renderDrop(), {
        align: align,
        className: classNames.join(' '),
        colorIndex: colorIndex
      });

      target.addEventListener('click', onClose);
      target.addEventListener('blur', onClose);
    }
  }

  componentWillUnmount () {
    const { targetId, onClose } = this.props;
    const target = document.getElementById(targetId);
    if (target) {
      this._drop.remove();
      target.removeEventListener('click', onClose);
      target.removeEventListener('blur', onClose);
    }
  }

  _renderDrop () {
    const { onClose } = this.props;
    return (
      <Box className={CLASS_ROOT}
        pad={{ horizontal: 'medium', vertical: 'small' }}
        onClick={onClose}>
        {this.props.children}
      </Box>
    );
  }

  render () {
    return <span></span>;
  }

}

Tip.propTypes = {
  colorIndex: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  targetId: PropTypes.string.isRequired
};

Tip.defaultProps = {
  colorIndex: 'accent-1'
};
