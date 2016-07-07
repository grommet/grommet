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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = _CSSClassnames2.default.BOX;
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
      if (this.props.onClick) {
        var clickCallback = function () {
          if (this.refs.boxContainer === document.activeElement) {
            this.props.onClick();
          }
        }.bind(this);

        _KeyboardAccelerators2.default.startListeningToKeyboard(this, {
          enter: clickCallback,
          space: clickCallback
        });
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
        if (this.props.flex) {
          classes.push('flex');
        } else {
          classes.push('no-flex');
        }
      }
      if (this.props.hasOwnProperty('size')) {
        if (this.props.size) {
          classes.push(CLASS_ROOT + '--size');
        }
      }

      if (this.props.appCentered) {
        this._addPropertyClass(containerClasses, CLASS_ROOT + "__container", 'full');
        if (this.props.colorIndex) {
          containerClasses.push(BACKGROUND_COLOR_INDEX + '-' + this.props.colorIndex);
        }
        if (this.props.containerClassName) {
          containerClasses.push(this.props.containerClassName);
        }
      } else {
        if (this.props.colorIndex) {
          classes.push(BACKGROUND_COLOR_INDEX + '-' + this.props.colorIndex);
        }
      }

      var a11yProps = {};
      if (this.props.onClick) {
        classes.push(CLASS_ROOT + "--clickable");
        if (this.props.focusable) {
          var boxLabel = this.props.a11yTitle || _Intl2.default.getMessage(this.context.intl, 'Box');
          a11yProps.tabIndex = 0;
          a11yProps["aria-label"] = boxLabel;
          a11yProps.role = this.props.role || 'link';
        }
      }

      var skipLinkAnchor = void 0;
      if (this.props.primary) {
        var mainContentLabel = _Intl2.default.getMessage(this.context.intl, 'Main Content');
        skipLinkAnchor = _react2.default.createElement(_SkipLinkAnchor2.default, { label: mainContentLabel });
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
      style = (0, _extends3.default)({}, style, restProps.style);
      var texture = void 0;
      if ('object' === (0, _typeof3.default)(this.props.texture)) {
        texture = _react2.default.createElement(
          'div',
          { className: CLASS_ROOT + "__texture" },
          this.props.texture
        );
      }

      var Component = this.props.tag;

      if (this.props.appCentered) {
        return _react2.default.createElement(
          'div',
          (0, _extends3.default)({}, restProps, { ref: 'boxContainer', className: containerClasses.join(' '),
            style: style, role: this.props.role }, a11yProps),
          skipLinkAnchor,
          _react2.default.createElement(
            Component,
            { id: this.props.id, className: classes.join(' ') },
            texture,
            this.props.children
          )
        );
      } else {
        return _react2.default.createElement(
          Component,
          (0, _extends3.default)({}, restProps, { ref: 'boxContainer', id: this.props.id,
            className: classes.join(' '), style: style,
            role: this.props.role, tabIndex: this.props.tabIndex,
            onClick: this.props.onClick }, a11yProps),
          skipLinkAnchor,
          texture,
          this.props.children
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
  direction: 'column',
  pad: 'none',
  tag: 'div',
  responsive: true,
  focusable: true
};
module.exports = exports['default'];