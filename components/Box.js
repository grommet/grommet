// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');
var keys = require('lodash/object/keys');

var KeyboardAccelerators = require('../utils/KeyboardAccelerators');
var Intl = require('../utils/Intl');

var CLASS_ROOT = "box";

var Box = React.createClass({
  displayName: 'Box',

  propTypes: {
    a11yTitle: React.PropTypes.string,
    align: React.PropTypes.oneOf(['start', 'center', 'end']),
    appCentered: React.PropTypes.bool,
    backgroundImage: React.PropTypes.string,
    colorIndex: React.PropTypes.string,
    containerClassName: React.PropTypes.string,
    direction: React.PropTypes.oneOf(['row', 'column']),
    full: React.PropTypes.oneOf([true, 'horizontal', 'vertical', false]),
    onClick: React.PropTypes.func,
    justify: React.PropTypes.oneOf(['start', 'center', 'between', 'end']),
    pad: React.PropTypes.oneOfType([React.PropTypes.oneOf(['none', 'small', 'medium', 'large']), React.PropTypes.shape({
      horizontal: React.PropTypes.oneOf(['none', 'small', 'medium', 'large']),
      vertical: React.PropTypes.oneOf(['none', 'small', 'medium', 'large'])
    })]),
    reverse: React.PropTypes.bool,
    responsive: React.PropTypes.bool,
    separator: React.PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
    tag: React.PropTypes.string,
    textAlign: React.PropTypes.oneOf(['left', 'center', 'right']),
    texture: React.PropTypes.string
  },

  contextTypes: {
    intl: React.PropTypes.object
  },

  getDefaultProps: function getDefaultProps() {
    return {
      a11yTitle: 'Box',
      direction: 'column',
      pad: 'none',
      tag: 'div',
      responsive: true
    };
  },

  componentDidMount: function componentDidMount() {
    if (this.props.onClick) {
      var clickCallback = (function () {
        if (this.refs.boxContainer === document.activeElement) {
          this.props.onClick();
        }
      }).bind(this);

      KeyboardAccelerators.startListeningToKeyboard(this, {
        enter: clickCallback,
        space: clickCallback
      });
    }
  },

  componentWillUnmount: function componentWillUnmount() {
    if (this.props.onClick) {
      var clickCallback = function clickCallback() {
        if (this.refs.boxContainer === document.activeElement) {
          this.props.onClick();
        }
      };

      KeyboardAccelerators.stopListeningToKeyboard(this, {
        enter: clickCallback,
        space: clickCallback
      });
    }
  },

  _addPropertyClass: function _addPropertyClass(classes, prefix, property, classProperty) {
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
  },

  render: function render() {
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
    if (this.props.texture) {
      style.backgroundImage = this.props.texture;
    } else if (this.props.backgroundImage) {
      style.background = this.props.backgroundImage + " no-repeat center center";
      style.backgroundSize = "cover";
    }

    var a11yProps = {};
    if (this.props.onClick) {
      var boxLabel = Intl.getMessage(this.context.intl, this.props.a11yTitle);
      a11yProps.tabIndex = 0;
      a11yProps["aria-label"] = boxLabel;
      a11yProps.role = 'link';
    }

    if (this.props.appCentered) {
      return React.createElement(
        'div',
        _extends({ ref: 'boxContainer', className: containerClasses.join(' '),
          style: style, onClick: this.props.onClick }, a11yProps),
        React.createElement(
          this.props.tag,
          { id: this.props.id, className: classes.join(' ') },
          this.props.children
        )
      );
    } else {
      return React.createElement(
        this.props.tag,
        _extends({ ref: 'boxContainer', id: this.props.id,
          className: classes.join(' '), style: style,
          onClick: this.props.onClick }, a11yProps),
        this.props.children
      );
    }
  }

});

module.exports = Box;