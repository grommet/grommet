"use strict";

exports.__esModule = true;
exports["default"] = exports.Multiple = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
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