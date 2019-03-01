"use strict";

exports.__esModule = true;
exports.Drop = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactDom = require("react-dom");

var _utils = require("../../utils");

var _DropContainer = require("./DropContainer");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Drop =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(Drop, _Component);

  function Drop() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "originalFocusedElement", document.activeElement);

    _defineProperty(_assertThisInitialized(_this), "dropContainer", (0, _utils.getNewContainer)());

    return _this;
  }

  var _proto = Drop.prototype;

  _proto.componentWillUnmount = function componentWillUnmount() {
    var restrictFocus = this.props.restrictFocus;

    if (restrictFocus && this.originalFocusedElement) {
      if (this.originalFocusedElement.focus) {
        (0, _utils.setFocusWithoutScroll)(this.originalFocusedElement);
      } else if (this.originalFocusedElement.parentNode && this.originalFocusedElement.parentNode.focus) {
        // required for IE11 and Edge
        (0, _utils.setFocusWithoutScroll)(this.originalFocusedElement.parentNode);
      }
    }

    document.body.removeChild(this.dropContainer);
  };

  _proto.render = function render() {
    var _this$props = this.props,
        dropTarget = _this$props.target,
        rest = _objectWithoutPropertiesLoose(_this$props, ["target"]);

    return (0, _reactDom.createPortal)(_react.default.createElement(_DropContainer.DropContainer, _extends({
      dropTarget: dropTarget
    }, rest)), this.dropContainer);
  };

  return Drop;
}(_react.Component);

_defineProperty(Drop, "defaultProps", {
  align: {
    top: 'top',
    left: 'left'
  },
  plain: false
});

var DropDoc;

if (process.env.NODE_ENV !== 'production') {
  DropDoc = require('./doc').doc(Drop); // eslint-disable-line global-require
}

var DropWrapper = DropDoc || Drop;
exports.Drop = DropWrapper;