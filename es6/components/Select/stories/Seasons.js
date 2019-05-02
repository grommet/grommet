function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import { FormClose } from "grommet-icons/es6/icons/FormClose";
import { Box, Button, Grommet, Select, Text } from 'grommet';
import { grommet } from 'grommet/themes';
var allSeasons = ['S01', 'S02', 'S03', 'S04', 'S05', 'S06', 'S07', 'S08', 'S09', 'S10'];

var SeasonsSelect =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(SeasonsSelect, _Component);

  function SeasonsSelect() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "state", {
      selected: []
    });

    _defineProperty(_assertThisInitialized(_this), "onRemoveSeason", function (season) {
      var selected = _this.state.selected;
      var nextSelected = [].concat(selected);
      nextSelected.splice(nextSelected.indexOf(allSeasons.indexOf(season)), 1);

      _this.setState({
        selected: nextSelected
      });
    });

    _defineProperty(_assertThisInitialized(_this), "renderSeason", function (season) {
      return React.createElement(Button, {
        key: "season_tag_" + season,
        href: "#",
        onClick: function onClick(event) {
          event.preventDefault();
          event.stopPropagation();

          _this.onRemoveSeason(season);
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
    });

    _defineProperty(_assertThisInitialized(_this), "renderOption", function (option, index, options, state) {
      return React.createElement(Box, {
        pad: "small",
        background: state.active ? 'active' : undefined
      }, option);
    });

    return _this;
  }

  var _proto = SeasonsSelect.prototype;

  _proto.render = function render() {
    var _this2 = this;

    var selected = this.state.selected;
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
        return _this2.renderSeason(allSeasons[index]);
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

        _this2.setState({
          selected: nextSelected.sort()
        });
      }
    }, this.renderOption)));
  };

  return SeasonsSelect;
}(Component);

storiesOf('Select', module).add('Seasons', function () {
  return React.createElement(SeasonsSelect, null);
});