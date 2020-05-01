import React from 'react';
import { storiesOf } from '@storybook/react';
import { Favorite } from "grommet-icons/es6/icons/Favorite";
import { UserFemale } from "grommet-icons/es6/icons/UserFemale";
import { UserNew } from "grommet-icons/es6/icons/UserNew";
import { Avatar, Box, Grommet, Stack } from 'grommet';
import { grommet } from 'grommet/themes';

var Stacked = function Stacked() {
  var shimi = '//s.gravatar.com/avatar/b7fb138d53ba0f573212ccce38a7c43b?s=80';
  var eric = '//s.gravatar.com/avatar/99020cae7ff399a4fbea19c0634f77c3?s=80';
  var bryan = '//s.gravatar.com/avatar/10d15019166606cfed23846a7f902660?s=80';
  var borderSmall = {
    color: 'white',
    size: 'small'
  };

  var GroupedGravatar = function GroupedGravatar(_ref) {
    var border = _ref.border;
    return /*#__PURE__*/React.createElement(Stack, {
      anchor: "left"
    }, /*#__PURE__*/React.createElement(Avatar, {
      src: bryan,
      border: border
    }), /*#__PURE__*/React.createElement(Avatar, {
      src: eric,
      border: border,
      margin: {
        left: 'medium'
      }
    }), /*#__PURE__*/React.createElement(Avatar, {
      src: shimi,
      border: border,
      margin: {
        left: 'large'
      }
    }));
  };

  var GroupedGravatarCentered = function GroupedGravatarCentered() {
    return /*#__PURE__*/React.createElement(Stack, {
      anchor: "right",
      margin: {
        left: 'xlarge'
      }
    }, /*#__PURE__*/React.createElement(Avatar, {
      src: bryan
    }), /*#__PURE__*/React.createElement(Avatar, {
      src: shimi,
      margin: {
        right: 'large'
      }
    }), /*#__PURE__*/React.createElement(Avatar, {
      src: eric,
      margin: {
        right: 'medium'
      }
    }));
  };

  var GroupedGravatarRTL = function GroupedGravatarRTL() {
    return /*#__PURE__*/React.createElement(Stack, {
      anchor: "right",
      margin: {
        left: 'xlarge'
      }
    }, /*#__PURE__*/React.createElement(Avatar, {
      size: "large",
      src: shimi
    }), /*#__PURE__*/React.createElement(Avatar, {
      size: "large",
      src: eric,
      margin: {
        right: 'large'
      }
    }), /*#__PURE__*/React.createElement(Avatar, {
      size: "large",
      src: bryan,
      margin: {
        right: 'xlarge'
      }
    }));
  };

  var GroupedIcons = function GroupedIcons() {
    return /*#__PURE__*/React.createElement(Stack, {
      anchor: "left"
    }, /*#__PURE__*/React.createElement(Avatar, {
      background: "accent-1"
    }, /*#__PURE__*/React.createElement(UserNew, {
      color: "accent-2"
    })), /*#__PURE__*/React.createElement(Avatar, {
      background: "accent-2",
      margin: {
        left: 'medium'
      }
    }, /*#__PURE__*/React.createElement(UserFemale, {
      color: "accent-1"
    })), /*#__PURE__*/React.createElement(Avatar, {
      background: "accent-4",
      margin: {
        left: 'large'
      }
    }, /*#__PURE__*/React.createElement(Favorite, {
      color: "accent-2"
    })));
  };

  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
    align: "center",
    gap: "medium",
    pad: "large",
    background: "dark-1"
  }, /*#__PURE__*/React.createElement(Stack, {
    anchor: "bottom-right"
  }, /*#__PURE__*/React.createElement(Box, null, /*#__PURE__*/React.createElement(Box, {
    direction: "row"
  }, /*#__PURE__*/React.createElement(Avatar, {
    size: "xlarge",
    src: shimi,
    border: borderSmall
  }), /*#__PURE__*/React.createElement(Box, {
    pad: "xxsmall"
  })), /*#__PURE__*/React.createElement(Box, {
    pad: "xxsmall"
  })), /*#__PURE__*/React.createElement(Avatar, {
    src: eric,
    border: borderSmall
  })), /*#__PURE__*/React.createElement(Stack, {
    anchor: "top-right"
  }, /*#__PURE__*/React.createElement(Avatar, {
    src: shimi
  }), /*#__PURE__*/React.createElement(Box, {
    pad: "xsmall",
    round: true,
    background: "accent-4",
    responsive: false
  })), /*#__PURE__*/React.createElement(GroupedIcons, null), /*#__PURE__*/React.createElement(GroupedGravatar, {
    border: borderSmall
  }), /*#__PURE__*/React.createElement(GroupedGravatarCentered, null), /*#__PURE__*/React.createElement(GroupedGravatarRTL, null)));
};

storiesOf('Avatar', module).add('Stacked', function () {
  return /*#__PURE__*/React.createElement(Stacked, null);
});