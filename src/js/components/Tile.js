// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import Props from '../utils/Props';
import Box from './Box';

const CLASS_ROOT = "tile";

export default class Tile extends Component {

  render () {
    const { children, className, onClick, wide, status, selected,
      hoverStyle, hoverColorIndex, hoverBorder, hoverBorderSize } = this.props;
    const restProps = Props.omit(this.props, Object.keys(Box.propTypes));

    if (selected) {
      console.warn('Selected option has been deprecated, please use ' +
        'selected option at the Tiles level.');
    }

    const statusClass = status ? status.toLowerCase() : undefined;
    // if Tiles flush is true, default borderSize to small (1px)
    let borderSize = (hoverBorder) ?
      ((hoverBorderSize) ? hoverBorderSize : 'large') : 'small';

    const classes = classnames(
      CLASS_ROOT,
      className,
      {
        [`${CLASS_ROOT}--status-${statusClass}`]: status,
        [`${CLASS_ROOT}--wide`]: wide,
        [`${CLASS_ROOT}--selectable`]: onClick,
        [`${CLASS_ROOT}--selected`]: selected,
        [`${hoverStyle}${(hoverStyle == 'border') ?
          ((borderSize) ? `-${borderSize}` : '-medium') : ''
        }-hover-color-index-${hoverColorIndex}`]: hoverStyle,
        [`${CLASS_ROOT}--hover-border-${borderSize}`]: borderSize
      }
    );

    const boxProps = Props.pick(this.props, Object.keys(Box.propTypes));

    return (
      <Box {...restProps} {...boxProps} className={classes}>
        {children}
      </Box>
    );
  }

}

Tile.propTypes = {
  selected: PropTypes.bool,
  wide: PropTypes.bool,
  hoverStyle: PropTypes.oneOf(['border', 'background', 'none']),
  hoverColorIndex: PropTypes.string,
  hoverBorderSize: PropTypes.oneOf(['small', 'medium', 'large']),
  ...Box.propTypes
};

Tile.defaultProps = {
  pad: 'none',
  direction: 'column',
  align: 'center',
  hoverStyle: 'none',
  hoverColorIndex: 'disabled'
};
