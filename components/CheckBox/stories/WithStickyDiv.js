"use strict";

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@storybook/react");

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var CheckBoxWithStickyDiv =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(CheckBoxWithStickyDiv, _Component);

  function CheckBoxWithStickyDiv() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "state", {
      checked: [],
      checkboxes: Array(8).fill().map(function (_, i) {
        return "item " + (i + 1);
      })
    });

    _defineProperty(_assertThisInitialized(_this), "onCheck", function (event, value) {
      var checked = _this.state.checked;

      if (event.target.checked) {
        checked.push(value);

        _this.setState({
          checked: checked
        });
      } else {
        _this.setState({
          checked: checked.filter(function (item) {
            return item !== value;
          })
        });
      }
    });

    return _this;
  }

  var _proto = CheckBoxWithStickyDiv.prototype;

  _proto.render = function render() {
    var _this2 = this;

    var _this$state = this.state,
        checked = _this$state.checked,
        checkboxes = _this$state.checkboxes;
    return _react.default.createElement(_grommet.Grommet, {
      theme: _themes.grommet
    }, _react.default.createElement(_grommet.Box, {
      pad: "large",
      align: "center"
    }, _react.default.createElement(_grommet.Box, {
      height: "120px",
      width: "120px",
      overflow: "auto",
      style: {
        position: 'relative',
        display: 'block'
      }
    }, _react.default.createElement(_grommet.Box, {
      background: {
        color: 'neutral-1'
      },
      style: {
        position: 'sticky',
        top: 0
      }
    }, "Click & Scroll"), checkboxes.map(function (item) {
      return _react.default.createElement(_grommet.CheckBox, {
        key: item,
        checked: checked.indexOf(item) !== -1,
        label: item,
        onChange: function onChange(e) {
          return _this2.onCheck(e, item);
        }
      });
    }))));
  };

  return CheckBoxWithStickyDiv;
}(_react.Component);

(0, _react2.storiesOf)('CheckBox', module).add('With Sticky Div', function () {
  return _react.default.createElement(CheckBoxWithStickyDiv, null);
});