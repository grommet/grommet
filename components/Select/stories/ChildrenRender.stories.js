"use strict";

exports.__esModule = true;
exports["default"] = exports.Children = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
var cache;
function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var r, c, a = Object.defineProperty, n = { __proto__: null, "default": e }; if (Object(e) !== e) return n; if (cache || "function" != typeof WeakMap || (cache = new WeakMap()), cache) { if (cache.has(e)) return cache.get(e); cache.set(e, n); } for (c in e) "default" !== c && {}.hasOwnProperty.call(e, c) && ((r = a && Object.getOwnPropertyDescriptor(e, c)) && (r.get || r.set) ? a(n, c, r) : n[c] = e[c]); return n; }
// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0

var allSeasons = ['S01', 'S02', 'S03', 'S04', 'S05', 'S06', 'S07', 'S08', 'S09', 'S10'];
var Children = exports.Children = function Children() {
  var _useState = (0, _react.useState)([]),
    selected = _useState[0],
    setSelected = _useState[1];
  var onRemoveSeason = function onRemoveSeason(season) {
    setSelected(selected.filter(function (selectedSeason) {
      return selectedSeason !== season;
    }));
  };
  var renderOption = function renderOption(option, index, options, state) {
    return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      pad: "small",
      background: state.selected ? 'brand' : undefined
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
      color: state.disabled ? 'text-disabled' : 'text-strong'
    }, option));
  };
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    _react["default"].createElement(_grommet.Box, {
      fill: true,
      align: "center",
      justify: "center"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Select, {
      closeOnChange: false,
      multiple: true,
      placeholder: "Select Season",
      valueLabel: function valueLabel(options) {
        return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
          wrap: true,
          direction: "row",
          pad: "xsmall",
          gap: "xsmall",
          cssGap: true,
          width: "small"
        }, options && options.length ? options.map(function (season) {
          return /*#__PURE__*/_react["default"].createElement(_grommet.Tag, {
            key: "season_tag_" + season,
            value: season,
            onRemove: function onRemove(event) {
              event.preventDefault();
              event.stopPropagation();
              onRemoveSeason(season);
            }
          });
        }) : /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
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
var _default = exports["default"] = {
  title: 'Input/Select/Children'
};