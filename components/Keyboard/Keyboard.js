"use strict";

exports.__esModule = true;
exports.Keyboard = void 0;

var _react = require("react");

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var KEYS = {
  8: 'onBackspace',
  9: 'onTab',
  13: 'onEnter',
  27: 'onEsc',
  32: 'onSpace',
  37: 'onLeft',
  38: 'onUp',
  39: 'onRight',
  40: 'onDown',
  188: 'onComma',
  16: 'onShift'
};

var Keyboard =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(Keyboard, _Component);

  function Keyboard() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "onKeyDown", function (event) {
      /* eslint-disable-next-line react/prop-types */
      var onKeyDown = _this.props.onKeyDown;
      var key = event.keyCode ? event.keyCode : event.which;
      var callbackName = KEYS[key];
      /* eslint-disable react/destructuring-assignment */

      for (var _len2 = arguments.length, rest = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        rest[_key2 - 1] = arguments[_key2];
      }

      if (callbackName && _this.props[callbackName]) {
        var _this$props;

        (_this$props = _this.props)[callbackName].apply(_this$props, [event].concat(rest));
      }
      /* eslint-enable react/destructuring-assignment */


      if (onKeyDown) {
        onKeyDown.apply(void 0, [event].concat(rest));
      }
    });

    return _this;
  }

  var _proto = Keyboard.prototype;

  _proto.componentDidMount = function componentDidMount() {
    /* eslint-disable-next-line react/prop-types */
    var target = this.props.target;

    if (target === 'document') {
      document.addEventListener('keydown', this.onKeyDown);
    }
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    var target = this.props.target;

    if (target === 'document') {
      document.removeEventListener('keydown', this.onKeyDown);
    }
  };

  _proto.render = function render() {
    /* eslint-disable-next-line react/prop-types */
    var _this$props2 = this.props,
        children = _this$props2.children,
        target = _this$props2.target;
    return target === 'document' ? children : (0, _react.cloneElement)(_react.Children.only(children), {
      onKeyDown: this.onKeyDown
    });
  };

  return Keyboard;
}(_react.Component);

var KeyboardDoc;

if (process.env.NODE_ENV !== 'production') {
  KeyboardDoc = require('./doc').doc(Keyboard); // eslint-disable-line global-require
}

var KeyboardWrapper = KeyboardDoc || Keyboard;
exports.Keyboard = KeyboardWrapper;