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
    return React.createElement(Stack, {
      anchor: "left"
    }, React.createElement(Avatar, {
      src: bryan,
      border: border
    }), React.createElement(Avatar, {
      src: eric,
      border: border,
      margin: {
        left: 'medium'
      }
    }), React.createElement(Avatar, {
      src: shimi,
      border: border,
      margin: {
        left: 'large'
      }
    }));
  };

  var GroupedGravatarCentered = function GroupedGravatarCentered() {
    return React.createElement(Stack, {
      anchor: "right",
      margin: {
        left: 'xlarge'
      }
    }, React.createElement(Avatar, {
      src: bryan
    }), React.createElement(Avatar, {
      src: shimi,
      margin: {
        right: 'large'
      }
    }), React.createElement(Avatar, {
      src: eric,
      margin: {
        right: 'medium'
      }
    }));
  };

  var GroupedGravatarRTL = function GroupedGravatarRTL() {
    return React.createElement(Stack, {
      anchor: "right",
      margin: {
        left: 'xlarge'
      }
    }, React.createElement(Avatar, {
      size: "large",
      src: shimi
    }), React.createElement(Avatar, {
      size: "large",
      src: eric,
      margin: {
        right: 'large'
      }
    }), React.createElement(Avatar, {
      size: "large",
      src: bryan,
      margin: {
        right: 'xlarge'
      }
    }));
  };

  var GroupedIcons = function GroupedIcons() {
    return React.createElement(Stack, {
      anchor: "left"
    }, React.createElement(Avatar, {
      background: "accent-1"
    }, React.createElement(UserNew, {
      color: "accent-2"
    })), React.createElement(Avatar, {
      background: "accent-2",
      margin: {
        left: 'medium'
      }
    }, React.createElement(UserFemale, {
      color: "accent-1"
    })), React.createElement(Avatar, {
      background: "accent-4",
      margin: {
        left: 'large'
      }
    }, React.createElement(Favorite, {
      color: "accent-2"
    })));
  };

  return React.createElement(Grommet, {
    theme: grommet
  }, React.createElement(Box, {
    align: "center",
    gap: "medium",
    pad: "large",
    background: "dark-1"
  }, React.createElement(Stack, {
    anchor: "bottom-right"
  }, React.createElement(Box, null, React.createElement(Box, {
    direction: "row"
  }, React.createElement(Avatar, {
    size: "xlarge",
    src: shimi,
    border: borderSmall
  }), React.createElement(Box, {
    pad: "xxsmall"
  })), React.createElement(Box, {
    pad: "xxsmall"
  })), React.createElement(Avatar, {
    src: eric,
    border: borderSmall
  })), React.createElement(Stack, {
    anchor: "top-right"
  }, React.createElement(Avatar, {
    src: shimi
  }), React.createElement(Box, {
    pad: "xsmall",
    round: true,
    background: "accent-4",
    responsive: false
  })), React.createElement(GroupedIcons, null), React.createElement(GroupedGravatar, {
    border: borderSmall
  }), React.createElement(GroupedGravatarCentered, null), React.createElement(GroupedGravatarRTL, null)));
};

storiesOf('Avatar', module).add('Stacked', function () {
  return React.createElement(Stacked, null);
});