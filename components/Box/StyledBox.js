"use strict";

exports.__esModule = true;
exports.StyledBoxGap = exports.StyledBox = void 0;
var _styledComponents = _interopRequireWildcard(require("styled-components"));
var _utils = require("../../utils");
var _styles = require("../../utils/styles");
var _animation = require("../../utils/animation");
var _FLEX_MAP;
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
var BASIS_MAP = {
  auto: 'auto',
  full: '100%',
  '1/2': '50%',
  '1/4': '25%',
  '2/4': '50%',
  '3/4': '75%',
  '1/3': '33.33%',
  '2/3': '66.66%'
};
var basisStyle = (0, _styledComponents.css)(["flex-basis:", ";"], function (props) {
  return BASIS_MAP[props.basis] || props.theme.global.size[props.basis] || props.basis;
});

// min-width and min-height needed because of this
// https://stackoverflow.com/questions/36247140/why-doesnt-flex-item-shrink-past-content-size
// we assume we are in the context of a Box going the other direction
// TODO: revisit this
var directionStyle = function directionStyle(direction, responsive, theme) {
  var styles = [(0, _styledComponents.css)(["min-width:0;min-height:0;flex-direction:", ";"], direction === 'row-responsive' ? 'row' : direction)];
  if (direction === 'row-responsive' && theme.box.responsiveBreakpoint) {
    var breakpoint = (0, _utils.getBreakpointStyle)(theme, theme.box.responsiveBreakpoint);
    if (breakpoint) {
      styles.push((0, _utils.breakpointStyle)(breakpoint, "\n        flex-direction: column;\n        flex-basis: auto;\n        justify-content: flex-start;\n        align-items: stretch;\n      ", responsive));
    }
  }
  return styles;
};
var FLEX_MAP = (_FLEX_MAP = {}, _FLEX_MAP[true] = '1 1', _FLEX_MAP[false] = '0 0', _FLEX_MAP.grow = '1 0', _FLEX_MAP.shrink = '0 1', _FLEX_MAP);
var flexGrowShrinkProp = function flexGrowShrinkProp(flex) {
  if (typeof flex === 'boolean' || typeof flex === 'string') {
    return FLEX_MAP[flex];
  }
  return (flex.grow ? flex.grow : 0) + " " + (flex.shrink ? flex.shrink : 0);
};
var flexStyle = (0, _styledComponents.css)(["flex:", ";"], function (props) {
  return "" + flexGrowShrinkProp(props.flex) + (props.flex !== true && !props.basis ? ' auto' : '');
});
var JUSTIFY_MAP = {
  around: 'space-around',
  between: 'space-between',
  center: 'center',
  end: 'flex-end',
  evenly: 'space-evenly',
  start: 'flex-start'
};
var justifyStyle = (0, _styledComponents.css)(["justify-content:", ";"], function (props) {
  return JUSTIFY_MAP[props.justify];
});
var WRAP_MAP = {
  "true": 'wrap',
  reverse: 'wrap-reverse'
};
var wrapStyle = (0, _styledComponents.css)(["flex-wrap:", ";"], function (props) {
  return WRAP_MAP[props.wrapProp];
});
var _animationItemStyle = function animationItemStyle(item, theme) {
  if (typeof item === 'string') {
    return (0, _animation.animationObjectStyle)({
      type: item
    }, theme);
  }
  if (Array.isArray(item)) {
    return item.reduce(function (style, a, index) {
      return (0, _styledComponents.css)(["", "", " ", ""], style, index > 0 ? ',' : '', _animationItemStyle(a, theme));
    }, '');
  }
  if (typeof item === 'object') {
    return (0, _animation.animationObjectStyle)(item, theme);
  }
  return '';
};
var animationAncilaries = function animationAncilaries(animation) {
  if (animation.type === 'flipIn' || animation.type === 'flipOut') {
    return 'perspective: 1000px; transform-style: preserve-3d;';
  }
  return '';
};
var animationObjectInitialStyle = function animationObjectInitialStyle(animation) {
  var bounds = (0, _animation.animationBounds)(animation.type, animation.size);
  if (bounds) {
    return bounds[0] + " " + animationAncilaries(animation);
  }
  return '';
};
var animationInitialStyle = function animationInitialStyle(item) {
  if (typeof item === 'string') {
    return animationObjectInitialStyle({
      type: item
    });
  }
  if (Array.isArray(item)) {
    return item.map(function (a) {
      return typeof a === 'string' ? animationObjectInitialStyle({
        type: a
      }) : animationObjectInitialStyle(a);
    }).join('');
  }
  if (typeof item === 'object') {
    return animationObjectInitialStyle(item);
  }
  return '';
};
var animationStyle = (0, _styledComponents.css)(["", ";"], function (props) {
  return (0, _styledComponents.css)(["", " animation:", ";"], animationInitialStyle(props.animation), _animationItemStyle(props.animation, props.theme));
});
var interactiveStyle = (0, _styledComponents.css)(["cursor:pointer;&:hover{", " ", "}"], function (props) {
  var _props$kindProp;
  return ((_props$kindProp = props.kindProp) == null ? void 0 : _props$kindProp.hover) && (0, _utils.getHoverIndicatorStyle)(props.kindProp.hover, props.theme);
}, function (props) {
  return props.hoverIndicator && (0, _utils.getHoverIndicatorStyle)(props.hoverIndicator, props.theme);
});
var gapStyle = function gapStyle(directionProp, gap, responsive, wrap, theme) {
  var metric = theme.global.edgeSize[gap] || gap;
  var breakpoint = (0, _utils.getBreakpointStyle)(theme, theme.box.responsiveBreakpoint);
  var responsiveMetric = responsive && breakpoint && breakpoint.edgeSize[gap];
  var styles = [];
  if (typeof gap === 'object') {
    var responsiveColumnMetric = responsive && breakpoint && breakpoint.edgeSize[gap.column];
    var responsiveRowMetric = responsive && breakpoint && breakpoint.edgeSize[gap.row];
    if (gap.row !== undefined && gap.column !== undefined) {
      styles.push("gap: " + (theme.global.edgeSize[gap.row] || gap.row) + " " + (theme.global.edgeSize[gap.column] || gap.column) + ";");
      if (responsiveRowMetric || responsiveColumnMetric) {
        styles.push((0, _utils.breakpointStyle)(breakpoint, "gap: " + (responsiveRowMetric || gap.row) + " " + (responsiveColumnMetric || gap.column) + ";", responsive));
      }
    } else if (gap.row !== undefined) {
      styles.push("row-gap: " + (theme.global.edgeSize[gap.row] || gap.row) + ";");
      if (responsiveRowMetric) {
        styles.push((0, _utils.breakpointStyle)(breakpoint, "row-gap: " + responsiveRowMetric + ";", responsive));
      }
    } else if (gap.column !== undefined) {
      styles.push("column-gap: " + (theme.global.edgeSize[gap.column] || gap.column) + ";");
      if (responsiveColumnMetric) {
        styles.push((0, _utils.breakpointStyle)(breakpoint, "column-gap: " + responsiveColumnMetric + ";", responsive));
      }
    }
  } else if (directionProp === 'column' || directionProp === 'column-reverse') {
    styles.push("row-gap: " + metric + ";");
    if (responsiveMetric) {
      styles.push((0, _utils.breakpointStyle)(breakpoint, "row-gap: " + responsiveMetric + ";", responsive));
    }
  } else {
    styles.push("column-gap: " + metric + ";");
    if (wrap) styles.push("row-gap: " + metric + ";");
    if (responsiveMetric) {
      if (directionProp === 'row' || directionProp === 'row-reverse') {
        styles.push((0, _utils.breakpointStyle)(breakpoint, "column-gap: " + responsiveMetric + ";", responsive));
      } else if (directionProp === 'row-responsive') {
        styles.push((0, _utils.breakpointStyle)(breakpoint, "row-gap: " + responsiveMetric + ";", responsive));
      }
    }
  }
  return styles;
};

// NOTE: basis must be after flex! Otherwise, flex overrides basis
var StyledBox = exports.StyledBox = _styledComponents["default"].div.withConfig(_styles.styledComponentsConfig).withConfig({
  displayName: "StyledBox",
  componentId: "sc-13pk1d4-0"
})(["display:flex;box-sizing:border-box;", ";", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", ""], function (props) {
  return !props.basis && 'max-width: 100%;';
}, _utils.genericStyles, function (props) {
  return props.align && _utils.alignStyle;
}, function (props) {
  return props.alignContent && _utils.alignContentStyle;
}, function (props) {
  return props.background && (0, _utils.backgroundStyle)(props.background, props.theme);
}, function (props) {
  return props.border && (0, _utils.borderStyle)(props.border, props.responsive, props.theme);
}, function (props) {
  return props.directionProp && directionStyle(props.directionProp, props.responsive, props.theme);
}, function (props) {
  return props.heightProp && (0, _utils.heightStyle)(props.heightProp, props.theme);
}, function (props) {
  return props.widthProp && (0, _utils.widthStyle)(props.widthProp, props.theme);
}, function (props) {
  return props.flex !== undefined && flexStyle;
}, function (props) {
  return props.basis && basisStyle;
}, function (props) {
  return props.fillProp && (0, _utils.fillStyle)(props.fillProp);
}, function (props) {
  return props.justify && justifyStyle;
}, function (props) {
  return props.pad && (0, _utils.edgeStyle)('padding', props.pad, props.responsive, props.theme.box.responsiveBreakpoint, props.theme);
}, function (props) {
  return props.round && (0, _styles.roundStyle)(props.round, props.responsive, props.theme);
}, function (props) {
  return props.wrapProp && wrapStyle;
}, function (props) {
  return props.overflowProp && (0, _utils.overflowStyle)(props.overflowProp);
}, function (props) {
  return props.elevationProp && (0, _utils.elevationStyle)(props.elevationProp);
}, function (props) {
  return props.gap && gapStyle(props.directionProp, props.gap, props.responsive, props.wrapProp, props.theme);
}, function (props) {
  return props.animation && animationStyle;
}, function (props) {
  return props.onClick && interactiveStyle;
}, function (props) {
  return props.onClick && props.focus && props.focusIndicator !== false && (0, _utils.focusStyle)();
}, function (props) {
  return props.theme.box && props.theme.box.extend;
}, function (props) {
  return props.kindProp && props.kindProp.extend;
});
var gapGapStyle = function gapGapStyle(directionProp, gap, responsive, border, theme) {
  var metric = theme.global.edgeSize[gap] || gap;
  var breakpoint = (0, _utils.getBreakpointStyle)(theme, theme.box.responsiveBreakpoint);
  var responsiveMetric = responsive && breakpoint && breakpoint.edgeSize[gap];
  var styles = [];
  if (directionProp === 'column' || directionProp === 'column-reverse') {
    styles.push("height: " + metric + ";");
    if (responsiveMetric) {
      styles.push((0, _utils.breakpointStyle)(breakpoint, "height: " + responsiveMetric + ";", responsive));
    }
  } else {
    styles.push("width: " + metric + ";");
    if (responsiveMetric) {
      if (directionProp === 'row' || directionProp === 'row-reverse') {
        styles.push((0, _utils.breakpointStyle)(breakpoint, "width: " + responsiveMetric + ";", responsive));
      } else if (directionProp === 'row-responsive') {
        styles.push((0, _utils.breakpointStyle)(breakpoint, "\n          width: auto;\n          height: " + responsiveMetric + ";\n        ", responsive));
      }
    }
  }
  if (border === 'between' || border && border.side === 'between') {
    var borderSize = border.size || 'xsmall';
    var borderMetric = theme.global.borderSize[borderSize] || borderSize;
    var borderOffset = (0, _utils.parseMetricToNum)(metric) / 2 - (0, _utils.parseMetricToNum)(borderMetric) / 2 + "px";
    var responsiveBorderMetric = responsive && breakpoint && (breakpoint.borderSize[borderSize] || borderSize);
    var responsiveBorderOffset = responsiveBorderMetric && (0, _utils.parseMetricToNum)(responsiveMetric || metric) / 2 - (0, _utils.parseMetricToNum)(responsiveBorderMetric) / 2 + "px";
    if (directionProp === 'column' || directionProp === 'column-reverse') {
      var adjustedBorder = typeof border === 'string' ? 'top' : _extends({}, border, {
        side: 'top'
      });
      styles.push((0, _styledComponents.css)(["position:relative;&:after{content:'';position:absolute;width:100%;top:", ";", "}"], borderOffset, (0, _utils.borderStyle)(adjustedBorder, responsive, theme)));
      if (responsiveBorderOffset) {
        styles.push((0, _utils.breakpointStyle)(breakpoint, "\n            &:after {\n              content: '';\n              top: " + responsiveBorderOffset + ";\n            }", responsive));
      }
    } else {
      var _adjustedBorder = typeof border === 'string' ? 'left' : _extends({}, border, {
        side: 'left'
      });
      styles.push((0, _styledComponents.css)(["position:relative;&:after{content:'';position:absolute;height:100%;left:", ";", "}"], borderOffset, (0, _utils.borderStyle)(_adjustedBorder, directionProp !== 'row-responsive' && responsive, theme)));
      if (responsiveBorderOffset) {
        if (directionProp === 'row' || directionProp === 'row-reverse') {
          styles.push((0, _utils.breakpointStyle)(breakpoint, "\n              &:after {\n                content: '';\n                left: " + responsiveBorderOffset + ";\n              }", responsive));
        } else if (directionProp === 'row-responsive') {
          var adjustedBorder2 = typeof border === 'string' ? 'top' : _extends({}, border, {
            side: 'top'
          });
          styles.push((0, _utils.breakpointStyle)(breakpoint, "\n              &:after {\n                content: '';\n                height: auto;\n                left: unset;\n                width: 100%;\n                top: " + responsiveBorderOffset + ";\n                border-left: none;\n                " + (0, _utils.responsiveBorderStyle)(adjustedBorder2, theme) + "\n              }", responsive));
        }
      }
    }
  }
  return styles;
};
var StyledBoxGap = exports.StyledBoxGap = _styledComponents["default"].div.withConfig(_styles.styledComponentsConfig).withConfig({
  displayName: "StyledBox__StyledBoxGap",
  componentId: "sc-13pk1d4-1"
})(["flex:0 0 auto;align-self:stretch;", ";"], function (props) {
  return props.gap && gapGapStyle(props.directionProp, props.gap, props.responsive, props.border, props.theme);
});