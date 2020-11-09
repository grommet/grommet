import React, { useState } from 'react';
import { FormClose } from "grommet-icons/es6/icons/FormClose";
import { Box, Button, Grommet, Select, Text } from 'grommet';
import { grommet } from 'grommet/themes';
var allSeasons = ['S01', 'S02', 'S03', 'S04', 'S05', 'S06', 'S07', 'S08', 'S09', 'S10'];
export var Seasons = function Seasons() {
  var _useState = useState([]),
      selected = _useState[0],
      setSelected = _useState[1];

  var onRemoveSeason = function onRemoveSeason(season) {
    var seasonIndex = allSeasons.indexOf(season);
    setSelected(selected.filter(function (selectedSeason) {
      return selectedSeason !== seasonIndex;
    }));
  };

  var renderSeason = function renderSeason(season) {
    return /*#__PURE__*/React.createElement(Button, {
      key: "season_tag_" + season,
      href: "#",
      onClick: function onClick(event) {
        event.preventDefault();
        event.stopPropagation();
        onRemoveSeason(season);
      },
      onFocus: function onFocus(event) {
        return event.stopPropagation();
      }
    }, /*#__PURE__*/React.createElement(Box, {
      align: "center",
      direction: "row",
      gap: "xsmall",
      pad: {
        vertical: 'xsmall',
        horizontal: 'small'
      },
      margin: "xsmall",
      background: "accent-1",
      round: "large"
    }, /*#__PURE__*/React.createElement(Text, {
      size: "small",
      color: "white"
    }, season), /*#__PURE__*/React.createElement(Box, {
      background: "white",
      round: "full",
      margin: {
        left: 'xsmall'
      }
    }, /*#__PURE__*/React.createElement(FormClose, {
      color: "accent-1",
      size: "small",
      style: {
        width: '12px',
        height: '12px'
      }
    }))));
  };

  var renderOption = function renderOption(option, state) {
    return /*#__PURE__*/React.createElement(Box, {
      pad: "small",
      background: state.active ? 'active' : undefined
    }, option);
  };

  return /*#__PURE__*/React.createElement(Grommet, {
    full: true,
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
    fill: true,
    align: "center",
    justify: "center"
  }, /*#__PURE__*/React.createElement(Select, {
    closeOnChange: false,
    multiple: true,
    value: /*#__PURE__*/React.createElement(Box, {
      wrap: true,
      direction: "row",
      width: "small"
    }, selected && selected.length ? selected.map(function (index) {
      return renderSeason(allSeasons[index]);
    }) : /*#__PURE__*/React.createElement(Box, {
      pad: {
        vertical: 'xsmall',
        horizontal: 'small'
      },
      margin: "xsmall"
    }, "Select Season")),
    options: allSeasons,
    selected: selected,
    disabled: [2, 6],
    onChange: function onChange(_ref) {
      var nextSelected = _ref.selected;
      setSelected([].concat(nextSelected).sort());
    }
  }, renderOption)));
};