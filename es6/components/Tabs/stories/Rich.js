import React from 'react';
import PropTypes from 'prop-types';
import { storiesOf } from '@storybook/react';
import { CircleInformation } from "grommet-icons/es6/icons/CircleInformation";
import { Currency } from "grommet-icons/es6/icons/Currency";
import { Box, Grommet, FormField, Tab, Tabs, Text, TextInput } from 'grommet';
import { grommet } from 'grommet/themes';

var RichTabs = function RichTabs() {
  return React.createElement(Grommet, {
    theme: grommet
  }, React.createElement(Tabs, null, React.createElement(Tab, {
    title: React.createElement(RichTabTitle, {
      icon: React.createElement(CircleInformation, {
        color: "accent-2"
      }),
      label: "Personal Data"
    })
  }, React.createElement(FormField, {
    label: "Name"
  }, React.createElement(TextInput, {
    placeholder: "Enter your name..."
  }))), React.createElement(Tab, {
    title: React.createElement(RichTabTitle, {
      icon: React.createElement(Currency, {
        color: "neutral-2"
      }),
      label: "Payment"
    })
  }, React.createElement(FormField, {
    label: "Card Number"
  }, React.createElement(TextInput, {
    placeholder: "Enter your card number..."
  })))));
};

var RichTabTitle = function RichTabTitle(_ref) {
  var icon = _ref.icon,
      label = _ref.label;
  return React.createElement(Box, {
    direction: "row",
    align: "center",
    gap: "xsmall",
    margin: "xsmall"
  }, icon, React.createElement(Text, {
    size: "small"
  }, React.createElement("strong", null, label)));
};

RichTabTitle.propTypes = {
  icon: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired
};
storiesOf('Tabs', module).add('Rich', function () {
  return React.createElement(RichTabs, null);
});
export { RichTabTitle };