import React from 'react';
import { storiesOf } from '@storybook/react';
import { Grommet, Box, Menu, Text } from 'grommet';
import { grommet } from 'grommet/themes';
import { FormDown } from "grommet-icons/es6/icons/FormDown";

var CustomMenu = function CustomMenu() {
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
    align: "center",
    pad: "large",
    background: {
      color: 'dark-2',
      opacity: 0.7
    }
  }, /*#__PURE__*/React.createElement(Menu, {
    plain: true,
    items: [{
      label: 'Launch',
      onClick: function onClick() {}
    }, {
      label: 'Abort',
      onClick: function onClick() {}
    }]
  }, function (_ref) {
    var drop = _ref.drop,
        hover = _ref.hover;
    var color = hover && !drop ? 'accent-1' : undefined;
    return /*#__PURE__*/React.createElement(Box, {
      direction: "row",
      gap: "small",
      pad: "small",
      background: hover && drop ? 'light-2' : undefined
    }, /*#__PURE__*/React.createElement(Text, {
      color: color
    }, "actions"), /*#__PURE__*/React.createElement(FormDown, {
      color: color
    }));
  })));
};

storiesOf('Menu', module).add('Custom', function () {
  return /*#__PURE__*/React.createElement(CustomMenu, null);
}, {
  chromatic: {
    disable: true
  }
});