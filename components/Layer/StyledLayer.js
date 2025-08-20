"use strict";

exports.__esModule = true;
exports.animationDuration = exports.StyledOverlay = exports.StyledLayer = exports.StyledContainer = void 0;
var _styledComponents = _interopRequireWildcard(require("styled-components"));
var _isPropValid = _interopRequireDefault(require("@emotion/is-prop-valid"));
var _utils = require("../../utils");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
var hiddenPositionStyle = (0, _styledComponents.css)(["left:-100%;right:100%;z-index:-1;position:fixed;"]);
var desktopLayerStyle = "\n  position: fixed;\n  top: 0px;\n  left: 0px;\n  right: 0px;\n  bottom: 0px;\n";
var responsiveLayerStyle = "\n  position: fixed;\n  width: 100%;\n  height: 100%;\n  min-height: 100vh;\n";
var StyledLayer = exports.StyledLayer = _styledComponents["default"].div.withConfig(_utils.styledComponentsConfig).withConfig({
  displayName: "StyledLayer",
  componentId: "sc-rmtehz-0"
})(["", " background:transparent;position:relative;z-index:", ";pointer-events:none;outline:none;", " ", ";"], _utils.baseStyle, function (props) {
  return props.theme.layer.zIndex;
}, function (props) {
  if (props.position === 'hidden') {
    return hiddenPositionStyle;
  }
  var styles = [];
  styles.push(desktopLayerStyle);
  if (props.responsive && props.theme.layer.responsiveBreakpoint && !props.layerTarget) {
    var breakpoint = props.theme.global.breakpoints[props.theme.layer.responsiveBreakpoint];
    styles.push((0, _utils.breakpointStyle)(breakpoint, responsiveLayerStyle));
  }
  return styles;
}, function (props) {
  return props.theme.layer && props.theme.layer.extend;
});
var StyledOverlay = exports.StyledOverlay = _styledComponents["default"].div.withConfig(_utils.styledComponentsConfig).withConfig({
  displayName: "StyledLayer__StyledOverlay",
  componentId: "sc-rmtehz-1"
})(["position:absolute;", " top:0px;left:0px;right:0px;bottom:0px;", " ", " pointer-events:all;will-change:transform;"], function (props) {
  if (props.responsive && props.theme.layer.responsiveBreakpoint) {
    var breakpoint = props.theme.global.breakpoints[props.theme.layer.responsiveBreakpoint];
    return (0, _utils.breakpointStyle)(breakpoint, 'position: relative;');
  }
  return '';
}, function (props) {
  return props.theme.layer.overlay.backdropFilter && "backdrop-filter: " + props.theme.layer.overlay.backdropFilter + ";";
}, function (props) {
  return !props.plain && props.theme.layer.overlay.background && (0, _utils.backgroundStyle)(props.theme.layer.overlay.background, props.theme);
});
var getMargin = function getMargin(margin, theme, position) {
  var axis = position.indexOf('top') !== -1 || position.indexOf('bottom') !== -1 ? 'vertical' : 'horizontal';
  var marginValue = margin[position] || margin[axis] || margin;
  var marginApplied = theme.global.edgeSize[marginValue] || marginValue;
  var marginInTheme = !!theme.global.edgeSize[marginValue];
  return !marginInTheme && typeof marginValue !== 'string' ? 0 : (0, _utils.parseMetricToNum)(marginApplied);
};
var getBounds = function getBounds(bounds, margin, theme, position) {
  if (position === void 0) {
    position = undefined;
  }
  if (position) {
    return bounds[position] + getMargin(margin, theme, position);
  }
  return {
    bottom: bounds.bottom + getMargin(margin, theme, 'bottom'),
    // 'bottom-left': getMargin(margin, theme, 'bottom-left'),
    // 'bottom-right': getMargin(margin, theme, 'bottom-right'),
    end: bounds.right + getMargin(margin, theme, 'end'),
    left: bounds.left + getMargin(margin, theme, 'left'),
    right: bounds.right + getMargin(margin, theme, 'right'),
    start: bounds.left + getMargin(margin, theme, 'start'),
    top: bounds.top + getMargin(margin, theme, 'top')
    // 'top-right': getMargin(margin, theme, 'top-right'),
    // 'top-left': getMargin(margin, theme, 'top-left'),
  };
};
var KEYFRAMES = {
  center: {
    vertical: (0, _styledComponents.keyframes)(["0%{transform:translateX(-50%) scale(0.8);}100%{transform:translateX(-50%) scale(1);}"]),
    horizontal: (0, _styledComponents.keyframes)(["0%{transform:translateY(-50%) scale(0.8);}100%{transform:translateY(-50) scale(1);}"]),
    "true": (0, _styledComponents.keyframes)(["0%{transform:scale(0.8);}100%{transform:scale(1);}"]),
    "false": (0, _styledComponents.keyframes)(["0%{transform:translate(-50%,-50%) scale(0.8);}100%{transform:translate(-50%,-50%) scale(1);}"])
  },
  top: {
    vertical: (0, _styledComponents.keyframes)(["0%{transform:translate(-50%,-100%);}100%{transform:translate(-50%,0);}"]),
    horizontal: (0, _styledComponents.keyframes)(["0%{transform:translateY(-100%);}100%{transform:translateY(0);}"]),
    "true": (0, _styledComponents.keyframes)(["0%{transform:translateY(-100%);}100%{transform:translateY(0);}"]),
    "false": (0, _styledComponents.keyframes)(["0%{transform:translate(-50%,-100%);}100%{transform:translate(-50%,0);}"])
  },
  bottom: {
    vertical: (0, _styledComponents.keyframes)(["0%{transform:translate(-50%,100%);}100%{transform:translate(-50%,0);}"]),
    horizontal: (0, _styledComponents.keyframes)(["0%{transform:translateY(100%);}100%{transform:translateY(0);}"]),
    "true": (0, _styledComponents.keyframes)(["0%{transform:translateY(100%);}100%{transform:translateY(0);}"]),
    "false": (0, _styledComponents.keyframes)(["0%{transform:translate(-50%,100%);}100%{transform:translate(-50%,0);}"])
  },
  left: {
    vertical: (0, _styledComponents.keyframes)(["0%{transform:translateX(-100%);}100%{transform:translateX(0);}"]),
    horizontal: (0, _styledComponents.keyframes)(["0%{transform:translate(-100%,-50%);}100%{transform:translate(0,-50%);}"]),
    "true": (0, _styledComponents.keyframes)(["0%{transform:translateX(-100%);}100%{transform:translateX(0);}"]),
    "false": (0, _styledComponents.keyframes)(["0%{transform:translate(-100%,-50%);}100%{transform:translate(0,-50%);}"])
  },
  right: {
    vertical: (0, _styledComponents.keyframes)(["0%{transform:translateX(100%);}100%{transform:translateX(0);}"]),
    horizontal: (0, _styledComponents.keyframes)(["0%{transform:translate(100%,-50%);}100%{transform:translate(0,-50%);}"]),
    "true": (0, _styledComponents.keyframes)(["0%{transform:translateX(100%);}100%{transform:translateX(0);}"]),
    "false": (0, _styledComponents.keyframes)(["0%{transform:translate(100%,-50%);}100%{transform:translate(0,-50%);}"])
  },
  start: {
    vertical: (0, _styledComponents.keyframes)(["0%{transform:translateX(-100%);}100%{transform:translateX(0);}"]),
    horizontal: (0, _styledComponents.keyframes)(["0%{transform:translate(-100%,-50%);}100%{transform:translate(0,-50%);}"]),
    "true": (0, _styledComponents.keyframes)(["0%{transform:translateX(-100%);}100%{transform:translateX(0);}"]),
    "false": (0, _styledComponents.keyframes)(["0%{transform:translate(-100%,-50%);}100%{transform:translate(0,-50%);}"])
  },
  end: {
    vertical: (0, _styledComponents.keyframes)(["0%{transform:translateX(100%);}100%{transform:translateX(0);}"]),
    horizontal: (0, _styledComponents.keyframes)(["0%{transform:translate(100%,-50%);}100%{transform:translate(0,-50%);}"]),
    "true": (0, _styledComponents.keyframes)(["0%{transform:translateX(100%);}100%{transform:translateX(0);}"]),
    "false": (0, _styledComponents.keyframes)(["0%{transform:translate(100%,-50%);}100%{transform:translate(0,-50%);}"])
  }
};
var animationDuration = exports.animationDuration = 200;
var getAnimationStyle = function getAnimationStyle(props, position, full) {
  var animation = props.animation !== undefined ? props.animation : props.animate;
  if (animation === undefined) animation = 'slide';
  var keys;
  if (animation === 'slide' || animation === true) {
    keys = KEYFRAMES[position][full];
  } else if (animation === 'fadeIn') {
    keys = (0, _styledComponents.keyframes)(["0%{opacity:0}100%{opacity:1}"]);
  }
  return keys ? (0, _styledComponents.css)(["animation:", " ", "s ease-in-out forwards;"], keys, animationDuration / 1000.0) : '';
};

// POSITIONS combines 'position', 'full', and 'margin' properties, since
// they are all interdependent.
// Basically, non-full axes combine 50% position with -50% translation.
// full axes pin to the window edges offset by any margin.
// The keyframe animations are included as they are done via translations
// as well so they must take into account the non-animated positioning.
var POSITIONS = {
  center: {
    vertical: function vertical(bounds) {
      return (0, _styledComponents.css)(["top:", "px;bottom:", "px;left:50%;transform:translateX(-50%);", ""], bounds.top, bounds.bottom, function (props) {
        return getAnimationStyle(props, 'center', 'vertical');
      });
    },
    horizontal: function horizontal(bounds) {
      return (0, _styledComponents.css)(["left:", "px;right:", "px;top:50%;transform:translateY(-50%);", ""], bounds.left, bounds.right, function (props) {
        return getAnimationStyle(props, 'center', 'horizontal');
      });
    },
    "true": function _true(bounds) {
      return (0, _styledComponents.css)(["top:", "px;bottom:", "px;left:", "px;right:", "px;", ""], bounds.top, bounds.bottom, bounds.left, bounds.right, function (props) {
        return getAnimationStyle(props, 'center', 'true');
      });
    },
    "false": function _false() {
      return (0, _styledComponents.css)(["top:50%;left:50%;transform:translate(-50%,-50%);", ""], function (props) {
        return getAnimationStyle(props, 'center', 'false');
      });
    }
  },
  top: {
    vertical: function vertical(bounds) {
      return (0, _styledComponents.css)(["top:", "px;bottom:", "px;left:50%;transform:translate(-50%,0%);", ""], bounds.top, bounds.bottom, function (props) {
        return getAnimationStyle(props, 'top', 'vertical');
      });
    },
    horizontal: function horizontal(bounds) {
      return (0, _styledComponents.css)(["left:", "px;right:", "px;top:", "px;transform:translateY(0);", ""], bounds.left, bounds.right, bounds.top, function (props) {
        return getAnimationStyle(props, 'top', 'horizontal');
      });
    },
    "true": function _true(bounds) {
      return (0, _styledComponents.css)(["top:", "px;bottom:", "px;left:", "px;right:", "px;transform:translateY(0);", ""], bounds.top, bounds.bottom, bounds.left, bounds.right, function (props) {
        return getAnimationStyle(props, 'top', 'true');
      });
    },
    "false": function _false(bounds) {
      return (0, _styledComponents.css)(["top:", "px;left:50%;transform:translate(-50%,0);", ""], bounds.top, function (props) {
        return getAnimationStyle(props, 'top', 'false');
      });
    }
  },
  bottom: {
    vertical: function vertical(bounds) {
      return (0, _styledComponents.css)(["top:", "px;bottom:", "px;left:50%;transform:translate(-50%,0);", ""], bounds.top, bounds.bottom, function (props) {
        return getAnimationStyle(props, 'bottom', 'vertical');
      });
    },
    horizontal: function horizontal(bounds) {
      return (0, _styledComponents.css)(["left:", "px;right:", "px;bottom:", "px;transform:translateY(0);", ""], bounds.left, bounds.top, bounds.bottom, function (props) {
        return getAnimationStyle(props, 'bottom', 'horizontal');
      });
    },
    "true": function _true(bounds) {
      return (0, _styledComponents.css)(["top:", "px;bottom:", "px;left:", "px;right:", "px;transform:translateY(0);", ""], bounds.top, bounds.bottom, bounds.left, bounds.right, function (props) {
        return getAnimationStyle(props, 'bottom', 'true');
      });
    },
    "false": function _false(bounds) {
      return (0, _styledComponents.css)(["bottom:", "px;left:50%;transform:translate(-50%,0);", ""], bounds.bottom, function (props) {
        return getAnimationStyle(props, 'bottom', 'false');
      });
    }
  },
  left: {
    vertical: function vertical(bounds) {
      return (0, _styledComponents.css)(["top:", "px;bottom:", "px;left:", "px;transform:translateX(0);", ""], bounds.top, bounds.bottom, bounds.left, function (props) {
        return getAnimationStyle(props, 'left', 'vertical');
      });
    },
    horizontal: function horizontal(bounds) {
      return (0, _styledComponents.css)(["left:", "px;right:", "px;top:50%;transform:translate(0,-50%);", ""], bounds.left, bounds.right, function (props) {
        return getAnimationStyle(props, 'left', 'horizontal');
      });
    },
    "true": function _true(bounds) {
      return (0, _styledComponents.css)(["top:", "px;bottom:", "px;left:", "px;right:", "px;transform:translateX(0);", ""], bounds.top, bounds.bottom, bounds.left, bounds.right, function (props) {
        return getAnimationStyle(props, 'left', 'true');
      });
    },
    "false": function _false(bounds) {
      return (0, _styledComponents.css)(["left:", "px;top:50%;transform:translate(0,-50%);", ""], bounds.left, function (props) {
        return getAnimationStyle(props, 'left', 'false');
      });
    }
  },
  right: {
    vertical: function vertical(bounds) {
      return (0, _styledComponents.css)(["top:", "px;bottom:", "px;right:", "px;transform:translateX(0);", ""], bounds.top, bounds.bottom, bounds.right, function (props) {
        return getAnimationStyle(props, 'right', 'vertical');
      });
    },
    horizontal: function horizontal(bounds) {
      return (0, _styledComponents.css)(["left:", "px;right:", "px;top:50%;transform:translate(0,-50%);", ""], bounds.left, bounds.right, function (props) {
        return getAnimationStyle(props, 'right', 'horizontal');
      });
    },
    "true": function _true(bounds) {
      return (0, _styledComponents.css)(["top:", "px;bottom:", "px;left:", "px;right:", "px;transform:translateX(0);", ""], bounds.top, bounds.bottom, bounds.left, bounds.right, function (props) {
        return getAnimationStyle(props, 'right', 'true');
      });
    },
    "false": function _false(bounds) {
      return (0, _styledComponents.css)(["right:", "px;top:50%;transform:translate(0,-50%);", ""], bounds.right, function (props) {
        return getAnimationStyle(props, 'right', 'false');
      });
    }
  },
  start: {
    vertical: function vertical(bounds) {
      return (0, _styledComponents.css)(["top:", "px;bottom:", "px;inset-inline-start:", "px;transform:translateX(0);", ""], bounds.top, bounds.bottom, bounds.start, function (props) {
        return getAnimationStyle(props, 'start', 'vertical');
      });
    },
    horizontal: function horizontal(bounds) {
      return (0, _styledComponents.css)(["inset-inline-start:", "px;inset-inline-end:", "px;top:50%;transform:translate(0,-50%);", ""], bounds.start, bounds.end, function (props) {
        return getAnimationStyle(props, 'start', 'horizontal');
      });
    },
    "true": function _true(bounds) {
      return (0, _styledComponents.css)(["top:", "px;bottom:", "px;inset-inline-start:", "px;inset-inline-end:", "px;transform:translateX(0);", ""], bounds.top, bounds.bottom, bounds.start, bounds.end, function (props) {
        return getAnimationStyle(props, 'start', 'true');
      });
    },
    "false": function _false(bounds) {
      return (0, _styledComponents.css)(["inset-inline-start:", "px;top:50%;transform:translate(0,-50%);", ""], bounds.start, function (props) {
        return getAnimationStyle(props, 'start', 'false');
      });
    }
  },
  end: {
    vertical: function vertical(bounds) {
      return (0, _styledComponents.css)(["top:", "px;bottom:", "px;inset-inline-end:", "px;transform:translateX(0);", ""], bounds.top, bounds.bottom, bounds.end, function (props) {
        return getAnimationStyle(props, 'end', 'vertical');
      });
    },
    horizontal: function horizontal(bounds) {
      return (0, _styledComponents.css)(["inset-inline-start:", "px;inset-inline-end:", "px;top:50%;transform:translate(0,-50%);", ""], bounds.start, bounds.end, function (props) {
        return getAnimationStyle(props, 'end', 'horizontal');
      });
    },
    "true": function _true(bounds) {
      return (0, _styledComponents.css)(["top:", "px;bottom:", "px;inset-inline-start:", "px;inset-inline-end:", "px;transform:translateX(0);", ""], bounds.top, bounds.bottom, bounds.start, bounds.end, function (props) {
        return getAnimationStyle(props, 'end', 'true');
      });
    },
    "false": function _false(bounds) {
      return (0, _styledComponents.css)(["inset-inline-end:", "px;top:50%;transform:translate(0,-50%);", ""], bounds.end, function (props) {
        return getAnimationStyle(props, 'end', 'false');
      });
    }
  },
  'top-right': {
    vertical: function vertical(bounds) {
      return (0, _styledComponents.css)(["top:", "px;bottom:", "px;right:", "px;transform:translateX(0);", ";"], bounds.top, bounds.bottom, bounds.right, function (props) {
        return getAnimationStyle(props, 'top', 'true');
      });
    },
    horizontal: function horizontal(bounds) {
      return (0, _styledComponents.css)(["left:", "px;right:", "px;top:0;transform:translateX(0);", ";"], bounds.left, bounds.right, function (props) {
        return getAnimationStyle(props, 'top', 'true');
      });
    },
    "true": function _true(bounds) {
      return (0, _styledComponents.css)(["top:", "px;bottom:", "px;left:", "px;right:", "px;transform:translateX(0);", ";"], bounds.top, bounds.bottom, bounds.left, bounds.right, function (props) {
        return getAnimationStyle(props, 'top', 'true');
      });
    },
    "false": function _false(bounds) {
      return (0, _styledComponents.css)(["top:", "px;right:", "px;transform:translateY(0);", ";"], bounds.top, bounds.right, function (props) {
        return getAnimationStyle(props, 'top', 'true');
      });
    }
  },
  'top-left': {
    vertical: function vertical(bounds) {
      return (0, _styledComponents.css)(["top:", "px;bottom:", "px;left:", "px;transform:translateX(0);", ""], bounds.top, bounds.bottom, bounds.left, function (props) {
        return getAnimationStyle(props, 'top', 'true');
      });
    },
    horizontal: function horizontal(bounds) {
      return (0, _styledComponents.css)(["left:", "px;right:", "px;top:0;transform:translateX(0);", ""], bounds.left, bounds.right, function (props) {
        return getAnimationStyle(props, 'top', 'true');
      });
    },
    "true": function _true(bounds) {
      return (0, _styledComponents.css)(["top:", "px;bottom:", "px;left:", "px;right:", "px;transform:translateX(0);", ""], bounds.top, bounds.bottom, bounds.left, bounds.right, function (props) {
        return getAnimationStyle(props, 'top', 'true');
      });
    },
    "false": function _false(bounds) {
      return (0, _styledComponents.css)(["top:", "px;left:", "px;transform:translateY(0);", ""], bounds.top, bounds.left, function (props) {
        return getAnimationStyle(props, 'top', 'true');
      });
    }
  },
  'bottom-right': {
    vertical: function vertical(bounds) {
      return (0, _styledComponents.css)(["top:", "px;bottom:", "px;right:", "px;transform:translateX(0);", ""], bounds.top, bounds.bottom, bounds.right, function (props) {
        return getAnimationStyle(props, 'bottom', 'true');
      });
    },
    horizontal: function horizontal(bounds) {
      return (0, _styledComponents.css)(["left:", "px;right:", "px;bottom:", "px;transform:translateY(0);", ""], bounds.left, bounds.right, bounds.bottom, function (props) {
        return getAnimationStyle(props, 'bottom', 'true');
      });
    },
    "true": function _true(bounds) {
      return (0, _styledComponents.css)(["top:", "px;bottom:", "px;left:", "px;right:", "px;transform:translateX(0);", ""], bounds.top, bounds.bottom, bounds.left, bounds.right, function (props) {
        return getAnimationStyle(props, 'bottom', 'true');
      });
    },
    "false": function _false(bounds) {
      return (0, _styledComponents.css)(["bottom:", "px;right:", "px;transform:translateY(0);", ""], bounds.bottom, bounds.right, function (props) {
        return getAnimationStyle(props, 'bottom', 'true');
      });
    }
  },
  'bottom-left': {
    vertical: function vertical(bounds) {
      return (0, _styledComponents.css)(["top:", "px;bottom:", "px;left:", "px;transform:translateX(0);", ""], bounds.top, bounds.bottom, bounds.left, function (props) {
        return getAnimationStyle(props, 'bottom', 'true');
      });
    },
    horizontal: function horizontal(bounds) {
      return (0, _styledComponents.css)(["left:", "px;right:", "px;bottom:", "px;transform:translateY(0);", ""], bounds.left, bounds.right, bounds.bottom, function (props) {
        return getAnimationStyle(props, 'bottom', 'true');
      });
    },
    "true": function _true(bounds) {
      return (0, _styledComponents.css)(["top:", "px;bottom:", "px;left:", "px;right:", "px;transform:translateX(0);", ""], bounds.top, bounds.bottom, bounds.left, bounds.right, function (props) {
        return getAnimationStyle(props, 'bottom', 'true');
      });
    },
    "false": function _false(bounds) {
      return (0, _styledComponents.css)(["bottom:", "px;left:", "px;transform:translateY(0);", ""], bounds.bottom, bounds.left, function (props) {
        return getAnimationStyle(props, 'bottom', 'true');
      });
    }
  }
};
var roundStyle = function roundStyle(data, theme, position, margin) {
  var styles = [];
  var size = data === true ? 'medium' : data;
  // fallback to edgeSize for backwards compatibility
  var round = theme.global[theme.global.radius ? 'radius' : 'edgeSize'][size] || size;
  // if user provides CSS string such as '50px 12px', apply that always
  var customCSS = round.split(' ').length > 1;
  if (margin === 'none' && !customCSS && theme.layer.border.intelligentRounding === true) {
    if (position === 'bottom') {
      styles.push((0, _styledComponents.css)(["border-radius:", " ", " 0 0;"], round, round));
    } else if (position === 'bottom-left') {
      styles.push((0, _styledComponents.css)(["border-radius:0 ", " 0 0;"], round));
    } else if (position === 'bottom-right') {
      styles.push((0, _styledComponents.css)(["border-radius:", " 0 0 0;"], round));
    } else if (position === 'end') {
      // only works on Firefox, what should be fallback?
      styles.push((0, _styledComponents.css)(["border-start-start-radius:", ";border-end-start-radius:", ";"], round, round));
    } else if (position === 'left') {
      styles.push((0, _styledComponents.css)(["border-radius:0 ", " ", " 0;"], round, round));
    } else if (position === 'right') {
      styles.push((0, _styledComponents.css)(["border-radius:", " 0 0 ", ";"], round, round));
    } else if (position === 'start') {
      // only works on Firefox, what should be fallback?
      styles.push((0, _styledComponents.css)(["border-end-end-radius:", ";border-start-end-radius:", ";"], round, round));
    } else if (position === 'top') {
      styles.push((0, _styledComponents.css)(["border-radius:0 0 ", " ", ";"], round, round));
    } else if (position === 'top-left') {
      styles.push((0, _styledComponents.css)(["border-radius:0 0 ", " 0;"], round));
    } else if (position === 'top-right') {
      styles.push((0, _styledComponents.css)(["border-radius:0 0 0 ", ";"], round));
    } else {
      // position is center, apply uniform border-radius
      styles.push((0, _styledComponents.css)(["border-radius:", ";"], round));
    }
  } else {
    // if there's a margin apply uniform border-radius, or if user has supplied
    // a complex CSS string such as "50px 20px" apply this
    styles.push((0, _styledComponents.css)(["border-radius:", ";"], round));
  }
  return styles;
};
var bounds = {
  left: 0,
  right: 0,
  top: 0,
  bottom: 0
};
var desktopContainerStyle = (0, _styledComponents.css)(["", " max-height:", ";max-width:", ";", ";", ";"], function (props) {
  if (!props.modal && props.position === 'hidden') {
    return hiddenPositionStyle;
  }
  return (0, _styledComponents.css)(["position:", ";"], props.modal || props.layerTarget ? 'absolute' : 'fixed');
}, function (props) {
  return "calc(100% - " + getBounds(bounds, props.margin, props.theme, 'top') + "px - " + getBounds(bounds, props.margin, props.theme, 'bottom') + "px)";
}, function (props) {
  return "calc(100% - " + getBounds(bounds, props.margin, props.theme, 'left') + "px - " + getBounds(bounds, props.margin, props.theme, 'right') + "px)";
}, function (props) {
  return props.plain || props.full && props.margin === 'none' ? "border-radius: 0;" : roundStyle(props.theme.layer.border.radius, props.theme, props.position, props.margin);
}, function (props) {
  return props.position !== 'hidden' && POSITIONS[props.position][props.full](getBounds(bounds, props.margin, props.theme), bounds) || '';
});
var responsiveContainerStyle = function responsiveContainerStyle(props) {
  return (0, _styledComponents.css)(["position:relative;max-height:none;max-width:none;border-radius:0;height:", ";width:", ";"], !props.layerTarget ? '100vh' : '100%', !props.layerTarget ? '100vw' : '100%');
};
var elevationStyle = (0, _styledComponents.css)(["box-shadow:", ";"], function (props) {
  return props.theme.global.elevation[props.theme.dark ? 'dark' : 'light'][props.theme.layer.container.elevation];
});
var StyledContainer = exports.StyledContainer = _styledComponents["default"].div.withConfig({
  shouldForwardProp: function shouldForwardProp(prop) {
    return (0, _isPropValid["default"])(prop) && !['elevation'].includes(prop);
  }
}).withConfig({
  displayName: "StyledLayer__StyledContainer",
  componentId: "sc-rmtehz-2"
})(["", " display:flex;flex-direction:column;", " ", " outline:none;pointer-events:all;z-index:", ";", " ", " ", ";", ";"], function (props) {
  return !props.modal ? _utils.baseStyle : '';
}, function (props) {
  return (0, _utils.heightStyle)(props.theme.layer.container.height, props.theme);
}, function (props) {
  return !props.plain && (props.background || props.theme.layer.background) && (0, _utils.backgroundStyle)(props.background || props.theme.layer.background, props.theme);
}, function (props) {
  return props.theme.layer.container.zIndex;
}, function (props) {
  return !props.plain && props.theme.layer.container.elevation && elevationStyle;
}, desktopContainerStyle, function (props) {
  if (props.responsive && props.theme.layer.responsiveBreakpoint) {
    var breakpoint = props.theme.global.breakpoints[props.theme.layer.responsiveBreakpoint];
    if (breakpoint) {
      return (0, _utils.breakpointStyle)(breakpoint, responsiveContainerStyle);
    }
  }
  return '';
}, function (props) {
  return props.theme.layer.container && props.theme.layer.container.extend;
});