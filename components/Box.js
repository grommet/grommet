'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _KeyboardAccelerators = require('../utils/KeyboardAccelerators');

var _KeyboardAccelerators2 = _interopRequireDefault(_KeyboardAccelerators);

var _Intl = require('../utils/Intl');

var _Intl2 = _interopRequireDefault(_Intl);

var _Props = require('../utils/Props');

var _Props2 = _interopRequireDefault(_Props);

var _SkipLinkAnchor = require('./SkipLinkAnchor');

var _SkipLinkAnchor2 = _interopRequireDefault(_SkipLinkAnchor);

var _CSSClassnames = require('../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

var _Announcer = require('../utils/Announcer');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CLASS_ROOT = _CSSClassnames2.default.BOX; // (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

var BACKGROUND_COLOR_INDEX = _CSSClassnames2.default.BACKGROUND_COLOR_INDEX;

var Box = function (_Component) {
  (0, _inherits3.default)(Box, _Component);

  function Box() {
    (0, _classCallCheck3.default)(this, Box);
    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Box).apply(this, arguments));
  }

  (0, _createClass3.default)(Box, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var onClick = this.props.onClick;

      if (onClick) {
        var clickCallback = function () {
          if (this.refs.boxContainer === document.activeElement) {
            onClick();
          }
        }.bind(this);

        _KeyboardAccelerators2.default.startListeningToKeyboard(this, {
          enter: clickCallback,
          space: clickCallback
        });
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      if (this.props.announce) {
        (0, _Announcer.announce)(this.refs.boxContainer.textContent);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.props.onClick) {
        _KeyboardAccelerators2.default.stopListeningToKeyboard(this);
      }
    }
  }, {
    key: '_addPropertyClass',
    value: function _addPropertyClass(classes, prefix, property, classProperty) {
      var choice = this.props[property];
      var propertyPrefix = classProperty || property;
      if (choice) {
        if (typeof choice === 'string') {
          classes.push(prefix + '--' + propertyPrefix + '-' + choice);
        } else if ((typeof choice === 'undefined' ? 'undefined' : (0, _typeof3.default)(choice)) === 'object') {
          (0, _keys2.default)(choice).forEach(function (key) {
            classes.push(prefix + '--' + propertyPrefix + '-' + key + '-' + choice[key]);
          });
        } else {
          classes.push(prefix + '--' + propertyPrefix);
        }
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props;
      var a11yTitle = _props.a11yTitle;
      var appCentered = _props.appCentered;
      var backgroundImage = _props.backgroundImage;
      var children = _props.children;
      var className = _props.className;
      var colorIndex = _props.colorIndex;
      var containerClassName = _props.containerClassName;
      var flex = _props.flex;
      var focusable = _props.focusable;
      var id = _props.id;
      var onClick = _props.onClick;
      var primary = _props.primary;
      var role = _props.role;
      var size = _props.size;
      var tag = _props.tag;
      var tabIndex = _props.tabIndex;
      var texture = _props.texture;

      var classes = [CLASS_ROOT];
      var containerClasses = [CLASS_ROOT + "__container"];
      var restProps = _Props2.default.omit(this.props, (0, _keys2.default)(Box.propTypes));
      this._addPropertyClass(classes, CLASS_ROOT, 'full');
      this._addPropertyClass(classes, CLASS_ROOT, 'direction');
      this._addPropertyClass(classes, CLASS_ROOT, 'justify');
      this._addPropertyClass(classes, CLASS_ROOT, 'align');
      this._addPropertyClass(classes, CLASS_ROOT, 'alignContent', 'align-content');
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
          classes.push(CLASS_ROOT + '--size');
        }
      }

      if (appCentered) {
        this._addPropertyClass(containerClasses, CLASS_ROOT + "__container", 'full');
        if (colorIndex) {
          containerClasses.push(BACKGROUND_COLOR_INDEX + '-' + colorIndex);
        }
        if (containerClassName) {
          containerClasses.push(containerClassName);
        }
      } else {
        if (colorIndex) {
          classes.push(BACKGROUND_COLOR_INDEX + '-' + colorIndex);
        }
      }

      var a11yProps = {};
      if (onClick) {
        classes.push(CLASS_ROOT + "--clickable");
        if (focusable) {
          var boxLabel = a11yTitle || _Intl2.default.getMessage(this.context.intl, 'Box');
          a11yProps.tabIndex = 0;
          a11yProps["aria-label"] = boxLabel;
          a11yProps.role = role || 'link';
        }
      }

      var skipLinkAnchor = void 0;
      if (primary) {
        var mainContentLabel = _Intl2.default.getMessage(this.context.intl, 'Main Content');
        skipLinkAnchor = _react2.default.createElement(_SkipLinkAnchor2.default, { label: mainContentLabel });
      }

      if (className) {
        classes.push(className);
      }

      var style = {};
      if (texture && 'string' === typeof texture) {
        if (texture.indexOf('url(') !== -1) {
          style.backgroundImage = texture;
        } else {
          style.backgroundImage = 'url(' + texture + ')';
        }
      } else if (backgroundImage) {
        style.background = backgroundImage + " no-repeat center center";
        style.backgroundSize = "cover";
      }
      style = (0, _extends3.default)({}, style, restProps.style);
      var textureMarkup = void 0;
      if ('object' === (typeof texture === 'undefined' ? 'undefined' : (0, _typeof3.default)(texture))) {
        textureMarkup = _react2.default.createElement(
          'div',
          { className: CLASS_ROOT + "__texture" },
          texture
        );
      }

      var Component = tag;

      if (appCentered) {
        return _react2.default.createElement(
          'div',
          (0, _extends3.default)({}, restProps, { ref: 'boxContainer',
            className: containerClasses.join(' '),
            style: style, role: role }, a11yProps),
          skipLinkAnchor,
          _react2.default.createElement(
            Component,
            { id: id, className: classes.join(' ') },
            textureMarkup,
            children
          )
        );
      } else {
        return _react2.default.createElement(
          Component,
          (0, _extends3.default)({}, restProps, { ref: 'boxContainer', id: id,
            className: classes.join(' '), style: style,
            role: role, tabIndex: tabIndex,
            onClick: onClick }, a11yProps),
          skipLinkAnchor,
          textureMarkup,
          children
        );
      }
    }
  }]);
  return Box;
}(_react.Component);

Box.displayName = 'Box';
exports.default = Box;


Box.propTypes = {
  a11yTitle: _react.PropTypes.string,
  announce: _react.PropTypes.bool,
  align: _react.PropTypes.oneOf(['start', 'center', 'end', 'baseline', 'stretch']),
  alignContent: _react.PropTypes.oneOf(['start', 'center', 'end', 'between', 'around', 'stretch']),
  appCentered: _react.PropTypes.bool,
  backgroundImage: _react.PropTypes.string,
  children: _react.PropTypes.any,
  colorIndex: _react.PropTypes.string,
  containerClassName: _react.PropTypes.string,
  direction: _react.PropTypes.oneOf(['row', 'column']),
  focusable: _react.PropTypes.bool,
  flex: _react.PropTypes.bool,
  full: _react.PropTypes.oneOf([true, 'horizontal', 'vertical', false]),
  onClick: _react.PropTypes.func,
  justify: _react.PropTypes.oneOf(['start', 'center', 'between', 'end']),
  pad: _react.PropTypes.oneOfType([_react.PropTypes.oneOf(['none', 'small', 'medium', 'large']), _react.PropTypes.shape({
    between: _react.PropTypes.oneOf(['none', 'small', 'medium', 'large']),
    horizontal: _react.PropTypes.oneOf(['none', 'small', 'medium', 'large']),
    vertical: _react.PropTypes.oneOf(['none', 'small', 'medium', 'large'])
  })]),
  primary: _react.PropTypes.bool,
  reverse: _react.PropTypes.bool,
  responsive: _react.PropTypes.bool,
  role: _react.PropTypes.string,
  separator: _react.PropTypes.oneOf(['top', 'bottom', 'left', 'right', 'horizontal', 'vertical', 'all', 'none']),
  size: _react.PropTypes.oneOf(['auto', 'xsmall', 'small', 'medium', 'large', 'full']),
  tag: _react.PropTypes.string,
  textAlign: _react.PropTypes.oneOf(['left', 'center', 'right']),
  texture: _react.PropTypes.oneOfType([_react.PropTypes.node, _react.PropTypes.string]),
  wrap: _react.PropTypes.bool
};

Box.contextTypes = {
  intl: _react.PropTypes.object
};

Box.defaultProps = {
  announce: false,
  direction: 'column',
  pad: 'none',
  tag: 'div',
  responsive: true,
  focusable: true
};
module.exports = exports['default'];