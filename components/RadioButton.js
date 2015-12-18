// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var CLASS_ROOT = "radio-button";

var RadioButton = (function (_Component) {
  _inherits(RadioButton, _Component);

  function RadioButton() {
    _classCallCheck(this, RadioButton);

    _get(Object.getPrototypeOf(RadioButton.prototype), "constructor", this).apply(this, arguments);
  }

  _createClass(RadioButton, [{
    key: "render",
    value: function render() {
      var classes = [CLASS_ROOT];
      if (this.props.disabled) {
        classes.push(CLASS_ROOT + "--disabled");
      }
      if (this.props.className) {
        classes.push(this.props.className);
      }
      return _react2["default"].createElement(
        "label",
        { className: classes.join(' ') },
        _react2["default"].createElement("input", { className: CLASS_ROOT + "__input",
          id: this.props.id, name: this.props.name, type: "radio",
          disabled: this.props.disabled,
          checked: this.props.checked,
          defaultChecked: this.props.defaultChecked,
          value: this.props.value,
          onChange: this.props.onChange }),
        _react2["default"].createElement("span", { className: CLASS_ROOT + "__control" }),
        _react2["default"].createElement(
          "span",
          { className: CLASS_ROOT + "__label" },
          this.props.label
        )
      );
    }
  }]);

  return RadioButton;
})(_react.Component);

RadioButton.propTypes = {
  checked: _react.PropTypes.bool,
  disabled: _react.PropTypes.bool,
  defaultChecked: _react.PropTypes.bool,
  id: _react.PropTypes.string.isRequired,
  label: _react.PropTypes.node.isRequired,
  name: _react.PropTypes.string,
  onChange: _react.PropTypes.func,
  value: _react.PropTypes.string
};

module.exports = RadioButton;