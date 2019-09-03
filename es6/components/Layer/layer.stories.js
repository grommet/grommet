function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import { storiesOf } from '@storybook/react';
import { Add } from "grommet-icons/es6/icons/Add";
import { Close } from "grommet-icons/es6/icons/Close";
import { FormClose } from "grommet-icons/es6/icons/FormClose";
import { StatusGood } from "grommet-icons/es6/icons/StatusGood";
import { Trash } from "grommet-icons/es6/icons/Trash";
import { Box, Button, FormField, Grommet, Heading, Layer, Select, Text, TextArea, TextInput } from 'grommet';
import { grommet } from 'grommet/themes';

var CenterLayer = function CenterLayer() {
  var _React$useState = React.useState(),
      open = _React$useState[0],
      setOpen = _React$useState[1];

  var _React$useState2 = React.useState(),
      open2 = _React$useState2[0],
      setOpen2 = _React$useState2[1];

  var onOpen = function onOpen() {
    return setOpen(true);
  };

  var onClose = function onClose() {
    return setOpen(undefined);
  };

  var onOpen2 = function onOpen2() {
    return setOpen2(true);
  };

  var onClose2 = function onClose2() {
    return setOpen2(undefined);
  };

  return React.createElement(Grommet, {
    theme: grommet,
    full: true
  }, React.createElement(Box, {
    fill: true,
    align: "center",
    justify: "center"
  }, React.createElement(Button, {
    icon: React.createElement(Trash, null),
    label: React.createElement(Text, null, React.createElement("strong", null, "Remove")),
    onClick: onOpen,
    plain: true
  })), open && React.createElement(Layer, {
    position: "center",
    modal: true,
    onClickOutside: onClose,
    onEsc: onClose
  }, React.createElement(Box, {
    pad: "medium",
    gap: "small",
    width: "medium"
  }, React.createElement(Heading, {
    level: 3,
    margin: "none"
  }, "Confirm"), React.createElement(Text, null, "Are you sure you want to delete?"), React.createElement(Box, {
    as: "footer",
    gap: "small",
    direction: "row",
    align: "center",
    justify: "end",
    pad: {
      top: 'medium',
      bottom: 'small'
    }
  }, React.createElement(Button, {
    label: "Open 2",
    onClick: onOpen2,
    color: "dark-3"
  }), React.createElement(Button, {
    label: React.createElement(Text, {
      color: "white"
    }, React.createElement("strong", null, "Delete")),
    onClick: onClose,
    primary: true,
    color: "status-critical"
  })))), open2 && React.createElement(Layer, {
    position: "top",
    modal: true,
    onClickOutside: onClose2,
    onEsc: onClose2
  }, React.createElement(Box, {
    pad: "medium",
    gap: "small",
    width: "medium"
  }, React.createElement(Heading, {
    level: 3,
    margin: "none"
  }, "Confirm 2"), React.createElement(Select, {
    options: ['one', 'two', 'three']
  }), React.createElement(Box, {
    as: "footer",
    gap: "small",
    direction: "row",
    align: "center",
    justify: "end",
    pad: {
      top: 'medium',
      bottom: 'small'
    }
  }, React.createElement(Button, {
    label: "Close",
    onClick: onClose2,
    color: "dark-3"
  })))));
};

var CornerLayer = function CornerLayer() {
  var _React$useState3 = React.useState(),
      open = _React$useState3[0],
      setOpen = _React$useState3[1];

  var onOpen = function onOpen() {
    return setOpen(true);
  };

  var onClose = function onClose() {
    return setOpen(undefined);
  };

  return React.createElement(Grommet, {
    theme: grommet,
    full: true
  }, React.createElement(Box, {
    fill: true,
    align: "center",
    justify: "center"
  }, React.createElement(Button, {
    icon: React.createElement(Add, {
      color: "brand"
    }),
    label: React.createElement(Text, null, React.createElement("strong", null, "Add Corner Layer")),
    onClick: onOpen,
    plain: true
  })), open && React.createElement(Layer, {
    position: "top-right",
    onClickOutside: onClose
  }, React.createElement(Box, {
    height: "small",
    overflow: "auto"
  }, React.createElement(Box, {
    pad: "xlarge"
  }, "Corner top-right position"))));
};

var FormLayer = function FormLayer() {
  var _React$useState4 = React.useState(false),
      open = _React$useState4[0],
      setOpen = _React$useState4[1];

  var _React$useState5 = React.useState(''),
      select = _React$useState5[0],
      setSelect = _React$useState5[1];

  var onOpen = function onOpen() {
    return setOpen(true);
  };

  var onClose = function onClose() {
    return setOpen(undefined);
  };

  return React.createElement(Grommet, {
    theme: grommet,
    full: true
  }, React.createElement(Box, {
    fill: true,
    align: "center",
    justify: "center"
  }, React.createElement(Button, {
    icon: React.createElement(Add, null),
    label: "Add",
    onClick: onOpen
  }), open && React.createElement(Layer, {
    position: "right",
    full: "vertical",
    modal: true,
    onClickOutside: onClose,
    onEsc: onClose
  }, React.createElement(Box, {
    as: "form",
    fill: "vertical",
    overflow: "auto",
    width: "medium",
    pad: "medium",
    onSubmit: onClose
  }, React.createElement(Box, {
    flex: false,
    direction: "row",
    justify: "between"
  }, React.createElement(Heading, {
    level: 2,
    margin: "none"
  }, "Add"), React.createElement(Button, {
    icon: React.createElement(Close, null),
    onClick: onClose
  })), React.createElement(Box, {
    flex: "grow",
    overflow: "auto",
    pad: {
      vertical: 'medium'
    }
  }, React.createElement(FormField, {
    label: "First"
  }, React.createElement(TextInput, null)), React.createElement(FormField, {
    label: "Second"
  }, React.createElement(Select, {
    options: ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight'],
    value: select,
    onSearch: function onSearch() {},
    onChange: function onChange(_ref) {
      var option = _ref.option;
      return setSelect(option);
    }
  })), React.createElement(FormField, {
    label: "Third"
  }, React.createElement(TextArea, null))), React.createElement(Box, {
    flex: false,
    as: "footer",
    align: "start"
  }, React.createElement(Button, {
    type: "submit",
    label: "Submit",
    onClick: onClose,
    primary: true
  }))))));
};

var NotificationLayer = function NotificationLayer() {
  var _React$useState6 = React.useState(),
      open = _React$useState6[0],
      setOpen = _React$useState6[1];

  var onOpen = function onOpen() {
    return setOpen(true);
  };

  var onClose = function onClose() {
    return setOpen(undefined);
  };

  return React.createElement(Grommet, {
    theme: grommet,
    full: true
  }, React.createElement(Box, {
    fill: true,
    align: "center",
    justify: "center"
  }, React.createElement(Button, {
    icon: React.createElement(Add, {
      color: "brand"
    }),
    label: React.createElement(Text, null, React.createElement("strong", null, "Add")),
    onClick: onOpen,
    plain: true
  })), open && React.createElement(Layer, {
    position: "bottom",
    modal: false,
    margin: {
      vertical: 'medium',
      horizontal: 'small'
    },
    onEsc: onClose,
    responsive: false,
    plain: true
  }, React.createElement(Box, {
    align: "center",
    direction: "row",
    gap: "small",
    justify: "between",
    round: "medium",
    elevation: "medium",
    pad: {
      vertical: 'xsmall',
      horizontal: 'small'
    },
    background: "status-ok"
  }, React.createElement(Box, {
    align: "center",
    direction: "row",
    gap: "xsmall"
  }, React.createElement(StatusGood, null), React.createElement(Text, null, "A new virtual machine has been successfully added")), React.createElement(Button, {
    icon: React.createElement(FormClose, null),
    onClick: onClose,
    plain: true
  }))));
};

var MarginLayer = function MarginLayer(_ref2) {
  var margin = _ref2.margin,
      rest = _objectWithoutPropertiesLoose(_ref2, ["margin"]);

  return React.createElement(Grommet, {
    theme: grommet
  }, React.createElement(Layer, _extends({
    margin: margin || {
      left: '40px',
      top: '50px',
      right: '30px',
      bottom: '10px'
    }
  }, rest), React.createElement(Box, {
    height: "small",
    overflow: "auto"
  }, React.createElement(Box, {
    pad: "xlarge"
  }, "text"), React.createElement(Box, {
    pad: "xlarge"
  }, "text"), React.createElement(Box, {
    pad: "xlarge"
  }, "text"), React.createElement(Box, {
    pad: "xlarge"
  }, "text"), React.createElement(Box, {
    pad: "xlarge"
  }, "text"), React.createElement(Box, {
    pad: "xlarge"
  }, "text"))));
};

var PlainLayer = function PlainLayer() {
  return React.createElement(Grommet, {
    theme: grommet,
    full: true
  }, React.createElement(Box, {
    fill: true,
    background: "dark-3"
  }, React.createElement(Layer, {
    margin: "medium",
    plain: true
  }, React.createElement(Box, {
    pad: "large",
    border: {
      color: 'accent-1',
      size: 'large'
    }
  }, React.createElement(Text, {
    color: "accent-2"
  }, "Text")))));
};

var FullLayer = function FullLayer() {
  var _React$useState7 = React.useState(false),
      showLayer = _React$useState7[0],
      setShowLayer = _React$useState7[1];

  return React.createElement(Grommet, {
    theme: grommet,
    full: true
  }, React.createElement(Box, {
    pad: "small",
    fill: true,
    background: "dark-3",
    align: "center",
    justify: "center"
  }, React.createElement(Button, {
    primary: true,
    color: "accent-3",
    label: "Show",
    onClick: function onClick() {
      return setShowLayer(true);
    }
  }), showLayer && React.createElement(Layer, {
    full: true,
    animation: "fadeIn"
  }, React.createElement(Box, {
    fill: true,
    background: "light-4",
    align: "center",
    justify: "center"
  }, React.createElement(Button, {
    primary: true,
    label: "Close",
    onClick: function onClick() {
      return setShowLayer(false);
    }
  })))));
};

var ScrollBodyLayer = function ScrollBodyLayer() {
  return React.createElement(Grommet, {
    theme: grommet
  }, React.createElement(Layer, {
    full: "vertical",
    position: "right"
  }, React.createElement(Box, {
    fill: true,
    style: {
      minWidth: '378px'
    }
  }, React.createElement(Box, {
    direction: "row",
    align: "center",
    as: "header",
    elevation: "small",
    justify: "between"
  }, React.createElement(Text, {
    margin: {
      left: 'small'
    }
  }, "Header"), React.createElement(Button, {
    icon: React.createElement(FormClose, null)
  })), React.createElement(Box, {
    flex: true,
    overflow: "auto",
    pad: "xsmall"
  }, React.createElement("span", null, "body"), React.createElement("span", null, "body"), React.createElement("span", null, "body"), React.createElement("span", null, "body"), React.createElement("span", null, "body"), React.createElement("span", null, "body"), React.createElement("span", null, "body"), React.createElement("span", null, "body"), React.createElement("span", null, "body"), React.createElement("span", null, "body"), React.createElement("span", null, "body"), React.createElement("span", null, "body"), React.createElement("span", null, "body"), React.createElement("span", null, "body"), React.createElement("span", null, "body"), React.createElement("span", null, "body"), React.createElement("span", null, "body"), React.createElement("span", null, "body"), React.createElement("span", null, "body"), React.createElement("span", null, "body"), React.createElement("span", null, "body"), React.createElement("span", null, "body"), React.createElement("span", null, "body"), React.createElement("span", null, "body"), React.createElement("span", null, "body"), React.createElement("span", null, "body"), React.createElement("span", null, "body"), React.createElement("span", null, "body"), React.createElement("span", null, "body"), React.createElement("span", null, "body"), React.createElement("span", null, "body"), React.createElement("span", null, "body"), React.createElement("span", null, "body"), React.createElement("span", null, "body"), React.createElement("span", null, "body"), React.createElement("span", null, "body"), React.createElement("span", null, "body"), React.createElement("span", null, "body"), React.createElement("span", null, "body"), React.createElement("span", null, "body"), React.createElement("span", null, "body"), React.createElement("span", null, "body"), React.createElement("span", null, "body"), React.createElement("span", null, "body"), React.createElement("span", null, "body"), React.createElement("span", null, "body"), React.createElement("span", null, "body"), React.createElement("span", null, "body"), React.createElement("span", null, "body"), React.createElement("span", null, "body"), React.createElement("span", null, "body"), React.createElement("span", null, "body"), React.createElement("span", null, "body"), React.createElement("span", null, "body"), React.createElement("span", null, "body"), React.createElement("span", null, "body"), React.createElement("span", null, "body"), React.createElement("span", null, "body"), React.createElement("span", null, "body"), React.createElement("span", null, "body"), React.createElement("span", null, "body"), React.createElement("span", null, "body"), React.createElement("span", null, "body")), React.createElement(Box, {
    as: "footer",
    border: {
      side: 'top'
    },
    pad: "small",
    justify: "end",
    direction: "row",
    align: "center"
  }, React.createElement(Button, {
    primary: true,
    label: "Save"
  })))));
};

storiesOf('Layer', module).add('Center', function () {
  return React.createElement(CenterLayer, null);
}).add('Corner', function () {
  return React.createElement(CornerLayer, null);
}).add('Form', function () {
  return React.createElement(FormLayer, null);
}).add('Notification', function () {
  return React.createElement(NotificationLayer, null);
}).add('Margin', function () {
  return React.createElement(MarginLayer, {
    full: true
  });
}).add('Margin (Center)', function () {
  return React.createElement(MarginLayer, {
    margin: "large"
  });
}).add('Margin Top (Center)', function () {
  return React.createElement(MarginLayer, {
    margin: {
      top: 'large'
    },
    position: "top"
  });
}).add('Plain', function () {
  return React.createElement(PlainLayer, null);
}).add('Full', function () {
  return React.createElement(FullLayer, null);
}).add('Fixed Header, Scroll Body', function () {
  return React.createElement(ScrollBodyLayer, null);
});