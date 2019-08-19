"use strict";

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@storybook/react");

var _grommet = require("grommet");

var _themes = require("grommet/themes");

var _Basics = require("./Basics");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

var LazyInfiniteScroll = function LazyInfiniteScroll() {
  var _useState = (0, _react.useState)(_Basics.allItems.slice(0, 200)),
      items = _useState[0],
      setItems = _useState[1];

  var onMore = function onMore() {
    setTimeout(function () {
      setItems(_Basics.allItems.slice(0, items.length + 200));
    }, 1000);
  };

  return _react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, _react["default"].createElement(_grommet.Box, null, _react["default"].createElement(_grommet.InfiniteScroll, {
    items: items,
    onMore: onMore
  }, function (item) {
    return _react["default"].createElement(_grommet.Box, {
      key: item,
      pad: "medium",
      border: {
        side: 'bottom'
      },
      align: "center"
    }, _react["default"].createElement(_grommet.Text, null, item));
  })));
};

(0, _react2.storiesOf)('InfiniteScroll', module).add('onMore', function () {
  return _react["default"].createElement(LazyInfiniteScroll, null);
});