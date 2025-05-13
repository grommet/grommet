"use strict";

exports.__esModule = true;
exports["default"] = exports.Children = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommetIcons = require("grommet-icons");
var _grommet = require("grommet");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
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
  var renderSeason = function renderSeason(season) {
    return /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
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
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      align: "center",
      direction: "row",
      gap: "xsmall",
      pad: {
        vertical: 'xsmall',
        horizontal: 'small'
      },
      margin: "xsmall",
      background: "brand",
      round: "large"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
      size: "small"
    }, season), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      round: "full",
      margin: {
        left: 'xsmall'
      }
    }, /*#__PURE__*/_react["default"].createElement(_grommetIcons.FormClose, {
      size: "small",
      style: {
        width: '12px',
        height: '12px'
      }
    }))));
  };
  var renderOption = function renderOption(option, state) {
    return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      pad: "small",
      background: state.active ? 'active' : undefined
    }, option);
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
      valueLabel: /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
        wrap: true,
        direction: "row",
        width: "small"
      }, selected && selected.length ? selected.map(function (value) {
        return renderSeason(value);
      }) : /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
        pad: {
          vertical: 'xsmall',
          horizontal: 'small'
        },
        margin: "xsmall"
      }, "Select Season")),
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