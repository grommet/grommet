import React from 'react';
import { storiesOf } from '@storybook/react';
import { Avatar, Box, Card, Heading, CardBody, CardHeader, Grid, Grommet, Text, Image, Stack } from 'grommet';
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
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: theme
  }, /*#__PURE__*/React.createElement(Box, {
    pad: "large"
  }, /*#__PURE__*/React.createElement(Grid, {
    gap: "large",
    rows: "medium",
    columns: {
      count: 'fit',
      size: ['small', 'medium']
    }
  }, data.map(function (item) {
    return /*#__PURE__*/React.createElement(Card, {
      width: "medium",
      key: item.location
    }, /*#__PURE__*/React.createElement(Stack, {
      anchor: "bottom-left"
    }, /*#__PURE__*/React.createElement(CardBody, {
      height: "medium"
    }, /*#__PURE__*/React.createElement(Image, {
      fit: "cover",
      src: item.image,
      a11yTitle: "scuba diving"
    })), /*#__PURE__*/React.createElement(CardHeader, {
      pad: {
        horizontal: 'small',
        vertical: 'small'
      } // https://gist.github.com/lopspower/03fb1cc0ac9f32ef38f4#all-hex-value-from-100-to-0-alpha
      ,
      background: "#000000A0",
      width: "medium",
      justify: "start"
    }, /*#__PURE__*/React.createElement(Avatar, {
      src: avatarSrc,
      a11yTitle: "avatar"
    }), /*#__PURE__*/React.createElement(Box, null, /*#__PURE__*/React.createElement(Heading, {
      level: "3",
      margin: "none"
    }, item.location), /*#__PURE__*/React.createElement(Text, {
      size: "small"
    }, item.state)))));
  }))));
};

storiesOf('Card', module).add('Stacked', function () {
  return /*#__PURE__*/React.createElement(Example, null);
});