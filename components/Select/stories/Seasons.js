"use strict";

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@storybook/react");

var _grommetIcons = require("grommet-icons");

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var allSeasons = ['S01', 'S02', 'S03', 'S04', 'S05', 'S06', 'S07', 'S08', 'S09', 'S10'];

var SeasonsSelect =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(SeasonsSelect, _Component);

  function SeasonsSelect() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "state", {
      selected: []
    });

    _defineProperty(_assertThisInitialized(_this), "onRemoveSeason", function (season) {
      var selected = _this.state.selected;
      var nextSelected = [].concat(selected);
      nextSelected.splice(nextSelected.indexOf(allSeasons.indexOf(season)), 1);

      _this.setState({
        selected: nextSelected
      });
    });

    _defineProperty(_assertThisInitialized(_this), "renderSeason", function (season) {
      return _react.default.createElement(_grommet.Button, {
        key: "season_tag_" + season,
        href: "#",
        onClick: function onClick(event) {
          event.preventDefault();
          event.stopPropagation();

          _this.onRemoveSeason(season);
        },
        onFocus: function onFocus(event) {
          return event.stopPropagation();
        }
      }, _react.default.createElement(_grommet.Box, {
        align: "center",
        direction: "row",
        gap: "xsmall",
        pad: {
          vertical: 'xsmall',
          horizontal: 'small'
        },
        margin: "xsmall",
        background: "accent-1",
        round: "large"
      }, _react.default.createElement(_grommet.Text, {
        size: "small",
        color: "white"
      }, season), _react.default.createElement(_grommet.Box, {
        background: "white",
        round: "full",
        margin: {
          left: 'xsmall'
        }
      }, _react.default.createElement(_grommetIcons.FormClose, {
        color: "accent-1",
        size: "small",
        style: {
          width: '12px',
          height: '12px'
        }
      }))));
    });

    _defineProperty(_assertThisInitialized(_this), "renderOption", function (option, index, options, state) {
      return _react.default.createElement(_grommet.Box, {
        pad: "small",
        background: state.active ? 'active' : undefined
      }, option);
    });

    return _this;
  }

  var _proto = SeasonsSelect.prototype;

  _proto.render = function render() {
    var _this2 = this;

    var selected = this.state.selected;
    return _react.default.createElement(_grommet.Grommet, {
      full: true,
      theme: _themes.grommet
    }, _react.default.createElement(_grommet.Box, {
      fill: true,
      align: "center",
      justify: "center"
    }, _react.default.createElement(_grommet.Select, {
      closeOnChange: false,
      multiple: true,
      value: _react.default.createElement(_grommet.Box, {
        wrap: true,
        direction: "row",
        width: "small"
      }, selected && selected.length ? selected.map(function (index) {
        return _this2.renderSeason(allSeasons[index]);
      }) : _react.default.createElement(_grommet.Box, {
        pad: {
          vertical: 'xsmall',
          horizontal: 'small'
        },
        margin: "xsmall"
      }, "Select Season")),
      options: allSeasons,
      selected: selected,
      disabled: [2, 6],
      onChange: function onChange(_ref) {
        var nextSelected = _ref.selected;

        _this2.setState({
          selected: nextSelected.sort()
        });
      }
    }, this.renderOption)));
  };

  return SeasonsSelect;
}(_react.Component);

(0, _react2.storiesOf)('Select', module).add('Seasons', function () {
  return _react.default.createElement(SeasonsSelect, null);
});