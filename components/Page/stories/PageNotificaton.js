"use strict";

exports.__esModule = true;
exports["default"] = exports.PageNotification = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
var PageNotification = exports.PageNotification = function PageNotification() {
  var _useState = (0, _react.useState)('narrow'),
    kind = _useState[0],
    setKind = _useState[1];
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    _react["default"].createElement(_grommet.Page, {
      pad: {
        vertical: 'medium'
      },
      kind: kind,
      background: "background-back"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.PageContent, {
      background: "background-front"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      direction: "row",
      justify: "between",
      pad: {
        vertical: 'medium'
      }
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Heading, {
      margin: "none"
    }, kind.slice(0, 1).toUpperCase() + kind.slice(1), " Page"), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      direction: "row",
      align: "end"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
      label: "Wide",
      onClick: function onClick() {
        return setKind('wide');
      },
      primary: kind === 'wide',
      color: kind === 'wide' ? 'background-back' : undefined
    }), /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
      label: "Narrow",
      onClick: function onClick() {
        return setKind('narrow');
      },
      primary: kind === 'narrow',
      color: kind === 'narrow' ? 'background-back' : undefined
    }), /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
      label: "Full",
      onClick: function onClick() {
        return setKind('full');
      },
      primary: kind === 'full',
      color: kind === 'full' ? 'background-back' : undefined
    }))), /*#__PURE__*/_react["default"].createElement(_grommet.Notification, {
      status: "critical",
      message: "Page level notification.",
      onClose: function onClose() {
        return console.log('close notification');
      }
    }), /*#__PURE__*/_react["default"].createElement(_grommet.Paragraph, null, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer commodo gravida tincidunt. Nunc fringilla blandit tortor, id accumsan nisi dictum quis. Aenean porttitor at mi id semper. Donec mattis bibendum leo, interdum ullamcorper lectus ultrices vel. Fusce nec enim faucibus nunc porta egestas. Fusce dapibus lobortis tincidunt."), /*#__PURE__*/_react["default"].createElement(_grommet.Grid, {
      rows: "small",
      columns: {
        count: 'fit',
        size: 'small'
      },
      gap: "small"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Card, {
      background: "white",
      pad: "large"
    }, "Card"), /*#__PURE__*/_react["default"].createElement(_grommet.Card, {
      background: "white",
      pad: "large"
    }, "Card")), /*#__PURE__*/_react["default"].createElement(_grommet.Paragraph, null, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer commodo gravida tincidunt. Nunc fringilla blandit tortor, id accumsan nisi dictum quis. Aenean porttitor at mi id semper. Donec mattis bibendum leo, interdum ullamcorper lectus ultrices vel. Fusce nec enim faucibus nunc porta egestas. Fusce dapibus lobortis tincidunt.")))
    // </Grommet>
  );
};
var _default = exports["default"] = {
  title: 'Layout/Page/Page Notification'
};