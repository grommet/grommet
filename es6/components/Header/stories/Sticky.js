import React, { useState } from 'react';
import { Avatar, Nav, Anchor, Menu, Button, Box, Header, Heading, Layer, Paragraph, Page, PageContent, Grid, Card } from 'grommet';
import { FormClose } from "grommet-icons/es6/icons/FormClose";
import { Power } from "grommet-icons/es6/icons/Power";
import { User } from "grommet-icons/es6/icons/User";
export var Sticky = function Sticky() {
  var _useState = useState(false),
    open = _useState[0],
    setOpen = _useState[1];
  var onOpen = function onOpen() {
    return setOpen(true);
  };
  var onClose = function onClose() {
    return setOpen(undefined);
  };

  // eslint-disable-next-line no-unused-vars
  var onSubmit = function onSubmit(_ref) {
    var value = _ref.value,
      touched = _ref.touched;
  } // Your submission logic here
  ;

  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    React.createElement(Page, {
      kind: "narrow"
    }, /*#__PURE__*/React.createElement(PageContent, null, /*#__PURE__*/React.createElement(Header, {
      background: "light-3",
      sticky: "scrollup",
      pad: {
        vertical: 'small'
      }
    }, /*#__PURE__*/React.createElement(Avatar, {
      background: "brand"
    }, "SY"), /*#__PURE__*/React.createElement(Nav, {
      align: "center",
      direction: "row"
    }, /*#__PURE__*/React.createElement(Anchor, {
      label: "Home",
      href: "#"
    }), /*#__PURE__*/React.createElement(Menu, {
      dropProps: {
        align: {
          top: 'bottom',
          left: 'left'
        }
      },
      label: "Profile",
      items: [{
        label: 'Home'
      }, {
        label: 'Profile',
        icon: /*#__PURE__*/React.createElement(User, null),
        gap: 'small'
      }, {
        label: 'Logout',
        icon: /*#__PURE__*/React.createElement(Power, null),
        reverse: true,
        gap: 'small'
      }]
    }))), /*#__PURE__*/React.createElement(Box, {
      pad: "large",
      align: "center"
    }, /*#__PURE__*/React.createElement(Button, {
      label: "Show me the Layer",
      onClick: onOpen,
      primary: true
    })), /*#__PURE__*/React.createElement(Paragraph, null, "To maximize screen real-estate, the Header on this page scrolls out of view as the user moves down the page. However if the user scrolls upwards, the Header is revealed and fixed atop the window. On long pages this behavior allows easy access to the Headers content, such as navigation or menus, while preventing the Header from obscuring content on mobile devices or in smaller windows."), /*#__PURE__*/React.createElement(Paragraph, null, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer commodo gravida tincidunt. Nunc fringilla blandit tortor, id accumsan nisi dictum quis. Aenean porttitor at mi id semper. Donec mattis bibendum leo, interdum ullamcorper lectus ultrices vel. Fusce nec enim faucibus nunc porta egestas. Fusce dapibus lobortis tincidunt."), /*#__PURE__*/React.createElement(Paragraph, null, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer commodo gravida tincidunt. Nunc fringilla blandit tortor, id accumsan nisi dictum quis. Aenean porttitor at mi id semper. Donec mattis bibendum leo, interdum ullamcorper lectus ultrices vel. Fusce nec enim faucibus nunc porta egestas. Fusce dapibus lobortis tincidunt."), /*#__PURE__*/React.createElement(Grid, {
      rows: "small",
      columns: {
        count: 'fit',
        size: 'small'
      },
      gap: "small"
    }, /*#__PURE__*/React.createElement(Card, {
      background: "white",
      pad: "large"
    }, "Card"), /*#__PURE__*/React.createElement(Card, {
      background: "white",
      pad: "large"
    }, "Card"), /*#__PURE__*/React.createElement(Card, {
      background: "white",
      pad: "large"
    }, "Card")), /*#__PURE__*/React.createElement(Paragraph, null, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer commodo gravida tincidunt. Nunc fringilla blandit tortor, id accumsan nisi dictum quis. Aenean porttitor at mi id semper. Donec mattis bibendum leo, interdum ullamcorper lectus ultrices vel. Fusce nec enim faucibus nunc porta egestas. Fusce dapibus lobortis tincidunt.")), open && /*#__PURE__*/React.createElement(Layer, {
      position: "right",
      onClickOutside: onClose,
      onEsc: onClose
    }, /*#__PURE__*/React.createElement(Box, {
      fill: "vertical",
      overflow: "auto"
    }, /*#__PURE__*/React.createElement(Header, {
      background: "light-3",
      sticky: "scrollup",
      pad: {
        vertical: 'small',
        horizontal: 'medium'
      }
    }, /*#__PURE__*/React.createElement(Heading, {
      margin: "none",
      level: 2,
      size: "small"
    }, "Add Monitor"), /*#__PURE__*/React.createElement(Button, {
      icon: /*#__PURE__*/React.createElement(FormClose, null),
      onClick: onClose
    })), /*#__PURE__*/React.createElement(Box, {
      pad: {
        horizontal: 'medium'
      }
    }, /*#__PURE__*/React.createElement(Paragraph, null, "To maximize screen real-estate, the Header on this page scrolls out of view as the user moves down the page. However if the user scrolls upwards, the Header is revealed and fixed atop the window. On long pages this behavior allows easy access to the Headers content, such as navigation or menus, while preventing the Header from obscuring content on mobile devices or in smaller windows."), /*#__PURE__*/React.createElement(Paragraph, null, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer commodo gravida tincidunt. Nunc fringilla blandit tortor, id accumsan nisi dictum quis. Aenean porttitor at mi id semper. Donec mattis bibendum leo, interdum ullamcorper lectus ultrices vel. Fusce nec enim faucibus nunc porta egestas. Fusce dapibus lobortis tincidunt."), /*#__PURE__*/React.createElement(Paragraph, null, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer commodo gravida tincidunt. Nunc fringilla blandit tortor, id accumsan nisi dictum quis. Aenean porttitor at mi id semper. Donec mattis bibendum leo, interdum ullamcorper lectus ultrices vel. Fusce nec enim faucibus nunc porta egestas. Fusce dapibus lobortis tincidunt.")))))
    // </Grommet>
  );
};

Sticky.storyName = 'Sticky';
export default {
  title: 'Layout/Header/Sticky'
};