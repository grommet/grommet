'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = 'columns';

var Columns = function (_Component) {
  _inherits(Columns, _Component);

  function Columns(props) {
    _classCallCheck(this, Columns);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Columns).call(this, props));

    _this._onResize = _this._onResize.bind(_this);
    _this._layout = _this._layout.bind(_this);
    _this.state = { count: 1 };
    return _this;
  }

  _createClass(Columns, [{
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
      var count = 1;
      var child = container.childNodes[0];
      if (child) {
        var rect = container.getBoundingClientRect();
        var childRect = child.getBoundingClientRect();
        count = Math.floor(rect.width / childRect.width);
      }
      this.setState({ count: count });
    }
  }, {
    key: 'render',
    value: function render() {
      var classes = [CLASS_ROOT];
      if (this.props.size) {
        classes.push(CLASS_ROOT + '--' + this.props.size);
      }
      if (this.props.className) {
        classes.push(this.props.className);
      }

      var children = _react2.default.Children.toArray(this.props.children);
      var childrenPerColumn = Math.floor(children.length / this.state.count);
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
        { ref: 'container', className: classes.join(' ') },
        columns
      );
    }
  }]);

  return Columns;
}(_react.Component);

exports.default = Columns;

Columns.propTypes = {
  size: _react.PropTypes.oneOf(['small', 'medium', 'large'])
};
module.exports = exports['default'];