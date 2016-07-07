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

var CLASS_ROOT = _CSSClassnames2.default.COLUMNS; // (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

var Columns = function (_Component) {
  (0, _inherits3.default)(Columns, _Component);

  function Columns(props) {
    (0, _classCallCheck3.default)(this, Columns);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Columns).call(this, props));

    _this._onResize = _this._onResize.bind(_this);
    _this._layout = _this._layout.bind(_this);
    _this.state = { count: 1 };
    return _this;
  }

  (0, _createClass3.default)(Columns, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      window.addEventListener('resize', this._onResize);
      this._layout();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      window.removeEventListener('resize', this._onResize);
      clearTimeout(this._layoutTimer);
    }
  }, {
    key: '_onResize',
    value: function _onResize() {
      clearTimeout(this._layoutTimer);
      this._layoutTimer = setTimeout(this._layout, 50);
    }
  }, {
    key: '_layout',
    value: function _layout() {
      var container = this.refs.container;
      var children = _react2.default.Children.toArray(this.props.children);
      var count = 1;
      var child = container.childNodes[0];
      if (child) {
        var rect = container.getBoundingClientRect();
        var childRect = child.getBoundingClientRect();
        var widestCount = Math.floor(rect.width / childRect.width);
        var childrenPerColumn = Math.ceil(children.length / widestCount);
        count = Math.ceil(children.length / childrenPerColumn);
      }

      if (count === 0) {
        count = 1;
      }

      this.setState({ count: count });
    }
  }, {
    key: 'render',
    value: function render() {
      var classes = (0, _classnames3.default)(CLASS_ROOT, this.props.className, (0, _defineProperty3.default)({}, CLASS_ROOT + '--' + this.props.size, this.props.size));

      var children = _react2.default.Children.toArray(this.props.children);
      var childrenPerColumn = Math.ceil(children.length / this.state.count);
      var groups = [];
      var offset = 0;
      while (groups.length < this.state.count) {
        groups.push(children.slice(offset, offset + childrenPerColumn));
        offset += childrenPerColumn;
      }

      var columns = groups.map(function (group, index) {
        return _react2.default.createElement(
          'div',
          { key: index, className: CLASS_ROOT + '__column' },
          group
        );
      });

      return _react2.default.createElement(
        'div',
        { ref: 'container', className: classes },
        columns
      );
    }
  }]);
  return Columns;
}(_react.Component);

Columns.displayName = 'Columns';
exports.default = Columns;


Columns.propTypes = {
  size: _react.PropTypes.oneOf(['small', 'medium', 'large'])
};
module.exports = exports['default'];