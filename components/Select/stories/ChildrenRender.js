"use strict";

exports.__esModule = true;
exports["default"] = exports.Children = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommetIcons = require("grommet-icons");
var _grommet = require("grommet");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
var allSeasons = ['S01', 'S02', 'S03', 'S04', 'S05', 'S06', 'S07', 'S08', 'S09', 'S10'];
var Children = exports.Children = function Children() {
  var _useState = (0, _react.useState)([]),
    selected = _useState[0],
    setSelected = _useState[1];
  var onRemoveSeason = function onRemoveSeason(season) {
    var seasonIndex = allSeasons.indexOf(season);
    setSelected(selected.filter(function (selectedSeason) {
      return selectedSeason !== seasonIndex;
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
      value: /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
        wrap: true,
        direction: "row",
        width: "small"
      }, selected && selected.length ? selected.map(function (index) {
        return renderSeason(allSeasons[index]);
      }) : /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
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