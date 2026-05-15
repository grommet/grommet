import React, { useState } from 'react';
import { Box, Select, Tag, Text } from 'grommet';
var allSeasons = ['S01', 'S02', 'S03', 'S04', 'S05', 'S06', 'S07', 'S08', 'S09', 'S10'];
export var Children = function Children() {
  var _useState = useState([]),
    selected = _useState[0],
    setSelected = _useState[1];
  var onRemoveSeason = function onRemoveSeason(season) {
    setSelected(selected.filter(function (selectedSeason) {
      return selectedSeason !== season;
    }));
  };
  var renderOption = function renderOption(option, index, options, state) {
    return /*#__PURE__*/React.createElement(Box, {
      pad: "small",
      background: state.selected ? 'brand' : undefined
    }, /*#__PURE__*/React.createElement(Text, {
      color: state.disabled ? 'text-disabled' : 'text-strong'
    }, option));
  };
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    React.createElement(Box, {
      fill: true,
      align: "center",
      justify: "center"
    }, /*#__PURE__*/React.createElement(Select, {
      closeOnChange: false,
      multiple: true,
      placeholder: "Select Season",
      valueLabel: function valueLabel(options) {
        return /*#__PURE__*/React.createElement(Box, {
          wrap: true,
          direction: "row",
          pad: "xsmall",
          gap: "xsmall",
          cssGap: true,
          width: "small"
        }, options && options.length ? options.map(function (season) {
          return /*#__PURE__*/React.createElement(Tag, {
            key: "season_tag_" + season,
            value: season,
            onRemove: function onRemove(event) {
              event.preventDefault();
              event.stopPropagation();
              onRemoveSeason(season);
            }
          });
        }) : /*#__PURE__*/React.createElement(Text, {
          color: "text-weak"
        }, "Select Season"));
      },
      options: allSeasons,
      value: selected,
      disabled: [2, 6],
      onChange: function onChange(_ref) {
        var nextSelected = _ref.value;
        setSelected(nextSelected);
      }
    }, renderOption))
    // </Grommet>
  );
};
Children.parameters = {
  chromatic: {
    disable: true
  }
};
Children.args = {
  full: true
};
export default {
  title: 'Input/Select/Children'
};