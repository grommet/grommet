"use strict";

exports.__esModule = true;
exports["default"] = exports.Progressive = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
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