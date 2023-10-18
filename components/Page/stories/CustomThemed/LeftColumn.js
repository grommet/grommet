"use strict";

exports.__esModule = true;
exports["default"] = exports.LeftColumn = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommet = require("grommet");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var customTheme = {
  page: {
    customKind: {
      alignSelf: 'start',
      width: {
        min: '200px',
        max: '500px'
      },
      small: {
        pad: 'medium',
        margin: {
          vertical: 'small',
          horizontal: 'small'
        }
      },
      medium: {
        pad: 'medium',
        margin: {
          vertical: 'small',
          horizontal: 'small'
        }
      },
      large: {
        pad: 'medium',
        margin: {
          vertical: 'small',
          horizontal: 'small'
        }
      }
    }
  }
};
var LeftColumn = exports.LeftColumn = function LeftColumn() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: customTheme
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Page, {
    kind: "customKind"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.PageContent, null, /*#__PURE__*/_react["default"].createElement(_grommet.Header, null, /*#__PURE__*/_react["default"].createElement(_grommet.Heading, null, "Custom Kind"))), /*#__PURE__*/_react["default"].createElement(_grommet.PageContent, {
    background: {
      fill: 'horizontal',
      color: 'pink'
    }
  }, "Background goes all the way across Page width regardless of Page kind (wide, narrow, full, or custom)."), /*#__PURE__*/_react["default"].createElement(_grommet.PageContent, null, /*#__PURE__*/_react["default"].createElement(_grommet.Paragraph, null, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer commodo gravida tincidunt. Nunc fringilla blandit tortor, id accumsan nisi dictum quis. Aenean porttitor at mi id semper. Donec mattis bibendum leo, interdum ullamcorper lectus ultrices vel. Fusce nec enim faucibus nunc porta egestas. Fusce dapibus lobortis tincidunt.")), /*#__PURE__*/_react["default"].createElement(_grommet.PageContent, {
    background: "orange"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Paragraph, null, "Background width is restricted by Page kind (wide, narrow, or full)."), /*#__PURE__*/_react["default"].createElement(_grommet.Grid, {
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
  }, "Card"))), /*#__PURE__*/_react["default"].createElement(_grommet.PageContent, null, /*#__PURE__*/_react["default"].createElement(_grommet.Paragraph, null, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer commodo gravida tincidunt. Nunc fringilla blandit tortor, id accumsan nisi dictum quis. Aenean porttitor at mi id semper. Donec mattis bibendum leo, interdum ullamcorper lectus ultrices vel. Fusce nec enim faucibus nunc porta egestas. Fusce dapibus lobortis tincidunt."))));
};
LeftColumn.storyName = 'Left column';
var _default = exports["default"] = {
  title: 'Layout/Page/Custom Themed/Left column'
};