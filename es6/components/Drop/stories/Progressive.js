function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { createRef, Component } from 'react';
import { storiesOf } from '@storybook/react';
import { Box, Button, Drop, Grommet } from 'grommet';
import { grommet } from 'grommet/themes';

var ProgressiveDrop =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(ProgressiveDrop, _Component);

  function ProgressiveDrop() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "boxRef", createRef());

    _defineProperty(_assertThisInitialized(_this), "innerBoxRef", createRef());

    _defineProperty(_assertThisInitialized(_this), "state", {
      openDrop: false,
      openInnerDrop: false,
      interactedWithInnerButton: false
    });

    _defineProperty(_assertThisInitialized(_this), "onCloseDrop", function () {
      return _this.setState({
        openDrop: false,
        openInnerDrop: false
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onOpenDrop", function () {
      return _this.setState({
        openDrop: true,
        openInnerDrop: false
      });
    });

    return _this;
  }

  var _proto = ProgressiveDrop.prototype;

  _proto.render = function render() {
    var _this2 = this;

    var _this$state = this.state,
        openDrop = _this$state.openDrop,
        openInnerDrop = _this$state.openInnerDrop,
        interactedWithInnerButton = _this$state.interactedWithInnerButton;
    return React.createElement(Grommet, {
      theme: grommet,
      full: true
    }, React.createElement(Box, {
      fill: true,
      align: "center",
      justify: "center"
    }, React.createElement(Button, {
      ref: this.boxRef,
      primary: true,
      label: "Click me",
      onClick: this.onOpenDrop
    }), openDrop && React.createElement(Drop, {
      target: this.boxRef.current,
      onClickOutside: this.onCloseDrop,
      onEsc: this.onCloseDrop
    }, React.createElement(Box, {
      pad: "large",
      ref: this.innerBoxRef
    }, React.createElement(Button, {
      primary: true,
      label: "Click me again",
      onClick: function onClick() {
        return _this2.setState({
          openInnerDrop: true
        });
      }
    })), openInnerDrop && React.createElement(Drop, {
      target: this.innerBoxRef.current,
      onClickOutside: function onClickOutside() {
        return _this2.setState({
          openInnerDrop: false
        });
      },
      onEsc: function onEsc() {
        return _this2.setState({
          openInnerDrop: false
        });
      },
      align: {
        top: 'bottom',
        right: 'right'
      }
    }, React.createElement(Box, {
      pad: "large"
    }, React.createElement(Button, {
      primary: true,
      label: interactedWithInnerButton ? 'Good job!' : 'You can interact with me',
      onClick: function onClick() {
        return _this2.setState({
          interactedWithInnerButton: true
        });
      }
    }))))));
  };

  return ProgressiveDrop;
}(Component);

storiesOf('Drop', module).add('Progressive', function () {
  return React.createElement(ProgressiveDrop, null);
});