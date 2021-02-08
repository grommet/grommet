/* eslint-disable jsx-a11y/tabindex-no-positive */
import React from 'react';
import { grommet, Avatar, Box, Anchor, Grommet, Header, Nav, Paragraph, SkipLinkTarget, SkipLink, SkipLinks, Heading } from 'grommet';
var avatarSrc = '//s.gravatar.com/avatar/b7fb138d53ba0f573212ccce38a7c43b?s=80';
var contentFiller = "\nLorem ipsum dolor sit amet, consectetur adipiscing elit,\nsed do eiusmod tempor incididunt ut labore et dolore magna\naliqua. Ut enim ad minim veniam, quis nostrud exercitation\nullamco laboris nisi ut aliquip ex ea commodo consequat.\nDuis aute irure dolor in reprehenderit in voluptate velit\nesse cillum dolore eu fugiat nulla pariatur. Excepteur\nsint occaecat cupidatat non proident, sunt in culpa qui\nofficia deserunt mollit anim id est laborum.\n";
var introContent = "\nThe main content is not usually the first thing on a web page. Keyboard and \nscreen reader users generally must navigate a long list of navigation \nlinks, sub-lists of links, corporate icons, site searches, and other \nelements before ever arriving at the main content. This is particularly \ndifficult for users with some forms of motor disabilities.\nWithout some sort of system for bypassing the long list of links, some users \nare at a huge disadvantage. Consider users with no arm movement, who use \ncomputers by tapping their heads on a switch or that use a stick in their \nmouth to press keyboard keys. Requiring users to perform any action perhaps \n100s of times before reaching the main content is simply unacceptable.\nOf course, sighted people who use their mouse do not have any trouble with \npages such as this. They can almost immediately scan over the page and \nidentify where the main content is. In effect, sighted users have a built-in \n\"skip navigation\" mechanism: their eyes. They can also bypass the many links \nbefore the main content and click directly on the link they want with the mouse.\nThe \"skip navigation\" idea was invented to give screen reader and keyboard \nusers the same capability of going directly to the main content that \nsighted mouse users take for granted.\n";
var howDoesItWorkContent = "\nTo get the most of Grommet's SkipLinks example, use a narrow window width and\nopen this page in a full screen (you can either use the \nstorybook \"full-screen\" icon or click on any of the Header's anchors \non the top right of the page (Home, Profile or Setting links) to achieve it) \nand then enter Tab on your keyboard.\nThe first tabbed element of the page will be the SkipLinks layer, \nthe layer will provide you the option to skip the navigation \nof the page to the Main Content or the Footer. \nFor example, let's take a user that isn't using a mouse, and is interested in \nskipping to the Main Content or the Footer without tabbing through all \nthe Header links, the user can choose one of the suggested options of the layer \neither 'Main Content' or 'Footer', and that will \nset the focus of the page to the \ntargeted (SkipLinkTarget) position and hence speeding the navigation \nthroughout the page.";

var Info = function Info(_ref) {
  var label = _ref.label;
  return /*#__PURE__*/React.createElement(Paragraph, null, "After choosing the ", label, " option on the SkipLinks layer, the following interactive element will be the next focusable item.");
};

export var Simple = function Simple() {
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(SkipLinks, null, /*#__PURE__*/React.createElement(SkipLink, {
    id: "main",
    label: "Main Content"
  }), /*#__PURE__*/React.createElement(SkipLink, {
    id: "footer",
    label: "Footer"
  })), /*#__PURE__*/React.createElement(Box, {
    gap: "large",
    margin: {
      bottom: 'xlarge'
    }
  }, /*#__PURE__*/React.createElement(Box, {
    background: "light-4",
    pad: "small",
    fill: "horizontal"
  }, /*#__PURE__*/React.createElement(Header, {
    pad: {
      horizontal: 'large'
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    src: avatarSrc
  }), /*#__PURE__*/React.createElement(Nav, {
    direction: "row"
  }, /*#__PURE__*/React.createElement(Anchor, {
    label: "Home",
    href: "#"
  }), /*#__PURE__*/React.createElement(Anchor, {
    label: "Profile",
    href: "#"
  }), /*#__PURE__*/React.createElement(Anchor, {
    label: "Setting",
    href: "#"
  })))), /*#__PURE__*/React.createElement(Box, {
    pad: {
      horizontal: 'large'
    }
  }, /*#__PURE__*/React.createElement(Box, {
    gap: "medium",
    align: "start"
  }, /*#__PURE__*/React.createElement(Heading, {
    level: 1
  }, "SkipLinks Example"), /*#__PURE__*/React.createElement(Heading, {
    level: 2
  }, "Accessibility Overview"), introContent, /*#__PURE__*/React.createElement(Anchor, {
    href: "https://webaim.org/techniques/skipnav/",
    label: "Content taken from WebAIM"
  }), /*#__PURE__*/React.createElement(Heading, {
    level: 2
  }, "How does it work"), howDoesItWorkContent), /*#__PURE__*/React.createElement(Box, {
    gap: "medium",
    align: "start",
    margin: {
      vertical: 'medium'
    }
  }, /*#__PURE__*/React.createElement(SkipLinkTarget, {
    id: "main"
  }), /*#__PURE__*/React.createElement(Heading, {
    level: 2
  }, "Main Content"), /*#__PURE__*/React.createElement(Info, {
    label: "Main Content"
  }), /*#__PURE__*/React.createElement(Anchor, {
    href: "#",
    label: "Interactive Element"
  }), contentFiller), /*#__PURE__*/React.createElement(Box, {
    gap: "medium",
    align: "start"
  }, /*#__PURE__*/React.createElement(SkipLinkTarget, {
    id: "footer"
  }), /*#__PURE__*/React.createElement(Heading, {
    level: 2
  }, "Footer"), /*#__PURE__*/React.createElement(Info, {
    label: "Footer"
  }), /*#__PURE__*/React.createElement(Anchor, {
    href: "#",
    label: "Interactive Element"
  }), contentFiller))));
};
export default {
  title: 'Utilities/SkipLinks/Simple'
};