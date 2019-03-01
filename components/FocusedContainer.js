"use strict";

exports.__esModule = true;
exports.FocusedContainer = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _utils = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var isNotAncestorOf = function isNotAncestorOf(child) {
  return function (parent) {
    return !parent.contains(child);
  };
};

var FocusedContainer =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(FocusedContainer, _Component);

  function FocusedContainer() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "ref", _react.default.createRef());

    _defineProperty(_assertThisInitialized(_this), "removeTrap", function () {
      var restrictScroll = _this.props.restrictScroll;
      var child = _this.ref.current;
      (0, _utils.getBodyChildElements)().filter(isNotAncestorOf(child)).forEach(_utils.makeNodeFocusable);

      if (restrictScroll) {
        document.body.style.overflow = _this.bodyOverflowStyle;
      }
    });

    _defineProperty(_assertThisInitialized(_this), "trapFocus", function () {
      var restrictScroll = _this.props.restrictScroll;
      var child = _this.ref.current;
      (0, _utils.getBodyChildElements)().filter(isNotAncestorOf(child)).forEach(_utils.makeNodeUnfocusable);

      if (restrictScroll) {
        _this.bodyOverflowStyle = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
      }
    });

    return _this;
  }

  var _proto = FocusedContainer.prototype;

  _proto.componentDidMount = function componentDidMount() {
    var _this2 = this;

    var hidden = this.props.hidden; // making sure trap focus always execute
    // after removeTrap for the case where two drops
    // are open at the same time

    setTimeout(function () {
      if (!hidden) {
        _this2.trapFocus();
      }
    }, 0);
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    this.removeTrap();
  };

  _proto.render = function render() {
    var _this$props = this.props,
        children = _this$props.children,
        hidden = _this$props.hidden,
        rest = _objectWithoutPropertiesLoose(_this$props, ["children", "hidden"]);

    delete rest.restrictScroll;
    return _react.default.createElement("div", _extends({
      ref: this.ref,
      "aria-hidden": hidden
    }, rest), children);
  };

  return FocusedContainer;
}(_react.Component);

exports.FocusedContainer = FocusedContainer;

_defineProperty(FocusedContainer, "defaultProps", {
  hidden: false,
  restrictScroll: false
});

_defineProperty(FocusedContainer, "propTypes", {
  hidden: _propTypes.default.bool,
  restrictScroll: _propTypes.default.bool
});