import React from 'react';
import { storiesOf } from '@storybook/react';
import { FormDown } from "grommet-icons/es6/icons/FormDown";
import { Grommet, Box, Calendar, DropButton, Text } from 'grommet';
import { grommet } from 'grommet/themes';

var CalendarDropButton = function CalendarDropButton() {
  var _React$useState = React.useState(),
      date = _React$useState[0],
      setDate = _React$useState[1];

  var _React$useState2 = React.useState(),
      open = _React$useState2[0],
      setOpen = _React$useState2[1];

  var onSelect = function onSelect(selectedDate) {
    setDate(selectedDate);
    setOpen(false);
  };

  return React.createElement(Grommet, {
    theme: grommet
  }, React.createElement(Box, {
    align: "center",
    pad: "large"
  }, React.createElement(DropButton, {
    open: open,
    onClose: function onClose() {
      return setOpen(false);
    },
    onOpen: function onOpen() {
      return setOpen(true);
    },
    dropContent: React.createElement(Calendar, {
      date: date,
      onSelect: onSelect
    })
  }, React.createElement(Box, {
    direction: "row",
    gap: "medium",
    align: "center",
    pad: "small"
  }, React.createElement(Text, null, date ? new Date(date).toLocaleDateString() : 'Select date'), React.createElement(FormDown, {
    color: "brand"
  })))));
};

storiesOf('DropButton', module).add('Calendar', function () {
  return React.createElement(CalendarDropButton, null);
});