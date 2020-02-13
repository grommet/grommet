import React, { useEffect, useRef, useState } from 'react';
import { storiesOf } from '@storybook/react';
import { Box, Calendar, Drop, Heading, Grommet, TextInput } from 'grommet';
import { grommet } from 'grommet/themes';

var OverflowDrop = function OverflowDrop() {
  var targetRef = useRef();
  var inputRef = useRef();

  var _useState = useState(undefined),
      date = _useState[0],
      setDate = _useState[1];

  var _useState2 = useState(false),
      showCalendar = _useState2[0],
      setShowCalendar = _useState2[1];

  var onSelect = function onSelect(nextDate) {
    setDate(nextDate !== date ? nextDate : undefined);
    setShowCalendar(false);
  };

  var _useState3 = useState(false),
      setShowDrop = _useState3[1];

  useEffect(function () {
    return setShowDrop(true);
  }, []);
  return React.createElement(Grommet, {
    theme: grommet,
    full: true
  }, React.createElement(Box, {
    fill: true,
    align: "center",
    justify: "center"
  }, React.createElement(Box, {
    background: "dark-3",
    pad: "medium",
    align: "center",
    justify: "start",
    ref: targetRef
  }, "Target"), targetRef.current && React.createElement(Drop, {
    overflow: "unset",
    align: {
      top: 'bottom',
      left: 'left'
    },
    target: targetRef.current,
    onClose: function onClose() {
      return setShowCalendar(false);
    }
  }, React.createElement(Box, {
    height: "small"
  }, React.createElement(Heading, {
    level: 4
  }, "Select Start Date"), React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, React.createElement(TextInput, {
    ref: inputRef,
    value: date || '',
    placeholder: "Focus on me",
    onFocus: function onFocus() {
      return setShowCalendar(true);
    }
  }), showCalendar && React.createElement("div", {
    style: {
      position: 'absolute',
      background: '#eee'
    }
  }, React.createElement(Calendar, {
    date: date,
    onSelect: onSelect,
    size: "small"
  })))))));
};

storiesOf('Drop', module).add('Overflow', function () {
  return React.createElement(OverflowDrop, null);
});