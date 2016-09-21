'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

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

var _CSSClassnames = require('../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CLASS_ROOT = _CSSClassnames2.default.TABLE_ROW; // (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

var TableRow = function (_Component) {
  (0, _inherits3.default)(TableRow, _Component);

  function TableRow() {
    (0, _classCallCheck3.default)(this, TableRow);
    return (0, _possibleConstructorReturn3.default)(this, (TableRow.__proto__ || (0, _getPrototypeOf2.default)(TableRow)).apply(this, arguments));
  }

  (0, _createClass3.default)(TableRow, [{
    key: 'render',
    value: function render() {
      var _classnames;

      var _props = this.props;
      var children = _props.children;
      var className = _props.className;
      var onClick = _props.onClick;
      var selected = _props.selected;


      if (selected) {
        console.warn('TableRow: selected prop has been deprecated. Use ' + 'selected option at the Table level.');
      }

      var classes = (0, _classnames3.default)(CLASS_ROOT, className, (_classnames = {}, (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--selected', selected), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--selectable', onClick), _classnames));

      return _react2.default.createElement(
        'tr',
        { className: classes, onClick: onClick },
        children
      );
    }
  }]);
  return TableRow;
}(_react.Component);

TableRow.displayName = 'TableRow';
exports.default = TableRow;
;

TableRow.propTypes = {
  onClick: _react.PropTypes.func,
  selected: _react.PropTypes.bool // remove in 1.0
};
module.exports = exports['default'];