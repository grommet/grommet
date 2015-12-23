// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var CLASS_ROOT = "icon-spinning";

var Spinning = (function (_Component) {
  _inherits(Spinning, _Component);

  function Spinning() {
    _classCallCheck(this, Spinning);

    _get(Object.getPrototypeOf(Spinning.prototype), "constructor", this).apply(this, arguments);
  }

  _createClass(Spinning, [{
    key: "render",
    value: function render() {
      var classes = [CLASS_ROOT];
      if (this.props.small) {
        classes.push(CLASS_ROOT + "--small");
      }
      if (this.props.className) {
        classes.push(this.props.className);
      }
      return _react2["default"].createElement(
        "svg",
        { className: classes.join(' '), viewBox: "0 0 48 48", version: "1.1" },
        _react2["default"].createElement("circle", { stroke: "#ddd", strokeWidth: "4", strokeDasharray: "24px 8px", fill: "none", cx: "24", cy: "24", r: "20" }),
        _react2["default"].createElement("circle", { stroke: "#333", strokeWidth: "4", strokeDasharray: "24px 104px", fill: "none", cx: "24", cy: "24", r: "20" })
      );
    }
  }]);

  return Spinning;
})(_react.Component);

exports["default"] = Spinning;
module.exports = exports["default"];