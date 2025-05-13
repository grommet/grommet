"use strict";

exports.__esModule = true;
exports["default"] = exports.Progressive = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
var align = {
  top: 'bottom',
  right: 'right'
};
var ProgressiveDrop = function ProgressiveDrop() {
  var boxRef = (0, _react.useRef)();
  var innerBoxRef = (0, _react.useRef)();
  var _useState = (0, _react.useState)(false),
    openDrop = _useState[0],
    setOpenDrop = _useState[1];
  var _useState2 = (0, _react.useState)(false),
    openInnerDrop = _useState2[0],
    setOpenInnerDrop = _useState2[1];
  var _useState3 = (0, _react.useState)(false),
    interactedWithInnerButton = _useState3[0],
    setInteractedWithInnerButton = _useState3[1];
  var onCloseDrop = function onCloseDrop() {
    setOpenDrop(false);
    setOpenInnerDrop(false);
  };
  var onOpenDrop = function onOpenDrop() {
    setOpenDrop(true);
    setOpenInnerDrop(false);
  };
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    _react["default"].createElement(_grommet.Box, {
      fill: true,
      align: "center",
      justify: "center"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
      ref: boxRef,
      primary: true,
      label: "Click me",
      onClick: onOpenDrop
    }), openDrop && /*#__PURE__*/_react["default"].createElement(_grommet.Drop, {
      target: boxRef.current,
      onClickOutside: onCloseDrop,
      onEsc: onCloseDrop
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      pad: "large",
      ref: innerBoxRef
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
      primary: true,
      label: "Click me again",
      onClick: function onClick() {
        return setOpenInnerDrop(true);
      }
    })), openInnerDrop && /*#__PURE__*/_react["default"].createElement(_grommet.Drop, {
      target: innerBoxRef.current,
      onClickOutside: function onClickOutside() {
        return setOpenInnerDrop(false);
      },
      onEsc: function onEsc() {
        return setOpenInnerDrop(false);
      },
      align: align
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      pad: "large"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
      primary: true,
      label: interactedWithInnerButton ? 'Good job!' : 'You can interact with me',
      onClick: function onClick() {
        return setInteractedWithInnerButton(true);
      }
    })))))
    // </Grommet>
  );
};
var Progressive = exports.Progressive = function Progressive() {
  return /*#__PURE__*/_react["default"].createElement(ProgressiveDrop, null);
};
Progressive.parameters = {
  chromatic: {
    disable: true
  }
};
Progressive.args = {
  full: true
};
var _default = exports["default"] = {
  title: 'Controls/Drop/Progressive'
};