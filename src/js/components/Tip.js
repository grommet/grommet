// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import Box from './Box';
import classnames from 'classnames';
import CSSClassnames from '../utils/CSSClassnames';
import Drop from '../utils/Drop';

const CLASS_ROOT = CSSClassnames.TIP;

export default class Tip extends Component {

  componentDidMount () {
    const { targetId, onClose, colorIndex } = this.props;
    const target = document.getElementById(targetId);
    if (target) {
      const rect = target.getBoundingClientRect();
      let align = {
        left: (
          rect.left < (window.innerWidth - rect.right) ? 'left' : undefined
        ),
        right: (
          rect.left >= (window.innerWidth - rect.right) ? 'right' : undefined
        ),
        top: (
          rect.top < (window.innerHeight - rect.bottom) ? 'bottom' : undefined
        ),
        bottom: (
          rect.top >= (window.innerHeight - rect.bottom) ? 'top' : undefined
        )
      };

      const classNames = classnames(
        `${CLASS_ROOT}__drop`, {
          [`${CLASS_ROOT}__drop--left`]: align.left,
          [`${CLASS_ROOT}__drop--right`]: align.right,
          [`${CLASS_ROOT}__drop--top`]: align.top,
          [`${CLASS_ROOT}__drop--bottom`]: align.bottom
        }
      );

      // we need a timeout here to avoid wrong bounding rect
      // for the target element
      setTimeout(() => {
        this._drop = Drop.add(target, this._renderDrop(), {
          align: align,
          className: classNames,
          colorIndex: colorIndex,
          responsive: false
        });
      }, 1);

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
