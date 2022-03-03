import React, { useState } from 'react';
import { Button, NameValueList, NameValuePair, Notification, Grommet, grommet, Header, Heading, Paragraph } from 'grommet';
import { deepMerge } from 'grommet/utils';
import { Grommet as GrommetIcon } from "grommet-icons/es6/icons/Grommet";
import { AppsRounded } from "grommet-icons/es6/icons/AppsRounded";
import { Box } from '../../Box';
import { Text } from '../../Text';
import { data } from '../../NameValueList/stories/data'; // demonstrating how we would update the HPE theme while allowing
// grommet theme to be backwards compatible.

var customTheme = deepMerge(grommet, {
  global: {
    colors: {
      'validation-critical': {
        light: '#FC61613D',
        dark: '#C54E4B5C'
      },
      'validation-ok': {
        light: '#17EBA03D',
        dark: '#00856759'
      },
      'validation-warning': {
        light: '#FFBC443D',
        dark: '#9B63105C'
      }
    }
  },
  notification: {
    direction: 'row',
    container: {
      round: 'xsmall'
    },
    global: {
      container: {
        round: 'none'
      }
    },
    toast: {
      direction: 'column'
    },
    critical: {
      background: 'validation-critical',
      toast: {
        background: 'background-front'
      }
    },
    warning: {
      background: 'validation-warning',
      toast: {
        background: 'background-front'
      }
    },
    normal: {
      background: 'validation-ok',
      toast: {
        background: 'background-front'
      }
    },
    unknown: {
      background: 'background-contrast',
      toast: {
        background: 'background-front'
      }
    },
    info: {
      background: 'background-contrast',
      toast: {
        background: 'background-front'
      }
    },
    undefined: {
      background: 'background-contrast',
      toast: {
        background: 'background-front'
      }
    }
  }
});
export var Global = function Global() {
  var _useState = useState(true),
      showGlobalNotification = _useState[0],
      setShowGlobalNotification = _useState[1];

  return /*#__PURE__*/React.createElement(Grommet, {
    theme: customTheme,
    full: "min"
  }, /*#__PURE__*/React.createElement(Header, {
    border: "bottom",
    pad: {
      horizontal: 'large',
      vertical: 'small'
    }
  }, /*#__PURE__*/React.createElement(Box, {
    direction: "row",
    align: "center",
    gap: "small"
  }, /*#__PURE__*/React.createElement(GrommetIcon, {
    size: "large",
    color: "plain"
  }), /*#__PURE__*/React.createElement(Text, {
    weight: "bold"
  }, "Company Name")), /*#__PURE__*/React.createElement(Button, {
    icon: /*#__PURE__*/React.createElement(AppsRounded, null)
  })), /*#__PURE__*/React.createElement(Box, {
    gap: "medium"
  }, showGlobalNotification && /*#__PURE__*/React.createElement(Notification, {
    status: "warning",
    message: "Your supscription will expire in 7 days. Renew your \n            subscription to ensure you don't lose access.",
    onClose: function onClose() {
      return setShowGlobalNotification(false);
    },
    actions: [{
      href: '#',
      label: 'Renew Subscription'
    }],
    global: true
  }), /*#__PURE__*/React.createElement(Box, {
    width: "large",
    margin: "auto",
    pad: "medium",
    gap: "medium"
  }, /*#__PURE__*/React.createElement(Header, null, /*#__PURE__*/React.createElement(Heading, {
    margin: "none"
  }, "Page Heading"), /*#__PURE__*/React.createElement(Button, {
    alignSelf: "start",
    label: "Page-level Action",
    primary: true
  })), /*#__PURE__*/React.createElement(Paragraph, {
    margin: "none"
  }, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam aliquet vitae velit non cursus. Aliquam fringilla dapibus elit, non fermentum neque tempor non."), /*#__PURE__*/React.createElement(Heading, {
    margin: "none",
    level: 2
  }, "Details"), /*#__PURE__*/React.createElement(NameValueList, null, Object.entries(data).map(function (_ref) {
    var name = _ref[0],
        value = _ref[1];
    return /*#__PURE__*/React.createElement(NameValuePair, {
      key: name,
      name: name
    }, value);
  })))));
};
export default {
  title: 'Visualizations/Notification/Global'
};