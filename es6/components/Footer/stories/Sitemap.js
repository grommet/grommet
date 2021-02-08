function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { Grommet as GrommetIcon } from "grommet-icons/es6/icons/Grommet";
import { Anchor, Box, Footer, grommet, Grommet, Main, Text } from 'grommet';
import { threeColumns as data } from './data';

var FooterAnchor = function FooterAnchor(_ref) {
  var rest = _extends({}, _ref);

  return /*#__PURE__*/React.createElement(Anchor, _extends({
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
    }, item[0]), /*#__PURE__*/React.createElement(Box, null, [1, 2, 3].map(function (i) {
      return /*#__PURE__*/React.createElement(FooterAnchor, {
        key: item[i]
      }, item[i]);
    })));
  });
};

export var Sitemap = function Sitemap() {
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Main, {
    background: "light-4",
    elevation: "large",
    pad: "large",
    gap: "large",
    border: true
  }, /*#__PURE__*/React.createElement(Text, {
    margin: "small",
    size: "xsmall"
  }, "Main Content"), /*#__PURE__*/React.createElement(Box, {
    flex: true
  })), /*#__PURE__*/React.createElement(Footer, {
    background: "dark-1",
    pad: "large"
  }, /*#__PURE__*/React.createElement(Box, {
    direction: "row-responsive",
    gap: "xsmall"
  }, /*#__PURE__*/React.createElement(Box, {
    align: "center",
    gap: "small"
  }, /*#__PURE__*/React.createElement(GrommetIcon, {
    color: "brand",
    size: "large"
  }), /*#__PURE__*/React.createElement(Text, {
    alignSelf: "center",
    color: "brand",
    weight: "bold"
  }, "grommet.io"))), /*#__PURE__*/React.createElement(FooterContent, null)));
};
export default {
  title: 'Layout/Footer/Sitemap'
};