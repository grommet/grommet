function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import { Grid, Grommet, Box, Image, InfiniteScroll, Text } from 'grommet';
import { grommet } from 'grommet/themes';
var allItems = Array(2000).fill().map(function (_, i) {
  return "item " + (i + 1);
});

var SimpleInfiniteScroll = function SimpleInfiniteScroll(props) {
  return React.createElement(Grommet, {
    theme: grommet
  }, React.createElement(Box, null, React.createElement(InfiniteScroll, _extends({
    items: allItems
  }, props), function (item) {
    return React.createElement(Box, {
      key: item,
      pad: "medium",
      border: {
        side: 'bottom'
      },
      align: "center"
    }, React.createElement(Text, null, item));
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
    return React.createElement(Box, {
      pad: "medium",
      border: {
        side: 'bottom'
      },
      align: "center"
    }, React.createElement(Text, null, item));
  };

  return MyItem;
}(Component);
/* eslint-enable react/prefer-stateless-function */


var ClassChildrenInfiniteScroll = function ClassChildrenInfiniteScroll(props) {
  return React.createElement(Grommet, {
    theme: grommet
  }, React.createElement(Box, null, React.createElement(InfiniteScroll, _extends({
    items: allItems
  }, props), function (item) {
    return React.createElement(MyItem, {
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
    return React.createElement(Grommet, {
      theme: grommet
    }, React.createElement(Box, null, React.createElement(InfiniteScroll, {
      items: items,
      onMore: this.onMore
    }, function (item) {
      return React.createElement(Box, {
        key: item,
        pad: "medium",
        border: {
          side: 'bottom'
        },
        align: "center"
      }, React.createElement(Text, null, item));
    })));
  };

  return LazyInfiniteScroll;
}(Component);

var GridInfiniteScroll = function GridInfiniteScroll() {
  return React.createElement(Grommet, {
    theme: grommet
  }, React.createElement(Grid, {
    columns: "xsmall",
    rows: "small"
  }, React.createElement(InfiniteScroll, {
    items: allItems,
    step: 12
  }, function (item) {
    return React.createElement(Box, {
      key: item,
      as: "article",
      pad: "xsmall"
    }, React.createElement(Image, {
      src: "https://via.placeholder.com/350x150"
    }), React.createElement(Text, null, item));
  })));
};

storiesOf('InfiniteScroll', module).add('Simple', function () {
  return React.createElement(SimpleInfiniteScroll, null);
}).add('Show 118th item', function () {
  return React.createElement(SimpleInfiniteScroll, {
    show: 117
  });
}).add('Marker', function () {
  return React.createElement(SimpleInfiniteScroll, {
    renderMarker: function renderMarker(marker) {
      return React.createElement(Box, {
        pad: "medium",
        background: "accent-1"
      }, marker);
    }
  });
}).add('Replace', function () {
  return React.createElement(SimpleInfiniteScroll, {
    replace: true
  });
}).add('onMore', function () {
  return React.createElement(LazyInfiniteScroll, null);
}).add('Class Children', function () {
  return React.createElement(ClassChildrenInfiniteScroll, null);
}).add('Grid', function () {
  return React.createElement(GridInfiniteScroll, null);
});