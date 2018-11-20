"use strict";

exports.__esModule = true;
exports.Stack = void 0;

var _react = _interopRequireWildcard(require("react"));

var _recompose = require("recompose");

var _hocs = require("../hocs");

var _StyledStack = require("./StyledStack");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var Stack =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(Stack, _Component);

  function Stack() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = Stack.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        anchor = _this$props.anchor,
        children = _this$props.children,
        fill = _this$props.fill,
        guidingChild = _this$props.guidingChild,
        rest = _objectWithoutPropertiesLoose(_this$props, ["anchor", "children", "fill", "guidingChild"]); // make all children but the first absolutely positioned


    var guidingIndex = guidingChild;

    if (guidingIndex === 'first' || !guidingIndex) {
      guidingIndex = 0;
    } else if (guidingIndex === 'last') {
      guidingIndex = _react.default.Children.count(children) - 1;
    }

    var childIndex = 0;

    var styledChildren = _react.Children.map(children, function (child) {
      if (child) {
        var layer;

        if (childIndex === guidingIndex) {
          layer = _react.default.createElement(_StyledStack.StyledStackLayer, {
            guiding: true,
            fillContainer: fill
          }, child);
        } else {
          layer = _react.default.createElement(_StyledStack.StyledStackLayer, {
            anchor: anchor
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

var StackWrapper = (0, _recompose.compose)(_hocs.withTheme)(StackDoc || Stack);
exports.Stack = StackWrapper;