"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

var Settings = (function (_Component) {
  _inherits(Settings, _Component);

  function Settings() {
    _classCallCheck(this, Settings);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Settings).apply(this, arguments));
  }

  _createClass(Settings, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      console.warn("Settings is deprecated and will be removed soon." + "Please use Tiles instead.");
    }
  }, {
    key: "render",
    value: function render() {
      var panels = ['TBD 1', 'TBD 2'].map(function (tbd) {
        return _react2.default.createElement(
          "li",
          { key: tbd, className: "settings__panel list-item box" },
          tbd
        );
      });

      return _react2.default.createElement(
        "div",
        { className: "settings" },
        _react2.default.createElement(
          "ol",
          { className: "settings__panels list-inline" },
          panels
        )
      );
    }
  }]);

  return Settings;
})(_react.Component);

exports.default = Settings;
module.exports = exports['default'];