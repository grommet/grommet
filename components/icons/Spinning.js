"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = "icon-spinning";

var Spinning = function (_Component) {
  _inherits(Spinning, _Component);

  function Spinning() {
    _classCallCheck(this, Spinning);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Spinning).apply(this, arguments));
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
      return _react2.default.createElement(
        "svg",
        { className: classes.join(' '), viewBox: "0 0 48 48", version: "1.1",
          role: "img" },
        _react2.default.createElement(
          "title",
          null,
          "Spinning"
        ),
        _react2.default.createElement("circle", { stroke: "#ddd", strokeWidth: "4", strokeDasharray: "24px 8px", fill: "none", cx: "24", cy: "24", r: "20" }),
        _react2.default.createElement("circle", { stroke: "#333", strokeWidth: "4", strokeDasharray: "24px 104px", fill: "none", cx: "24", cy: "24", r: "20" })
      );
    }
  }]);

  return Spinning;
}(_react.Component);

exports.default = Spinning;
module.exports = exports["default"];