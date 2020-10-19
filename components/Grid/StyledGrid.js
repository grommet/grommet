"use strict";

exports.__esModule = true;
exports.StyledGrid = void 0;

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _utils = require("../../utils");

var _defaultProps = require("../../default-props");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var fillStyle = function fillStyle(fill) {
  if (!fill) {
    return fill;
  }

  if (fill === 'horizontal') {
    return 'width: 100%;';
  }

  if (fill === 'vertical') {
    return 'height: 100%;';
  }

  return "\n      width: 100%;\n      height: 100%;\n    ";
};

var ALIGN_MAP = {
  center: 'center',
  end: 'flex-end',
  start: 'flex-start',
  stretch: 'stretch'
};
var alignStyle = (0, _styledComponents.css)(["align-items:", ";"], function (props) {
  return ALIGN_MAP[props.align];
});
var ALIGN_CONTENT_MAP = {
  around: 'space-around',
  between: 'space-between',
  center: 'center',
  end: 'flex-end',
  start: 'flex-start',
  stretch: 'stretch'
};
var alignContentStyle = (0, _styledComponents.css)(["align-content:", ";"], function (props) {
  return ALIGN_CONTENT_MAP[props.alignContent];
});
var JUSTIFY_MAP = {
  center: 'center',
  end: 'flex-end',
  start: 'flex-start',
  stretch: 'stretch'
};
var justifyStyle = (0, _styledComponents.css)(["justify-items:", ";"], function (props) {
  return JUSTIFY_MAP[props.justify];
});
var JUSTIFY_CONTENT_MAP = {
  around: 'space-around',
  between: 'space-between',
  center: 'center',
  end: 'flex-end',
  start: 'flex-start',
  stretch: 'stretch'
};
var justifyContentStyle = (0, _styledComponents.css)(["justify-content:", ";"], function (props) {
  return JUSTIFY_CONTENT_MAP[props.justifyContent];
});

var gapStyle = function gapStyle(props) {
  if (typeof props.gap === 'string') {
    var gapSize = props.theme.global.edgeSize[props.gap] || props.gap;
    return "grid-gap: " + gapSize + " " + gapSize + ";";
  }

  if (props.gap.row && props.gap.column) {
    return "\n      grid-row-gap: " + (props.theme.global.edgeSize[props.gap.row] || props.gap.row) + ";\n      grid-column-gap: " + (props.theme.global.edgeSize[props.gap.column] || props.gap.column) + ";\n    ";
  }

  if (props.gap.row) {
    return "\n      grid-row-gap: " + (props.theme.global.edgeSize[props.gap.row] || props.gap.row) + ";\n    ";
  }

  if (props.gap.column) {
    return "\n      grid-column-gap: " + (props.theme.global.edgeSize[props.gap.column] || props.gap.column) + ";\n    ";
  }

  return '';
};

var SIZE_MAP = {
  flex: '1fr',
  full: '100%',
  '1/2': '50%',
  '1/4': '25%',
  '2/4': '50%',
  '3/4': '75%',
  '1/3': '33.33%',
  '2/3': '66.66%'
};

var getRepeatCount = function getRepeatCount(count) {
  return typeof count === 'number' ? count : "auto-" + count;
};

var getRepeatSize = function getRepeatSize(size, theme) {
  if (Array.isArray(size)) {
    return "minmax(" + (theme.global.size[size[0]] || size[0]) + ", " + (theme.global.size[size[1]] || size[1]) + ")";
  }

  if (size === 'flex') return '1fr';
  return "minmax(" + (theme.global.size[size] || size) + ", 1fr)";
};

var sizeFor = function sizeFor(size, props, isRow) {
  var mapped = SIZE_MAP[size];

  if (isRow && mapped && (!props.fillContainer || props.fillContainer === 'horizontal')) {
    console.warn('Grid needs `fill` when using fractional row sizes');
  }

  return mapped || props.theme.global.size[size] || size;
};

var columnsStyle = function columnsStyle(props) {
  if (Array.isArray(props.columns)) {
    return (0, _styledComponents.css)(["grid-template-columns:", ";"], props.columns.map(function (s) {
      if (Array.isArray(s)) {
        return "minmax(" + sizeFor(s[0], props) + ", " + sizeFor(s[1], props) + ")";
      }

      return sizeFor(s, props);
    }).join(' '));
  }

  if (typeof props.columns === 'object') {
    return (0, _styledComponents.css)(["grid-template-columns:repeat( ", ",", " );"], getRepeatCount(props.columns.count), getRepeatSize(props.columns.size, props.theme));
  }

  return (0, _styledComponents.css)(["grid-template-columns:repeat( auto-fill,", " );"], getRepeatSize(props.columns, props.theme));
};

var rowsStyle = function rowsStyle(props) {
  if (Array.isArray(props.rowsProp)) {
    return (0, _styledComponents.css)(["grid-template-rows:", ";"], props.rowsProp.map(function (s) {
      if (Array.isArray(s)) {
        return "minmax(" + sizeFor(s[0], props, true) + ", " + sizeFor(s[1], props, true) + ")";
      }

      return sizeFor(s, props, true);
    }).join(' '));
  }

  return (0, _styledComponents.css)(["grid-auto-rows:", ";"], props.theme.global.size[props.rowsProp]);
};

var areasStyle = function areasStyle(props) {
  // translate areas objects into grid-template-areas syntax
  if (!Array.isArray(props.rowsProp) || !Array.isArray(props.columns)) {
    console.warn('Grid `areas` requires `rows` and `columns` to be arrays.');
  }

  if (Array.isArray(props.areas) && props.areas.every(function (area) {
    return Array.isArray(area);
  })) {
    return "grid-template-areas: " + props.areas.map(function (area) {
      return "\"" + area.join(' ') + "\"";
    }).join(' ') + ";";
  }

  var cells = props.rowsProp.map(function () {
    return props.columns.map(function () {
      return '.';
    });
  });
  props.areas.forEach(function (area) {
    for (var row = area.start[1]; row <= area.end[1]; row += 1) {
      for (var column = area.start[0]; column <= area.end[0]; column += 1) {
        cells[row][column] = area.name;
      }
    }
  });
  return "grid-template-areas: " + cells.map(function (r) {
    return "\"" + r.join(' ') + "\"";
  }).join(' ') + ";";
};

var StyledGrid = _styledComponents["default"].div.attrs(function (props) {
  return {
    'aria-label': props.a11yTitleProp
  };
}).withConfig({
  displayName: "StyledGrid",
  componentId: "sc-1wofa1l-0"
})(["display:grid;box-sizing:border-box;", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", ""], _utils.genericStyles, function (props) {
  return props.border && (Array.isArray(props.border) ? props.border.map(function (border) {
    return (0, _utils.borderStyle)(border, props.responsive, props.theme);
  }) : (0, _utils.borderStyle)(props.border, props.responsive, props.theme));
}, function (props) {
  return fillStyle(props.fillContainer);
}, function (props) {
  return props.align && alignStyle;
}, function (props) {
  return props.alignContent && alignContentStyle;
}, function (props) {
  return props.areas && areasStyle(props);
}, function (props) {
  return props.columns && columnsStyle(props);
}, function (props) {
  return props.gap && gapStyle(props);
}, function (props) {
  return props.justify && justifyStyle;
}, function (props) {
  return props.justifyContent && justifyContentStyle;
}, function (props) {
  return props.pad && (0, _utils.edgeStyle)('padding', props.pad, props.responsive, props.theme.global.edgeSize.responsiveBreakpoint, props.theme);
}, function (props) {
  return props.rowsProp && rowsStyle(props);
}, function (props) {
  return props.theme.grid && props.theme.grid.extend;
});

exports.StyledGrid = StyledGrid;
StyledGrid.defaultProps = {};
Object.setPrototypeOf(StyledGrid.defaultProps, _defaultProps.defaultProps);