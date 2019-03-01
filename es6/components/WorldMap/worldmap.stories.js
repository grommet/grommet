function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import { Box, Grommet, WorldMap } from 'grommet';
import { grommet } from 'grommet/themes';

var SimpleWorldMap =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(SimpleWorldMap, _Component);

  function SimpleWorldMap() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "state", {});

    _defineProperty(_assertThisInitialized(_this), "onSelectPlace", function (place) {
      _this.setState({
        places: [{
          color: 'accent-1',
          location: place
        }]
      });
    });

    return _this;
  }

  var _proto = SimpleWorldMap.prototype;

  _proto.render = function render() {
    var places = this.state.places;
    return React.createElement(Grommet, {
      theme: grommet
    }, React.createElement(Box, {
      align: "center",
      pad: "large"
    }, React.createElement(WorldMap, {
      onSelectPlace: this.onSelectPlace,
      places: places
    })));
  };

  return SimpleWorldMap;
}(Component);

storiesOf('WorldMap', module).add('Simple WorldMap', function () {
  return React.createElement(SimpleWorldMap, null);
});