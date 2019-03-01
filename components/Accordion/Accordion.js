"use strict";

exports.__esModule = true;
exports.Accordion = void 0;

var _react = _interopRequireWildcard(require("react"));

var _Box = require("../Box");

var _AccordionContext = require("./AccordionContext");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var activeAsArray = function activeAsArray(active) {
  return typeof active === 'number' ? [active] : active;
};

var Accordion =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(Accordion, _Component);

  function Accordion() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "state", {
      activeIndexes: []
    });

    _defineProperty(_assertThisInitialized(_this), "onPanelChange", function (index) {
      var activeIndexes = _this.state.activeIndexes;
      var nextActiveIndexes = [].concat(activeIndexes || []);
      var _this$props = _this.props,
          onActive = _this$props.onActive,
          multiple = _this$props.multiple;
      var activeIndex = nextActiveIndexes.indexOf(index);

      if (activeIndex > -1) {
        nextActiveIndexes.splice(activeIndex, 1);
      } else if (multiple) {
        nextActiveIndexes.push(index);
      } else {
        nextActiveIndexes = [index];
      }

      _this.setState({
        activeIndexes: nextActiveIndexes
      }, function () {
        if (onActive) {
          onActive(nextActiveIndexes);
        }
      });
    });

    return _this;
  }

  Accordion.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps, prevState) {
    var activeIndex = nextProps.activeIndex;
    var stateActiveIndexes = prevState.activeIndexes,
        stateActiveIndex = prevState.activeIndex;
    var activeIndexes = activeAsArray(activeIndex) || [];

    if ((typeof activeIndex !== 'undefined' || activeIndex !== stateActiveIndex) && activeIndexes.join() !== stateActiveIndexes.join()) {
      return {
        activeIndexes: activeIndexes,
        activeIndex: activeIndex
      };
    }

    return null;
  };

  var _proto = Accordion.prototype;

  _proto.render = function render() {
    var _this2 = this;

    var _this$props2 = this.props,
        animate = _this$props2.animate,
        children = _this$props2.children,
        messages = _this$props2.messages,
        rest = _objectWithoutPropertiesLoose(_this$props2, ["animate", "children", "messages"]);

    var activeIndexes = this.state.activeIndexes;
    delete rest.onActive;
    return _react.default.createElement(_Box.Box, _extends({
      role: "tablist"
    }, rest), _react.Children.toArray(children).map(function (panel, index) {
      return _react.default.createElement(_AccordionContext.AccordionContext.Provider, {
        key: "accordion-panel_" + (index + 0),
        value: {
          active: activeIndexes.indexOf(index) > -1,
          animate: animate,
          messages: messages,
          onPanelChange: function onPanelChange() {
            return _this2.onPanelChange(index);
          }
        }
      }, panel);
    }));
  };

  return Accordion;
}(_react.Component);

_defineProperty(Accordion, "defaultProps", {
  animate: true,
  messages: {
    tabContents: 'Tab Contents'
  }
});

var AccordionDoc;

if (process.env.NODE_ENV !== 'production') {
  AccordionDoc = require('./doc').doc(Accordion); // eslint-disable-line global-require
}

var AccordionWrapper = AccordionDoc || Accordion;
exports.Accordion = AccordionWrapper;