// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import CSSClassnames from '../utils/CSSClassnames';
import Props from '../utils/Props';
import Box from './Box';

const CLASS_ROOT = CSSClassnames.HEADER;

export default class Header extends Component {

  constructor(props, context) {
    super(props, context);

    this._onResize = this._onResize.bind(this);
    this._alignMirror = this._alignMirror.bind(this);
  }

  componentDidMount () {
    if (this.props.fixed) {
      window.addEventListener('resize', this._onResize);
      this._onResize();
    }
  }

  componentDidUpdate () {
    if (this.props.fixed) {
      this._onResize();
    }
  }

  componentWillUnmount () {
    if (this.props.fixed) {
      clearTimeout(this._resizeTimer);
      window.removeEventListener('resize', this._onResize);
    }
  }

  _onResize () {
    // give just a little time for the DOM to stabilize
    clearTimeout(this._resizeTimer);
    this._resizeTimer = setTimeout(this._alignMirror, 10);
  }

  _alignMirror () {
    var contentElement = ReactDOM.findDOMNode(this.contentRef);
    var mirrorElement = this.mirrorRef;

    // constrain fixed content to the width of the mirror
    var mirrorRect = mirrorElement.getBoundingClientRect();
    contentElement.style.width = `${Math.floor(mirrorRect.width)}px`;

    // align the mirror height with the content's height
    var contentRect = contentElement.getBoundingClientRect();
    mirrorElement.style.height = `${Math.floor(contentRect.height)}px`;
  }

  render () {
    const {
      children, className, colorIndex, fixed, float, role, size, splash
    } = this.props;
    const classes = classnames(
      CLASS_ROOT, {
        [`${CLASS_ROOT}--${size}`]: (size && typeof size === 'string'),
        [`${CLASS_ROOT}--float`]: float,
        [`${CLASS_ROOT}--splash`]: splash
      },
      className
    );
    const containerClasses = classnames(
      `${CLASS_ROOT}__container`, {
        [`${CLASS_ROOT}__container--fixed`]: fixed,
        // add default color index if none is provided
        [`${CLASS_ROOT}__container--fill`]: (fixed && !colorIndex),
        [`${CLASS_ROOT}__container--float`]: float
      }
    );
    const wrapperClasses = classnames(
      `${CLASS_ROOT}__wrapper`, {
        [`${CLASS_ROOT}__wrapper--${size}`]: (size && typeof size === 'string')
      }
    );
    var other = Props.pick(this.props, Object.keys(Box.propTypes));
    let restProps = Props.omit(this.props, Object.keys(Header.propTypes));
    if (size && typeof size === 'string') {
      // don't transfer size to Box since it means something different
      delete other.size;
    }

    if (fixed) {
      return (
        <div className={containerClasses}>
          <div ref={ref => this.mirrorRef = ref}
            className={`${CLASS_ROOT}__mirror`} />
          <div className={wrapperClasses}>
            {/* ie11 does not work with align center and min-height
              adding a wrapper flex div with column direction fixes the issue
              https://github.com/philipwalton/flexbugs
            */}
            <Box pad='none' flex={false}>
              <Box ref={ref => this.contentRef = ref}
                {...other} {...restProps} tag="header"
                className={classes}>
                {children}
              </Box>
            </Box>
          </div>
        </div>
      );
    } else {
      return (
        // ie11 does not work with align center and min-height
        // adding a wrapper flex div with column direction fixes the issue
        // https://github.com/philipwalton/flexbugs
        <Box pad='none' flex={false}>
          <Box {...other} {...restProps} tag="header" role={role}
            className={classes}
            containerClassName={containerClasses}>
            {children}
          </Box>
        </Box>
      );
    }
  }

}

Header.propTypes = {
  fixed: PropTypes.bool,
  float: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  splash: PropTypes.bool,
  ...Box.propTypes
};

Header.defaultProps = {
  pad: { horizontal: 'none', vertical: 'none', between: 'small'},
  direction: 'row',
  align: 'center',
  responsive: false
};
