import React from 'react';
import PropTypes from 'prop-types';
import { storiesOf } from '@storybook/react';
import { Grommet, Grid, Heading } from 'grommet';
import { grommet } from 'grommet/themes';

var H = function H(_ref) {
  var level = _ref.level,
      size = _ref.size;
  return React.createElement(Heading, {
    level: level,
    size: size
  }, "Heading " + level + " " + size);
};

H.propTypes = {
  level: PropTypes.number.isRequired,
  size: PropTypes.string.isRequired
};

var Set = function Set(_ref2) {
  var size = _ref2.size;
  return React.createElement("div", null, [1, 2, 3, 4, 5, 6].map(function (level) {
    return React.createElement(H, {
      key: level,
      level: level,
      size: size
    });
  }));
};

Set.propTypes = {
  size: PropTypes.string.isRequired
};

var All = function All() {
  return React.createElement(Grommet, {
    theme: grommet
  }, React.createElement(Grid, {
    columns: "large",
    gap: "medium"
  }, React.createElement(Set, {
    size: "medium"
  }), React.createElement(Set, {
    size: "small"
  }), React.createElement(Set, {
    size: "large"
  }), React.createElement(Set, {
    size: "xlarge"
  })));
};

storiesOf('Heading', module).add('All', function () {
  return React.createElement(All, null);
});