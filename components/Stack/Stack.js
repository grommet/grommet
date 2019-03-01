"use strict";

exports.__esModule = true;
exports.Stack = void 0;

var _react = _interopRequireWildcard(require("react"));

var _StyledStack = require("./StyledStack");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Stack =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(Stack, _Component);

  function Stack() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "toChildIndex", function (child) {
      var children = _this.props.children;
      var index = child;

      if (index === 'first' || !index) {
        index = 0;
      } else if (index === 'last') {
        index = _react.default.Children.count(children) - 1;
      }

      return index;
    });

    return _this;
  }

  var _proto = Stack.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        anchor = _this$props.anchor,
        children = _this$props.children,
        fill = _this$props.fill,
        guidingChild = _this$props.guidingChild,
        interactiveChild = _this$props.interactiveChild,
        rest = _objectWithoutPropertiesLoose(_this$props, ["anchor", "children", "fill", "guidingChild", "interactiveChild"]);

    var guidingIndex = this.toChildIndex(guidingChild);
    var interactiveIndex = interactiveChild && this.toChildIndex(interactiveChild);
    var childIndex = 0;

    var styledChildren = _react.Children.map(children, function (child) {
      if (child) {
        var interactive = interactiveChild === undefined || interactiveIndex === childIndex;
        var layer;

        if (childIndex === guidingIndex) {
          layer = _react.default.createElement(_StyledStack.StyledStackLayer, {
            guiding: true,
            fillContainer: fill,
            interactive: interactive
          }, child);
        } else {
          layer = _react.default.createElement(_StyledStack.StyledStackLayer, {
            anchor: anchor,
            interactive: interactive
          }, child);
        }

        childIndex += 1;
        return layer;
      }

      return child;
    });

    return _react.default.createElement(_StyledStack.StyledStack, _extends({
      fillContainer: fill
    }, rest), styledChildren);
  };

  return Stack;
}(_react.Component);

var StackDoc;

if (process.env.NODE_ENV !== 'production') {
  StackDoc = require('./doc').doc(Stack); // eslint-disable-line global-require
}

var StackWrapper = StackDoc || Stack;
exports.Stack = StackWrapper;