"use strict";

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@storybook/react");

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var allItems = Array(2000).fill().map(function (_, i) {
  return "item " + (i + 1);
});

var SimpleInfiniteScroll = function SimpleInfiniteScroll(props) {
  return _react.default.createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, _react.default.createElement(_grommet.Box, null, _react.default.createElement(_grommet.InfiniteScroll, _extends({
    items: allItems
  }, props), function (item) {
    return _react.default.createElement(_grommet.Box, {
      key: item,
      pad: "medium",
      border: {
        side: 'bottom'
      },
      align: "center"
    }, _react.default.createElement(_grommet.Text, null, item));
  })));
};
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
    return _react.default.createElement(_grommet.Box, {
      pad: "medium",
      border: {
        side: 'bottom'
      },
      align: "center"
    }, _react.default.createElement(_grommet.Text, null, item));
  };

  return MyItem;
}(_react.Component);
/* eslint-enable react/prefer-stateless-function */


var ClassChildrenInfiniteScroll = function ClassChildrenInfiniteScroll(props) {
  return _react.default.createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, _react.default.createElement(_grommet.Box, null, _react.default.createElement(_grommet.InfiniteScroll, _extends({
    items: allItems
  }, props), function (item) {
    return _react.default.createElement(MyItem, {
      key: item,
      item: item
    });
  })));
};

var LazyInfiniteScroll =
/*#__PURE__*/
function (_Component2) {
  _inheritsLoose(LazyInfiniteScroll, _Component2);

  function LazyInfiniteScroll() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component2.call.apply(_Component2, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "state", {
      items: allItems.slice(0, 200)
    });

    _defineProperty(_assertThisInitialized(_this), "onMore", function () {
      setTimeout(function () {
        var items = _this.state.items;

        _this.setState({
          items: allItems.slice(0, items.length + 200)
        });
      }, 1000);
    });

    return _this;
  }

  var _proto2 = LazyInfiniteScroll.prototype;

  _proto2.render = function render() {
    var items = this.state.items;
    return _react.default.createElement(_grommet.Grommet, {
      theme: _themes.grommet
    }, _react.default.createElement(_grommet.Box, null, _react.default.createElement(_grommet.InfiniteScroll, {
      items: items,
      onMore: this.onMore
    }, function (item) {
      return _react.default.createElement(_grommet.Box, {
        key: item,
        pad: "medium",
        border: {
          side: 'bottom'
        },
        align: "center"
      }, _react.default.createElement(_grommet.Text, null, item));
    })));
  };

  return LazyInfiniteScroll;
}(_react.Component);

var GridInfiniteScroll = function GridInfiniteScroll() {
  return _react.default.createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, _react.default.createElement(_grommet.Grid, {
    columns: "xsmall",
    rows: "small"
  }, _react.default.createElement(_grommet.InfiniteScroll, {
    items: allItems,
    step: 12
  }, function (item) {
    return _react.default.createElement(_grommet.Box, {
      key: item,
      as: "article",
      pad: "xsmall"
    }, _react.default.createElement(_grommet.Image, {
      src: "https://via.placeholder.com/350x150"
    }), _react.default.createElement(_grommet.Text, null, item));
  })));
};

(0, _react2.storiesOf)('InfiniteScroll', module).add('Simple', function () {
  return _react.default.createElement(SimpleInfiniteScroll, null);
}).add('Show 118th item', function () {
  return _react.default.createElement(SimpleInfiniteScroll, {
    show: 117
  });
}).add('Marker', function () {
  return _react.default.createElement(SimpleInfiniteScroll, {
    renderMarker: function renderMarker(marker) {
      return _react.default.createElement(_grommet.Box, {
        pad: "medium",
        background: "accent-1"
      }, marker);
    }
  });
}).add('Replace', function () {
  return _react.default.createElement(SimpleInfiniteScroll, {
    replace: true
  });
}).add('onMore', function () {
  return _react.default.createElement(LazyInfiniteScroll, null);
}).add('Class Children', function () {
  return _react.default.createElement(ClassChildrenInfiniteScroll, null);
}).add('Grid', function () {
  return _react.default.createElement(GridInfiniteScroll, null);
});