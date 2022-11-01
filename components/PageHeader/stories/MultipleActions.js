"use strict";

exports.__esModule = true;
exports["default"] = exports.MultipleActions = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
var _grommetIcons = require("grommet-icons");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var actions = [{
  label: 'Get Started',
  primary: true
}, {
  label: 'Follow',
  secondary: true
}, {
  label: 'File Issue',
  secondary: true
}];
var controls = {
  small: /*#__PURE__*/_react["default"].createElement(_grommet.Menu, {
    dropAlign: {
      top: 'bottom',
      right: 'right'
    },
    items: actions.map(function (action) {
      return {
        label: action.label
      };
    }),
    icon: /*#__PURE__*/_react["default"].createElement(_grommetIcons.More, null)
  }),
  medium: /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_grommet.Button, actions[0]), /*#__PURE__*/_react["default"].createElement(_grommet.Menu, {
    dropAlign: {
      top: 'bottom',
      right: 'right'
    },
    items: actions.slice(1),
    icon: /*#__PURE__*/_react["default"].createElement(_grommetIcons.More, null)
  })),
  large: actions.map(function (action) {
    return /*#__PURE__*/_react["default"].createElement(_grommet.Button, action);
  })
};
var MultipleActions = function MultipleActions() {
  var size = (0, _react.useContext)(_grommet.ResponsiveContext);
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    _react["default"].createElement(_grommet.Page, null, /*#__PURE__*/_react["default"].createElement(_grommet.PageContent, null, /*#__PURE__*/_react["default"].createElement(_grommet.PageHeader, {
      title: "Grommet",
      subtitle: "Grommet helps you build responsive and accessible \n          mobile-first projects for the web with an easy to use component \n          library.",
      actions: /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
        direction: "row",
        gap: "small",
        align: "center"
      }, controls[size]),
      parent: /*#__PURE__*/_react["default"].createElement(_grommet.Anchor, {
        label: "Parent Page"
      })
    })))
    // </Grommet>
  );
};
exports.MultipleActions = MultipleActions;
MultipleActions.storyName = 'Multiple Actions';
var _default = {
  title: 'Layout/PageHeader/Multiple Actions'
};
exports["default"] = _default;