"use strict";

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@storybook/react");

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var IndeterminateCheckBox =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(IndeterminateCheckBox, _Component);

  function IndeterminateCheckBox() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "state", {
      checked: [],
      checkboxes: ['fruits', 'vegetables', 'olive oil']
    });

    _defineProperty(_assertThisInitialized(_this), "onCheckAll", function (event) {
      var checkboxes = _this.state.checkboxes;

      if (event.target.checked) {
        _this.setState({
          checked: checkboxes
        });
      } else {
        _this.setState({
          checked: []
        });
      }
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

  var _proto = IndeterminateCheckBox.prototype;

  _proto.render = function render() {
    var _this2 = this;

    var _this$state = this.state,
        checked = _this$state.checked,
        checkboxes = _this$state.checkboxes;
    return _react.default.createElement(_grommet.Grommet, {
      theme: _themes.grommet
    }, _react.default.createElement(_grommet.Box, {
      align: "center",
      pad: "large"
    }, _react.default.createElement(_grommet.Box, {
      direction: "row",
      gap: "medium"
    }, _react.default.createElement(_grommet.CheckBox, {
      checked: checked.length === 3,
      indeterminate: checked.length > 0 && checked.length < 3,
      label: "All",
      onChange: this.onCheckAll
    }), checkboxes.map(function (item) {
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

  return IndeterminateCheckBox;
}(_react.Component);

(0, _react2.storiesOf)('CheckBox', module).add('Interminate', function () {
  return _react.default.createElement(IndeterminateCheckBox, null);
});