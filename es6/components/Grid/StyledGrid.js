import styled, { css } from 'styled-components';
import { defaultProps } from '../../default-props';
import { alignContentStyle, alignStyle, borderStyle, edgeStyle, genericStyles, heightStyle, widthStyle } from '../../utils';

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

var JUSTIFY_MAP = {
  center: 'center',
  end: 'flex-end',
  start: 'flex-start',
  stretch: 'stretch'
};
var justifyStyle = css(["justify-items:", ";"], function (props) {
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
var justifyContentStyle = css(["justify-content:", ";"], function (props) {
  return JUSTIFY_CONTENT_MAP[props.justifyContent];
});

var gapSizes = function gapSizes(props) {
  var result = [];

  if (typeof props.gap === 'string') {
    var size = props.theme.global.edgeSize[props.gap] || props.gap;
    result[0] = size;
    result[1] = size;
  } else if (props.gap) {
    if (props.gap.row) result[0] = props.theme.global.edgeSize[props.gap.row] || props.gap.row;
    if (props.gap.column) result[1] = props.theme.global.edgeSize[props.gap.column] || props.gap.column;
  }

  return result;
};

var gapStyle = function gapStyle(props) {
  var sizes = gapSizes(props);

  if (sizes[0] !== undefined && sizes[1] !== undefined) {
    return "grid-gap: " + sizes[0] + " " + sizes[1] + ";";
  }

  if (sizes[0] !== undefined) {
    return "grid-row-gap: " + sizes[0] + ";";
  }

  if (sizes[1] !== undefined) {
    return "grid-column-gap: " + sizes[1] + ";";
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

var normalizeSize = function normalizeSize(size, props) {
  return SIZE_MAP[size] || props.theme.global.size[size] || size;
};

var getRepeatCount = function getRepeatCount(count) {
  return typeof count === 'number' ? count : "auto-" + (count || 'fit');
};

var getRepeatSize = function getRepeatSize(size, props) {
  if (size === 'flex') return '1fr';
  var gaps = gapSizes(props);
  var min;
  var max;
  var minFill;

  if (Array.isArray(size)) {
    var _size$ = size[0],
        minSize = _size$ === void 0 ? 'auto' : _size$,
        _size$2 = size[1],
        maxSize = _size$2 === void 0 ? 'auto' : _size$2;
    min = normalizeSize(minSize, props);
    if (min.search(/px/) !== -1) minFill = true;
    max = normalizeSize(maxSize, props);

    if (gaps[1] !== undefined) {
      // account for the column gap when using fractional sizes, e.g. 1/3
      if (minSize.indexOf('/') !== -1) min = "calc(" + min + " - (" + gaps[1] + " * (1 - " + minSize + ")))";
      if (maxSize.indexOf('/') !== -1) max = "calc(" + max + " - (" + gaps[1] + " * (1 - " + maxSize + ")))";
    }
  } else {
    min = normalizeSize(size, props);
    if (min.search(/px/) !== -1) minFill = true;
    max = '1fr';

    if (gaps[1] !== undefined) {
      // account for column gap with fractional sizes, e.g. 1/3
      if (size.indexOf('/') !== -1) min = "calc(" + min + " - (" + gaps[1] + " * (1 - " + size + ")))";
    }
  }

  if (minFill) {
    // ensure we never go beyond the container width,
    // for mobile/narrow situations
    min = "min(" + min + ", 100%)";
  }

  return "minmax(" + min + ", " + max + ")";
};

var columnsStyle = function columnsStyle(props) {
  if (Array.isArray(props.columns)) {
    return css(["grid-template-columns:", ";"], props.columns.map(function (s) {
      if (Array.isArray(s)) {
        return "minmax(" + normalizeSize(s[0], props) + ", " + normalizeSize(s[1], props) + ")";
      }

      return normalizeSize(s, props);
    }).join(' '));
  }

  if (typeof props.columns === 'object') {
    return css(["grid-template-columns:repeat( ", ",", " );"], getRepeatCount(props.columns.count), getRepeatSize(props.columns.size, props));
  }

  return css(["grid-template-columns:repeat( auto-fill,", " );"], getRepeatSize(props.columns, props));
};

var rowsStyle = function rowsStyle(props) {
  if (Array.isArray(props.rowsProp)) {
    return css(["grid-template-rows:", ";"], props.rowsProp.map(function (s) {
      if (Array.isArray(s)) {
        return "minmax(" + normalizeSize(s[0], props) + ", " + normalizeSize(s[1], props) + ")";
      }

      return normalizeSize(s, props);
    }).join(' '));
  }

  return css(["grid-auto-rows:", ";"], props.theme.global.size[props.rowsProp]);
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

var StyledGrid = styled.div.attrs(function (props) {
  return {
    'aria-label': props.a11yTitleProp
  };
}).withConfig({
  displayName: "StyledGrid",
  componentId: "sc-1wofa1l-0"
})(["display:grid;box-sizing:border-box;", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", ""], genericStyles, function (props) {
  return props.border && (Array.isArray(props.border) ? props.border.map(function (border) {
    return borderStyle(border, props.responsive, props.theme);
  }) : borderStyle(props.border, props.responsive, props.theme));
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
  return props.pad && edgeStyle('padding', props.pad, props.responsive, props.theme.global.edgeSize.responsiveBreakpoint, props.theme);
}, function (props) {
  return props.rowsProp && rowsStyle(props);
}, function (props) {
  return props.heightProp && heightStyle(props.heightProp, props.theme);
}, function (props) {
  return props.widthProp && widthStyle(props.widthProp, props.theme);
}, function (props) {
  return props.theme.grid && props.theme.grid.extend;
});
StyledGrid.defaultProps = {};
Object.setPrototypeOf(StyledGrid.defaultProps, defaultProps);
export { StyledGrid };