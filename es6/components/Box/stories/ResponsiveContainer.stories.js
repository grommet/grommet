import React, { useContext, useEffect } from 'react';
import { Box, Button, Heading, ResponsiveContext, Text, ThemeContext } from 'grommet';
import { FormNext } from "grommet-icons/es6/icons/FormNext";
import { FormPrevious } from "grommet-icons/es6/icons/FormPrevious"; // Some content to show the effects of responsive layout.
// The heading will change size at the small breakpoint
// and the child Text items will switch from row to column
// layout at the small breakpoint.
var Content = function Content(_ref) {
  var title = _ref.title,
    children = _ref.children;
  var size = useContext(ResponsiveContext);
  var theme = useContext(ThemeContext);
  var smallBreakpoint = theme.global.breakpoints.small.value;
  return /*#__PURE__*/React.createElement(Box, {
    pad: "medium"
  }, /*#__PURE__*/React.createElement(Heading, null, title), /*#__PURE__*/React.createElement(Box, {
    direction: "row-responsive",
    gap: {
      column: 'medium',
      row: 'xsmall'
    }
  }, /*#__PURE__*/React.createElement(Text, null, "I am row-responsive"), /*#__PURE__*/React.createElement(Text, null, "Small breakpoint: ", smallBreakpoint), children, /*#__PURE__*/React.createElement(Text, null, "Current size:\xA0", /*#__PURE__*/React.createElement(Text, {
    weight: "bold"
  }, size), ' ')));
};
var App = function App(_ref2) {
  var title = _ref2.title,
    _ref2$responsive = _ref2.responsive,
    responsive = _ref2$responsive === void 0 ? true : _ref2$responsive;
  var widthRef = React.useRef(undefined);
  var containerRef = React.useRef(undefined);

  // track the width of the container just so we can display it as it changes
  useEffect(function () {
    var resizeObserver;
    var element = containerRef.current;
    if (typeof window !== 'undefined' && window.ResizeObserver) {
      resizeObserver = new window.ResizeObserver(function (entries) {
        var entry = entries[0].borderBoxSize[0];
        var width = entry == null ? void 0 : entry.inlineSize;
        if (widthRef.current) {
          widthRef.current.innerText = "Container width: " + width.toFixed() + "px";
        }
      });
      if (element) {
        resizeObserver.observe(containerRef.current);
      }
    } else {
      // fallback for server side rendering
      var _containerRef$current = containerRef.current.getBoundingClientRect(),
        width = _containerRef$current.width;
      if (widthRef.current) {
        widthRef.current.innerText = "Container width: " + width.toFixed() + "px";
      }
    }
    return function () {
      if (resizeObserver && element) {
        resizeObserver.unobserve(element);
      }
    };
  });
  return /*#__PURE__*/React.createElement(Box, {
    ref: containerRef,
    gap: "medium",
    flex: "grow",
    responsive: responsive
  }, /*#__PURE__*/React.createElement(Content, {
    title: title
  }, /*#__PURE__*/React.createElement(Text, {
    ref: widthRef
  })));
};
var SidePanel = function SidePanel() {
  var _React$useState = React.useState(true),
    open = _React$useState[0],
    setOpen = _React$useState[1];
  var onToggle = function onToggle() {
    return setOpen(function (prev) {
      return !prev;
    });
  };
  return /*#__PURE__*/React.createElement(Box, {
    direction: "row",
    align: "start"
  }, /*#__PURE__*/React.createElement(Button, {
    icon: open ? /*#__PURE__*/React.createElement(FormNext, null) : /*#__PURE__*/React.createElement(FormPrevious, null),
    onClick: onToggle
  }), open && /*#__PURE__*/React.createElement(Box, {
    width: "large",
    border: {
      side: 'left'
    },
    align: "center",
    justify: "center",
    fill: "vertical"
  }, /*#__PURE__*/React.createElement(Text, null, "Right hand side")));
};
export var ResponsiveContainer = function ResponsiveContainer() {
  return /*#__PURE__*/React.createElement(Box, {
    direction: "row",
    height: "100vh",
    width: "100vw",
    overflow: "hidden"
  }, /*#__PURE__*/React.createElement(Box, {
    overflow: "auto",
    fill: "horizontal"
  }, /*#__PURE__*/React.createElement(App, {
    title: "Responsive to container",
    responsive: "container"
  }), /*#__PURE__*/React.createElement(App, {
    title: "Responsive to window"
  })), /*#__PURE__*/React.createElement(SidePanel, null));
};
ResponsiveContainer.storyName = 'Responsive container';
ResponsiveContainer.parameters = {
  chromatic: {
    disable: true
  }
};
export default {
  title: 'Layout/Box/Responsive container'
};