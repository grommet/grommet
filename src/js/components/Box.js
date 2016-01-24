// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import keys from 'lodash/object/keys';
import KeyboardAccelerators from '../utils/KeyboardAccelerators';
import Intl from '../utils/Intl';

const CLASS_ROOT = "box";

export default class Box extends Component {

  componentDidMount () {
    if (this.props.onClick) {
      var clickCallback = function () {
        if (this.refs.boxContainer === document.activeElement) {
          this.props.onClick();
        }
      }.bind(this);

      KeyboardAccelerators.startListeningToKeyboard(this, {
        enter: clickCallback,
        space: clickCallback
      });
    }
  }

  componentWillUnmount () {
    if (this.props.onClick) {
      KeyboardAccelerators.stopListeningToKeyboard(this);
    }
  }

  _addPropertyClass (classes, prefix, property, classProperty) {
    var choice = this.props[property];
    var propertyPrefix = classProperty || property;
    if (choice) {
      if (typeof choice === 'string') {
        classes.push(prefix + '--' + propertyPrefix + '-' + choice);
      } else if (typeof choice === 'object') {
        keys(choice).forEach(function (key) {
          classes.push(prefix + '--' + propertyPrefix + '-' + key + '-' + choice[key]);
        });
      } else {
        classes.push(prefix + '--' + propertyPrefix);
      }
    }
  }

  render () {
    var classes = [CLASS_ROOT];
    var containerClasses = [CLASS_ROOT + "__container"];
    this._addPropertyClass(classes, CLASS_ROOT, 'flush');
    this._addPropertyClass(classes, CLASS_ROOT, 'full');
    this._addPropertyClass(classes, CLASS_ROOT, 'direction');
    this._addPropertyClass(classes, CLASS_ROOT, 'justify');
    this._addPropertyClass(classes, CLASS_ROOT, 'align');
    this._addPropertyClass(classes, CLASS_ROOT, 'reverse');
    this._addPropertyClass(classes, CLASS_ROOT, 'responsive');
    this._addPropertyClass(classes, CLASS_ROOT, 'pad');
    this._addPropertyClass(classes, CLASS_ROOT, 'separator');
    this._addPropertyClass(classes, CLASS_ROOT, 'textAlign', 'text-align');
    this._addPropertyClass(classes, CLASS_ROOT, 'wrap');

    if (this.props.appCentered) {
      this._addPropertyClass(containerClasses, CLASS_ROOT + "__container", 'full');
      if (this.props.colorIndex) {
        containerClasses.push("background-color-index-" + this.props.colorIndex);
      }
      if (this.props.containerClassName) {
        containerClasses.push(this.props.containerClassName);
      }
    } else {
      if (this.props.colorIndex) {
        classes.push("background-color-index-" + this.props.colorIndex);
      }
    }

    if (this.props.className) {
      classes.push(this.props.className);
    }

    var style = {};
    if (this.props.texture && 'string' === typeof this.props.texture) {
      style.backgroundImage = this.props.texture;
    } else if (this.props.backgroundImage) {
      style.background = this.props.backgroundImage + " no-repeat center center";
      style.backgroundSize = "cover";
    }
    var texture;
    if ('object' === typeof this.props.texture) {
      texture = <div className={CLASS_ROOT + "__texture"}>{this.props.texture}</div>;
    }

    var a11yProps = {};
    if (this.props.onClick) {
      var boxLabel = Intl.getMessage(this.context.intl, this.props.a11yTitle);
      a11yProps.tabIndex = 0;
      a11yProps["aria-label"] = boxLabel;
      a11yProps.role = this.props.role || 'link';
    }

    let eventRegex = /^on[A-Z].*$/;
    let eventListeners = {};
    Object.keys(this.props).forEach((prop) => {
      if (eventRegex.test(prop)) {
        eventListeners[prop] = this.props[prop];
      }
    });

    if (this.props.appCentered) {
      return (
        <div ref="boxContainer" className={containerClasses.join(' ')}
          style={style} role={this.props.role} {...a11yProps}
          {...eventListeners}>
          <this.props.tag id={this.props.id} className={classes.join(' ')}>
            {texture}
            {this.props.children}
          </this.props.tag>
        </div>
      );
    } else {
      return (
        <this.props.tag ref="boxContainer" id={this.props.id}
          className={classes.join(' ')} style={style}
          role={this.props.role} tabIndex={this.props.tabIndex} {...a11yProps}
          {...eventListeners}>
          {texture}
          {this.props.children}
        </this.props.tag>
      );
    }
  }

}

Box.propTypes = {
  a11yTitle: PropTypes.string,
  align: PropTypes.oneOf(['start', 'center', 'end', 'stretch']),
  appCentered: PropTypes.bool,
  backgroundImage: PropTypes.string,
  colorIndex: PropTypes.string,
  containerClassName: PropTypes.string,
  direction: PropTypes.oneOf(['row', 'column']),
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
  reverse: PropTypes.bool,
  responsive: PropTypes.bool,
  role: PropTypes.string,
  separator: PropTypes.oneOf(['top', 'bottom', 'left', 'right', 'horizontal', 'vertical', 'all']),
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
  a11yTitle: 'Box',
  direction: 'column',
  pad: 'none',
  tag: 'div',
  responsive: true
};
