"use strict";

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@storybook/react");

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var AppGrid =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(AppGrid, _Component);

  function AppGrid() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "state", {
      sidebar: true
    });

    return _this;
  }

  var _proto = AppGrid.prototype;

  _proto.render = function render() {
    var _this2 = this;

    var sidebar = this.state.sidebar;
    return _react.default.createElement(_grommet.Grommet, {
      full: true,
      theme: _themes.grommet
    }, _react.default.createElement(_grommet.Grid, {
      fill: true,
      rows: ['auto', 'flex'],
      columns: ['auto', 'flex'],
      areas: [{
        name: 'header',
        start: [0, 0],
        end: [1, 0]
      }, {
        name: 'sidebar',
        start: [0, 1],
        end: [0, 1]
      }, {
        name: 'main',
        start: [1, 1],
        end: [1, 1]
      }]
    }, _react.default.createElement(_grommet.Box, {
      gridArea: "header",
      direction: "row",
      align: "center",
      justify: "between",
      pad: {
        horizontal: 'medium',
        vertical: 'small'
      },
      background: "dark-2"
    }, _react.default.createElement(_grommet.Button, {
      onClick: function onClick() {
        return _this2.setState({
          sidebar: !sidebar
        });
      }
    }, _react.default.createElement(_grommet.Text, {
      size: "large"
    }, "Title")), _react.default.createElement(_grommet.Text, null, "my@email")), sidebar && _react.default.createElement(_grommet.Box, {
      gridArea: "sidebar",
      background: "dark-3",
      width: "small",
      animation: [{
        type: 'fadeIn',
        duration: 300
      }, {
        type: 'slideRight',
        size: 'xlarge',
        duration: 150
      }]
    }, ['First', 'Second', 'Third'].map(function (name) {
      return _react.default.createElement(_grommet.Button, {
        key: name,
        href: "#",
        hoverIndicator: true
      }, _react.default.createElement(_grommet.Box, {
        pad: {
          horizontal: 'medium',
          vertical: 'small'
        }
      }, _react.default.createElement(_grommet.Text, null, name)));
    })), _react.default.createElement(_grommet.Box, {
      gridArea: "main",
      justify: "center",
      align: "center"
    }, _react.default.createElement(_grommet.Text, null, "main"))));
  };

  return AppGrid;
}(_react.Component);

var Percentages = function Percentages() {
  return _react.default.createElement(_grommet.Grommet, {
    theme: _themes.grommet,
    full: true
  }, _react.default.createElement(_grommet.Grid, {
    fill: true,
    areas: [{
      name: 'nav',
      start: [0, 0],
      end: [0, 0]
    }, {
      name: 'main',
      start: [1, 0],
      end: [1, 0]
    }],
    columns: ['small', 'flex'],
    rows: ['flex'],
    gap: "small"
  }, _react.default.createElement(_grommet.Box, {
    gridArea: "nav",
    background: "brand"
  }), _react.default.createElement(_grommet.Box, {
    gridArea: "main",
    background: "brand"
  })));
};

var NColumnGrid = function NColumnGrid() {
  return _react.default.createElement(_grommet.Grommet, {
    theme: _themes.grommet,
    full: true
  }, _react.default.createElement(_grommet.Grid, {
    columns: {
      count: 6,
      size: 'auto'
    },
    gap: "small"
  }, _react.default.createElement(_grommet.Box, {
    background: "brand"
  }, "Item 1"), _react.default.createElement(_grommet.Box, {
    background: "brand"
  }, "Item 2"), _react.default.createElement(_grommet.Box, {
    background: "brand"
  }, "Item 3"), _react.default.createElement(_grommet.Box, {
    background: "brand"
  }, "Item 4"), _react.default.createElement(_grommet.Box, {
    background: "brand"
  }, "Item 5"), _react.default.createElement(_grommet.Box, {
    background: "brand"
  }, "Item 6")));
};

(0, _react2.storiesOf)('Grid', module).add('App', function () {
  return _react.default.createElement(AppGrid, null);
}).add('Percentages', function () {
  return _react.default.createElement(Percentages, null);
}).add('N-column layout', function () {
  return _react.default.createElement(NColumnGrid, null);
});