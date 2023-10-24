import React from 'react';
import { Box, MaskedInput } from 'grommet';
var data = {
  Cummings: ['a pretty day', 'i carry your heart with me', 'if you like my poems let them'],
  Chaucer: ["The Knight's Tale", 'The General Prologue', "The Friar's Tale"],
  Neruda: ['If You Forget Me', 'Love Sonnet XVII'],
  Poe: ['The Raven', 'Romance', 'Song'],
  Whitman: ['To You', 'O Captain! My Captain!', 'O Me! O Life!']
};
export var Filtered = function Filtered() {
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
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    React.createElement(Box, {
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
    })))
    // </Grommet>
  );
};

Filtered.parameters = {
  chromatic: {
    disable: true
  }
};
Filtered.args = {
  full: true
};
export default {
  title: 'Input/MaskedInput/Filtered'
};