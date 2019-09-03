"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _grommetIcons = require("grommet-icons");

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var CenterLayer = function CenterLayer() {
  var _React$useState = _react["default"].useState(),
      open = _React$useState[0],
      setOpen = _React$useState[1];

  var _React$useState2 = _react["default"].useState(),
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

  return _react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet,
    full: true
  }, _react["default"].createElement(_grommet.Box, {
    fill: true,
    align: "center",
    justify: "center"
  }, _react["default"].createElement(_grommet.Button, {
    icon: _react["default"].createElement(_grommetIcons.Trash, null),
    label: _react["default"].createElement(_grommet.Text, null, _react["default"].createElement("strong", null, "Remove")),
    onClick: onOpen,
    plain: true
  })), open && _react["default"].createElement(_grommet.Layer, {
    position: "center",
    modal: true,
    onClickOutside: onClose,
    onEsc: onClose
  }, _react["default"].createElement(_grommet.Box, {
    pad: "medium",
    gap: "small",
    width: "medium"
  }, _react["default"].createElement(_grommet.Heading, {
    level: 3,
    margin: "none"
  }, "Confirm"), _react["default"].createElement(_grommet.Text, null, "Are you sure you want to delete?"), _react["default"].createElement(_grommet.Box, {
    as: "footer",
    gap: "small",
    direction: "row",
    align: "center",
    justify: "end",
    pad: {
      top: 'medium',
      bottom: 'small'
    }
  }, _react["default"].createElement(_grommet.Button, {
    label: "Open 2",
    onClick: onOpen2,
    color: "dark-3"
  }), _react["default"].createElement(_grommet.Button, {
    label: _react["default"].createElement(_grommet.Text, {
      color: "white"
    }, _react["default"].createElement("strong", null, "Delete")),
    onClick: onClose,
    primary: true,
    color: "status-critical"
  })))), open2 && _react["default"].createElement(_grommet.Layer, {
    position: "top",
    modal: true,
    onClickOutside: onClose2,
    onEsc: onClose2
  }, _react["default"].createElement(_grommet.Box, {
    pad: "medium",
    gap: "small",
    width: "medium"
  }, _react["default"].createElement(_grommet.Heading, {
    level: 3,
    margin: "none"
  }, "Confirm 2"), _react["default"].createElement(_grommet.Select, {
    options: ['one', 'two', 'three']
  }), _react["default"].createElement(_grommet.Box, {
    as: "footer",
    gap: "small",
    direction: "row",
    align: "center",
    justify: "end",
    pad: {
      top: 'medium',
      bottom: 'small'
    }
  }, _react["default"].createElement(_grommet.Button, {
    label: "Close",
    onClick: onClose2,
    color: "dark-3"
  })))));
};

var CornerLayer = function CornerLayer() {
  var _React$useState3 = _react["default"].useState(),
      open = _React$useState3[0],
      setOpen = _React$useState3[1];

  var onOpen = function onOpen() {
    return setOpen(true);
  };

  var onClose = function onClose() {
    return setOpen(undefined);
  };

  return _react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet,
    full: true
  }, _react["default"].createElement(_grommet.Box, {
    fill: true,
    align: "center",
    justify: "center"
  }, _react["default"].createElement(_grommet.Button, {
    icon: _react["default"].createElement(_grommetIcons.Add, {
      color: "brand"
    }),
    label: _react["default"].createElement(_grommet.Text, null, _react["default"].createElement("strong", null, "Add Corner Layer")),
    onClick: onOpen,
    plain: true
  })), open && _react["default"].createElement(_grommet.Layer, {
    position: "top-right",
    onClickOutside: onClose
  }, _react["default"].createElement(_grommet.Box, {
    height: "small",
    overflow: "auto"
  }, _react["default"].createElement(_grommet.Box, {
    pad: "xlarge"
  }, "Corner top-right position"))));
};

var FormLayer = function FormLayer() {
  var _React$useState4 = _react["default"].useState(false),
      open = _React$useState4[0],
      setOpen = _React$useState4[1];

  var _React$useState5 = _react["default"].useState(''),
      select = _React$useState5[0],
      setSelect = _React$useState5[1];

  var onOpen = function onOpen() {
    return setOpen(true);
  };

  var onClose = function onClose() {
    return setOpen(undefined);
  };

  return _react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet,
    full: true
  }, _react["default"].createElement(_grommet.Box, {
    fill: true,
    align: "center",
    justify: "center"
  }, _react["default"].createElement(_grommet.Button, {
    icon: _react["default"].createElement(_grommetIcons.Add, null),
    label: "Add",
    onClick: onOpen
  }), open && _react["default"].createElement(_grommet.Layer, {
    position: "right",
    full: "vertical",
    modal: true,
    onClickOutside: onClose,
    onEsc: onClose
  }, _react["default"].createElement(_grommet.Box, {
    as: "form",
    fill: "vertical",
    overflow: "auto",
    width: "medium",
    pad: "medium",
    onSubmit: onClose
  }, _react["default"].createElement(_grommet.Box, {
    flex: false,
    direction: "row",
    justify: "between"
  }, _react["default"].createElement(_grommet.Heading, {
    level: 2,
    margin: "none"
  }, "Add"), _react["default"].createElement(_grommet.Button, {
    icon: _react["default"].createElement(_grommetIcons.Close, null),
    onClick: onClose
  })), _react["default"].createElement(_grommet.Box, {
    flex: "grow",
    overflow: "auto",
    pad: {
      vertical: 'medium'
    }
  }, _react["default"].createElement(_grommet.FormField, {
    label: "First"
  }, _react["default"].createElement(_grommet.TextInput, null)), _react["default"].createElement(_grommet.FormField, {
    label: "Second"
  }, _react["default"].createElement(_grommet.Select, {
    options: ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight'],
    value: select,
    onSearch: function onSearch() {},
    onChange: function onChange(_ref) {
      var option = _ref.option;
      return setSelect(option);
    }
  })), _react["default"].createElement(_grommet.FormField, {
    label: "Third"
  }, _react["default"].createElement(_grommet.TextArea, null))), _react["default"].createElement(_grommet.Box, {
    flex: false,
    as: "footer",
    align: "start"
  }, _react["default"].createElement(_grommet.Button, {
    type: "submit",
    label: "Submit",
    onClick: onClose,
    primary: true
  }))))));
};

var NotificationLayer = function NotificationLayer() {
  var _React$useState6 = _react["default"].useState(),
      open = _React$useState6[0],
      setOpen = _React$useState6[1];

  var onOpen = function onOpen() {
    return setOpen(true);
  };

  var onClose = function onClose() {
    return setOpen(undefined);
  };

  return _react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet,
    full: true
  }, _react["default"].createElement(_grommet.Box, {
    fill: true,
    align: "center",
    justify: "center"
  }, _react["default"].createElement(_grommet.Button, {
    icon: _react["default"].createElement(_grommetIcons.Add, {
      color: "brand"
    }),
    label: _react["default"].createElement(_grommet.Text, null, _react["default"].createElement("strong", null, "Add")),
    onClick: onOpen,
    plain: true
  })), open && _react["default"].createElement(_grommet.Layer, {
    position: "bottom",
    modal: false,
    margin: {
      vertical: 'medium',
      horizontal: 'small'
    },
    onEsc: onClose,
    responsive: false,
    plain: true
  }, _react["default"].createElement(_grommet.Box, {
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
  }, _react["default"].createElement(_grommet.Box, {
    align: "center",
    direction: "row",
    gap: "xsmall"
  }, _react["default"].createElement(_grommetIcons.StatusGood, null), _react["default"].createElement(_grommet.Text, null, "A new virtual machine has been successfully added")), _react["default"].createElement(_grommet.Button, {
    icon: _react["default"].createElement(_grommetIcons.FormClose, null),
    onClick: onClose,
    plain: true
  }))));
};

var MarginLayer = function MarginLayer(_ref2) {
  var margin = _ref2.margin,
      rest = _objectWithoutPropertiesLoose(_ref2, ["margin"]);

  return _react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, _react["default"].createElement(_grommet.Layer, _extends({
    margin: margin || {
      left: '40px',
      top: '50px',
      right: '30px',
      bottom: '10px'
    }
  }, rest), _react["default"].createElement(_grommet.Box, {
    height: "small",
    overflow: "auto"
  }, _react["default"].createElement(_grommet.Box, {
    pad: "xlarge"
  }, "text"), _react["default"].createElement(_grommet.Box, {
    pad: "xlarge"
  }, "text"), _react["default"].createElement(_grommet.Box, {
    pad: "xlarge"
  }, "text"), _react["default"].createElement(_grommet.Box, {
    pad: "xlarge"
  }, "text"), _react["default"].createElement(_grommet.Box, {
    pad: "xlarge"
  }, "text"), _react["default"].createElement(_grommet.Box, {
    pad: "xlarge"
  }, "text"))));
};

var PlainLayer = function PlainLayer() {
  return _react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet,
    full: true
  }, _react["default"].createElement(_grommet.Box, {
    fill: true,
    background: "dark-3"
  }, _react["default"].createElement(_grommet.Layer, {
    margin: "medium",
    plain: true
  }, _react["default"].createElement(_grommet.Box, {
    pad: "large",
    border: {
      color: 'accent-1',
      size: 'large'
    }
  }, _react["default"].createElement(_grommet.Text, {
    color: "accent-2"
  }, "Text")))));
};

var FullLayer = function FullLayer() {
  var _React$useState7 = _react["default"].useState(false),
      showLayer = _React$useState7[0],
      setShowLayer = _React$useState7[1];

  return _react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet,
    full: true
  }, _react["default"].createElement(_grommet.Box, {
    pad: "small",
    fill: true,
    background: "dark-3",
    align: "center",
    justify: "center"
  }, _react["default"].createElement(_grommet.Button, {
    primary: true,
    color: "accent-3",
    label: "Show",
    onClick: function onClick() {
      return setShowLayer(true);
    }
  }), showLayer && _react["default"].createElement(_grommet.Layer, {
    full: true,
    animation: "fadeIn"
  }, _react["default"].createElement(_grommet.Box, {
    fill: true,
    background: "light-4",
    align: "center",
    justify: "center"
  }, _react["default"].createElement(_grommet.Button, {
    primary: true,
    label: "Close",
    onClick: function onClick() {
      return setShowLayer(false);
    }
  })))));
};

var ScrollBodyLayer = function ScrollBodyLayer() {
  return _react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, _react["default"].createElement(_grommet.Layer, {
    full: "vertical",
    position: "right"
  }, _react["default"].createElement(_grommet.Box, {
    fill: true,
    style: {
      minWidth: '378px'
    }
  }, _react["default"].createElement(_grommet.Box, {
    direction: "row",
    align: "center",
    as: "header",
    elevation: "small",
    justify: "between"
  }, _react["default"].createElement(_grommet.Text, {
    margin: {
      left: 'small'
    }
  }, "Header"), _react["default"].createElement(_grommet.Button, {
    icon: _react["default"].createElement(_grommetIcons.FormClose, null)
  })), _react["default"].createElement(_grommet.Box, {
    flex: true,
    overflow: "auto",
    pad: "xsmall"
  }, _react["default"].createElement("span", null, "body"), _react["default"].createElement("span", null, "body"), _react["default"].createElement("span", null, "body"), _react["default"].createElement("span", null, "body"), _react["default"].createElement("span", null, "body"), _react["default"].createElement("span", null, "body"), _react["default"].createElement("span", null, "body"), _react["default"].createElement("span", null, "body"), _react["default"].createElement("span", null, "body"), _react["default"].createElement("span", null, "body"), _react["default"].createElement("span", null, "body"), _react["default"].createElement("span", null, "body"), _react["default"].createElement("span", null, "body"), _react["default"].createElement("span", null, "body"), _react["default"].createElement("span", null, "body"), _react["default"].createElement("span", null, "body"), _react["default"].createElement("span", null, "body"), _react["default"].createElement("span", null, "body"), _react["default"].createElement("span", null, "body"), _react["default"].createElement("span", null, "body"), _react["default"].createElement("span", null, "body"), _react["default"].createElement("span", null, "body"), _react["default"].createElement("span", null, "body"), _react["default"].createElement("span", null, "body"), _react["default"].createElement("span", null, "body"), _react["default"].createElement("span", null, "body"), _react["default"].createElement("span", null, "body"), _react["default"].createElement("span", null, "body"), _react["default"].createElement("span", null, "body"), _react["default"].createElement("span", null, "body"), _react["default"].createElement("span", null, "body"), _react["default"].createElement("span", null, "body"), _react["default"].createElement("span", null, "body"), _react["default"].createElement("span", null, "body"), _react["default"].createElement("span", null, "body"), _react["default"].createElement("span", null, "body"), _react["default"].createElement("span", null, "body"), _react["default"].createElement("span", null, "body"), _react["default"].createElement("span", null, "body"), _react["default"].createElement("span", null, "body"), _react["default"].createElement("span", null, "body"), _react["default"].createElement("span", null, "body"), _react["default"].createElement("span", null, "body"), _react["default"].createElement("span", null, "body"), _react["default"].createElement("span", null, "body"), _react["default"].createElement("span", null, "body"), _react["default"].createElement("span", null, "body"), _react["default"].createElement("span", null, "body"), _react["default"].createElement("span", null, "body"), _react["default"].createElement("span", null, "body"), _react["default"].createElement("span", null, "body"), _react["default"].createElement("span", null, "body"), _react["default"].createElement("span", null, "body"), _react["default"].createElement("span", null, "body"), _react["default"].createElement("span", null, "body"), _react["default"].createElement("span", null, "body"), _react["default"].createElement("span", null, "body"), _react["default"].createElement("span", null, "body"), _react["default"].createElement("span", null, "body"), _react["default"].createElement("span", null, "body"), _react["default"].createElement("span", null, "body"), _react["default"].createElement("span", null, "body"), _react["default"].createElement("span", null, "body")), _react["default"].createElement(_grommet.Box, {
    as: "footer",
    border: {
      side: 'top'
    },
    pad: "small",
    justify: "end",
    direction: "row",
    align: "center"
  }, _react["default"].createElement(_grommet.Button, {
    primary: true,
    label: "Save"
  })))));
};

(0, _react2.storiesOf)('Layer', module).add('Center', function () {
  return _react["default"].createElement(CenterLayer, null);
}).add('Corner', function () {
  return _react["default"].createElement(CornerLayer, null);
}).add('Form', function () {
  return _react["default"].createElement(FormLayer, null);
}).add('Notification', function () {
  return _react["default"].createElement(NotificationLayer, null);
}).add('Margin', function () {
  return _react["default"].createElement(MarginLayer, {
    full: true
  });
}).add('Margin (Center)', function () {
  return _react["default"].createElement(MarginLayer, {
    margin: "large"
  });
}).add('Margin Top (Center)', function () {
  return _react["default"].createElement(MarginLayer, {
    margin: {
      top: 'large'
    },
    position: "top"
  });
}).add('Plain', function () {
  return _react["default"].createElement(PlainLayer, null);
}).add('Full', function () {
  return _react["default"].createElement(FullLayer, null);
}).add('Fixed Header, Scroll Body', function () {
  return _react["default"].createElement(ScrollBodyLayer, null);
});