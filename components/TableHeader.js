'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Button = require('./Button');

var _Button2 = _interopRequireDefault(_Button);

var _Box = require('./Box');

var _Box2 = _interopRequireDefault(_Box);

var _LinkDown = require('./icons/base/LinkDown');

var _LinkDown2 = _interopRequireDefault(_LinkDown);

var _LinkUp = require('./icons/base/LinkUp');

var _LinkUp2 = _interopRequireDefault(_LinkUp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // (C) Copyright 2016 Hewlett Packard Enterprise Development LP

var TableHeader = function (_Component) {
  _inherits(TableHeader, _Component);

  function TableHeader() {
    _classCallCheck(this, TableHeader);

    return _possibleConstructorReturn(this, (TableHeader.__proto__ || Object.getPrototypeOf(TableHeader)).apply(this, arguments));
  }

  _createClass(TableHeader, [{
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
          props = _objectWithoutProperties(_props2, ['labels', 'onSort', 'sortAscending', 'sortIndex']);

      var cells = labels.map(function (label, index) {
        var content = void 0;
        var options = {};

        if (Array.isArray(label)) {
          var _label = _slicedToArray(label, 2);

          content = _label[0];
          var _label$ = _label[1];
          options = _label$ === undefined ? {} : _label$;
        } else {
          content = label;
          options.sortable = !!onSort;
        }

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

          if (options.sortable) {
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
}(_react.Component);

TableHeader.displayName = 'TableHeader';
exports.default = TableHeader;


TableHeader.propTypes = {
  labels: _propTypes2.default.arrayOf(_propTypes2.default.oneOfType([_propTypes2.default.node, _propTypes2.default.array])).isRequired,
  onSort: _propTypes2.default.func, // (index, ascending?)
  sortAscending: _propTypes2.default.bool,
  sortIndex: _propTypes2.default.number
};
module.exports = exports['default'];