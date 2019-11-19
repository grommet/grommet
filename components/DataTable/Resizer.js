"use strict";

exports.__esModule = true;
exports.Resizer = void 0;

var _react = _interopRequireWildcard(require("react"));

var _recompose = require("recompose");

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _defaultProps = require("../../default-props");

var _Box = require("../Box");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ResizerBox = (0, _styledComponents["default"])(_Box.Box).withConfig({
  displayName: "Resizer__ResizerBox",
  componentId: "sc-8l808w-0"
})(["cursor:col-resize;"]);

var Resizer =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(Resizer, _Component);

  function Resizer() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "state", {});

    _defineProperty(_assertThisInitialized(_this), "ref", _react["default"].createRef());

    _defineProperty(_assertThisInitialized(_this), "onMouseDown", function (event) {
      if (_this.ref.current) {
        var element = _this.ref.current; // find TH parent

        while (element && element.nodeName !== 'TH') {
          element = element.parentNode;
        }

        var rect = element.getBoundingClientRect();

        _this.setState({
          start: event.clientX,
          width: rect.width
        }, function () {
          document.addEventListener('mousemove', _this.onMouseMove);
          document.addEventListener('mouseup', _this.onMouseUp);
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onMouseMove", function (event) {
      var _this$props = _this.props,
          onResize = _this$props.onResize,
          property = _this$props.property;
      var _this$state = _this.state,
          start = _this$state.start,
          width = _this$state.width; // We determined 12 empirically as being wide enough to hit but
      // not too wide to cause false hits.

      var nextWidth = Math.max(12, width + (event.clientX - start));
      onResize(property)(nextWidth);
    });

    _defineProperty(_assertThisInitialized(_this), "onMouseUp", function () {
      document.removeEventListener('mouseup', _this.onMouseUp);
      document.removeEventListener('mousemove', _this.onMouseMove);

      _this.setState({
        start: undefined,
        width: undefined
      });
    });

    return _this;
  }

  var _proto = Resizer.prototype;

  _proto.render = function render() {
    var theme = this.props.theme;
    var start = this.state.start;
    return _react["default"].createElement(ResizerBox, _extends({
      ref: this.ref,
      flex: false,
      responsive: false,
      pad: {
        vertical: 'small'
      }
    }, theme.dataTable.resize, {
      onMouseDown: this.onMouseDown,
      onMouseMove: start ? this.onMouseMove : undefined,
      onMouseUp: start ? this.onMouseUp : undefined
    }));
  };

  return Resizer;
}(_react.Component);

Resizer.defaultProps = {};
Object.setPrototypeOf(Resizer.defaultProps, _defaultProps.defaultProps);
var ResizerWrapper = (0, _recompose.compose)(_styledComponents.withTheme)(Resizer);
exports.Resizer = ResizerWrapper;