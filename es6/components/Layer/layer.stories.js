function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import { Add } from "grommet-icons/es6/icons/Add";
import { Close } from "grommet-icons/es6/icons/Close";
import { FormClose } from "grommet-icons/es6/icons/FormClose";
import { StatusGood } from "grommet-icons/es6/icons/StatusGood";
import { Trash } from "grommet-icons/es6/icons/Trash";
import { Box, Button, FormField, Grommet, Heading, Layer, Select, Text, TextArea, TextInput } from 'grommet';
import { grommet } from 'grommet/themes';

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
      onClick: this.onOpen,
      plain: true
    })), open && React.createElement(Layer, {
      position: "center",
      modal: true,
      onClickOutside: this.onClose,
      onEsc: this.onClose
    }, React.createElement(Box, {
      pad: "medium",
      gap: "small",
      width: "medium"
    }, React.createElement(Heading, {
      level: 3,
      margin: "none"
    }, "Confirm"), React.createElement(Text, null, "Are you sure you want to delete?"), React.createElement(Box, {
      tag: "footer",
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
      onClick: this.onOpen2,
      color: "dark-6"
    }), React.createElement(Button, {
      label: React.createElement(Text, {
        color: "white"
      }, React.createElement("strong", null, "Delete")),
      onClick: this.onClose,
      primary: true,
      color: "status-critical"
    })))), open2 && React.createElement(Layer, {
      position: "top",
      modal: true,
      onClickOutside: this.onClose2,
      onEsc: this.onClose2
    }, React.createElement(Box, {
      pad: "medium",
      gap: "small",
      width: "medium"
    }, React.createElement(Heading, {
      level: 3,
      margin: "none"
    }, "Confirm 2"), React.createElement(Box, {
      tag: "footer",
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
      onClick: this.onClose2,
      color: "dark-6"
    })))));
  };

  return CenterLayer;
}(Component);

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
      onClick: this.onOpen
    }), open && React.createElement(Layer, {
      position: "right",
      full: "vertical",
      modal: true,
      onClickOutside: this.onClose,
      onEsc: this.onClose
    }, React.createElement(Box, {
      tag: "form",
      fill: "vertical",
      overflow: "auto",
      width: "medium",
      pad: "medium",
      onSubmit: this.onClose
    }, React.createElement(Box, {
      flex: false,
      direction: "row",
      justify: "between"
    }, React.createElement(Heading, {
      level: 2,
      margin: "none"
    }, "Add"), React.createElement(Button, {
      icon: React.createElement(Close, null),
      onClick: this.onClose
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
    }, React.createElement(TextInput, null)), React.createElement(FormField, {
      label: "Third"
    }, React.createElement(TextArea, null)), React.createElement(FormField, {
      label: "Fourth"
    }, React.createElement(Select, {
      options: ['one', 'two', 'three'],
      value: fourthOption,
      onChange: function onChange(_ref) {
        var option = _ref.option;
        return _this3.setState({
          fourthOption: option
        });
      }
    }))), React.createElement(Box, {
      flex: false,
      tag: "footer",
      align: "start"
    }, React.createElement(Button, {
      type: "submit",
      label: "Submit",
      onClick: this.onClose,
      primary: true
    }))))));
  };

  return FormLayer;
}(Component);

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
      onClick: this.onOpen,
      plain: true
    })), open && React.createElement(Layer, {
      position: "bottom",
      full: "horizontal",
      modal: false,
      responsive: false
    }, React.createElement(Box, {
      align: "start",
      pad: {
        vertical: 'medium',
        horizontal: 'small'
      }
    }, React.createElement(Box, {
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
    }, React.createElement(Box, {
      align: "center",
      direction: "row",
      gap: "xsmall"
    }, React.createElement(StatusGood, null), React.createElement(Text, null, "A new virtual machine has been successfully added")), React.createElement(Button, {
      icon: React.createElement(FormClose, null),
      onClick: this.onClose,
      plain: true
    })))));
  };

  return NotificationLayer;
}(Component);

var MarginLayer = function MarginLayer() {
  return React.createElement(Grommet, {
    theme: grommet
  }, React.createElement(Layer, {
    margin: "large"
  }, React.createElement(Box, {
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
        return _this6.setState({
          showLayer: true
        });
      }
    }), showLayer && React.createElement(Layer, {
      full: true
    }, React.createElement(Box, {
      fill: true,
      background: "light-4",
      align: "center",
      justify: "center"
    }, React.createElement(Button, {
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
}(Component);

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
    tag: "header",
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
    tag: "footer",
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
}).add('Form', function () {
  return React.createElement(FormLayer, null);
}).add('Notification', function () {
  return React.createElement(NotificationLayer, null);
}).add('Margin', function () {
  return React.createElement(MarginLayer, null);
}).add('Plain', function () {
  return React.createElement(PlainLayer, null);
}).add('Full', function () {
  return React.createElement(FullLayer, null);
}).add('Fixed Header, Scroll Body', function () {
  return React.createElement(ScrollBodyLayer, null);
});