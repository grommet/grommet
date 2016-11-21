'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

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

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _Props = require('../utils/Props');

var _Props2 = _interopRequireDefault(_Props);

var _Box = require('./Box');

var _Box2 = _interopRequireDefault(_Box);

var _CSSClassnames = require('../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CLASS_ROOT = _CSSClassnames2.default.TILE; // (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

var NAMESPACE = _CSSClassnames2.default.NAMESPACE;

var Tile = function (_Component) {
  (0, _inherits3.default)(Tile, _Component);

  function Tile() {
    (0, _classCallCheck3.default)(this, Tile);
    return (0, _possibleConstructorReturn3.default)(this, (Tile.__proto__ || (0, _getPrototypeOf2.default)(Tile)).apply(this, arguments));
  }

  (0, _createClass3.default)(Tile, [{
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
          hoverBorderSize = _props.hoverBorderSize;

      var restProps = _Props2.default.omit(this.props, (0, _keys2.default)(Tile.propTypes));

      var statusClass = status ? status.toLowerCase() : undefined;
      // if Tiles flush is true, default borderSize to small (1px)
      var borderSize = hoverBorder ? hoverBorderSize ? hoverBorderSize : 'large' : 'small';

      var classes = (0, _classnames3.default)(CLASS_ROOT, className, (_classnames = {}, (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--status-' + statusClass, status), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--wide', wide), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--selectable', onClick), (0, _defineProperty3.default)(_classnames, '' + NAMESPACE + hoverStyle + (hoverStyle == 'border' ? borderSize ? '-' + borderSize : '-medium' : '') + '-hover-color-index-' + hoverColorIndex, hoverStyle), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--hover-border-' + borderSize, borderSize), _classnames));

      var boxProps = _Props2.default.pick(this.props, (0, _keys2.default)(_Box2.default.propTypes));

      return _react2.default.createElement(
        _Box2.default,
        (0, _extends3.default)({}, restProps, boxProps, { className: classes }),
        children
      );
    }
  }]);
  return Tile;
}(_react.Component);

Tile.displayName = 'Tile';
exports.default = Tile;


Tile.propTypes = (0, _extends3.default)({
  hoverStyle: _react.PropTypes.oneOf(['border', 'background', 'none']),
  hoverColorIndex: _react.PropTypes.string,
  hoverBorder: _react.PropTypes.bool,
  hoverBorderSize: _react.PropTypes.oneOf(['small', 'medium', 'large']),
  wide: _react.PropTypes.bool }, _Box2.default.propTypes);

Tile.defaultProps = {
  pad: 'none',
  direction: 'column',
  align: 'center',
  hoverStyle: 'none',
  hoverColorIndex: 'disabled'
};
module.exports = exports['default'];