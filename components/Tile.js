'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _Props = require('../utils/Props');

var _Props2 = _interopRequireDefault(_Props);

var _Box = require('./Box');

var _Box2 = _interopRequireDefault(_Box);

var _CSSClassnames = require('../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = _CSSClassnames2.default.TILE;
var NAMESPACE = _CSSClassnames2.default.NAMESPACE;

var Tile = function (_Component) {
  _inherits(Tile, _Component);

  function Tile() {
    _classCallCheck(this, Tile);

    return _possibleConstructorReturn(this, (Tile.__proto__ || Object.getPrototypeOf(Tile)).apply(this, arguments));
  }

  _createClass(Tile, [{
    key: 'render',
    value: function render() {
      var _classnames;

      var _props = this.props,
          children = _props.children,
          className = _props.className,
          onClick = _props.onClick,
          wide = _props.wide,
          status = _props.status,
          hoverStyle = _props.hoverStyle,
          hoverColorIndex = _props.hoverColorIndex,
          hoverBorder = _props.hoverBorder,
          hoverBorderSize = _props.hoverBorderSize,
          selected = _props.selected;

      var restProps = _Props2.default.omit(this.props, Object.keys(Tile.propTypes));

      var statusClass = status ? status.toLowerCase() : undefined;
      // if Tiles flush is true, default borderSize to small (1px)
      var borderSize = hoverBorder ? hoverBorderSize ? hoverBorderSize : 'large' : 'small';

      var classes = (0, _classnames3.default)(CLASS_ROOT, className, (_classnames = {}, _defineProperty(_classnames, CLASS_ROOT + '--status-' + statusClass, status), _defineProperty(_classnames, CLASS_ROOT + '--selected', selected), _defineProperty(_classnames, CLASS_ROOT + '--wide', wide), _defineProperty(_classnames, CLASS_ROOT + '--selectable', onClick), _defineProperty(_classnames, '' + NAMESPACE + hoverStyle + (hoverStyle == 'border' ? borderSize ? '-' + borderSize : '-medium' : '') + '-hover-color-index-' + hoverColorIndex, hoverStyle), _defineProperty(_classnames, CLASS_ROOT + '--hover-border-' + borderSize, borderSize), _classnames));

      var boxProps = _Props2.default.pick(this.props, Object.keys(_Box2.default.propTypes));

      return _react2.default.createElement(
        _Box2.default,
        _extends({}, restProps, boxProps, { className: classes }),
        children
      );
    }
  }]);

  return Tile;
}(_react.Component);

// add a strong and more reliable link between Tiles and Tile


Tile.displayName = 'Tile';
exports.default = Tile;
Tile._tile = true;

Tile.propTypes = _extends({
  hoverStyle: _propTypes2.default.oneOf(['border', 'background', 'none']),
  hoverColorIndex: _propTypes2.default.string,
  hoverBorder: _propTypes2.default.bool,
  hoverBorderSize: _propTypes2.default.oneOf(['small', 'medium', 'large']),
  selected: _propTypes2.default.bool,
  wide: _propTypes2.default.bool }, _Box2.default.propTypes);

Tile.defaultProps = {
  pad: 'none',
  direction: 'column',
  align: 'center',
  hoverStyle: 'none',
  hoverColorIndex: 'disabled'
};
module.exports = exports['default'];