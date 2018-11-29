"use strict";

exports.__esModule = true;
exports.StyledContainer = exports.StyledOverlay = exports.StyledLayer = void 0;

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _utils = require("../../utils");

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
  var axis = position === 'top' || position === 'bottom' ? 'vertical' : 'horizontal';
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
    top: getMargin(margin, theme, 'top'),
    bottom: getMargin(margin, theme, 'bottom'),
    left: getMargin(margin, theme, 'left'),
    right: getMargin(margin, theme, 'right')
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
}; // POSITIONS combines 'position', 'full', and 'margin' properties, since
// they are all interdependent.
// Basically, non-full axes combine 50% position with -50% translation.
// full axes pin to the window edges offset by any margin.
// The keyframe animations are included as they are done via translations
// as well so they must take into account the non-animated positioning.

var POSITIONS = {
  center: {
    vertical: function vertical(margin) {
      return (0, _styledComponents.css)(["top:", ";bottom:", ";left:50%;transform:translateX(-50%);animation:", " 0.2s ease-in-out forwards;"], margin.top, margin.bottom, KEYFRAMES.center.vertical);
    },
    horizontal: function horizontal(margin) {
      return (0, _styledComponents.css)(["left:", ";right:", ";top:50%;transform:translateY(-50%);animation:", " 0.2s ease-in-out forwards;"], margin.left, margin.right, KEYFRAMES.center.horizontal);
    },
    true: function _true(margin) {
      return (0, _styledComponents.css)(["top:", ";bottom:", ";left:", ";right:", ";animation:", " 0.2s ease-in-out forwards;"], margin.top, margin.bottom, margin.left, margin.right, KEYFRAMES.center.true);
    },
    false: function _false(margin) {
      return (0, _styledComponents.css)(["top:calc(50% + ", ");left:calc(50% + ", ");transform:translate(-50%,-50%);animation:", " 0.2s ease-in-out forwards;"], margin.top, margin.left, KEYFRAMES.center.false);
    }
  },
  top: {
    vertical: function vertical(margin) {
      return (0, _styledComponents.css)(["top:", ";bottom:", ";left:50%;transform:translate(-50%,0%);animation:", " 0.2s ease-in-out forwards;"], margin.top, margin.bottom, KEYFRAMES.top.vertical);
    },
    horizontal: function horizontal(margin) {
      return (0, _styledComponents.css)(["left:", ";right:", ";top:", ";transform:translateY(0);animation:", " 0.2s ease-in-out forwards;"], margin.left, margin.right, margin.top, KEYFRAMES.top.horizontal);
    },
    true: function _true(margin) {
      return (0, _styledComponents.css)(["top:", ";bottom:", ";left:", ";right:", ";transform:translateY(0);animation:", " 0.2s ease-in-out forwards;"], margin.top, margin.bottom, margin.left, margin.right, KEYFRAMES.top.true);
    },
    false: function _false(margin) {
      return (0, _styledComponents.css)(["top:", ";left:50%;transform:translate(-50%,0);animation:", " 0.2s ease-in-out forwards;"], margin.top, KEYFRAMES.top.false);
    }
  },
  bottom: {
    vertical: function vertical(margin) {
      return (0, _styledComponents.css)(["top:", " bottom:", ";left:50%;transform:translate(-50%,0);animation:", " 0.2s ease-in-out forwards;"], margin.top, margin.bottom, KEYFRAMES.bottom.vertical);
    },
    horizontal: function horizontal(margin) {
      return (0, _styledComponents.css)(["left:", ";right:", ";bottom:", ";transform:translateY(0);animation:", " 0.2s ease-in-out forwards;"], margin.left, margin.top, margin.bottom, KEYFRAMES.bottom.horizontal);
    },
    true: function _true(margin) {
      return (0, _styledComponents.css)(["top:", ";bottom:", ";left:", ";right:", ";transform:translateY(0);animation:", " 0.2s ease-in-out forwards;"], margin.top, margin.bottom, margin.left, margin.right, KEYFRAMES.bottom.true);
    },
    false: function _false(margin) {
      return (0, _styledComponents.css)(["bottom:", ";left:50%;transform:translate(-50%,0);animation:", " 0.2s ease-in-out forwards;"], margin.bottom, KEYFRAMES.bottom.false);
    }
  },
  left: {
    vertical: function vertical(margin) {
      return (0, _styledComponents.css)(["top:", ";bottom:", ";left:", ";transform:translateX(0);animation:", " 0.2s ease-in-out forwards;"], margin.top, margin.bottom, margin.left, KEYFRAMES.left.vertical);
    },
    horizontal: function horizontal(margin) {
      return (0, _styledComponents.css)(["left:", ";right:", ";top:50%;transform:translate(0,-50%);animation:", " 0.2s ease-in-out forwards;"], margin.left, margin.right, KEYFRAMES.left.horizontal);
    },
    true: function _true(margin) {
      return (0, _styledComponents.css)(["top:", ";bottom:", ";left:", ";right:", ";transform:translateX(0);animation:", " 0.2s ease-in-out forwards;"], margin.top, margin.bottom, margin.left, margin.right, KEYFRAMES.left.true);
    },
    false: function _false(margin) {
      return (0, _styledComponents.css)(["left:", ";top:50%;transform:translate(0,-50%);animation:", " 0.2s ease-in-out forwards;"], margin.left, KEYFRAMES.left.false);
    }
  },
  right: {
    vertical: function vertical(margin) {
      return (0, _styledComponents.css)(["top:", ";bottom:", ";right:", ";transform:translateX(0);animation:", " 0.2s ease-in-out forwards;"], margin.top, margin.bottom, margin.right, KEYFRAMES.right.vertical);
    },
    horizontal: function horizontal(margin) {
      return (0, _styledComponents.css)(["left:", ";right:", ";top:50%;transform:translate(0,-50%);animation:", " 0.2s ease-in-out forwards;"], margin.left, margin.right, KEYFRAMES.right.horizontal);
    },
    true: function _true(margin) {
      return (0, _styledComponents.css)(["top:", ";bottom:", ";left:", ";right:", ";transform:translateX(0);animation:", " 0.2s ease-in-out forwards;"], margin.top, margin.bottom, margin.left, margin.right, KEYFRAMES.right.true);
    },
    false: function _false(margin) {
      return (0, _styledComponents.css)(["right:", ";top:50%;transform:translate(0,-50%);animation:", " 0.2s ease-in-out forwards;"], margin.right, KEYFRAMES.right.false);
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