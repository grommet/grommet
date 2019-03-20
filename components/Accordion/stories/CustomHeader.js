"use strict";

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@storybook/react");

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var renderPanelHeader = function renderPanelHeader(title, active) {
  return _react.default.createElement(_grommet.Box, {
    direction: "row",
    align: "center",
    pad: "medium",
    gap: "small"
  }, _react.default.createElement("strong", null, _react.default.createElement(_grommet.Text, null, title)), _react.default.createElement(_grommet.Text, {
    color: "brand"
  }, active ? '-' : '+'));
};

var CustomHeaderAccordion =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(CustomHeaderAccordion, _Component);

  function CustomHeaderAccordion() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "state", {
      activeIndex: [0]
    });

    return _this;
  }

  var _proto = CustomHeaderAccordion.prototype;

  _proto.render = function render() {
    var _this2 = this;

    var activeIndex = this.state.activeIndex;
    return _react.default.createElement(_grommet.Grommet, {
      theme: _themes.grommet
    }, _react.default.createElement(_grommet.Accordion, {
      activeIndex: activeIndex,
      onActive: function onActive(newActiveIndex) {
        return _this2.setState({
          activeIndex: newActiveIndex
        });
      }
    }, _react.default.createElement(_grommet.AccordionPanel, {
      header: renderPanelHeader('Panel 1', activeIndex.includes(0))
    }, _react.default.createElement(_grommet.Box, {
      pad: "medium",
      background: "light-2",
      style: {
        height: '800px'
      }
    }, _react.default.createElement(_grommet.Text, null, "Panel 1 contents"), _react.default.createElement(_grommet.TextInput, null))), _react.default.createElement(_grommet.AccordionPanel, {
      header: renderPanelHeader('Panel 2', activeIndex.includes(1))
    }, _react.default.createElement(_grommet.Box, {
      pad: "medium",
      background: "light-2",
      style: {
        height: '50px'
      }
    }, _react.default.createElement(_grommet.Text, null, "Panel 2 contents"))), _react.default.createElement(_grommet.AccordionPanel, {
      header: renderPanelHeader('Panel 3', activeIndex.includes(2))
    }, _react.default.createElement(_grommet.Box, {
      pad: "medium",
      background: "light-2",
      style: {
        height: '300px'
      }
    }, _react.default.createElement(_grommet.Text, null, "Panel 3 contents")))));
  };

  return CustomHeaderAccordion;
}(_react.Component);

(0, _react2.storiesOf)('Accordion', module).add('Custom Header', function () {
  return _react.default.createElement(CustomHeaderAccordion, null);
});