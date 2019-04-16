"use strict";

exports.__esModule = true;
exports.StyledBoxGap = exports.StyledBox = void 0;

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _defaultProps = require("../../default-props");

var _utils = require("../../utils");

var _FLEX_MAP;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

var ALIGN_MAP = {
  baseline: 'baseline',
  center: 'center',
  end: 'flex-end',
  start: 'flex-start',
  stretch: 'stretch'
};
var alignStyle = (0, _styledComponents.css)(["align-items:", ";"], function (props) {
  return ALIGN_MAP[props.align];
});
var ALIGN_CONTENT_MAP = {
  around: 'around',
  between: 'between',
  center: 'center',
  end: 'flex-end',
  start: 'flex-start',
  stretch: 'stretch'
};
var alignContentStyle = (0, _styledComponents.css)(["align-content:", ";"], function (props) {
  return ALIGN_CONTENT_MAP[props.alignContent];
});
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
}); // min-width and min-height needed because of this
// https://stackoverflow.com/questions/36247140/why-doesnt-flex-item-shrink-past-content-size
// we assume we are in the context of a Box going the other direction
// TODO: revisit this

var directionStyle = function directionStyle(direction, theme) {
  var styles = [(0, _styledComponents.css)(["min-width:0;min-height:0;flex-direction:", ";"], direction === 'row-responsive' ? 'row' : direction)];

  if (direction === 'row-responsive' && theme.box.responsiveBreakpoint) {
    var breakpoint = theme.global.breakpoints[theme.box.responsiveBreakpoint];

    if (breakpoint) {
      styles.push((0, _utils.breakpointStyle)(breakpoint, "\n        flex-direction: column;\n        flex-basis: auto;\n        justify-content: flex-start;\n        align-items: stretch;\n      "));
    }
  }

  return styles;
};

var elevationStyle = (0, _styledComponents.css)(["box-shadow:", ";"], function (props) {
  return props.theme.global.elevation[props.theme.dark && !props.theme.darkChanged || !props.theme.dark && props.theme.darkChanged ? 'dark' : 'light'][props.elevationProp];
});
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

var fillStyle = function fillStyle(fillProp) {
  if (fillProp === 'horizontal') {
    return 'width: 100%;';
  }

  if (fillProp === 'vertical') {
    return 'height: 100%;';
  }

  if (fillProp) {
    return "\n      width: 100%;\n      height: 100%;\n    ";
  }

  return undefined;
};

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
  true: 'wrap',
  reverse: 'wrap-reverse'
};
var wrapStyle = (0, _styledComponents.css)(["flex-wrap:", ";"], function (props) {
  return WRAP_MAP[props.wrapProp];
});

var borderStyle = function borderStyle(data, responsive, theme) {
  var styles = [];
  var color = (0, _utils.normalizeColor)(data.color || 'border', theme);
  var borderSize = data.size || 'xsmall';
  var style = data.style || 'solid';
  var side = typeof data === 'string' ? data : data.side || 'all';
  var value = style + " " + (theme.global.borderSize[borderSize] || borderSize) + " " + color;
  var breakpoint = theme.box.responsiveBreakpoint && theme.global.breakpoints[theme.box.responsiveBreakpoint];
  var responsiveValue = breakpoint && (breakpoint.borderSize[borderSize] || borderSize) && style + " " + (breakpoint.borderSize[borderSize] || borderSize) + " " + color;

  if (side === 'top' || side === 'bottom' || side === 'left' || side === 'right') {
    styles.push((0, _styledComponents.css)(["border-", ":", ";"], side, value));

    if (responsiveValue) {
      styles.push((0, _utils.breakpointStyle)(breakpoint, "\n        border-" + side + ": " + responsiveValue + ";\n      "));
    }
  } else if (side === 'vertical') {
    styles.push((0, _styledComponents.css)(["border-left:", ";border-right:", ";"], value, value));

    if (responsiveValue) {
      styles.push((0, _utils.breakpointStyle)(breakpoint, "\n        border-left: " + responsiveValue + ";\n        border-right: " + responsiveValue + ";\n      "));
    }
  } else if (side === 'horizontal') {
    styles.push((0, _styledComponents.css)(["border-top:", ";border-bottom:", ";"], value, value));

    if (responsiveValue) {
      styles.push((0, _utils.breakpointStyle)(breakpoint, "\n        border-top: " + responsiveValue + ";\n        border-bottom: " + responsiveValue + ";\n      "));
    }
  } else {
    styles.push((0, _styledComponents.css)(["border:", ";"], value));

    if (responsiveValue) {
      styles.push((0, _utils.breakpointStyle)(breakpoint, "border: " + responsiveValue + ";"));
    }
  }

  return styles;
};

var ROUND_MAP = {
  full: '100%'
};

var roundStyle = function roundStyle(data, responsive, theme) {
  var breakpoint = theme.box.responsiveBreakpoint && theme.global.breakpoints[theme.box.responsiveBreakpoint];
  var styles = [];

  if (typeof data === 'object') {
    var size = ROUND_MAP[data.size] || theme.global.edgeSize[data.size || 'medium'] || data.size;
    var responsiveSize = breakpoint && breakpoint.edgeSize[data.size] && (breakpoint.edgeSize[data.size] || data.size);

    if (data.corner === 'top') {
      styles.push((0, _styledComponents.css)(["border-top-left-radius:", ";border-top-right-radius:", ";"], size, size));

      if (responsiveSize) {
        styles.push((0, _utils.breakpointStyle)(breakpoint, "\n          border-top-left-radius: " + responsiveSize + ";\n          border-top-right-radius: " + responsiveSize + ";\n        "));
      }
    } else if (data.corner === 'bottom') {
      styles.push((0, _styledComponents.css)(["border-bottom-left-radius:", ";border-bottom-right-radius:", ";"], size, size));

      if (responsiveSize) {
        styles.push((0, _utils.breakpointStyle)(breakpoint, "\n          border-bottom-left-radius: " + responsiveSize + ";\n          border-bottom-right-radius: " + responsiveSize + ";\n        "));
      }
    } else if (data.corner === 'left') {
      styles.push((0, _styledComponents.css)(["border-top-left-radius:", ";border-bottom-left-radius:", ";"], size, size));

      if (responsiveSize) {
        styles.push((0, _utils.breakpointStyle)(breakpoint, "\n          border-top-left-radius: " + responsiveSize + ";\n          border-bottom-left-radius: " + responsiveSize + ";\n        "));
      }
    } else if (data.corner === 'right') {
      styles.push((0, _styledComponents.css)(["border-top-right-radius:", ";border-bottom-right-radius:", ";"], size, size));

      if (responsiveSize) {
        styles.push((0, _utils.breakpointStyle)(breakpoint, "\n          border-top-right-radius: " + responsiveSize + ";\n          border-bottom-right-radius: " + responsiveSize + ";\n        "));
      }
    } else if (data.corner) {
      styles.push((0, _styledComponents.css)(["border-", "-radius:", ";"], data.corner, size));

      if (responsiveSize) {
        styles.push((0, _utils.breakpointStyle)(breakpoint, "\n          border-" + data.corner + "-radius: " + responsiveSize + ";\n        "));
      }
    } else {
      styles.push((0, _styledComponents.css)(["border-radius:", ";"], size));

      if (responsiveSize) {
        styles.push((0, _utils.breakpointStyle)(breakpoint, "\n          border-radius: " + responsiveSize + ";\n        "));
      }
    }
  } else {
    var _size = data === true ? 'medium' : data;

    styles.push((0, _styledComponents.css)(["border-radius:", ";"], ROUND_MAP[_size] || theme.global.edgeSize[_size] || _size));

    var _responsiveSize = breakpoint && breakpoint.edgeSize[_size];

    if (_responsiveSize) {
      styles.push((0, _utils.breakpointStyle)(breakpoint, "\n        border-radius: " + _responsiveSize + ";\n      "));
    }
  }

  return styles;
};

var SLIDE_SIZES = {
  xsmall: 1,
  small: 5,
  medium: 10,
  large: 50,
  xlarge: 200
};
var PULSE_SIZES = {
  xsmall: 1.001,
  small: 1.01,
  medium: 1.1,
  large: 1.5,
  xlarge: 2
};
var JIGGLE_SIZES = {
  xsmall: 0.1,
  small: 1,
  medium: 5,
  large: 400,
  xlarge: 1000
};
var ZOOM_SIZES = {
  xsmall: 0.001,
  small: 0.01,
  medium: 0.05,
  large: 0.1,
  xlarge: 0.5
};

var animationBounds = function animationBounds(type, size) {
  if (size === void 0) {
    size = 'medium';
  }

  if (type === 'fadeIn') {
    return ['opacity: 0;', 'opacity: 1;'];
  }

  if (type === 'fadeOut') {
    return ['opacity: 1;', 'opacity: 0;'];
  }

  if (type === 'jiggle') {
    var deg = JIGGLE_SIZES[size];
    return ["transform: rotate(-" + deg + "deg);", "transform: rotate(" + deg + "deg);"];
  }

  if (type === 'pulse') {
    return ['transform: scale(1);', "transform: scale(" + PULSE_SIZES[size] + ")"];
  }

  if (type === 'flipIn') {
    return ['transform: rotateY(90deg);', 'transform: rotateY(0);'];
  }

  if (type === 'flipOut') {
    return ['transform: rotateY(0);', 'transform: rotateY(90deg);'];
  }

  if (type === 'slideDown') {
    return ["transform: translateY(-" + SLIDE_SIZES[size] + "%);", 'transform: none;'];
  }

  if (type === 'slideLeft') {
    return ["transform: translateX(" + SLIDE_SIZES[size] + "%);", 'transform: none;'];
  }

  if (type === 'slideRight') {
    return ["transform: translateX(-" + SLIDE_SIZES[size] + "%);", 'transform: none;'];
  }

  if (type === 'slideUp') {
    return ["transform: translateY(" + SLIDE_SIZES[size] + "%);", 'transform: none;'];
  }

  if (type === 'zoomIn') {
    return ["transform: scale(" + (1 - ZOOM_SIZES[size]) + ");", 'transform: none;'];
  }

  if (type === 'zoomOut') {
    return ["transform: scale(" + (1 + ZOOM_SIZES[size]) + ");", 'transform: none;'];
  }

  return [];
};

var normalizeTiming = function normalizeTiming(time, defaultTiming) {
  return time ? time / 1000.0 + "s" : defaultTiming;
};

var animationEnding = function animationEnding(type) {
  if (type === 'jiggle') {
    return 'alternate infinite';
  }

  if (type === 'pulse') {
    return 'alternate infinite';
  }

  return 'forwards';
};

var animationObjectStyle = function animationObjectStyle(animation, theme) {
  var bounds = animationBounds(animation.type, animation.size);

  if (bounds) {
    var animationTransition = (0, _styledComponents.css)(["from{", ";}to{", ";}"], bounds[0], bounds[1]);
    return (0, _styledComponents.css)(["", " ", " ", " ", ""], (0, _styledComponents.keyframes)(["", ""], animationTransition), normalizeTiming(animation.duration, (theme.global.animation[animation.type] ? theme.global.animation[animation.type].duration : undefined) || theme.global.animation.duration), normalizeTiming(animation.delay, '0s'), animationEnding(animation.type));
  }

  return '';
};

var animationItemStyle = function animationItemStyle(item, theme) {
  if (typeof item === 'string') {
    return animationObjectStyle({
      type: item
    }, theme);
  }

  if (Array.isArray(item)) {
    return item.reduce(function (style, a, index) {
      return (0, _styledComponents.css)(["", "", " ", ""], style, index > 0 ? ',' : '', animationItemStyle(a, theme));
    }, '');
  }

  if (typeof item === 'object') {
    return animationObjectStyle(item, theme);
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
  var bounds = animationBounds(animation.type, animation.size);

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
  return (0, _styledComponents.css)(["", " animation:", ";"], animationInitialStyle(props.animation), animationItemStyle(props.animation, props.theme));
}); // NOTE: basis must be after flex! Otherwise, flex overrides basis

var StyledBox = _styledComponents.default.div.withConfig({
  displayName: "StyledBox",
  componentId: "sc-13pk1d4-0"
})(["display:flex;box-sizing:border-box;outline:none;", ";", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", ""], function (props) {
  return !props.basis && 'max-width: 100%;';
}, _utils.genericStyles, function (props) {
  return props.heightProp && "height: " + (props.theme.global.size[props.heightProp] || props.heightProp) + ";";
}, function (props) {
  return props.widthProp && "width: " + (props.theme.global.size[props.widthProp] || props.widthProp) + ";";
}, function (props) {
  return props.align && alignStyle;
}, function (props) {
  return props.alignContent && alignContentStyle;
}, function (props) {
  return props.background && (0, _utils.backgroundStyle)(props.background, props.theme);
}, function (props) {
  return props.border && borderStyle(props.border, props.responsive, props.theme);
}, function (props) {
  return props.directionProp && directionStyle(props.directionProp, props.theme);
}, function (props) {
  return props.flex !== undefined && flexStyle;
}, function (props) {
  return props.basis && basisStyle;
}, function (props) {
  return props.fillProp && fillStyle(props.fillProp);
}, function (props) {
  return props.justify && justifyStyle;
}, function (props) {
  return props.pad && (0, _utils.edgeStyle)('padding', props.pad, props.responsive, props.theme.box.responsiveBreakpoint, props.theme);
}, function (props) {
  return props.round && roundStyle(props.round, props.responsive, props.theme);
}, function (props) {
  return props.wrapProp && wrapStyle;
}, function (props) {
  return props.overflowProp && (0, _utils.overflowStyle)(props.overflowProp);
}, function (props) {
  return props.elevationProp && elevationStyle;
}, function (props) {
  return props.animation && animationStyle;
}, function (props) {
  return props.theme.box && props.theme.box.extend;
});

exports.StyledBox = StyledBox;

var gapStyle = function gapStyle(directionProp, gap, responsive, theme) {
  var breakpoint = theme.box.responsiveBreakpoint && theme.global.breakpoints[theme.box.responsiveBreakpoint];
  var responsiveSize = breakpoint && breakpoint.edgeSize[gap] && breakpoint.edgeSize[gap];
  var styles = [];

  if (directionProp === 'column') {
    styles.push((0, _styledComponents.css)(["height:", ";"], theme.global.edgeSize[gap] || gap));

    if (responsiveSize) {
      styles.push((0, _utils.breakpointStyle)(breakpoint, "height: " + responsiveSize + ";"));
    }
  } else {
    styles.push("width: " + (theme.global.edgeSize[gap] || gap) + ";");

    if (responsive && directionProp === 'row-responsive') {
      styles.push((0, _utils.breakpointStyle)(breakpoint, "\n        width: auto;\n        height: " + responsiveSize + ";\n      "));
    }
  }

  return styles;
};

StyledBox.defaultProps = {};
Object.setPrototypeOf(StyledBox.defaultProps, _defaultProps.defaultProps);

var StyledBoxGap = _styledComponents.default.div.withConfig({
  displayName: "StyledBox__StyledBoxGap",
  componentId: "sc-13pk1d4-1"
})(["flex:0 0 auto;", ";"], function (props) {
  return props.gap && gapStyle(props.directionProp, props.gap, props.responsive, props.theme);
});

exports.StyledBoxGap = StyledBoxGap;
StyledBoxGap.defaultProps = {};
Object.setPrototypeOf(StyledBoxGap.defaultProps, _defaultProps.defaultProps);