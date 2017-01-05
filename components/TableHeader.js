'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

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

var _Button = require('./Button');

var _Button2 = _interopRequireDefault(_Button);

var _Box = require('./Box');

var _Box2 = _interopRequireDefault(_Box);

var _LinkDown = require('./icons/base/LinkDown');

var _LinkDown2 = _interopRequireDefault(_LinkDown);

var _LinkUp = require('./icons/base/LinkUp');

var _LinkUp2 = _interopRequireDefault(_LinkUp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TableHeader = function (_Component) {
  (0, _inherits3.default)(TableHeader, _Component);

  function TableHeader() {
    (0, _classCallCheck3.default)(this, TableHeader);
    return (0, _possibleConstructorReturn3.default)(this, (TableHeader.__proto__ || (0, _getPrototypeOf2.default)(TableHeader)).apply(this, arguments));
  }

  (0, _createClass3.default)(TableHeader, [{
    key: '_onSort',
    value: function _onSort(index) {
      var _props = this.props,
          onSort = _props.onSort,
          sortAscending = _props.sortAscending,
          sortIndex = _props.sortIndex;

      var nextAscending = void 0;
      if (index !== sortIndex) {
        nextAscending = false;
      } else {
        nextAscending = !sortAscending;
      }
      onSort(index, nextAscending);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props2 = this.props,
          labels = _props2.labels,
          onSort = _props2.onSort,
          sortAscending = _props2.sortAscending,
          sortIndex = _props2.sortIndex,
          props = (0, _objectWithoutProperties3.default)(_props2, ['labels', 'onSort', 'sortAscending', 'sortIndex']);


      var cells = labels.map(function (label, index) {

        var content = label;
        if (sortIndex >= 0) {
          var sortIndicator = void 0;
          if (index === sortIndex) {
            sortIndicator = sortAscending ? _react2.default.createElement(_LinkDown2.default, null) : _react2.default.createElement(_LinkUp2.default, null);
          }
          content = _react2.default.createElement(
            _Box2.default,
            { direction: 'row', justify: 'start', align: 'center',
              pad: { between: 'small' } },
            _react2.default.createElement(
              'span',
              null,
              content
            ),
            sortIndicator
          );

          if (onSort) {
            content = _react2.default.createElement(
              _Button2.default,
              { plain: true, fill: true,
                onClick: _this2._onSort.bind(_this2, index) },
              content
            );
          }
        }

        return _react2.default.createElement(
          'th',
          { key: index },
          content
        );
      });

      return _react2.default.createElement(
        'thead',
        props,
        _react2.default.createElement(
          'tr',
          null,
          cells
        )
      );
    }
  }]);
  return TableHeader;
}(_react.Component); // (C) Copyright 2016 Hewlett Packard Enterprise Development LP

TableHeader.displayName = 'TableHeader';
exports.default = TableHeader;
;

TableHeader.propTypes = {
  labels: _react.PropTypes.arrayOf(_react.PropTypes.node).isRequired,
  onSort: _react.PropTypes.func, // (index, ascending?)
  sortAscending: _react.PropTypes.bool,
  sortIndex: _react.PropTypes.number
};
module.exports = exports['default'];