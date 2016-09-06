// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import KeyboardAccelerators from '../utils/KeyboardAccelerators';
import Intl from '../utils/Intl';
import Props from '../utils/Props';
import SkipLinkAnchor from './SkipLinkAnchor';
import CSSClassnames from '../utils/CSSClassnames';
import { announce } from '../utils/Announcer';

const CLASS_ROOT = CSSClassnames.BOX;
const BACKGROUND_COLOR_INDEX = CSSClassnames.BACKGROUND_COLOR_INDEX;

export default class Box extends Component {

  componentDidMount () {
    const { onClick } = this.props;
    if (onClick) {
      let clickCallback = function () {
        if (this.boxContainerRef === document.activeElement) {
          onClick();
        }
      }.bind(this);

      KeyboardAccelerators.startListeningToKeyboard(this, {
        enter: clickCallback,
        space: clickCallback
      });
    }
  }

  componentDidUpdate () {
    if (this.props.announce) {
      announce(this.boxContainerRef.textContent);
    }
  }

  componentWillUnmount () {
    if (this.props.onClick) {
      KeyboardAccelerators.stopListeningToKeyboard(this);
    }
  }

  _addPropertyClass (classes, prefix, property, classProperty) {
    let choice = this.props[property];
    let propertyPrefix = classProperty || property;
    if (choice) {
      if (typeof choice === 'string') {
        classes.push(prefix + '--' + propertyPrefix + '-' + choice);
      } else if (typeof choice === 'object') {
        Object.keys(choice).forEach(function (key) {
          classes.push(prefix + '--' + propertyPrefix + '-' + key + '-' +
            choice[key]);
        });
      } else {
        classes.push(prefix + '--' + propertyPrefix);
      }
    }
  }

  render () {
    const { a11yTitle, appCentered, backgroundImage, children, className,
      colorIndex, containerClassName, flex, focusable, id, onClick, primary,
      role, size, tag, tabIndex, texture } = this.props;
    let classes = [CLASS_ROOT];
    let containerClasses = [CLASS_ROOT + "__container"];
    let restProps = Props.omit(this.props, Object.keys(Box.propTypes));
    this._addPropertyClass(classes, CLASS_ROOT, 'full');
    this._addPropertyClass(classes, CLASS_ROOT, 'direction');
    this._addPropertyClass(classes, CLASS_ROOT, 'justify');
    this._addPropertyClass(classes, CLASS_ROOT, 'align');
    this._addPropertyClass(classes, CLASS_ROOT, 'alignContent',
      'align-content');
    this._addPropertyClass(classes, CLASS_ROOT, 'reverse');
    this._addPropertyClass(classes, CLASS_ROOT, 'responsive');
    this._addPropertyClass(classes, CLASS_ROOT, 'pad');
    this._addPropertyClass(classes, CLASS_ROOT, 'separator');
    this._addPropertyClass(classes, CLASS_ROOT, 'size');
    this._addPropertyClass(classes, CLASS_ROOT, 'textAlign', 'text-align');
    this._addPropertyClass(classes, CLASS_ROOT, 'wrap');

    if (this.props.hasOwnProperty('flex')) {
      if (flex) {
        classes.push('flex');
      } else {
        classes.push('no-flex');
      }
    }
    if (this.props.hasOwnProperty('size')) {
      if (size) {
        classes.push(`${CLASS_ROOT}--size`);
      }
    }

    if (appCentered) {
      this._addPropertyClass(containerClasses,
        CLASS_ROOT + "__container", 'full');
      if (colorIndex) {
        containerClasses.push(
          `${BACKGROUND_COLOR_INDEX}-${colorIndex}`);
      }
      if (containerClassName) {
        containerClasses.push(containerClassName);
      }
    } else {
      if (colorIndex) {
        classes.push(`${BACKGROUND_COLOR_INDEX}-${colorIndex}`);
      }
    }

    let a11yProps = {};
    if (onClick) {
      classes.push(CLASS_ROOT + "--clickable");
      if (focusable) {
        let boxLabel = a11yTitle ||
          Intl.getMessage(this.context.intl, 'Box');
        a11yProps.tabIndex = 0;
        a11yProps["aria-label"] = boxLabel;
        a11yProps.role = role || 'link';
      }
    }

    let skipLinkAnchor;
    if (primary) {
      let mainContentLabel = (
        Intl.getMessage(this.context.intl, 'Main Content')
      );
      skipLinkAnchor = <SkipLinkAnchor label={mainContentLabel} />;
    }

    if (className) {
      classes.push(className);
    }

    let style = {};
    if (texture && 'string' === typeof texture) {
      if (texture.indexOf('url(') !== -1) {
        style.backgroundImage = texture;
      } else {
        style.backgroundImage = `url(${texture})`;
      }
    } else if (backgroundImage) {
      style.background =
        backgroundImage + " no-repeat center center";
      style.backgroundSize = "cover";
    }
    style = {...style, ...restProps.style};
    let textureMarkup;
    if ('object' === typeof texture) {
      textureMarkup = (
        <div className={CLASS_ROOT + "__texture"}>{texture}</div>
      );
    }

    const Component = tag;

    if (appCentered) {
      return (
        <div {...restProps} ref={(ref) => this.boxContainerRef = ref}
          className={containerClasses.join(' ')}
          style={style} role={role} {...a11yProps}>
          {skipLinkAnchor}
          <Component id={id} className={classes.join(' ')}>
            {textureMarkup}
            {children}
          </Component>
        </div>
      );
    } else {
      return (
        <Component {...restProps} ref={(ref) => this.boxContainerRef = ref}
          id={id} className={classes.join(' ')} style={style}
          role={role} tabIndex={tabIndex}
          onClick={onClick} {...a11yProps}>
          {skipLinkAnchor}
          {textureMarkup}
          {children}
        </Component>
      );
    }
  }

}

Box.propTypes = {
  a11yTitle: PropTypes.string,
  announce: PropTypes.bool,
  align: PropTypes.oneOf(['start', 'center', 'end', 'baseline', 'stretch']),
  alignContent: PropTypes.oneOf(['start', 'center', 'end', 'between',
    'around', 'stretch']),
  appCentered: PropTypes.bool,
  backgroundImage: PropTypes.string,
  children: PropTypes.any,
  colorIndex: PropTypes.string,
  containerClassName: PropTypes.string,
  direction: PropTypes.oneOf(['row', 'column']),
  focusable: PropTypes.bool,
  flex: PropTypes.bool,
  full: PropTypes.oneOf([true, 'horizontal', 'vertical', false]),
  onClick: PropTypes.func,
  justify: PropTypes.oneOf(['start', 'center', 'between', 'end']),
  pad: PropTypes.oneOfType([
    PropTypes.oneOf(['none', 'small', 'medium', 'large']),
    PropTypes.shape({
      between: PropTypes.oneOf(['none', 'small', 'medium', 'large']),
      horizontal: PropTypes.oneOf(['none', 'small', 'medium', 'large']),
      vertical: PropTypes.oneOf(['none', 'small', 'medium', 'large'])
    })
  ]),
  primary: PropTypes.bool,
  reverse: PropTypes.bool,
  responsive: PropTypes.bool,
  role: PropTypes.string,
  separator: PropTypes.oneOf(['top', 'bottom', 'left', 'right',
    'horizontal', 'vertical', 'all', 'none']),
  size: PropTypes.oneOf(['auto', 'xsmall', 'small', 'medium', 'large', 'full']),
  tag: PropTypes.string,
  textAlign: PropTypes.oneOf(['left', 'center', 'right']),
  texture: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string
  ]),
  wrap: PropTypes.bool
};

Box.contextTypes = {
  intl: PropTypes.object
};

Box.defaultProps = {
  announce: false,
  direction: 'column',
  pad: 'none',
  tag: 'div',
  responsive: true,
  focusable: true
};
