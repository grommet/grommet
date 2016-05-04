'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _Props = require('../utils/Props');

var _Props2 = _interopRequireDefault(_Props);

var _Box = require('./Box');

var _Box2 = _interopRequireDefault(_Box);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = "tile";

var Tile = function (_Component) {
  _inherits(Tile, _Component);

  function Tile() {
    _classCallCheck(this, Tile);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Tile).apply(this, arguments));
  }

  _createClass(Tile, [{
    key: 'render',
    value: function render() {
      var _classnames;

      var _props = this.props;
      var children = _props.children;
      var className = _props.className;
      var onClick = _props.onClick;
      var wide = _props.wide;
      var status = _props.status;
      var selected = _props.selected;
      var hoverStyle = _props.hoverStyle;
      var hoverColorIndex = _props.hoverColorIndex;
      var hoverBorder = _props.hoverBorder;
      var hoverBorderSize = _props.hoverBorderSize;


      if (selected) {
        console.log('Selected option has been deprecated, please use selected option at the Tiles level.');
      }

      var statusClass = status ? status.toLowerCase() : undefined;
      // if Tiles flush is true, default borderSize to small (1px)
      var borderSize = hoverBorder ? hoverBorderSize ? hoverBorderSize : 'large' : 'small';

      var classes = (0, _classnames3.default)(CLASS_ROOT, className, (_classnames = {}, _defineProperty(_classnames, CLASS_ROOT + '--status-' + statusClass, status), _defineProperty(_classnames, CLASS_ROOT + '--wide', wide), _defineProperty(_classnames, CLASS_ROOT + '--selectable', onClick), _defineProperty(_classnames, CLASS_ROOT + '--selected', selected), _defineProperty(_classnames, '' + hoverStyle + (hoverStyle == 'border' ? borderSize ? '-' + borderSize : '-medium' : '') + '-hover-color-index-' + hoverColorIndex, hoverStyle), _defineProperty(_classnames, CLASS_ROOT + '--hover-border-' + borderSize, borderSize), _classnames));

      var boxProps = _Props2.default.pick(this.props, Object.keys(_Box2.default.propTypes));

      return _react2.default.createElement(
        _Box2.default,
        _extends({}, boxProps, { className: classes }),
        children
      );
    }
  }]);

  return Tile;
}(_react.Component);

exports.default = Tile;


Tile.propTypes = _extends({
  selected: _react.PropTypes.bool,
  wide: _react.PropTypes.bool,
  hoverStyle: _react.PropTypes.oneOf(['border', 'background', 'none']),
  hoverColorIndex: _react.PropTypes.string,
  hoverBorderSize: _react.PropTypes.oneOf(['small', 'medium', 'large'])
}, _Box2.default.propTypes);

Tile.defaultProps = {
  pad: 'none',
  direction: 'column',
  align: 'center',
  hoverStyle: 'none',
  hoverColorIndex: 'disabled'
};
module.exports = exports['default'];