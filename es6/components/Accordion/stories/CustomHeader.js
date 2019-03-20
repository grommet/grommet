function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import { Accordion, AccordionPanel, Box, Grommet, Text, TextInput } from 'grommet';
import { grommet } from 'grommet/themes';

var renderPanelHeader = function renderPanelHeader(title, active) {
  return React.createElement(Box, {
    direction: "row",
    align: "center",
    pad: "medium",
    gap: "small"
  }, React.createElement("strong", null, React.createElement(Text, null, title)), React.createElement(Text, {
    color: "brand"
  }, active ? '-' : '+'));
};

var CustomHeaderAccordion =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(CustomHeaderAccordion, _Component);

  function CustomHeaderAccordion() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "state", {
      activeIndex: [0]
    });

    return _this;
  }

  var _proto = CustomHeaderAccordion.prototype;

  _proto.render = function render() {
    var _this2 = this;

    var activeIndex = this.state.activeIndex;
    return React.createElement(Grommet, {
      theme: grommet
    }, React.createElement(Accordion, {
      activeIndex: activeIndex,
      onActive: function onActive(newActiveIndex) {
        return _this2.setState({
          activeIndex: newActiveIndex
        });
      }
    }, React.createElement(AccordionPanel, {
      header: renderPanelHeader('Panel 1', activeIndex.includes(0))
    }, React.createElement(Box, {
      pad: "medium",
      background: "light-2",
      style: {
        height: '800px'
      }
    }, React.createElement(Text, null, "Panel 1 contents"), React.createElement(TextInput, null))), React.createElement(AccordionPanel, {
      header: renderPanelHeader('Panel 2', activeIndex.includes(1))
    }, React.createElement(Box, {
      pad: "medium",
      background: "light-2",
      style: {
        height: '50px'
      }
    }, React.createElement(Text, null, "Panel 2 contents"))), React.createElement(AccordionPanel, {
      header: renderPanelHeader('Panel 3', activeIndex.includes(2))
    }, React.createElement(Box, {
      pad: "medium",
      background: "light-2",
      style: {
        height: '300px'
      }
    }, React.createElement(Text, null, "Panel 3 contents")))));
  };

  return CustomHeaderAccordion;
}(Component);

storiesOf('Accordion', module).add('Custom Header', function () {
  return React.createElement(CustomHeaderAccordion, null);
});