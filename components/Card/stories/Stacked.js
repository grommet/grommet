"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _grommet = require("grommet");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var theme = {
  global: {
    font: {
      family: "-apple-system,\n         BlinkMacSystemFont, \n         \"Segoe UI\", \n         Roboto"
    }
  },
  heading: {
    font: {
      family: 'Comic Sans MS'
    }
  },
  card: {
    container: {
      elevation: 'large'
    },
    footer: {
      pad: 'medium'
    }
  }
};
var data = [{
  location: 'Blue Hole',
  image: "https://i.insider.com/5c796ca426289858f7205ede?width=1136&format=jpeg",
  state: 'Belize'
}, {
  location: 'The Satil',
  image: "https://www.israel21c.org/wp-content/uploads/2020/01/shutterstock_733279432.jpg",
  state: 'Israel'
}, {
  location: 'Barrier Reef',
  image: "https://img.jakpost.net/c/2020/04/07/2020_04_07_92088_1586233705._large.jpg",
  state: 'Australia'
}];

var Example = function Example() {
  var avatarSrc = '//s.gravatar.com/avatar/b7fb138d53ba0f573212ccce38a7c43b?s=80';
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: theme
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: "large"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Grid, {
    gap: "large",
    rows: "medium",
    columns: {
      count: 'fit',
      size: ['small', 'medium']
    }
  }, data.map(function (item) {
    return /*#__PURE__*/_react["default"].createElement(_grommet.Card, {
      width: "medium",
      key: item.location
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Stack, {
      anchor: "bottom-left"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.CardBody, {
      height: "medium"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Image, {
      fit: "cover",
      src: item.image,
      a11yTitle: "scuba diving"
    })), /*#__PURE__*/_react["default"].createElement(_grommet.CardHeader, {
      pad: {
        horizontal: 'small',
        vertical: 'small'
      } // https://gist.github.com/lopspower/03fb1cc0ac9f32ef38f4#all-hex-value-from-100-to-0-alpha
      ,
      background: "#000000A0",
      width: "medium",
      justify: "start"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Avatar, {
      src: avatarSrc,
      a11yTitle: "avatar"
    }), /*#__PURE__*/_react["default"].createElement(_grommet.Box, null, /*#__PURE__*/_react["default"].createElement(_grommet.Heading, {
      level: "3",
      margin: "none"
    }, item.location), /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
      size: "small"
    }, item.state)))));
  }))));
};

(0, _react2.storiesOf)('Card', module).add('Stacked', function () {
  return /*#__PURE__*/_react["default"].createElement(Example, null);
});