"use strict";

exports.__esModule = true;
exports["default"] = exports.HeaderActions = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
var _grommetIcons = require("grommet-icons");
var _data = require("../../DataTable/stories/data");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
// Source code for the data can be found here
// https://github.com/grommet/grommet/blob/master/src/js/components/DataTable/stories/data.js

var TipContent = function TipContent(_ref) {
  var message = _ref.message,
    icon = _ref.icon;
  return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    direction: "row",
    gap: "small"
  }, icon && /*#__PURE__*/_react["default"].createElement(_grommetIcons.Info, {
    color: "accent-4"
  }), /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
    color: "accent-1"
  }, message));
};
var HeaderActions = exports.HeaderActions = function HeaderActions() {
  var _useState = (0, _react.useState)(_data.storageData),
    data = _useState[0],
    setData = _useState[1];
  var _useState2 = (0, _react.useState)(),
    selected = _useState2[0],
    setSelected = _useState2[1];
  var removeRow = function removeRow() {
    var filteredData = data.filter(function (item) {
      return item.id !== selected.id;
    });
    setData(filteredData);
    setSelected(undefined);
  };
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    _react["default"].createElement(_grommet.Box, {
      align: "center",
      background: "dark-1",
      gap: "large",
      height: {
        min: '100%'
      }
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Paragraph, {
      textAlign: "center"
    }, /*#__PURE__*/_react["default"].createElement("b", null, "Follow"), " the Tips of the Trash & Reload icons for directions. Those Tooltips ", /*#__PURE__*/_react["default"].createElement("b", null, "change"), " according to the actions the user perform on the table. The Table meters are also using the Tip component."), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      gap: "small"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      fill: true,
      direction: "row",
      justify: "between",
      align: "center"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Heading, {
      level: 2
    }, " Storage Pools with tooltips"), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      gap: "small",
      direction: "row"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Tip, {
      dropProps: {
        align: {
          bottom: 'top'
        }
      },
      content: /*#__PURE__*/_react["default"].createElement(TipContent, {
        message: !selected ? 'Select a table row to enable' : 'Delete table Row',
        icon: !selected
      })
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Anchor, {
      disabled: !selected,
      icon: /*#__PURE__*/_react["default"].createElement(_grommetIcons.Trash, null),
      onClick: removeRow
    })), /*#__PURE__*/_react["default"].createElement(_grommet.Tip, {
      dropProps: {
        align: {
          bottom: 'top'
        }
      },
      content: /*#__PURE__*/_react["default"].createElement(TipContent, {
        message: data.length < _data.storageData.length ? 'Reload Data' : 'Delete items before reload action is enabled',
        icon: !selected
      })
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Anchor, {
      icon: /*#__PURE__*/_react["default"].createElement(_grommetIcons.Refresh, null),
      onClick: function onClick() {
        return setData(_data.storageData);
      },
      disabled: data.length === _data.storageData.length
    })))), /*#__PURE__*/_react["default"].createElement(_grommet.DataTable, {
      columns: _data.storageColumns,
      data: data,
      step: 10,
      onClickRow: function onClickRow(event) {
        return setSelected(event.datum);
      }
    })))
    // </Grommet>
  );
};
HeaderActions.args = {
  full: true
};
HeaderActions.parameters = {
  chromatic: {
    disable: true
  }
};
HeaderActions.storyName = 'Header actions';
var _default = exports["default"] = {
  title: 'Controls/Tip/Header actions'
};