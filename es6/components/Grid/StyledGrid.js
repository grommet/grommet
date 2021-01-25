import styled, { css } from 'styled-components';
import { borderStyle, edgeStyle, genericStyles } from '../../utils';
import { defaultProps } from '../../default-props';

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
var alignStyle = css(["align-items:", ";"], function (props) {
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
var alignContentStyle = css(["align-content:", ";"], function (props) {
  return ALIGN_CONTENT_MAP[props.alignContent];
});
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
  if (size === 'flex') return '1fr';
  var min;
  var max;

  if (Array.isArray(size)) {
    min = theme.global.size[size[0]] || size[0];
    max = theme.global.size[size[1]] || size[1];
  } else {
    min = theme.global.size[size] || size;
    max = '1fr';
  }

  if (min.search(/\d/) !== -1) {
    min = "min(" + min + ", 100%)";
  }

  return "minmax(" + min + ", " + max + ")";
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
    return css(["grid-template-columns:", ";"], props.columns.map(function (s) {
      if (Array.isArray(s)) {
        return "minmax(" + sizeFor(s[0], props) + ", " + sizeFor(s[1], props) + ")";
      }

      return sizeFor(s, props);
    }).join(' '));
  }

  if (typeof props.columns === 'object') {
    return css(["grid-template-columns:repeat( ", ",", " );"], getRepeatCount(props.columns.count), getRepeatSize(props.columns.size, props.theme));
  }

  return css(["grid-template-columns:repeat( auto-fill,", " );"], getRepeatSize(props.columns, props.theme));
};

var rowsStyle = function rowsStyle(props) {
  if (Array.isArray(props.rowsProp)) {
    return css(["grid-template-rows:", ";"], props.rowsProp.map(function (s) {
      if (Array.isArray(s)) {
        return "minmax(" + sizeFor(s[0], props, true) + ", " + sizeFor(s[1], props, true) + ")";
      }

      return sizeFor(s, props, true);
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
})(["display:grid;box-sizing:border-box;", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", ""], genericStyles, function (props) {
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
  return props.theme.grid && props.theme.grid.extend;
});
StyledGrid.defaultProps = {};
Object.setPrototypeOf(StyledGrid.defaultProps, defaultProps);
export { StyledGrid };