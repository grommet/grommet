"use strict";

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@storybook/react");

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

    _defineProperty(_assertThisInitialized(_this), "boxRef", (0, _react.createRef)());

    _defineProperty(_assertThisInitialized(_this), "innerBoxRef", (0, _react.createRef)());

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
    return _react.default.createElement(_grommet.Grommet, {
      theme: _themes.grommet,
      full: true
    }, _react.default.createElement(_grommet.Box, {
      fill: true,
      align: "center",
      justify: "center"
    }, _react.default.createElement(_grommet.Button, {
      ref: this.boxRef,
      primary: true,
      label: "Click me",
      onClick: this.onOpenDrop
    }), openDrop && _react.default.createElement(_grommet.Drop, {
      target: this.boxRef.current,
      onClickOutside: this.onCloseDrop,
      onEsc: this.onCloseDrop
    }, _react.default.createElement(_grommet.Box, {
      pad: "large",
      ref: this.innerBoxRef
    }, _react.default.createElement(_grommet.Button, {
      primary: true,
      label: "Click me again",
      onClick: function onClick() {
        return _this2.setState({
          openInnerDrop: true
        });
      }
    })), openInnerDrop && _react.default.createElement(_grommet.Drop, {
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
    }, _react.default.createElement(_grommet.Box, {
      pad: "large"
    }, _react.default.createElement(_grommet.Button, {
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
}(_react.Component);

(0, _react2.storiesOf)('Drop', module).add('Progressive', function () {
  return _react.default.createElement(ProgressiveDrop, null);
});