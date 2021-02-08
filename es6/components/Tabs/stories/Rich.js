import React from 'react';
import PropTypes from 'prop-types';
import { CircleInformation } from "grommet-icons/es6/icons/CircleInformation";
import { Currency } from "grommet-icons/es6/icons/Currency";
import { Box, Grommet, FormField, Tab, Tabs, Text, TextInput } from 'grommet';
import { grommet } from 'grommet/themes';

var RichTabs = function RichTabs() {
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Tabs, null, /*#__PURE__*/React.createElement(Tab, {
    title: /*#__PURE__*/React.createElement(RichTabTitle, {
      icon: /*#__PURE__*/React.createElement(CircleInformation, {
        color: "accent-2"
      }),
      label: "Personal Data"
    })
  }, /*#__PURE__*/React.createElement(FormField, {
    label: "Name"
  }, /*#__PURE__*/React.createElement(TextInput, {
    placeholder: "Enter your name..."
  }))), /*#__PURE__*/React.createElement(Tab, {
    title: /*#__PURE__*/React.createElement(RichTabTitle, {
      icon: /*#__PURE__*/React.createElement(Currency, {
        color: "neutral-2"
      }),
      label: "Payment"
    })
  }, /*#__PURE__*/React.createElement(FormField, {
    label: "Card Number"
  }, /*#__PURE__*/React.createElement(TextInput, {
    placeholder: "Enter your card number..."
  })))));
};

var RichTabTitle = function RichTabTitle(_ref) {
  var icon = _ref.icon,
      label = _ref.label;
  return /*#__PURE__*/React.createElement(Box, {
    direction: "row",
    align: "center",
    gap: "xsmall",
    margin: "xsmall"
  }, icon, /*#__PURE__*/React.createElement(Text, {
    size: "small"
  }, /*#__PURE__*/React.createElement("strong", null, label)));
};

RichTabTitle.propTypes = {
  icon: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired
};
export var Rich = function Rich() {
  return /*#__PURE__*/React.createElement(RichTabs, null);
};
export default {
  title: 'Controls/Tabs/Rich'
};