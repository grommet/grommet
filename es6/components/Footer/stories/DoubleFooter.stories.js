function _objectDestructuringEmpty(t) { if (null == t) throw new TypeError("Cannot destructure " + t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import React from 'react';
import styled from 'styled-components';
import { Grommet as GrommetIcon } from "grommet-icons/es6/icons/Grommet";
import { Anchor, Box, Footer, Main, Text } from 'grommet';
import { fiveColumns as data } from './data';
var StyledAnchor = styled(Anchor).withConfig({
  displayName: "DoubleFooterstories__StyledAnchor",
  componentId: "sc-xnt6p7-0"
})(["font-weight:200;"]);
var FooterAnchor = function FooterAnchor(_ref) {
  var rest = _extends({}, (_objectDestructuringEmpty(_ref), _ref));
  return /*#__PURE__*/React.createElement(StyledAnchor, _extends({
    href: "/",
    size: "small",
    color: "white"
  }, rest));
};
var FooterContent = function FooterContent() {
  return data.map(function (item) {
    return /*#__PURE__*/React.createElement(Box, {
      gap: "medium",
      key: item[0]
    }, /*#__PURE__*/React.createElement(Text, {
      weight: "bold",
      size: "small"
    }, item[0]), /*#__PURE__*/React.createElement(Box, null, [1, 2, 3, 4].map(function (i) {
      return /*#__PURE__*/React.createElement(FooterAnchor, {
        key: item[i]
      }, item[i]);
    })));
  });
};
export var DoubleFooter = function DoubleFooter() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    React.createElement(Box, null, /*#__PURE__*/React.createElement(Main, {
      background: "light-4",
      elevation: "large",
      pad: "large",
      border: true
    }, /*#__PURE__*/React.createElement(Text, {
      margin: "small",
      size: "xsmall"
    }, "Main Content"), /*#__PURE__*/React.createElement(Box, {
      flex: true
    })), /*#__PURE__*/React.createElement(Footer, {
      background: "dark-1",
      pad: "large",
      title: "Links",
      role: "contentinfo"
    }, /*#__PURE__*/React.createElement(FooterContent, null)), /*#__PURE__*/React.createElement(Footer, {
      background: "dark-2",
      pad: {
        horizontal: 'large',
        vertical: 'small'
      },
      title: "Copyright",
      role: "none"
    }, /*#__PURE__*/React.createElement(Box, {
      direction: "row",
      gap: "small"
    }, /*#__PURE__*/React.createElement(GrommetIcon, {
      color: "brand"
    }), /*#__PURE__*/React.createElement(Text, {
      alignSelf: "center"
    }, "grommet.io")), /*#__PURE__*/React.createElement(Text, {
      textAlign: "center",
      size: "small"
    }, "\xA9 2019 Copyright")))
    // </Grommet>
  );
};
DoubleFooter.storyName = 'Double footer';
export default {
  title: 'Layout/Footer/Double footer'
};