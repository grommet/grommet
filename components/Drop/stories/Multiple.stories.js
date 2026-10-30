"use strict";

exports.__esModule = true;
exports["default"] = exports.Multiple = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
var cache;
function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var r, c, a = Object.defineProperty, n = { __proto__: null, "default": e }; if (Object(e) !== e) return n; if (cache || "function" != typeof WeakMap || (cache = new WeakMap()), cache) { if (cache.has(e)) return cache.get(e); cache.set(e, n); } for (c in e) "default" !== c && {}.hasOwnProperty.call(e, c) && ((r = a && Object.getOwnPropertyDescriptor(e, c)) && (r.get || r.set) ? a(n, c, r) : n[c] = e[c]); return n; }
// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0

var alignRight = {
  left: 'right'
};
var alignLeft = {
  right: 'left'
};
var MultipleDrop = function MultipleDrop() {
  var _useState = (0, _react.useState)(false),
    showDrop = _useState[0],
    setShowDrop = _useState[1];
  var _useState2 = (0, _react.useState)(false),
    showLayer = _useState2[0],
    setShowLayer = _useState2[1];
  var targetRef = (0, _react.useRef)();
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    _react["default"].createElement(_grommet.Box, {
      gap: "medium",
      fill: true,
      align: "center",
      justify: "center"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.DropButton, {
      label: "drop button",
      dropAlign: alignLeft,
      dropContent: /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
        pad: "large"
      }, /*#__PURE__*/_react["default"].createElement(_grommet.TextInput, {
        value: "",
        onChange: function onChange() {},
        suggestions: ['one', 'two']
      }))
    }), /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
      ref: targetRef,
      label: "button",
      onClick: function onClick() {
        return setShowDrop(true);
      }
    }), showDrop && /*#__PURE__*/_react["default"].createElement(_grommet.Drop, {
      align: alignRight,
      target: targetRef.current,
      onClickOutside: function onClickOutside() {
        return setShowDrop(false);
      }
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      pad: "large"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.TextInput, {
      value: "",
      onChange: function onChange() {},
      suggestions: ['one', 'two']
    }))), /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
      label: "layer",
      onClick: function onClick() {
        return setShowLayer(!showLayer);
      }
    }), showLayer && /*#__PURE__*/_react["default"].createElement(_grommet.Layer, {
      onEsc: function onEsc() {
        return setShowLayer(!showLayer);
      },
      position: "left",
      modal: false
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      gap: "small",
      pad: "large",
      border: true
    }, /*#__PURE__*/_react["default"].createElement(_grommet.TextInput, {
      value: "",
      onChange: function onChange() {},
      suggestions: ['one', 'two']
    }), /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
      alignSelf: "end",
      label: "Close Layer",
      onClick: function onClick() {
        return setShowLayer(!showLayer);
      }
    }))))
    // </Grommet>
  );
};
var Multiple = exports.Multiple = function Multiple() {
  return /*#__PURE__*/_react["default"].createElement(MultipleDrop, null);
};
Multiple.parameters = {
  chromatic: {
    disable: true
  }
};
Multiple.args = {
  full: true
};
var _default = exports["default"] = {
  title: 'Controls/Drop/Multiple'
};