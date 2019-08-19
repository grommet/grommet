"use strict";

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@storybook/react");

var _grommet = require("grommet");

var _themes = require("grommet/themes");

var _Basics = require("./Basics");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

/* eslint-disable react/prefer-stateless-function */
var MyItem =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(MyItem, _Component);

  function MyItem() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = MyItem.prototype;

  _proto.render = function render() {
    var item = this.props.item;
    return _react["default"].createElement(_grommet.Box, {
      pad: "medium",
      border: {
        side: 'bottom'
      },
      align: "center"
    }, _react["default"].createElement(_grommet.Text, null, item));
  };

  return MyItem;
}(_react.Component);

var ClassChildrenInfiniteScroll = function ClassChildrenInfiniteScroll(props) {
  return _react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, _react["default"].createElement(_grommet.Box, null, _react["default"].createElement(_grommet.InfiniteScroll, _extends({
    items: _Basics.allItems
  }, props), function (item) {
    return _react["default"].createElement(MyItem, {
      key: item,
      item: item
    });
  })));
};

(0, _react2.storiesOf)('InfiniteScroll', module).add('Class Children', function () {
  return _react["default"].createElement(ClassChildrenInfiniteScroll, null);
});