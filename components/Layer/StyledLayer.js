"use strict";

exports.__esModule = true;
exports.StyledContainer = exports.StyledOverlay = exports.StyledLayer = void 0;

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _utils = require("../../utils");

var _defaultProps = require("../../default-props");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

var hiddenPositionStyle = (0, _styledComponents.css)(["left:-100%;right:100%;z-index:-1;position:fixed;"]);
var desktopLayerStyle = "\n  position: fixed;\n  top: 0px;\n  left: 0px;\n  right: 0px;\n  bottom: 0px;\n  width: 100vw;\n  height: 100vh;\n";
var responsiveLayerStyle = "\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  min-height: 100vh;\n";

var StyledLayer = _styledComponents.default.div.withConfig({
  displayName: "StyledLayer",
  componentId: "rmtehz-0"
})(["", " background:unset;position:relative;z-index:", ";pointer-events:none;outline:none;", " ", ";"], _utils.baseStyle, function (props) {
  return props.theme.layer.zIndex;
}, function (props) {
  if (props.position === 'hidden') {
    return hiddenPositionStyle;
  }

  var styles = [desktopLayerStyle];

  if (props.responsive && props.theme.layer.responsiveBreakpoint) {
    var breakpoint = props.theme.global.breakpoints[props.theme.layer.responsiveBreakpoint];
    styles.push((0, _utils.breakpointStyle)(breakpoint, responsiveLayerStyle));
  }

  return styles;
}, function (props) {
  return props.theme.layer && props.theme.layer.extend;
});

exports.StyledLayer = StyledLayer;
StyledLayer.defaultProps = {};
Object.setPrototypeOf(StyledLayer.defaultProps, _defaultProps.defaultProps);

var StyledOverlay = _styledComponents.default.div.withConfig({
  displayName: "StyledLayer__StyledOverlay",
  componentId: "rmtehz-1"
})(["position:absolute;", " top:0px;left:0px;right:0px;bottom:0px;", " pointer-events:all;"], function (props) {
  if (props.responsive && props.theme.layer.responsiveBreakpoint) {
    var breakpoint = props.theme.global.breakpoints[props.theme.layer.responsiveBreakpoint];
    return (0, _utils.breakpointStyle)(breakpoint, 'position: relative;');
  }

  return '';
}, function (props) {
  return !props.plain && props.theme.layer.overlay.background && (0, _utils.backgroundStyle)(props.theme.layer.overlay.background, props.theme);
});

exports.StyledOverlay = StyledOverlay;

var getMargin = function getMargin(margin, theme, position) {
  var axis = position.includes('top') || position.includes('bottom') ? 'vertical' : 'horizontal';
  var marginValue = margin[position] || margin[axis] || margin;
  var marginApplied = theme.global.edgeSize[marginValue] || marginValue;
  var marginInTheme = !!theme.global.edgeSize[marginValue];
  return !marginInTheme && typeof marginValue !== 'string' ? '0px' : marginApplied;
};

var MARGINS = function MARGINS(margin, theme, position) {
  if (position === void 0) {
    position = undefined;
  }

  if (position) {
    return getMargin(margin, theme, position);
  }

  return {
    bottom: getMargin(margin, theme, 'bottom'),
    'bottom-left': getMargin(margin, theme, 'bottom-left'),
    'bottom-right': getMargin(margin, theme, 'bottom-right'),
    left: getMargin(margin, theme, 'left'),
    right: getMargin(margin, theme, 'right'),
    top: getMargin(margin, theme, 'top'),
    'top-right': getMargin(margin, theme, 'top-right'),
    'top-left': getMargin(margin, theme, 'top-left')
  };
};

var KEYFRAMES = {
  center: {
    vertical: (0, _styledComponents.keyframes)(["0%{transform:translateX(-50%) scale(0.8);}100%{transform:translateX(-50%) scale(1);}"]),
    horizontal: (0, _styledComponents.keyframes)(["0%{transform:translateY(-50%) scale(0.8);}100%{transform:translateY(-50) scale(1);}"]),
    true: (0, _styledComponents.keyframes)(["0%{transform:scale(0.8);}100%{transform:scale(1);}"]),
    false: (0, _styledComponents.keyframes)(["0%{transform:translate(-50%,-50%) scale(0.8);}100%{transform:translate(-50%,-50%) scale(1);}"])
  },
  top: {
    vertical: (0, _styledComponents.keyframes)(["0%{transform:translate(-50%,-100%);}100%{transform:translate(-50%,0);}"]),
    horizontal: (0, _styledComponents.keyframes)(["0%{transform:translateY(-100%);}100%{transform:translateY(0);}"]),
    true: (0, _styledComponents.keyframes)(["0%{transform:translateY(-100%);}100%{transform:translateY(0);}"]),
    false: (0, _styledComponents.keyframes)(["0%{transform:translate(-50%,-100%);}100%{transform:translate(-50%,0);}"])
  },
  bottom: {
    vertical: (0, _styledComponents.keyframes)(["0%{transform:translate(-50%,100%);}100%{transform:translate(-50%,0);}"]),
    horizontal: (0, _styledComponents.keyframes)(["0%{transform:translateY(100%);}100%{transform:translateY(0);}"]),
    true: (0, _styledComponents.keyframes)(["0%{transform:translateY(100%);}100%{transform:translateY(0);}"]),
    false: (0, _styledComponents.keyframes)(["0%{transform:translate(-50%,100%);}100%{transform:translate(-50%,0);}"])
  },
  left: {
    vertical: (0, _styledComponents.keyframes)(["0%{transform:translateX(-100%);}100%{transform:translateX(0);}"]),
    horizontal: (0, _styledComponents.keyframes)(["0%{transform:translate(-100%,-50%);}100%{transform:translate(0,-50%);}"]),
    true: (0, _styledComponents.keyframes)(["0%{transform:translateX(-100%);}100%{transform:translateX(0);}"]),
    false: (0, _styledComponents.keyframes)(["0%{transform:translate(-100%,-50%);}100%{transform:translate(0,-50%);}"])
  },
  right: {
    vertical: (0, _styledComponents.keyframes)(["0%{transform:translateX(100%);}100%{transform:translateX(0);}"]),
    horizontal: (0, _styledComponents.keyframes)(["0%{transform:translate(100%,-50%);}100%{transform:translate(0,-50%);}"]),
    true: (0, _styledComponents.keyframes)(["0%{transform:translateX(100%);}100%{transform:translateX(0);}"]),
    false: (0, _styledComponents.keyframes)(["0%{transform:translate(100%,-50%);}100%{transform:translate(0,-50%);}"])
  }
};

var getAnimationStyle = function getAnimationStyle(animate, position, full) {
  if (animate === void 0) {
    animate = true;
  }

  var defaultAnimation = (0, _styledComponents.css)(["animation:", " 0.2s ease-in-out forwards"], KEYFRAMES[position][full]);
  return animate ? defaultAnimation : '';
}; // POSITIONS combines 'position', 'full', and 'margin' properties, since
// they are all interdependent.
// Basically, non-full axes combine 50% position with -50% translation.
// full axes pin to the window edges offset by any margin.
// The keyframe animations are included as they are done via translations
// as well so they must take into account the non-animated positioning.


var POSITIONS = {
  center: {
    vertical: function vertical(margin) {
      return (0, _styledComponents.css)(["top:", ";bottom:", ";left:50%;transform:translateX(-50%);", ""], margin.top, margin.bottom, function (props) {
        return getAnimationStyle(props.animate, 'center', 'vertical');
      });
    },
    horizontal: function horizontal(margin) {
      return (0, _styledComponents.css)(["left:", ";right:", ";top:50%;transform:translateY(-50%);", ""], margin.left, margin.right, function (props) {
        return getAnimationStyle(props.animate, 'center', 'horizontal');
      });
    },
    true: function _true(margin) {
      return (0, _styledComponents.css)(["top:", ";bottom:", ";left:", ";right:", ";", ""], margin.top, margin.bottom, margin.left, margin.right, function (props) {
        return getAnimationStyle(props.animate, 'center', 'true');
      });
    },
    false: function _false() {
      return (0, _styledComponents.css)(["top:50%;left:50%;transform:translate(-50%,-50%);", ""], function (props) {
        return getAnimationStyle(props.animate, 'center', 'false');
      });
    }
  },
  top: {
    vertical: function vertical(margin) {
      return (0, _styledComponents.css)(["top:", ";bottom:", ";left:50%;transform:translate(-50%,0%);", ""], margin.top, margin.bottom, function (props) {
        return getAnimationStyle(props.animate, 'top', 'vertical');
      });
    },
    horizontal: function horizontal(margin) {
      return (0, _styledComponents.css)(["left:", ";right:", ";top:", ";transform:translateY(0);", ""], margin.left, margin.right, margin.top, function (props) {
        return getAnimationStyle(props.animate, 'top', 'horizontal');
      });
    },
    true: function _true(margin) {
      return (0, _styledComponents.css)(["top:", ";bottom:", ";left:", ";right:", ";transform:translateY(0);", ""], margin.top, margin.bottom, margin.left, margin.right, function (props) {
        return getAnimationStyle(props.animate, 'top', 'true');
      });
    },
    false: function _false(margin) {
      return (0, _styledComponents.css)(["top:", ";left:50%;transform:translate(-50%,0);", ""], margin.top, function (props) {
        return getAnimationStyle(props.animate, 'top', 'false');
      });
    }
  },
  bottom: {
    vertical: function vertical(margin) {
      return (0, _styledComponents.css)(["top:", " bottom:", ";left:50%;transform:translate(-50%,0);", ""], margin.top, margin.bottom, function (props) {
        return getAnimationStyle(props.animate, 'bottom', 'vertical');
      });
    },
    horizontal: function horizontal(margin) {
      return (0, _styledComponents.css)(["left:", ";right:", ";bottom:", ";transform:translateY(0);", ""], margin.left, margin.top, margin.bottom, function (props) {
        return getAnimationStyle(props.animate, 'bottom', 'horizontal');
      });
    },
    true: function _true(margin) {
      return (0, _styledComponents.css)(["top:", ";bottom:", ";left:", ";right:", ";transform:translateY(0);", ""], margin.top, margin.bottom, margin.left, margin.right, function (props) {
        return getAnimationStyle(props.animate, 'bottom', 'true');
      });
    },
    false: function _false(margin) {
      return (0, _styledComponents.css)(["bottom:", ";left:50%;transform:translate(-50%,0);", ""], margin.bottom, function (props) {
        return getAnimationStyle(props.animate, 'bottom', 'false');
      });
    }
  },
  left: {
    vertical: function vertical(margin) {
      return (0, _styledComponents.css)(["top:", ";bottom:", ";left:", ";transform:translateX(0);", ""], margin.top, margin.bottom, margin.left, function (props) {
        return getAnimationStyle(props.animate, 'left', 'vertical');
      });
    },
    horizontal: function horizontal(margin) {
      return (0, _styledComponents.css)(["left:", ";right:", ";top:50%;transform:translate(0,-50%);", ""], margin.left, margin.right, function (props) {
        return getAnimationStyle(props.animate, 'left', 'horizontal');
      });
    },
    true: function _true(margin) {
      return (0, _styledComponents.css)(["top:", ";bottom:", ";left:", ";right:", ";transform:translateX(0);", ""], margin.top, margin.bottom, margin.left, margin.right, function (props) {
        return getAnimationStyle(props.animate, 'left', 'true');
      });
    },
    false: function _false(margin) {
      return (0, _styledComponents.css)(["left:", ";top:50%;transform:translate(0,-50%);", ""], margin.left, function (props) {
        return getAnimationStyle(props.animate, 'left', 'false');
      });
    }
  },
  right: {
    vertical: function vertical(margin) {
      return (0, _styledComponents.css)(["top:", ";bottom:", ";right:", ";transform:translateX(0);", ""], margin.top, margin.bottom, margin.right, function (props) {
        return getAnimationStyle(props.animate, 'right', 'vertical');
      });
    },
    horizontal: function horizontal(margin) {
      return (0, _styledComponents.css)(["left:", ";right:", ";top:50%;transform:translate(0,-50%);", ""], margin.left, margin.right, function (props) {
        return getAnimationStyle(props.animate, 'right', 'horizontal');
      });
    },
    true: function _true(margin) {
      return (0, _styledComponents.css)(["top:", ";bottom:", ";left:", ";right:", ";transform:translateX(0);", ""], margin.top, margin.bottom, margin.left, margin.right, function (props) {
        return getAnimationStyle(props.animate, 'right', 'true');
      });
    },
    false: function _false(margin) {
      return (0, _styledComponents.css)(["right:", ";top:50%;transform:translate(0,-50%);", ""], margin.right, function (props) {
        return getAnimationStyle(props.animate, 'right', 'false');
      });
    }
  },
  'top-right': {
    vertical: function vertical(margin) {
      return (0, _styledComponents.css)(["top:", ";bottom:", ";right:", ";transform:translateX(0);", ";"], margin.top, margin.bottom, margin.right, function (props) {
        return getAnimationStyle(props.animate, 'top', 'true');
      });
    },
    horizontal: function horizontal(margin) {
      return (0, _styledComponents.css)(["left:", ";right:", ";top:0;transform:translateX(0);", ";"], margin.left, margin.right, function (props) {
        return getAnimationStyle(props.animate, 'top', 'true');
      });
    },
    true: function _true(margin) {
      return (0, _styledComponents.css)(["top:", ";bottom:", ";left:", ";right:", ";transform:translateX(0);", ";"], margin.top, margin.bottom, margin.left, margin.right, function (props) {
        return getAnimationStyle(props.animate, 'top', 'true');
      });
    },
    false: function _false(margin) {
      return (0, _styledComponents.css)(["top:", ";right:", ";transform:translateY(0);", ";"], margin.top, margin.right, function (props) {
        return getAnimationStyle(props.animate, 'top', 'true');
      });
    }
  },
  'top-left': {
    vertical: function vertical(margin) {
      return (0, _styledComponents.css)(["top:", ";bottom:", ";left:", ";transform:translateX(0);", ""], margin.top, margin.bottom, margin.left, function (props) {
        return getAnimationStyle(props.animate, 'top', 'true');
      });
    },
    horizontal: function horizontal(margin) {
      return (0, _styledComponents.css)(["left:", ";right:", ";top:0;transform:translateX(0);", ""], margin.left, margin.right, function (props) {
        return getAnimationStyle(props.animate, 'top', 'true');
      });
    },
    true: function _true(margin) {
      return (0, _styledComponents.css)(["top:", ";bottom:", ";left:", ";right:", ";transform:translateX(0);", ""], margin.top, margin.bottom, margin.left, margin.right, function (props) {
        return getAnimationStyle(props.animate, 'top', 'true');
      });
    },
    false: function _false(margin) {
      return (0, _styledComponents.css)(["top:", ";left:", ";transform:translateY(0);", ""], margin.top, margin.left, function (props) {
        return getAnimationStyle(props.animate, 'top', 'true');
      });
    }
  },
  'bottom-right': {
    vertical: function vertical(margin) {
      return (0, _styledComponents.css)(["top:", ";bottom:", ";right:", ";transform:translateX(0);", ""], margin.top, margin.bottom, margin.right, function (props) {
        return getAnimationStyle(props.animate, 'bottom', 'true');
      });
    },
    horizontal: function horizontal(margin) {
      return (0, _styledComponents.css)(["left:", ";right:", ";bottom:", ";transform:translateY(0);", ""], margin.left, margin.right, margin.bottom, function (props) {
        return getAnimationStyle(props.animate, 'bottom', 'true');
      });
    },
    true: function _true(margin) {
      return (0, _styledComponents.css)(["top:", ";bottom:", ";left:", ";right:", ";transform:translateX(0);", ""], margin.top, margin.bottom, margin.left, margin.right, function (props) {
        return getAnimationStyle(props.animate, 'bottom', 'true');
      });
    },
    false: function _false(margin) {
      return (0, _styledComponents.css)(["bottom:", ";right:", ";transform:translateY(0);", ""], margin.bottom, margin.right, function (props) {
        return getAnimationStyle(props.animate, 'bottom', 'true');
      });
    }
  },
  'bottom-left': {
    vertical: function vertical(margin) {
      return (0, _styledComponents.css)(["top:", ";bottom:", ";left:", ";transform:translateX(0);", ""], margin.top, margin.bottom, margin.left, function (props) {
        return getAnimationStyle(props.animate, 'bottom', 'true');
      });
    },
    horizontal: function horizontal(margin) {
      return (0, _styledComponents.css)(["left:", ";right:", ";bottom:", ";transform:translateY(0);", ""], margin.left, margin.right, margin.bottom, function (props) {
        return getAnimationStyle(props.animate, 'bottom', 'true');
      });
    },
    true: function _true(margin) {
      return (0, _styledComponents.css)(["top:", ";bottom:", ";left:", ";right:", ";transform:translateX(0);", ""], margin.top, margin.bottom, margin.left, margin.right, function (props) {
        return getAnimationStyle(props.animate, 'bottom', 'true');
      });
    },
    false: function _false(margin) {
      return (0, _styledComponents.css)(["bottom:", ";left:", ";transform:translateY(0);", ""], margin.bottom, margin.left, function (props) {
        return getAnimationStyle(props.animate, 'bottom', 'true');
      });
    }
  }
};
var desktopContainerStyle = (0, _styledComponents.css)(["position:", ";max-height:", ";max-width:", ";border-radius:", ";", ";"], function (props) {
  return props.modal ? 'absolute' : 'fixed';
}, function (props) {
  return "calc(100% - " + MARGINS(props.margin, props.theme, 'top') + " - " + MARGINS(props.margin, props.theme, 'bottom') + ")";
}, function (props) {
  return "calc(100% - " + MARGINS(props.margin, props.theme, 'left') + " - " + MARGINS(props.margin, props.theme, 'right') + ")";
}, function (props) {
  return props.plain ? 0 : props.theme.layer.border.radius;
}, function (props) {
  return props.position !== 'hidden' && POSITIONS[props.position][props.full](MARGINS(props.margin, props.theme)) || '';
});
var responsiveContainerStyle = (0, _styledComponents.css)(["position:relative;max-height:none;max-width:none;border-radius:0;top:0;bottom:0;left:0;right:0;transform:none;animation:none;height:100vh;width:100vw;"]);

var StyledContainer = _styledComponents.default.div.withConfig({
  displayName: "StyledLayer__StyledContainer",
  componentId: "rmtehz-2"
})(["", " display:flex;flex-direction:column;min-height:", ";", " outline:none;pointer-events:all;z-index:", ";", " ", ";"], function (props) {
  return !props.modal ? _utils.baseStyle : '';
}, function (props) {
  return props.theme.global.size.xxsmall;
}, function (props) {
  return !props.plain && props.theme.layer.background && (0, _utils.backgroundStyle)(props.theme.layer.background, props.theme);
}, function (props) {
  return props.theme.layer.container.zIndex;
}, desktopContainerStyle, function (props) {
  if (props.responsive && props.theme.layer.responsiveBreakpoint) {
    var breakpoint = props.theme.global.breakpoints[props.theme.layer.responsiveBreakpoint];

    if (breakpoint) {
      return (0, _utils.breakpointStyle)(breakpoint, responsiveContainerStyle);
    }
  }

  return '';
});

exports.StyledContainer = StyledContainer;
StyledContainer.defaultProps = {};
Object.setPrototypeOf(StyledContainer.defaultProps, _defaultProps.defaultProps);