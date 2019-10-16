import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { FormClose } from "grommet-icons/es6/icons/FormClose";
import { Box, Button, Grommet, Select, Text } from 'grommet';
import { grommet } from 'grommet/themes';
var allSeasons = ['S01', 'S02', 'S03', 'S04', 'S05', 'S06', 'S07', 'S08', 'S09', 'S10'];

var SeasonsSelect = function SeasonsSelect() {
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
    return React.createElement(Button, {
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
    }, React.createElement(Box, {
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
    }, React.createElement(Text, {
      size: "small",
      color: "white"
    }, season), React.createElement(Box, {
      background: "white",
      round: "full",
      margin: {
        left: 'xsmall'
      }
    }, React.createElement(FormClose, {
      color: "accent-1",
      size: "small",
      style: {
        width: '12px',
        height: '12px'
      }
    }))));
  };

  var renderOption = function renderOption(option, state) {
    return React.createElement(Box, {
      pad: "small",
      background: state.active ? 'active' : undefined
    }, option);
  };

  return React.createElement(Grommet, {
    full: true,
    theme: grommet
  }, React.createElement(Box, {
    fill: true,
    align: "center",
    justify: "center"
  }, React.createElement(Select, {
    closeOnChange: false,
    multiple: true,
    value: React.createElement(Box, {
      wrap: true,
      direction: "row",
      width: "small"
    }, selected && selected.length ? selected.map(function (index) {
      return renderSeason(allSeasons[index]);
    }) : React.createElement(Box, {
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

storiesOf('Select', module).add('Seasons', function () {
  return React.createElement(SeasonsSelect, null);
});