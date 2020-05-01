import React from 'react';
import { storiesOf } from '@storybook/react';
import { Box, Grommet, MaskedInput } from 'grommet';
import { grommet } from 'grommet/themes';
var data = {
  Cummings: ['a pretty day', 'i carry your heart with me', 'if you like my poems let them'],
  Chaucer: ["The Knight's Tale", 'The General Prologue', "The Friar's Tale"],
  Neruda: ['If You Forget Me', 'Love Sonnet XVII'],
  Poe: ['The Raven', 'Romance', 'Song'],
  Whitman: ['To You', 'O Captain! My Captain!', 'O Me! O Life!']
};

var FilteredMaskedInput = function FilteredMaskedInput() {
  var _React$useState = React.useState(''),
      value = _React$useState[0],
      setValue = _React$useState[1];

  var _value$split = value.split(':'),
      first = _value$split[0],
      second = _value$split[1];

  var poets = first ? Object.keys(data).filter(function (k) {
    return k.toLowerCase().startsWith(first.toLowerCase());
  }) : Object.keys(data);
  var poems = data[first] && second ? data[first].filter(function (k) {
    return k.toLowerCase().startsWith(second.toLowerCase());
  }) : data[first] || [];
  var longestPoemLength = 0;
  poems.forEach(function (p) {
    longestPoemLength = Math.max(longestPoemLength, p.length);
  });
  return /*#__PURE__*/React.createElement(Grommet, {
    full: true,
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
    fill: true,
    align: "center",
    justify: "start",
    pad: "large"
  }, /*#__PURE__*/React.createElement(Box, {
    width: "medium"
  }, /*#__PURE__*/React.createElement(MaskedInput, {
    mask: [{
      options: poets,
      placeholder: 'poet'
    }, {
      fixed: ':'
    }, {
      options: poems,
      length: longestPoemLength,
      placeholder: 'poem'
    }],
    value: value,
    onChange: function onChange(event) {
      return setValue(event.target.value);
    }
  }))));
};

storiesOf('MaskedInput', module).add('Filtered', function () {
  return /*#__PURE__*/React.createElement(FilteredMaskedInput, null);
});