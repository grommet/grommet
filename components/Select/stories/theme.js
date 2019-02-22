"use strict";

exports.__esModule = true;
exports.theme = void 0;

var _polished = require("polished");

var _grommetIcons = require("grommet-icons");

var _utils = require("../../../utils");

var _ArrowDown = require("./components/icons/ArrowDown");

var _SearchInput = require("./components/SearchInput");

var theme = {
  global: {
    colors: {
      border: '#e0e0e0',
      focus: '#2196F3',
      gray: (0, _polished.rgba)(0, 0, 0, 0.54)
    },
    drop: {
      background: '#ffffff'
    },
    elevation: {
      light: {
        small: '0 2px 2px 0 rgba(0,0,0,0.19)',
        medium: '0 3px 3px 0 rgba(0,0,0,0.18)',
        large: '0 4px 4px 0 rgba(0,0,0,0.17)',
        xlarge: '0 24px 24px 0 rgba(0, 0, 0, 0.12)'
      }
    },
    font: {
      family: 'Arial'
    },
    size: {
      xxsmall: '24px'
    }
  },
  checkBox: {
    border: {
      color: {
        light: 'brand'
      },
      radius: '2px'
    },
    color: {
      light: 'brand'
    },
    check: {
      extend: function extend(_ref) {
        var extendTheme = _ref.theme,
            checked = _ref.checked;
        return "\n        " + (checked && "background-color: " + (0, _utils.normalizeColor)('brand', extendTheme) + ";") + "\n      ";
      }
    },
    hover: {
      border: {
        color: undefined
      }
    },
    icon: {
      size: '18px',
      extend: 'stroke: white;'
    },
    icons: {
      checked: _grommetIcons.FormCheckmark
    },
    gap: 'small',
    size: '18px',
    extend: "\n      color: #9C9C9C;\n    "
  },
  drop: {
    maxHeight: '384px'
  },
  select: {
    icons: {
      down: _ArrowDown.ArrowDown
    },
    searchInput: _SearchInput.SearchInput,
    container: {
      text: {
        size: 'small'
      },
      extend: 'max-height: 250px;'
    }
  },
  textInput: {
    extend: function extend(props) {
      return "\n      color: " + (0, _utils.normalizeColor)('gray', props.theme) + ";\n      font-weight: 400;\n      font-size: 13px;\n      padding: 14px;\n    ";
    }
  }
};
exports.theme = theme;