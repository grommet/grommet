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
    var contentElement = ReactDOM.findDOMNode(this.refs.content);
    var mirrorElement = this.refs.mirror;

    // constrain fixed content to the width of the mirror
    var mirrorRect = mirrorElement.getBoundingClientRect();
    contentElement.style.width = `${Math.floor(mirrorRect.width)}px`;

    // align the mirror height with the content's height
    var contentRect = contentElement.getBoundingClientRect();
    mirrorElement.style.height = `${Math.floor(contentRect.height)}px`;
  }

  render () {
    let classes = classnames(
      CLASS_ROOT,
      this.props.className,
      {
        [`${CLASS_ROOT}--${this.props.size}`]: this.props.size,
        [`${CLASS_ROOT}--float`]: this.props.float
      }
    );

    let containerClasses = classnames(
      `${CLASS_ROOT}__container`,
      {
        [`${CLASS_ROOT}__container--float`]: this.props.float,
        [`${CLASS_ROOT}__container--fixed`]: this.props.fixed,
        [`${CLASS_ROOT}__container--fill`]: (
          // add default color index if none is provided
          this.props.fixed && !this.props.colorIndex
        )
      }
    );

    let wrapperClasses = classnames(
      `${CLASS_ROOT}__wrapper`,
      {
        [`${CLASS_ROOT}__wrapper--${this.props.size}`]: this.props.size
      }
    );

    let footerSkipLink;
    if (this.props.primary) {
      footerSkipLink = <SkipLinkAnchor label="Footer" />;
    }

    let boxProps = Props.pick(this.props, Object.keys(Box.propTypes));
    // don't transfer size to Box since it means something different
    delete boxProps.size;

    if (this.props.fixed) {
      return (
        <div className={containerClasses}>
          <div ref="mirror" className={`${CLASS_ROOT}__mirror`}></div>
          <div className={wrapperClasses}>
            <Box ref='content' {...boxProps} tag="footer" className={classes}
              primary={false}>
              {footerSkipLink}
              {this.props.children}
            </Box>
          </div>
        </div>
      );
    } else {
      return (
        <Box {...boxProps} tag="footer" className={classes}
          containerClassName={containerClasses}
          primary={false}>
          {footerSkipLink}
          {this.props.children}
        </Box>
      );
    }
  }
};

Footer.propTypes = {
  fixed: PropTypes.bool,
  float: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  primary: PropTypes.bool,
  ...Box.propTypes
};

Footer.defaultProps = {
  direction: 'row',
  responsive: false
};
