import styled, { css, keyframes } from 'styled-components';
import { backgroundStyle, baseStyle, breakpointStyle } from '../../utils';
var hiddenPositionStyle = css(["left:-100%;right:100%;z-index:-1;position:fixed;"]);
var desktopLayerStyle = "\n  position: fixed;\n  top: 0px;\n  left: 0px;\n  right: 0px;\n  bottom: 0px;\n  width: 100vw;\n  height: 100vh;\n";
var responsiveLayerStyle = "\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  min-height: 100vh;\n";
export var StyledLayer = styled.div.withConfig({
  displayName: "StyledLayer",
  componentId: "rmtehz-0"
})(["", " background:unset;position:relative;z-index:10;pointer-events:none;outline:none;", " ", ";"], baseStyle, function (props) {
  if (props.position === 'hidden') {
    return hiddenPositionStyle;
  }

  var styles = [desktopLayerStyle];

  if (props.responsive && props.theme.layer.responsiveBreakpoint) {
    var breakpoint = props.theme.global.breakpoints[props.theme.layer.responsiveBreakpoint];
    styles.push(breakpointStyle(breakpoint, responsiveLayerStyle));
  }

  return styles;
}, function (props) {
  return props.theme.layer && props.theme.layer.extend;
});
export var StyledOverlay = styled.div.withConfig({
  displayName: "StyledLayer__StyledOverlay",
  componentId: "rmtehz-1"
})(["position:absolute;", " top:0px;left:0px;right:0px;bottom:0px;", " pointer-events:all;"], function (props) {
  if (props.responsive && props.theme.layer.responsiveBreakpoint) {
    var breakpoint = props.theme.global.breakpoints[props.theme.layer.responsiveBreakpoint];
    return breakpointStyle(breakpoint, 'position: relative;');
  }

  return '';
}, function (props) {
  return !props.plain && props.theme.layer.overlay.background && backgroundStyle(props.theme.layer.overlay.background, props.theme);
});
var MARGINS = {
  top: function top(margin, theme) {
    return theme.global.edgeSize[margin.top || margin.vertical || margin] || '0px';
  },
  bottom: function bottom(margin, theme) {
    return theme.global.edgeSize[margin.bottom || margin.vertical || margin] || '0px';
  },
  left: function left(margin, theme) {
    return theme.global.edgeSize[margin.left || margin.horizontal || margin] || '0px';
  },
  right: function right(margin, theme) {
    return theme.global.edgeSize[margin.right || margin.horizontal || margin] || '0px';
  }
};
var KEYFRAMES = {
  center: {
    vertical: keyframes(["0%{transform:translateX(-50%) scale(0.8);}100%{transform:translateX(-50%) scale(1);}"]),
    horizontal: keyframes(["0%{transform:translateY(-50%) scale(0.8);}100%{transform:translateY(-50) scale(1);}"]),
    true: keyframes(["0%{transform:scale(0.8);}100%{transform:scale(1);}"]),
    false: keyframes(["0%{transform:translate(-50%,-50%) scale(0.8);}100%{transform:translate(-50%,-50%) scale(1);}"])
  },
  top: {
    vertical: keyframes(["0%{transform:translate(-50%,-100%);}100%{transform:translate(-50%,0);}"]),
    horizontal: keyframes(["0%{transform:translateY(-100%);}100%{transform:translateY(0);}"]),
    true: keyframes(["0%{transform:translateY(-100%);}100%{transform:translateY(0);}"]),
    false: keyframes(["0%{transform:translate(-50%,-100%);}100%{transform:translate(-50%,0);}"])
  },
  bottom: {
    vertical: keyframes(["0%{transform:translate(-50%,100%);}100%{transform:translate(-50%,0);}"]),
    horizontal: keyframes(["0%{transform:translateY(100%);}100%{transform:translateY(0);}"]),
    true: keyframes(["0%{transform:translateY(100%);}100%{transform:translateY(0);}"]),
    false: keyframes(["0%{transform:translate(-50%,100%);}100%{transform:translate(-50%,0);}"])
  },
  left: {
    vertical: keyframes(["0%{transform:translateX(-100%);}100%{transform:translateX(0);}"]),
    horizontal: keyframes(["0%{transform:translate(-100%,-50%);}100%{transform:translate(0,-50%);}"]),
    true: keyframes(["0%{transform:translateX(-100%);}100%{transform:translateX(0);}"]),
    false: keyframes(["0%{transform:translate(-100%,-50%);}100%{transform:translate(0,-50%);}"])
  },
  right: {
    vertical: keyframes(["0%{transform:translateX(100%);}100%{transform:translateX(0);}"]),
    horizontal: keyframes(["0%{transform:translate(100%,-50%);}100%{transform:translate(0,-50%);}"]),
    true: keyframes(["0%{transform:translateX(100%);}100%{transform:translateX(0);}"]),
    false: keyframes(["0%{transform:translate(100%,-50%);}100%{transform:translate(0,-50%);}"])
  }
}; // POSITIONS combines 'position', 'full', and 'margin' properties, since
// they are all interdependent.
// Basically, non-full axes combine 50% position with -50% translation.
// full axes pin to the window edges offset by any margin.
// The keyframe animations are included as they are done via translations
// as well so they must take into account the non-animated positioning.

var POSITIONS = {
  center: {
    vertical: function vertical(margin, theme) {
      return css(["top:", ";bottom:", ";left:50%;transform:translateX(-50%);animation:", " 0.2s ease-in-out forwards;"], MARGINS.top(margin, theme), MARGINS.bottom(margin, theme), KEYFRAMES.center.vertical);
    },
    horizontal: function horizontal(margin, theme) {
      return css(["left:", ";right:", ";top:50%;transform:translateY(-50%);animation:", " 0.2s ease-in-out forwards;"], MARGINS.left(margin, theme), MARGINS.right(margin, theme), KEYFRAMES.center.horizontal);
    },
    true: function _true(margin, theme) {
      return css(["top:", ";bottom:", ";left:", ";right:", ";animation:", " 0.2s ease-in-out forwards;"], MARGINS.top(margin, theme), MARGINS.bottom(margin, theme), MARGINS.left(margin, theme), MARGINS.right(margin, theme), KEYFRAMES.center.true);
    },
    false: function _false() {
      return css(["top:50%;left:50%;transform:translate(-50%,-50%);animation:", " 0.2s ease-in-out forwards;"], KEYFRAMES.center.false);
    }
  },
  top: {
    vertical: function vertical(margin, theme) {
      return css(["top:", ";bottom:", ";left:50%;transform:translate(-50%,0%);animation:", " 0.2s ease-in-out forwards;"], MARGINS.top(margin, theme), MARGINS.bottom(margin, theme), KEYFRAMES.top.vertical);
    },
    horizontal: function horizontal(margin, theme) {
      return css(["left:", ";right:", ";top:", ";transform:translateY(0);animation:", " 0.2s ease-in-out forwards;"], MARGINS.left(margin, theme), MARGINS.right(margin, theme), MARGINS.top(margin, theme), KEYFRAMES.top.horizontal);
    },
    true: function _true(margin, theme) {
      return css(["top:", ";bottom:", ";left:", ";right:", ";transform:translateY(0);animation:", " 0.2s ease-in-out forwards;"], MARGINS.top(margin, theme), MARGINS.bottom(margin, theme), MARGINS.left(margin, theme), MARGINS.right(margin, theme), KEYFRAMES.top.true);
    },
    false: function _false(margin, theme) {
      return css(["top:", ";left:50%;transform:translate(-50%,0);animation:", " 0.2s ease-in-out forwards;"], MARGINS.top(margin, theme), KEYFRAMES.top.false);
    }
  },
  bottom: {
    vertical: function vertical(margin, theme) {
      return css(["top:", ";bottom:", ";left:50%;transform:translate(-50%,0);animation:", " 0.2s ease-in-out forwards;"], MARGINS.top(margin, theme), MARGINS.bottom(margin, theme), KEYFRAMES.bottom.vertical);
    },
    horizontal: function horizontal(margin, theme) {
      return css(["left:", ";right:", ";bottom:", ";transform:translateY(0);animation:", " 0.2s ease-in-out forwards;"], MARGINS.left(margin, theme), MARGINS.right(margin, theme), MARGINS.bottom(margin, theme), KEYFRAMES.bottom.horizontal);
    },
    true: function _true(margin, theme) {
      return css(["top:", ";bottom:", ";left:", ";right:", ";transform:translateY(0);animation:", " 0.2s ease-in-out forwards;"], MARGINS.top(margin, theme), MARGINS.bottom(margin, theme), MARGINS.left(margin, theme), MARGINS.right(margin, theme), KEYFRAMES.bottom.true);
    },
    false: function _false(margin, theme) {
      return css(["bottom:", ";left:50%;transform:translate(-50%,0);animation:", " 0.2s ease-in-out forwards;"], MARGINS.bottom(margin, theme), KEYFRAMES.bottom.false);
    }
  },
  left: {
    vertical: function vertical(margin, theme) {
      return css(["top:", ";bottom:", ";left:", ";transform:translateX(0);animation:", " 0.2s ease-in-out forwards;"], MARGINS.top(margin, theme), MARGINS.bottom(margin, theme), MARGINS.left(margin, theme), KEYFRAMES.left.vertical);
    },
    horizontal: function horizontal(margin, theme) {
      return css(["left:", ";right:", ";top:50%;transform:translate(0,-50%);animation:", " 0.2s ease-in-out forwards;"], MARGINS.left(margin, theme), MARGINS.right(margin, theme), KEYFRAMES.left.horizontal);
    },
    true: function _true(margin, theme) {
      return css(["top:", ";bottom:", ";left:", ";right:", ";transform:translateX(0);animation:", " 0.2s ease-in-out forwards;"], MARGINS.top(margin, theme), MARGINS.bottom(margin, theme), MARGINS.left(margin, theme), MARGINS.right(margin, theme), KEYFRAMES.left.true);
    },
    false: function _false(margin, theme) {
      return css(["left:", ";top:50%;transform:translate(0,-50%);animation:", " 0.2s ease-in-out forwards;"], MARGINS.left(margin, theme), KEYFRAMES.left.false);
    }
  },
  right: {
    vertical: function vertical(margin, theme) {
      return css(["top:", ";bottom:", ";right:", ";transform:translateX(0);animation:", " 0.2s ease-in-out forwards;"], MARGINS.top(margin, theme), MARGINS.bottom(margin, theme), MARGINS.right(margin, theme), KEYFRAMES.right.vertical);
    },
    horizontal: function horizontal(margin, theme) {
      return css(["left:", ";right:", ";top:50%;transform:translate(0,-50%);animation:", " 0.2s ease-in-out forwards;"], MARGINS.left(margin, theme), MARGINS.right(margin, theme), KEYFRAMES.right.horizontal);
    },
    true: function _true(margin, theme) {
      return css(["top:", ";bottom:", ";left:", ";right:", ";transform:translateX(0);animation:", " 0.2s ease-in-out forwards;"], MARGINS.top(margin, theme), MARGINS.bottom(margin, theme), MARGINS.left(margin, theme), MARGINS.right(margin, theme), KEYFRAMES.right.true);
    },
    false: function _false(margin, theme) {
      return css(["right:", ";top:50%;transform:translate(0,-50%);animation:", " 0.2s ease-in-out forwards;"], MARGINS.right(margin, theme), KEYFRAMES.right.false);
    }
  }
};
var desktopContainerStyle = css(["position:", ";max-height:", ";max-width:", ";border-radius:", ";", ";"], function (props) {
  return props.modal ? 'absolute' : 'fixed';
}, function (props) {
  return "calc(100% - " + MARGINS.top(props.margin, props.theme) + " - " + MARGINS.bottom(props.margin, props.theme) + ")";
}, function (props) {
  return "calc(100% - " + MARGINS.left(props.margin, props.theme) + " - " + MARGINS.right(props.margin, props.theme) + ")";
}, function (props) {
  return props.plain ? 0 : props.theme.layer.border.radius;
}, function (props) {
  return props.position !== 'hidden' && POSITIONS[props.position][props.full](props.margin, props.theme) || '';
});
var responsiveContainerStyle = css(["position:relative;max-height:none;max-width:none;border-radius:0;top:0;bottom:0;left:0;right:0;transform:none;animation:none;height:100vh;width:100vw;"]);
export var StyledContainer = styled.div.withConfig({
  displayName: "StyledLayer__StyledContainer",
  componentId: "rmtehz-2"
})(["", " display:flex;flex-direction:column;min-height:", ";", " outline:none;pointer-events:all;z-index:15;", " ", ";"], function (props) {
  return !props.modal ? baseStyle : '';
}, function (props) {
  return props.theme.global.size.xxsmall;
}, function (props) {
  return !props.plain && props.theme.layer.background && backgroundStyle(props.theme.layer.background, props.theme);
}, desktopContainerStyle, function (props) {
  if (props.responsive && props.theme.layer.responsiveBreakpoint) {
    var breakpoint = props.theme.global.breakpoints[props.theme.layer.responsiveBreakpoint];

    if (breakpoint) {
      return breakpointStyle(breakpoint, responsiveContainerStyle);
    }
  }

  return '';
});