"use strict";

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react2 = require("@storybook/react");

var _styledComponents = require("styled-components");

var _grommetIcons = require("grommet-icons");

var _grommet = require("grommet");

var _themes = require("grommet/themes");

var _utils = require("grommet/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var UncontrolledTabs = function UncontrolledTabs(_ref) {
  var plain = _ref.plain;
  return _react.default.createElement(_grommet.Grommet, {
    theme: _themes.grommet,
    full: true
  }, _react.default.createElement(_grommet.Box, {
    fill: true
  }, _react.default.createElement(_grommet.Tabs, {
    flex: true
  }, _react.default.createElement(_grommet.Tab, {
    plain: plain,
    title: "Tab 1"
  }, _react.default.createElement(_grommet.Box, {
    fill: true,
    pad: "large",
    align: "center",
    background: "accent-1"
  }, _react.default.createElement(_grommetIcons.Attraction, {
    size: "xlarge"
  }))), _react.default.createElement(_grommet.Tab, {
    plain: plain,
    title: "Tab 2"
  }, _react.default.createElement(_grommet.Box, {
    fill: true,
    pad: "large",
    align: "center",
    background: "accent-2"
  }, _react.default.createElement(_grommetIcons.TreeOption, {
    size: "xlarge"
  }))), _react.default.createElement(_grommet.Tab, {
    plain: plain,
    title: "Tab 3"
  }, _react.default.createElement(_grommet.Box, {
    fill: true,
    pad: "large",
    align: "center",
    background: "accent-3"
  }, _react.default.createElement(_grommetIcons.Car, {
    size: "xlarge"
  }))))));
};

UncontrolledTabs.defaultProps = {
  plain: false
};
UncontrolledTabs.propTypes = {
  plain: _propTypes.default.bool
};

var ControlledTabs =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(ControlledTabs, _Component);

  function ControlledTabs() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "state", {});

    _defineProperty(_assertThisInitialized(_this), "onActive", function (index) {
      return _this.setState({
        index: index
      });
    });

    return _this;
  }

  var _proto = ControlledTabs.prototype;

  _proto.render = function render() {
    var index = this.state.index;
    return _react.default.createElement(_grommet.Grommet, {
      theme: _themes.grommet
    }, _react.default.createElement(_grommet.Tabs, {
      activeIndex: index,
      onActive: this.onActive
    }, _react.default.createElement(_grommet.Tab, {
      title: "Tab 1"
    }, _react.default.createElement(_grommet.Box, {
      margin: "small",
      pad: "large",
      align: "center",
      background: "accent-1"
    }, _react.default.createElement(_grommetIcons.Attraction, {
      size: "xlarge"
    }))), _react.default.createElement(_grommet.Tab, {
      title: "Tab 2"
    }, _react.default.createElement(_grommet.Box, {
      margin: "small",
      pad: "large",
      align: "center",
      background: "accent-2"
    }, _react.default.createElement(_grommetIcons.TreeOption, {
      size: "xlarge"
    }))), _react.default.createElement(_grommet.Tab, {
      title: "Tab 3"
    }, _react.default.createElement(_grommet.Box, {
      margin: "small",
      pad: "large",
      align: "center",
      background: "accent-3"
    }, _react.default.createElement(_grommetIcons.Car, {
      size: "xlarge"
    })))));
  };

  return ControlledTabs;
}(_react.Component);

var ResponsiveTabs =
/*#__PURE__*/
function (_Component2) {
  _inheritsLoose(ResponsiveTabs, _Component2);

  function ResponsiveTabs() {
    var _this2;

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    _this2 = _Component2.call.apply(_Component2, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this2), "state", {});

    _defineProperty(_assertThisInitialized(_this2), "onActive", function (index) {
      return _this2.setState({
        index: index
      });
    });

    return _this2;
  }

  var _proto2 = ResponsiveTabs.prototype;

  _proto2.render = function render() {
    var index = this.state.index;
    return _react.default.createElement(_grommet.Grommet, {
      theme: _themes.grommet
    }, _react.default.createElement(_grommet.Tabs, {
      activeIndex: index,
      onActive: this.onActive
    }, _react.default.createElement(_grommet.Tab, {
      title: "Tab 1"
    }, _react.default.createElement(_grommet.Box, {
      margin: "small",
      pad: "large",
      align: "center",
      background: "accent-1"
    }, _react.default.createElement(_grommetIcons.Attraction, {
      size: "xlarge"
    }))), _react.default.createElement(_grommet.Tab, {
      title: "Tab 2"
    }, _react.default.createElement(_grommet.Box, {
      margin: "small",
      pad: "large",
      align: "center",
      background: "accent-2"
    }, _react.default.createElement(_grommetIcons.TreeOption, {
      size: "xlarge"
    }))), _react.default.createElement(_grommet.Tab, {
      title: "Tab 3"
    }, _react.default.createElement(_grommet.Box, {
      margin: "small",
      pad: "large",
      align: "center",
      background: "accent-3"
    }, _react.default.createElement(_grommetIcons.Car, {
      size: "xlarge"
    }))), _react.default.createElement(_grommet.Tab, {
      title: "Tab 4"
    }, _react.default.createElement(_grommet.Box, {
      margin: "small",
      pad: "large",
      align: "center",
      background: "accent-1"
    }, _react.default.createElement(_grommetIcons.Attraction, {
      size: "xlarge"
    }))), _react.default.createElement(_grommet.Tab, {
      title: "Tab 5"
    }, _react.default.createElement(_grommet.Box, {
      margin: "small",
      pad: "large",
      align: "center",
      background: "accent-2"
    }, _react.default.createElement(_grommetIcons.TreeOption, {
      size: "xlarge"
    }))), _react.default.createElement(_grommet.Tab, {
      title: "Tab 6"
    }, _react.default.createElement(_grommet.Box, {
      margin: "small",
      pad: "large",
      align: "center",
      background: "accent-3"
    }, _react.default.createElement(_grommetIcons.Car, {
      size: "xlarge"
    }))), _react.default.createElement(_grommet.Tab, {
      title: "Tab 7"
    }, _react.default.createElement(_grommet.Box, {
      margin: "small",
      pad: "large",
      align: "center",
      background: "accent-1"
    }, _react.default.createElement(_grommetIcons.Attraction, {
      size: "xlarge"
    }))), _react.default.createElement(_grommet.Tab, {
      title: "Tab 8"
    }, _react.default.createElement(_grommet.Box, {
      margin: "small",
      pad: "large",
      align: "center",
      background: "accent-2"
    }, _react.default.createElement(_grommetIcons.TreeOption, {
      size: "xlarge"
    }))), _react.default.createElement(_grommet.Tab, {
      title: "Tab 9"
    }, _react.default.createElement(_grommet.Box, {
      margin: "small",
      pad: "large",
      align: "center",
      background: "accent-3"
    }, _react.default.createElement(_grommetIcons.Car, {
      size: "xlarge"
    }))), _react.default.createElement(_grommet.Tab, {
      title: "Tab 10"
    }, _react.default.createElement(_grommet.Box, {
      margin: "small",
      pad: "large",
      align: "center",
      background: "accent-1"
    }, _react.default.createElement(_grommetIcons.Attraction, {
      size: "xlarge"
    }))), _react.default.createElement(_grommet.Tab, {
      title: "Tab 11"
    }, _react.default.createElement(_grommet.Box, {
      margin: "small",
      pad: "large",
      align: "center",
      background: "accent-1"
    }, _react.default.createElement(_grommetIcons.Attraction, {
      size: "xlarge"
    }))), _react.default.createElement(_grommet.Tab, {
      title: "Tab 12"
    }, _react.default.createElement(_grommet.Box, {
      margin: "small",
      pad: "large",
      align: "center",
      background: "accent-2"
    }, _react.default.createElement(_grommetIcons.TreeOption, {
      size: "xlarge"
    }))), _react.default.createElement(_grommet.Tab, {
      title: "Tab 13"
    }, _react.default.createElement(_grommet.Box, {
      margin: "small",
      pad: "large",
      align: "center",
      background: "accent-3"
    }, _react.default.createElement(_grommetIcons.Car, {
      size: "xlarge"
    }))), _react.default.createElement(_grommet.Tab, {
      title: "Tab 14"
    }, _react.default.createElement(_grommet.Box, {
      margin: "small",
      pad: "large",
      align: "center",
      background: "accent-1"
    }, _react.default.createElement(_grommetIcons.Attraction, {
      size: "xlarge"
    }))), _react.default.createElement(_grommet.Tab, {
      title: "Tab 15"
    }, _react.default.createElement(_grommet.Box, {
      margin: "small",
      pad: "large",
      align: "center",
      background: "accent-2"
    }, _react.default.createElement(_grommetIcons.TreeOption, {
      size: "xlarge"
    }))), _react.default.createElement(_grommet.Tab, {
      title: "Tab 16"
    }, _react.default.createElement(_grommet.Box, {
      margin: "small",
      pad: "large",
      align: "center",
      background: "accent-3"
    }, _react.default.createElement(_grommetIcons.Car, {
      size: "xlarge"
    }))), _react.default.createElement(_grommet.Tab, {
      title: "Tab 17"
    }, _react.default.createElement(_grommet.Box, {
      margin: "small",
      pad: "large",
      align: "center",
      background: "accent-1"
    }, _react.default.createElement(_grommetIcons.Attraction, {
      size: "xlarge"
    }))), _react.default.createElement(_grommet.Tab, {
      title: "Tab 18"
    }, _react.default.createElement(_grommet.Box, {
      margin: "small",
      pad: "large",
      align: "center",
      background: "accent-2"
    }, _react.default.createElement(_grommetIcons.TreeOption, {
      size: "xlarge"
    }))), _react.default.createElement(_grommet.Tab, {
      title: "Tab 19"
    }, _react.default.createElement(_grommet.Box, {
      margin: "small",
      pad: "large",
      align: "center",
      background: "accent-3"
    }, _react.default.createElement(_grommetIcons.Car, {
      size: "xlarge"
    }))), _react.default.createElement(_grommet.Tab, {
      title: "Tab 20"
    }, _react.default.createElement(_grommet.Box, {
      margin: "small",
      pad: "large",
      align: "center",
      background: "accent-1"
    }, _react.default.createElement(_grommetIcons.Attraction, {
      size: "xlarge"
    })))));
  };

  return ResponsiveTabs;
}(_react.Component);

var RichTabTitle = function RichTabTitle(_ref2) {
  var icon = _ref2.icon,
      label = _ref2.label;
  return _react.default.createElement(_grommet.Box, {
    direction: "row",
    align: "center",
    gap: "xsmall",
    margin: "xsmall"
  }, icon, _react.default.createElement(_grommet.Text, {
    size: "small"
  }, _react.default.createElement("strong", null, label)));
};

RichTabTitle.propTypes = {
  icon: _propTypes.default.node.isRequired,
  label: _propTypes.default.string.isRequired
};

var RichTabs = function RichTabs() {
  return _react.default.createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, _react.default.createElement(_grommet.Tabs, null, _react.default.createElement(_grommet.Tab, {
    title: _react.default.createElement(RichTabTitle, {
      icon: _react.default.createElement(_grommetIcons.CircleInformation, {
        color: "accent-2"
      }),
      label: "Personal Data"
    })
  }, _react.default.createElement(_grommet.FormField, {
    label: "Name"
  }, _react.default.createElement(_grommet.TextInput, {
    placeholder: "Enter your name..."
  }))), _react.default.createElement(_grommet.Tab, {
    title: _react.default.createElement(RichTabTitle, {
      icon: _react.default.createElement(_grommetIcons.Currency, {
        color: "neutral-2"
      }),
      label: "Payment"
    })
  }, _react.default.createElement(_grommet.FormField, {
    label: "Card Number"
  }, _react.default.createElement(_grommet.TextInput, {
    placeholder: "Enter your card number..."
  })))));
};

var customTheme = (0, _utils.deepMerge)(_themes.grommet, {
  global: {
    edgeSize: {
      small: '10px'
    },
    elevation: {
      light: {
        small: '0px 1px 5px rgba(0, 0, 0, 0.50)',
        medium: '0px 3px 8px rgba(0, 0, 0, 0.50)'
      }
    }
  },
  tab: {
    active: {
      background: 'dark-1',
      color: 'accent-1'
    },
    background: 'dark-3',
    border: undefined,
    color: 'white',
    hover: {
      background: 'dark-1'
    },
    margin: undefined,
    pad: {
      bottom: undefined,
      horizontal: 'small'
    },
    extend: function extend(_ref3) {
      var theme = _ref3.theme;
      return (0, _styledComponents.css)(["border-radius:", ";box-shadow:", ";"], theme.global.control.border.radius, theme.global.elevation.light.small);
    }
  },
  tabs: {
    background: 'dark-3',
    gap: 'medium',
    header: {
      background: 'dark-2',
      extend: function extend(_ref4) {
        var theme = _ref4.theme;
        return (0, _styledComponents.css)(["padding:", ";box-shadow:", ";"], theme.global.edgeSize.small, theme.global.elevation.light.medium);
      }
    },
    panel: {
      extend: function extend(_ref5) {
        var theme = _ref5.theme;
        return (0, _styledComponents.css)(["padding:", ";box-shadow:", ";"], theme.global.edgeSize.large, theme.global.elevation.light.medium);
      }
    }
  }
});

var CustomTabs = function CustomTabs() {
  return _react.default.createElement(_grommet.Grommet, {
    theme: customTheme
  }, _react.default.createElement(_grommet.Tabs, null, _react.default.createElement(_grommet.Tab, {
    title: _react.default.createElement(RichTabTitle, {
      icon: _react.default.createElement(_grommetIcons.CircleInformation, {
        color: "accent-1"
      }),
      label: "Personal Data"
    })
  }, _react.default.createElement(_grommet.FormField, {
    label: "Name"
  }, _react.default.createElement(_grommet.TextInput, {
    placeholder: "Enter your name..."
  }))), _react.default.createElement(_grommet.Tab, {
    title: _react.default.createElement(RichTabTitle, {
      icon: _react.default.createElement(_grommetIcons.Currency, {
        color: "light-3"
      }),
      label: "Payment"
    })
  }, _react.default.createElement(_grommet.FormField, {
    label: "Card Number"
  }, _react.default.createElement(_grommet.TextInput, {
    placeholder: "Enter your card number..."
  }))), _react.default.createElement(_grommet.Tab, {
    title: "Simple Tab"
  }, "This Tab has a different styling than the RichTabTitle (e.g tab.active.color)")));
};

var ScrollableTabs = function ScrollableTabs() {
  return _react.default.createElement(_grommet.Grommet, {
    theme: _themes.grommet,
    full: true
  }, _react.default.createElement(_grommet.Box, {
    fill: true
  }, _react.default.createElement(_grommet.Tabs, {
    flex: true
  }, _react.default.createElement(_grommet.Tab, {
    title: "Tab 1"
  }, _react.default.createElement(_grommet.Box, {
    fill: true,
    overflow: "auto",
    pad: "xlarge",
    align: "center",
    background: "accent-1"
  }, _react.default.createElement(_grommet.Heading, null, "hello!"), _react.default.createElement(_grommet.Heading, null, "hello!"), _react.default.createElement(_grommet.Heading, null, "hello!"), _react.default.createElement(_grommet.Heading, null, "hello!"), _react.default.createElement(_grommet.Heading, null, "hello!"), _react.default.createElement(_grommet.Heading, null, "hello!"), _react.default.createElement(_grommet.Heading, null, "hello!"), _react.default.createElement(_grommet.Heading, null, "hello!"), _react.default.createElement(_grommet.Heading, null, "hello!"), _react.default.createElement(_grommet.Heading, null, "hello!"), _react.default.createElement(_grommet.Heading, null, "hello!"), _react.default.createElement(_grommet.Heading, null, "hello!"), _react.default.createElement(_grommet.Heading, null, "hello!"), _react.default.createElement(_grommet.Heading, null, "hello!"), _react.default.createElement(_grommet.Heading, null, "hello!"), _react.default.createElement(_grommet.Heading, null, "hello!"), _react.default.createElement(_grommet.Heading, null, "hello!"), _react.default.createElement(_grommet.Heading, null, "hello!"), _react.default.createElement(_grommet.Heading, null, "hello!"), _react.default.createElement(_grommet.Heading, null, "hello!"))), _react.default.createElement(_grommet.Tab, {
    title: "Tab 2"
  }, _react.default.createElement(_grommet.Box, {
    margin: "small",
    pad: "large",
    align: "center",
    background: "accent-2"
  }, _react.default.createElement(_grommetIcons.TreeOption, {
    size: "xlarge"
  }))))));
};

(0, _react2.storiesOf)('Tabs', module).add('Uncontrolled', function () {
  return _react.default.createElement(UncontrolledTabs, null);
}).add('Controlled', function () {
  return _react.default.createElement(ControlledTabs, null);
}).add('Responsive', function () {
  return _react.default.createElement(ResponsiveTabs, null);
}).add('Rich', function () {
  return _react.default.createElement(RichTabs, null);
}).add('Custom Theme', function () {
  return _react.default.createElement(CustomTabs, null);
}).add('Scrollable', function () {
  return _react.default.createElement(ScrollableTabs, null);
}).add('Plain', function () {
  return _react.default.createElement(UncontrolledTabs, {
    plain: true
  });
});