// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import Props from '../utils/Props';
import Box from './Box';
import CSSClassnames from '../utils/CSSClassnames';

const CLASS_ROOT = CSSClassnames.TILE;
const NAMESPACE = CSSClassnames.NAMESPACE;

export default class Tile extends Component {

  render () {
    const {
      children, className, eclipsed, hoverBorder, hoverBorderSize,
      hoverColorIndex, hoverStyle, onClick, status, wide
    } = this.props;
    const restProps = Props.omit(this.props, Object.keys(Tile.propTypes));

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
        [`${NAMESPACE}${hoverStyle}${(hoverStyle == 'border') ?
          ((borderSize) ? `-${borderSize}` : '-medium') : ''
        }-hover-color-index-${hoverColorIndex}`]: hoverStyle,
        [`${CLASS_ROOT}--hover-border-${borderSize}`]: borderSize,
        [`${CLASS_ROOT}--eclipsed`]: eclipsed
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
  eclipsed: PropTypes.bool,
  hoverStyle: PropTypes.oneOf(['border', 'background', 'none']),
  hoverColorIndex: PropTypes.string,
  hoverBorder: PropTypes.bool,
  hoverBorderSize: PropTypes.oneOf(['small', 'medium', 'large']),
  wide: PropTypes.bool, /// remove in 1.0? Box.basis='full'
  ...Box.propTypes
};

Tile.defaultProps = {
  pad: 'none',
  direction: 'column',
  align: 'center',
  hoverStyle: 'none',
  hoverColorIndex: 'disabled'
};
