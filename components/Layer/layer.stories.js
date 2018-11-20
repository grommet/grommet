"use strict";

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@storybook/react");

var _grommetIcons = require("grommet-icons");

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var CenterLayer =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(CenterLayer, _Component);

  function CenterLayer() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {});

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onOpen", function () {
      return _this.setState({
        open: true
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onClose", function () {
      return _this.setState({
        open: undefined
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onOpen2", function () {
      return _this.setState({
        open2: true
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onClose2", function () {
      return _this.setState({
        open2: undefined
      });
    });

    return _this;
  }

  var _proto = CenterLayer.prototype;

  _proto.render = function render() {
    var _this$state = this.state,
        open = _this$state.open,
        open2 = _this$state.open2;
    return _react.default.createElement(_grommet.Grommet, {
      theme: _themes.grommet,
      full: true
    }, _react.default.createElement(_grommet.Box, {
      fill: true,
      align: "center",
      justify: "center"
    }, _react.default.createElement(_grommet.Button, {
      icon: _react.default.createElement(_grommetIcons.Trash, null),
      label: _react.default.createElement(_grommet.Text, null, _react.default.createElement("strong", null, "Remove")),
      onClick: this.onOpen,
      plain: true
    })), open && _react.default.createElement(_grommet.Layer, {
      position: "center",
      modal: true,
      onClickOutside: this.onClose,
      onEsc: this.onClose
    }, _react.default.createElement(_grommet.Box, {
      pad: "medium",
      gap: "small",
      width: "medium"
    }, _react.default.createElement(_grommet.Heading, {
      level: 3,
      margin: "none"
    }, "Confirm"), _react.default.createElement(_grommet.Text, null, "Are you sure you want to delete?"), _react.default.createElement(_grommet.Box, {
      tag: "footer",
      gap: "small",
      direction: "row",
      align: "center",
      justify: "end",
      pad: {
        top: 'medium',
        bottom: 'small'
      }
    }, _react.default.createElement(_grommet.Button, {
      label: "Open 2",
      onClick: this.onOpen2,
      color: "dark-6"
    }), _react.default.createElement(_grommet.Button, {
      label: _react.default.createElement(_grommet.Text, {
        color: "white"
      }, _react.default.createElement("strong", null, "Delete")),
      onClick: this.onClose,
      primary: true,
      color: "status-critical"
    })))), open2 && _react.default.createElement(_grommet.Layer, {
      position: "top",
      modal: true,
      onClickOutside: this.onClose2,
      onEsc: this.onClose2
    }, _react.default.createElement(_grommet.Box, {
      pad: "medium",
      gap: "small",
      width: "medium"
    }, _react.default.createElement(_grommet.Heading, {
      level: 3,
      margin: "none"
    }, "Confirm 2"), _react.default.createElement(_grommet.Box, {
      tag: "footer",
      gap: "small",
      direction: "row",
      align: "center",
      justify: "end",
      pad: {
        top: 'medium',
        bottom: 'small'
      }
    }, _react.default.createElement(_grommet.Button, {
      label: "Close",
      onClick: this.onClose2,
      color: "dark-6"
    })))));
  };

  return CenterLayer;
}(_react.Component);

var FormLayer =
/*#__PURE__*/
function (_Component2) {
  _inheritsLoose(FormLayer, _Component2);

  function FormLayer() {
    var _this2;

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    _this2 = _Component2.call.apply(_Component2, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this2)), "state", {
      fourthOption: 'one',
      open: false
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this2)), "onOpen", function () {
      return _this2.setState({
        open: true
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this2)), "onClose", function () {
      _this2.setState({
        open: undefined
      });
    });

    return _this2;
  }

  var _proto2 = FormLayer.prototype;

  _proto2.render = function render() {
    var _this3 = this;

    var _this$state2 = this.state,
        open = _this$state2.open,
        fourthOption = _this$state2.fourthOption;
    return _react.default.createElement(_grommet.Grommet, {
      theme: _themes.grommet,
      full: true
    }, _react.default.createElement(_grommet.Box, {
      fill: true,
      align: "center",
      justify: "center"
    }, _react.default.createElement(_grommet.Button, {
      icon: _react.default.createElement(_grommetIcons.Add, null),
      label: "Add",
      onClick: this.onOpen
    }), open && _react.default.createElement(_grommet.Layer, {
      position: "right",
      full: "vertical",
      modal: true,
      onClickOutside: this.onClose,
      onEsc: this.onClose
    }, _react.default.createElement(_grommet.Box, {
      tag: "form",
      fill: "vertical",
      overflow: "auto",
      width: "medium",
      pad: "medium",
      onSubmit: this.onClose
    }, _react.default.createElement(_grommet.Box, {
      flex: false,
      direction: "row",
      justify: "between"
    }, _react.default.createElement(_grommet.Heading, {
      level: 2,
      margin: "none"
    }, "Add"), _react.default.createElement(_grommet.Button, {
      icon: _react.default.createElement(_grommetIcons.Close, null),
      onClick: this.onClose
    })), _react.default.createElement(_grommet.Box, {
      flex: "grow",
      overflow: "auto",
      pad: {
        vertical: 'medium'
      }
    }, _react.default.createElement(_grommet.FormField, {
      label: "First"
    }, _react.default.createElement(_grommet.TextInput, null)), _react.default.createElement(_grommet.FormField, {
      label: "Second"
    }, _react.default.createElement(_grommet.TextInput, null)), _react.default.createElement(_grommet.FormField, {
      label: "Third"
    }, _react.default.createElement(_grommet.TextArea, null)), _react.default.createElement(_grommet.FormField, {
      label: "Fourth"
    }, _react.default.createElement(_grommet.Select, {
      options: ['one', 'two', 'three'],
      value: fourthOption,
      onChange: function onChange(_ref) {
        var option = _ref.option;
        return _this3.setState({
          fourthOption: option
        });
      }
    }))), _react.default.createElement(_grommet.Box, {
      flex: false,
      tag: "footer",
      align: "start"
    }, _react.default.createElement(_grommet.Button, {
      type: "submit",
      label: "Submit",
      onClick: this.onClose,
      primary: true
    }))))));
  };

  return FormLayer;
}(_react.Component);

var NotificationLayer =
/*#__PURE__*/
function (_Component3) {
  _inheritsLoose(NotificationLayer, _Component3);

  function NotificationLayer() {
    var _this4;

    for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    _this4 = _Component3.call.apply(_Component3, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this4)), "state", {});

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this4)), "onOpen", function () {
      return _this4.setState({
        open: true
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this4)), "onClose", function () {
      return _this4.setState({
        open: undefined
      });
    });

    return _this4;
  }

  var _proto3 = NotificationLayer.prototype;

  _proto3.render = function render() {
    var open = this.state.open;
    return _react.default.createElement(_grommet.Grommet, {
      theme: _themes.grommet,
      full: true
    }, _react.default.createElement(_grommet.Box, {
      fill: true,
      align: "center",
      justify: "center"
    }, _react.default.createElement(_grommet.Button, {
      icon: _react.default.createElement(_grommetIcons.Add, {
        color: "brand"
      }),
      label: _react.default.createElement(_grommet.Text, null, _react.default.createElement("strong", null, "Add")),
      onClick: this.onOpen,
      plain: true
    })), open && _react.default.createElement(_grommet.Layer, {
      position: "bottom",
      full: "horizontal",
      modal: false,
      responsive: false
    }, _react.default.createElement(_grommet.Box, {
      align: "start",
      pad: {
        vertical: 'medium',
        horizontal: 'small'
      }
    }, _react.default.createElement(_grommet.Box, {
      align: "center",
      direction: "row",
      gap: "small",
      round: "medium",
      elevation: "medium",
      pad: {
        vertical: 'xsmall',
        horizontal: 'small'
      },
      background: "status-ok"
    }, _react.default.createElement(_grommet.Box, {
      align: "center",
      direction: "row",
      gap: "xsmall"
    }, _react.default.createElement(_grommetIcons.StatusGood, null), _react.default.createElement(_grommet.Text, null, "A new virtual machine has been successfully added")), _react.default.createElement(_grommet.Button, {
      icon: _react.default.createElement(_grommetIcons.FormClose, null),
      onClick: this.onClose,
      plain: true
    })))));
  };

  return NotificationLayer;
}(_react.Component);

var MarginLayer = function MarginLayer() {
  return _react.default.createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, _react.default.createElement(_grommet.Layer, {
    margin: "large"
  }, _react.default.createElement(_grommet.Box, {
    overflow: "auto"
  }, _react.default.createElement(_grommet.Box, {
    pad: "xlarge"
  }, "text"), _react.default.createElement(_grommet.Box, {
    pad: "xlarge"
  }, "text"), _react.default.createElement(_grommet.Box, {
    pad: "xlarge"
  }, "text"), _react.default.createElement(_grommet.Box, {
    pad: "xlarge"
  }, "text"), _react.default.createElement(_grommet.Box, {
    pad: "xlarge"
  }, "text"), _react.default.createElement(_grommet.Box, {
    pad: "xlarge"
  }, "text"))));
};

var PlainLayer = function PlainLayer() {
  return _react.default.createElement(_grommet.Grommet, {
    theme: _themes.grommet,
    full: true
  }, _react.default.createElement(_grommet.Box, {
    fill: true,
    background: "dark-3"
  }, _react.default.createElement(_grommet.Layer, {
    margin: "medium",
    plain: true
  }, _react.default.createElement(_grommet.Box, {
    pad: "large",
    border: {
      color: 'accent-1',
      size: 'large'
    }
  }, _react.default.createElement(_grommet.Text, {
    color: "accent-2"
  }, "Text")))));
};

var FullLayer =
/*#__PURE__*/
function (_Component4) {
  _inheritsLoose(FullLayer, _Component4);

  function FullLayer() {
    var _this5;

    for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      args[_key4] = arguments[_key4];
    }

    _this5 = _Component4.call.apply(_Component4, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this5)), "state", {
      showLayer: false
    });

    return _this5;
  }

  var _proto4 = FullLayer.prototype;

  _proto4.render = function render() {
    var _this6 = this;

    var showLayer = this.state.showLayer;
    return _react.default.createElement(_grommet.Grommet, {
      theme: _themes.grommet,
      full: true
    }, _react.default.createElement(_grommet.Box, {
      pad: "small",
      fill: true,
      background: "dark-3",
      align: "center",
      justify: "center"
    }, _react.default.createElement(_grommet.Button, {
      primary: true,
      color: "accent-3",
      label: "Show",
      onClick: function onClick() {
        return _this6.setState({
          showLayer: true
        });
      }
    }), showLayer && _react.default.createElement(_grommet.Layer, {
      full: true
    }, _react.default.createElement(_grommet.Box, {
      fill: true,
      background: "light-4",
      align: "center",
      justify: "center"
    }, _react.default.createElement(_grommet.Button, {
      primary: true,
      label: "Close",
      onClick: function onClick() {
        return _this6.setState({
          showLayer: false
        });
      }
    })))));
  };

  return FullLayer;
}(_react.Component);

var ScrollBodyLayer = function ScrollBodyLayer() {
  return _react.default.createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, _react.default.createElement(_grommet.Layer, {
    full: "vertical",
    position: "right"
  }, _react.default.createElement(_grommet.Box, {
    fill: true,
    style: {
      minWidth: '378px'
    }
  }, _react.default.createElement(_grommet.Box, {
    direction: "row",
    align: "center",
    tag: "header",
    elevation: "small",
    justify: "between"
  }, _react.default.createElement(_grommet.Text, {
    margin: {
      left: 'small'
    }
  }, "Header"), _react.default.createElement(_grommet.Button, {
    icon: _react.default.createElement(_grommetIcons.FormClose, null)
  })), _react.default.createElement(_grommet.Box, {
    flex: true,
    overflow: "auto",
    pad: "xsmall"
  }, _react.default.createElement("span", null, "body"), _react.default.createElement("span", null, "body"), _react.default.createElement("span", null, "body"), _react.default.createElement("span", null, "body"), _react.default.createElement("span", null, "body"), _react.default.createElement("span", null, "body"), _react.default.createElement("span", null, "body"), _react.default.createElement("span", null, "body"), _react.default.createElement("span", null, "body"), _react.default.createElement("span", null, "body"), _react.default.createElement("span", null, "body"), _react.default.createElement("span", null, "body"), _react.default.createElement("span", null, "body"), _react.default.createElement("span", null, "body"), _react.default.createElement("span", null, "body"), _react.default.createElement("span", null, "body"), _react.default.createElement("span", null, "body"), _react.default.createElement("span", null, "body"), _react.default.createElement("span", null, "body"), _react.default.createElement("span", null, "body"), _react.default.createElement("span", null, "body"), _react.default.createElement("span", null, "body"), _react.default.createElement("span", null, "body"), _react.default.createElement("span", null, "body"), _react.default.createElement("span", null, "body"), _react.default.createElement("span", null, "body"), _react.default.createElement("span", null, "body"), _react.default.createElement("span", null, "body"), _react.default.createElement("span", null, "body"), _react.default.createElement("span", null, "body"), _react.default.createElement("span", null, "body"), _react.default.createElement("span", null, "body"), _react.default.createElement("span", null, "body"), _react.default.createElement("span", null, "body"), _react.default.createElement("span", null, "body"), _react.default.createElement("span", null, "body"), _react.default.createElement("span", null, "body"), _react.default.createElement("span", null, "body"), _react.default.createElement("span", null, "body"), _react.default.createElement("span", null, "body"), _react.default.createElement("span", null, "body"), _react.default.createElement("span", null, "body"), _react.default.createElement("span", null, "body"), _react.default.createElement("span", null, "body"), _react.default.createElement("span", null, "body"), _react.default.createElement("span", null, "body"), _react.default.createElement("span", null, "body"), _react.default.createElement("span", null, "body"), _react.default.createElement("span", null, "body"), _react.default.createElement("span", null, "body"), _react.default.createElement("span", null, "body"), _react.default.createElement("span", null, "body"), _react.default.createElement("span", null, "body"), _react.default.createElement("span", null, "body"), _react.default.createElement("span", null, "body"), _react.default.createElement("span", null, "body"), _react.default.createElement("span", null, "body"), _react.default.createElement("span", null, "body"), _react.default.createElement("span", null, "body"), _react.default.createElement("span", null, "body"), _react.default.createElement("span", null, "body"), _react.default.createElement("span", null, "body"), _react.default.createElement("span", null, "body")), _react.default.createElement(_grommet.Box, {
    tag: "footer",
    border: {
      side: 'top'
    },
    pad: "small",
    justify: "end",
    direction: "row",
    align: "center"
  }, _react.default.createElement(_grommet.Button, {
    primary: true,
    label: "Save"
  })))));
};

(0, _react2.storiesOf)('Layer', module).add('Center', function () {
  return _react.default.createElement(CenterLayer, null);
}).add('Form', function () {
  return _react.default.createElement(FormLayer, null);
}).add('Notification', function () {
  return _react.default.createElement(NotificationLayer, null);
}).add('Margin', function () {
  return _react.default.createElement(MarginLayer, null);
}).add('Plain', function () {
  return _react.default.createElement(PlainLayer, null);
}).add('Full', function () {
  return _react.default.createElement(FullLayer, null);
}).add('Fixed Header, Scroll Body', function () {
  return _react.default.createElement(ScrollBodyLayer, null);
});