import styled, { css, keyframes } from 'styled-components';
import { baseStyle, backgroundStyle, breakpointStyle, parseMetricToNum } from '../../utils';
import { defaultProps } from '../../default-props';
var hiddenPositionStyle = css(["left:-100%;right:100%;z-index:-1;position:fixed;"]);
var desktopLayerStyle = "\n  position: fixed;\n  top: 0px;\n  left: 0px;\n  right: 0px;\n  bottom: 0px;\n";
var responsiveLayerStyle = "\n  position: fixed;\n  width: 100%;\n  height: 100%;\n  min-height: 100vh;\n";
var StyledLayer = styled.div.withConfig({
  displayName: "StyledLayer",
  componentId: "rmtehz-0"
})(["", " background:transparent;position:relative;z-index:", ";pointer-events:none;outline:none;", " ", ";"], baseStyle, function (props) {
  return props.theme.layer.zIndex;
}, function (props) {
  if (props.position === 'hidden') {
    return hiddenPositionStyle;
  }

  var styles = [];
  styles.push(desktopLayerStyle);

  if (props.responsive && props.theme.layer.responsiveBreakpoint && !props.layerTarget) {
    var breakpoint = props.theme.global.breakpoints[props.theme.layer.responsiveBreakpoint];
    styles.push(breakpointStyle(breakpoint, responsiveLayerStyle));
  }

  return styles;
}, function (props) {
  return props.theme.layer && props.theme.layer.extend;
});
StyledLayer.defaultProps = {};
Object.setPrototypeOf(StyledLayer.defaultProps, defaultProps);
var StyledOverlay = styled.div.withConfig({
  displayName: "StyledLayer__StyledOverlay",
  componentId: "rmtehz-1"
})(["position:absolute;", " top:0px;left:0px;right:0px;bottom:0px;", " pointer-events:all;will-change:transform;"], function (props) {
  if (props.responsive && props.theme.layer.responsiveBreakpoint) {
    var breakpoint = props.theme.global.breakpoints[props.theme.layer.responsiveBreakpoint];
    return breakpointStyle(breakpoint, 'position: relative;');
  }

  return '';
}, function (props) {
  return !props.plain && props.theme.layer.overlay.background && backgroundStyle(props.theme.layer.overlay.background, props.theme);
});

var getMargin = function getMargin(margin, theme, position) {
  var axis = position.indexOf('top') !== -1 || position.indexOf('bottom') !== -1 ? 'vertical' : 'horizontal';
  var marginValue = margin[position] || margin[axis] || margin;
  var marginApplied = theme.global.edgeSize[marginValue] || marginValue;
  var marginInTheme = !!theme.global.edgeSize[marginValue];
  return !marginInTheme && typeof marginValue !== 'string' ? 0 : parseMetricToNum(marginApplied);
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
    top: bounds.top + getMargin(margin, theme, 'top') // 'top-right': getMargin(margin, theme, 'top-right'),
    // 'top-left': getMargin(margin, theme, 'top-left'),

  };
};

var KEYFRAMES = {
  center: {
    vertical: keyframes(["0%{transform:translateX(-50%) scale(0.8);}100%{transform:translateX(-50%) scale(1);}"]),
    horizontal: keyframes(["0%{transform:translateY(-50%) scale(0.8);}100%{transform:translateY(-50) scale(1);}"]),
    "true": keyframes(["0%{transform:scale(0.8);}100%{transform:scale(1);}"]),
    "false": keyframes(["0%{transform:translate(-50%,-50%) scale(0.8);}100%{transform:translate(-50%,-50%) scale(1);}"])
  },
  top: {
    vertical: keyframes(["0%{transform:translate(-50%,-100%);}100%{transform:translate(-50%,0);}"]),
    horizontal: keyframes(["0%{transform:translateY(-100%);}100%{transform:translateY(0);}"]),
    "true": keyframes(["0%{transform:translateY(-100%);}100%{transform:translateY(0);}"]),
    "false": keyframes(["0%{transform:translate(-50%,-100%);}100%{transform:translate(-50%,0);}"])
  },
  bottom: {
    vertical: keyframes(["0%{transform:translate(-50%,100%);}100%{transform:translate(-50%,0);}"]),
    horizontal: keyframes(["0%{transform:translateY(100%);}100%{transform:translateY(0);}"]),
    "true": keyframes(["0%{transform:translateY(100%);}100%{transform:translateY(0);}"]),
    "false": keyframes(["0%{transform:translate(-50%,100%);}100%{transform:translate(-50%,0);}"])
  },
  left: {
    vertical: keyframes(["0%{transform:translateX(-100%);}100%{transform:translateX(0);}"]),
    horizontal: keyframes(["0%{transform:translate(-100%,-50%);}100%{transform:translate(0,-50%);}"]),
    "true": keyframes(["0%{transform:translateX(-100%);}100%{transform:translateX(0);}"]),
    "false": keyframes(["0%{transform:translate(-100%,-50%);}100%{transform:translate(0,-50%);}"])
  },
  right: {
    vertical: keyframes(["0%{transform:translateX(100%);}100%{transform:translateX(0);}"]),
    horizontal: keyframes(["0%{transform:translate(100%,-50%);}100%{transform:translate(0,-50%);}"]),
    "true": keyframes(["0%{transform:translateX(100%);}100%{transform:translateX(0);}"]),
    "false": keyframes(["0%{transform:translate(100%,-50%);}100%{transform:translate(0,-50%);}"])
  },
  start: {
    vertical: keyframes(["0%{transform:translateX(-100%);}100%{transform:translateX(0);}"]),
    horizontal: keyframes(["0%{transform:translate(-100%,-50%);}100%{transform:translate(0,-50%);}"]),
    "true": keyframes(["0%{transform:translateX(-100%);}100%{transform:translateX(0);}"]),
    "false": keyframes(["0%{transform:translate(-100%,-50%);}100%{transform:translate(0,-50%);}"])
  },
  end: {
    vertical: keyframes(["0%{transform:translateX(100%);}100%{transform:translateX(0);}"]),
    horizontal: keyframes(["0%{transform:translate(100%,-50%);}100%{transform:translate(0,-50%);}"]),
    "true": keyframes(["0%{transform:translateX(100%);}100%{transform:translateX(0);}"]),
    "false": keyframes(["0%{transform:translate(100%,-50%);}100%{transform:translate(0,-50%);}"])
  }
};
var animationDuration = 200;

var getAnimationStyle = function getAnimationStyle(props, position, full) {
  var animation = props.animation !== undefined ? props.animation : props.animate;
  if (animation === undefined) animation = 'slide';
  var keys;

  if (animation === 'slide' || animation === true) {
    keys = KEYFRAMES[position][full];
  } else if (animation === 'fadeIn') {
    keys = keyframes(["0%{opacity:0}100%{opacity:1}"]);
  }

  return keys ? css(["animation:", " ", "s ease-in-out forwards;"], keys, animationDuration / 1000.0) : '';
}; // POSITIONS combines 'position', 'full', and 'margin' properties, since
// they are all interdependent.
// Basically, non-full axes combine 50% position with -50% translation.
// full axes pin to the window edges offset by any margin.
// The keyframe animations are included as they are done via translations
// as well so they must take into account the non-animated positioning.


var POSITIONS = {
  center: {
    vertical: function vertical(bounds) {
      return css(["top:", "px;bottom:", "px;left:50%;transform:translateX(-50%);", ""], bounds.top, bounds.bottom, function (props) {
        return getAnimationStyle(props, 'center', 'vertical');
      });
    },
    horizontal: function horizontal(bounds) {
      return css(["left:", "px;right:", "px;top:50%;transform:translateY(-50%);", ""], bounds.left, bounds.right, function (props) {
        return getAnimationStyle(props, 'center', 'horizontal');
      });
    },
    "true": function _true(bounds) {
      return css(["top:", "px;bottom:", "px;left:", "px;right:", "px;", ""], bounds.top, bounds.bottom, bounds.left, bounds.right, function (props) {
        return getAnimationStyle(props, 'center', 'true');
      });
    },
    "false": function _false() {
      return css(["top:50%;left:50%;transform:translate(-50%,-50%);", ""], function (props) {
        return getAnimationStyle(props, 'center', 'false');
      });
    }
  },
  top: {
    vertical: function vertical(bounds) {
      return css(["top:", "px;bottom:", "px;left:50%;transform:translate(-50%,0%);", ""], bounds.top, bounds.bottom, function (props) {
        return getAnimationStyle(props, 'top', 'vertical');
      });
    },
    horizontal: function horizontal(bounds) {
      return css(["left:", "px;right:", "px;top:", "px;transform:translateY(0);", ""], bounds.left, bounds.right, bounds.top, function (props) {
        return getAnimationStyle(props, 'top', 'horizontal');
      });
    },
    "true": function _true(bounds) {
      return css(["top:", "px;bottom:", "px;left:", "px;right:", "px;transform:translateY(0);", ""], bounds.top, bounds.bottom, bounds.left, bounds.right, function (props) {
        return getAnimationStyle(props, 'top', 'true');
      });
    },
    "false": function _false(bounds) {
      return css(["top:", "px;left:50%;transform:translate(-50%,0);", ""], bounds.top, function (props) {
        return getAnimationStyle(props, 'top', 'false');
      });
    }
  },
  bottom: {
    vertical: function vertical(bounds) {
      return css(["top:", "px;bottom:", "px;left:50%;transform:translate(-50%,0);", ""], bounds.top, bounds.bottom, function (props) {
        return getAnimationStyle(props, 'bottom', 'vertical');
      });
    },
    horizontal: function horizontal(bounds) {
      return css(["left:", "px;right:", "px;bottom:", "px;transform:translateY(0);", ""], bounds.left, bounds.top, bounds.bottom, function (props) {
        return getAnimationStyle(props, 'bottom', 'horizontal');
      });
    },
    "true": function _true(bounds) {
      return css(["top:", "px;bottom:", "px;left:", "px;right:", "px;transform:translateY(0);", ""], bounds.top, bounds.bottom, bounds.left, bounds.right, function (props) {
        return getAnimationStyle(props, 'bottom', 'true');
      });
    },
    "false": function _false(bounds) {
      return css(["bottom:", "px;left:50%;transform:translate(-50%,0);", ""], bounds.bottom, function (props) {
        return getAnimationStyle(props, 'bottom', 'false');
      });
    }
  },
  left: {
    vertical: function vertical(bounds) {
      return css(["top:", "px;bottom:", "px;left:", "px;transform:translateX(0);", ""], bounds.top, bounds.bottom, bounds.left, function (props) {
        return getAnimationStyle(props, 'left', 'vertical');
      });
    },
    horizontal: function horizontal(bounds) {
      return css(["left:", "px;right:", "px;top:50%;transform:translate(0,-50%);", ""], bounds.left, bounds.right, function (props) {
        return getAnimationStyle(props, 'left', 'horizontal');
      });
    },
    "true": function _true(bounds) {
      return css(["top:", "px;bottom:", "px;left:", "px;right:", "px;transform:translateX(0);", ""], bounds.top, bounds.bottom, bounds.left, bounds.right, function (props) {
        return getAnimationStyle(props, 'left', 'true');
      });
    },
    "false": function _false(bounds) {
      return css(["left:", "px;top:50%;transform:translate(0,-50%);", ""], bounds.left, function (props) {
        return getAnimationStyle(props, 'left', 'false');
      });
    }
  },
  right: {
    vertical: function vertical(bounds) {
      return css(["top:", "px;bottom:", "px;right:", "px;transform:translateX(0);", ""], bounds.top, bounds.bottom, bounds.right, function (props) {
        return getAnimationStyle(props, 'right', 'vertical');
      });
    },
    horizontal: function horizontal(bounds) {
      return css(["left:", "px;right:", "px;top:50%;transform:translate(0,-50%);", ""], bounds.left, bounds.right, function (props) {
        return getAnimationStyle(props, 'right', 'horizontal');
      });
    },
    "true": function _true(bounds) {
      return css(["top:", "px;bottom:", "px;left:", "px;right:", "px;transform:translateX(0);", ""], bounds.top, bounds.bottom, bounds.left, bounds.right, function (props) {
        return getAnimationStyle(props, 'right', 'true');
      });
    },
    "false": function _false(bounds) {
      return css(["right:", "px;top:50%;transform:translate(0,-50%);", ""], bounds.right, function (props) {
        return getAnimationStyle(props, 'right', 'false');
      });
    }
  },
  start: {
    vertical: function vertical(bounds) {
      return css(["top:", "px;bottom:", "px;inset-inline-start:", "px;transform:translateX(0);", ""], bounds.top, bounds.bottom, bounds.start, function (props) {
        return getAnimationStyle(props, 'start', 'vertical');
      });
    },
    horizontal: function horizontal(bounds) {
      return css(["inset-inline-start:", "px;inset-inline-end:", "px;top:50%;transform:translate(0,-50%);", ""], bounds.start, bounds.end, function (props) {
        return getAnimationStyle(props, 'start', 'horizontal');
      });
    },
    "true": function _true(bounds) {
      return css(["top:", "px;bottom:", "px;inset-inline-start:", "px;inset-inline-end:", "px;transform:translateX(0);", ""], bounds.top, bounds.bottom, bounds.start, bounds.end, function (props) {
        return getAnimationStyle(props, 'start', 'true');
      });
    },
    "false": function _false(bounds) {
      return css(["inset-inline-start:", "px;top:50%;transform:translate(0,-50%);", ""], bounds.start, function (props) {
        return getAnimationStyle(props, 'start', 'false');
      });
    }
  },
  end: {
    vertical: function vertical(bounds) {
      return css(["top:", "px;bottom:", "px;inset-inline-end:", "px;transform:translateX(0);", ""], bounds.top, bounds.bottom, bounds.end, function (props) {
        return getAnimationStyle(props, 'end', 'vertical');
      });
    },
    horizontal: function horizontal(bounds) {
      return css(["inset-inline-start:", "px;inset-inline-end:", "px;top:50%;transform:translate(0,-50%);", ""], bounds.start, bounds.end, function (props) {
        return getAnimationStyle(props, 'end', 'horizontal');
      });
    },
    "true": function _true(bounds) {
      return css(["top:", "px;bottom:", "px;inset-inline-start:", "px;inset-inline-end:", "px;transform:translateX(0);", ""], bounds.top, bounds.bottom, bounds.start, bounds.end, function (props) {
        return getAnimationStyle(props, 'end', 'true');
      });
    },
    "false": function _false(bounds) {
      return css(["inset-inline-end:", "px;top:50%;transform:translate(0,-50%);", ""], bounds.end, function (props) {
        return getAnimationStyle(props, 'end', 'false');
      });
    }
  },
  'top-right': {
    vertical: function vertical(bounds) {
      return css(["top:", "px;bottom:", "px;right:", "px;transform:translateX(0);", ";"], bounds.top, bounds.bottom, bounds.right, function (props) {
        return getAnimationStyle(props, 'top', 'true');
      });
    },
    horizontal: function horizontal(bounds) {
      return css(["left:", "px;right:", "px;top:0;transform:translateX(0);", ";"], bounds.left, bounds.right, function (props) {
        return getAnimationStyle(props, 'top', 'true');
      });
    },
    "true": function _true(bounds) {
      return css(["top:", "px;bottom:", "px;left:", "px;right:", "px;transform:translateX(0);", ";"], bounds.top, bounds.bottom, bounds.left, bounds.right, function (props) {
        return getAnimationStyle(props, 'top', 'true');
      });
    },
    "false": function _false(bounds) {
      return css(["top:", "px;right:", "px;transform:translateY(0);", ";"], bounds.top, bounds.right, function (props) {
        return getAnimationStyle(props, 'top', 'true');
      });
    }
  },
  'top-left': {
    vertical: function vertical(bounds) {
      return css(["top:", "px;bottom:", "px;left:", "px;transform:translateX(0);", ""], bounds.top, bounds.bottom, bounds.left, function (props) {
        return getAnimationStyle(props, 'top', 'true');
      });
    },
    horizontal: function horizontal(bounds) {
      return css(["left:", "px;right:", "px;top:0;transform:translateX(0);", ""], bounds.left, bounds.right, function (props) {
        return getAnimationStyle(props, 'top', 'true');
      });
    },
    "true": function _true(bounds) {
      return css(["top:", "px;bottom:", "px;left:", "px;right:", "px;transform:translateX(0);", ""], bounds.top, bounds.bottom, bounds.left, bounds.right, function (props) {
        return getAnimationStyle(props, 'top', 'true');
      });
    },
    "false": function _false(bounds) {
      return css(["top:", "px;left:", "px;transform:translateY(0);", ""], bounds.top, bounds.left, function (props) {
        return getAnimationStyle(props, 'top', 'true');
      });
    }
  },
  'bottom-right': {
    vertical: function vertical(bounds) {
      return css(["top:", "px;bottom:", "px;right:", "px;transform:translateX(0);", ""], bounds.top, bounds.bottom, bounds.right, function (props) {
        return getAnimationStyle(props, 'bottom', 'true');
      });
    },
    horizontal: function horizontal(bounds) {
      return css(["left:", "px;right:", "px;bottom:", "px;transform:translateY(0);", ""], bounds.left, bounds.right, bounds.bottom, function (props) {
        return getAnimationStyle(props, 'bottom', 'true');
      });
    },
    "true": function _true(bounds) {
      return css(["top:", "px;bottom:", "px;left:", "px;right:", "px;transform:translateX(0);", ""], bounds.top, bounds.bottom, bounds.left, bounds.right, function (props) {
        return getAnimationStyle(props, 'bottom', 'true');
      });
    },
    "false": function _false(bounds) {
      return css(["bottom:", "px;right:", "px;transform:translateY(0);", ""], bounds.bottom, bounds.right, function (props) {
        return getAnimationStyle(props, 'bottom', 'true');
      });
    }
  },
  'bottom-left': {
    vertical: function vertical(bounds) {
      return css(["top:", "px;bottom:", "px;left:", "px;transform:translateX(0);", ""], bounds.top, bounds.bottom, bounds.left, function (props) {
        return getAnimationStyle(props, 'bottom', 'true');
      });
    },
    horizontal: function horizontal(bounds) {
      return css(["left:", "px;right:", "px;bottom:", "px;transform:translateY(0);", ""], bounds.left, bounds.right, bounds.bottom, function (props) {
        return getAnimationStyle(props, 'bottom', 'true');
      });
    },
    "true": function _true(bounds) {
      return css(["top:", "px;bottom:", "px;left:", "px;right:", "px;transform:translateX(0);", ""], bounds.top, bounds.bottom, bounds.left, bounds.right, function (props) {
        return getAnimationStyle(props, 'bottom', 'true');
      });
    },
    "false": function _false(bounds) {
      return css(["bottom:", "px;left:", "px;transform:translateY(0);", ""], bounds.bottom, bounds.left, function (props) {
        return getAnimationStyle(props, 'bottom', 'true');
      });
    }
  }
};

var roundStyle = function roundStyle(data, theme, position, margin) {
  var styles = [];
  var size = data === true ? 'medium' : data;
  var round = theme.global.edgeSize[size] || size; // if user provides CSS string such as '50px 12px', apply that always

  var customCSS = round.split(' ').length > 1;

  if (margin === 'none' && !customCSS && theme.layer.border.intelligentRounding === true) {
    if (position === 'bottom') {
      styles.push(css(["border-radius:", " ", " 0 0;"], round, round));
    } else if (position === 'bottom-left') {
      styles.push(css(["border-radius:0 ", " 0 0;"], round));
    } else if (position === 'bottom-right') {
      styles.push(css(["border-radius:", " 0 0 0;"], round));
    } else if (position === 'end') {
      // only works on Firefox, what should be fallback?
      styles.push(css(["border-start-start-radius:", ";border-end-start-radius:", ";"], round, round));
    } else if (position === 'left') {
      styles.push(css(["border-radius:0 ", " ", " 0;"], round, round));
    } else if (position === 'right') {
      styles.push(css(["border-radius:", " 0 0 ", ";"], round, round));
    } else if (position === 'start') {
      // only works on Firefox, what should be fallback?
      styles.push(css(["border-end-end-radius:", ";border-start-end-radius:", ";"], round, round));
    } else if (position === 'top') {
      styles.push(css(["border-radius:0 0 ", " ", ";"], round, round));
    } else if (position === 'top-left') {
      styles.push(css(["border-radius:0 0 ", " 0;"], round));
    } else if (position === 'top-right') {
      styles.push(css(["border-radius:0 0 0 ", ";"], round));
    } else {
      // position is center, apply uniform border-radius
      styles.push(css(["border-radius:", ";"], round));
    }
  } else {
    // if there's a margin apply uniform border-radius, or if user has supplied
    // a complex CSS string such as "50px 20px" apply this
    styles.push(css(["border-radius:", ";"], round));
  }

  return styles;
};

var bounds = {
  left: 0,
  right: 0,
  top: 0,
  bottom: 0
};
var desktopContainerStyle = css(["", " max-height:", ";max-width:", ";", ";", ";"], function (props) {
  if (!props.modal && props.position === 'hidden') {
    return hiddenPositionStyle;
  }

  return css(["position:", ";"], props.modal || props.layerTarget ? 'absolute' : 'fixed');
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
  return css(["position:relative;max-height:none;max-width:none;border-radius:0;height:", ";width:", ";"], !props.layerTarget ? '100vh' : '100%', !props.layerTarget ? '100vw' : '100%');
};

var elevationStyle = css(["box-shadow:", ";"], function (props) {
  return props.theme.global.elevation[props.theme.dark ? 'dark' : 'light'][props.theme.layer.container.elevation];
});
var StyledContainer = styled.div.withConfig({
  // don't let elevation leak to DOM
  // https://styled-components.com/docs/api#shouldforwardprop
  shouldForwardProp: function shouldForwardProp(prop, defaultValidatorFn) {
    return !['elevation'].includes(prop) && defaultValidatorFn(prop);
  }
}).withConfig({
  displayName: "StyledLayer__StyledContainer",
  componentId: "rmtehz-2"
})(["", " display:flex;flex-direction:column;min-height:", ";", " outline:none;pointer-events:all;z-index:", ";", " ", " ", ";", ";"], function (props) {
  return !props.modal ? baseStyle : '';
}, function (props) {
  return props.theme.global.size.xxsmall;
}, function (props) {
  return !props.plain && (props.background || props.theme.layer.background) && backgroundStyle(props.background || props.theme.layer.background, props.theme);
}, function (props) {
  return props.theme.layer.container.zIndex;
}, function (props) {
  return !props.plain && props.theme.layer.container.elevation && elevationStyle;
}, desktopContainerStyle, function (props) {
  if (props.responsive && props.theme.layer.responsiveBreakpoint) {
    var breakpoint = props.theme.global.breakpoints[props.theme.layer.responsiveBreakpoint];

    if (breakpoint) {
      return breakpointStyle(breakpoint, responsiveContainerStyle);
    }
  }

  return '';
}, function (props) {
  return props.theme.layer.container && props.theme.layer.container.extend;
});
StyledContainer.defaultProps = {};
Object.setPrototypeOf(StyledContainer.defaultProps, defaultProps);
export { animationDuration, StyledLayer, StyledOverlay, StyledContainer };