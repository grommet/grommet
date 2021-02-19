import React, { useContext } from 'react';
import { Announce } from "grommet-icons/es6/icons/Announce";
import { grommet } from 'grommet/themes'; // used only for the grommet's font

import { Anchor, AnnounceContext, Box, Button, Grommet, Paragraph } from 'grommet';
var message = "Thank you for clicking the Announce Button, \nthis announcement is being broadcast on the Button's click.";

var PageContent = function PageContent(_ref) {
  var mode = _ref.mode;
  var announce = useContext(AnnounceContext);
  return /*#__PURE__*/React.createElement(Box, {
    align: "center",
    gap: "medium"
  }, /*#__PURE__*/React.createElement(Paragraph, {
    textAlign: "center"
  }, "Announce can only be \"observed\" via a screen reader. Here's", ' ', /*#__PURE__*/React.createElement(Anchor, {
    label: " how to turn it on",
    href: "https://www.codecademy.com/articles/how-to-setup-screen-reader#:~:text=(OS%20X)%20VoiceOver,Command%2DF5%20turns%20it%20off."
  }), ", hint: Command-F5 on OSX. Clicking the Button below will trigger an announcement."), /*#__PURE__*/React.createElement(Button, {
    label: "Announce",
    icon: /*#__PURE__*/React.createElement(Announce, null),
    a11yTitle: "Announce button",
    reverse: true,
    onClick: function onClick() {
      announce(message, mode);
    }
  }));
};

export var Polite = function Polite() {
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet,
    full: true
  }, /*#__PURE__*/React.createElement(Box, {
    justify: "center",
    align: "center",
    background: "brand",
    fill: true
  }, /*#__PURE__*/React.createElement(PageContent, {
    mode: "polite",
    role: "log"
  })));
};
export default {
  title: 'Utilities/AnnounceContext/Polite'
};