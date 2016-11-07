// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import Box from './Box';
import SkipLinkAnchor from './SkipLinkAnchor';
import Props from '../utils/Props';
import CSSClassnames from '../utils/CSSClassnames';

const CLASS_ROOT = CSSClassnames.FOOTER;

export default class Footer extends Component {

  constructor(props, context) {
    super(props, context);
    this._alignMirror = this._alignMirror.bind(this);
    this._onResize = this._onResize.bind(this);
  }

  componentDidMount () {
    if (this.props.fixed) {
      this._alignMirror();
      window.addEventListener('resize', this._onResize);
    }
  }

  componentDidUpdate () {
    if (this.props.fixed) {
      this._alignMirror();
    }
  }

  componentWillUnmount () {
    if (this.props.fixed) {
      window.removeEventListener('resize', this._onResize);
    }
  }

  _onResize () {
    this._alignMirror();
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
      children, className, colorIndex, fixed, float, primary, size
    } = this.props;
    const restProps = Props.omit(this.props, Object.keys(Footer.propTypes));
    const classes = classnames(
      CLASS_ROOT,
      {
        [`${CLASS_ROOT}--${size}`]: (
          size && typeof size === 'string'),
        [`${CLASS_ROOT}--float`]: float
      },
      className
    );

    const containerClasses = classnames(
      `${CLASS_ROOT}__container`,
      {
        [`${CLASS_ROOT}__container--float`]: float,
        [`${CLASS_ROOT}__container--fixed`]: fixed,
        [`${CLASS_ROOT}__container--fill`]: (
          // add default color index if none is provided
          fixed && !colorIndex
        )
      }
    );

    const wrapperClasses = classnames(
      `${CLASS_ROOT}__wrapper`,
      {
        [`${CLASS_ROOT}__wrapper--${size}`]: (
          size && typeof size === 'string')
      }
    );

    let footerSkipLink;
    if (primary) {
      footerSkipLink = <SkipLinkAnchor label="Footer" />;
    }

    const boxProps = Props.pick(this.props, Object.keys(Box.propTypes));
    // don't transfer size to Box since it means something different
    delete boxProps.size;

    if (fixed) {
      return (
        <div className={containerClasses} {...restProps}>
          <div ref={ref => this.mirrorRef = ref}
            className={`${CLASS_ROOT}__mirror`} />
          <div className={wrapperClasses}>
            <Box ref={ref => this.contentRef = ref}
              {...boxProps} tag="footer" className={classes}
              primary={false}>
              {footerSkipLink}
              {children}
            </Box>
          </div>
        </div>
      );
    } else {
      return (
        <Box {...restProps} {...boxProps} tag="footer" className={classes}
          containerClassName={containerClasses}
          primary={false}>
          {footerSkipLink}
          {children}
        </Box>
      );
    }
  }
};

Footer.propTypes = {
  fixed: PropTypes.bool,
  float: PropTypes.bool,
  primary: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  ...Box.propTypes
};

Footer.defaultProps = {
  align: 'center',
  direction: 'row',
  responsive: false
};
