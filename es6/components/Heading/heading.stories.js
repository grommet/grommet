import React from 'react';
import PropTypes from 'prop-types';
import { storiesOf } from '@storybook/react';
import { Grommet, Grid, Heading } from 'grommet';
import { grommet } from 'grommet/themes';
import { deepMerge } from 'grommet/utils';

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

var Color = function Color() {
  return React.createElement(Grommet, {
    theme: grommet
  }, React.createElement(Heading, {
    color: "accent-1"
  }, "Colored Heading"));
};

var customlevel = deepMerge(grommet, {
  heading: {
    level: {
      5: {
        small: {
          size: '12px',
          height: '16px'
        },
        medium: {
          size: '14px',
          height: '18px'
        },
        large: {
          size: '16px',
          height: '20px'
        }
      }
    },
    extend: function extend(props) {
      return "color: " + props.theme.global.colors.brand;
    }
  }
});

var CustomHeading = function CustomHeading() {
  return React.createElement(Grommet, {
    theme: customlevel
  }, React.createElement(Heading, {
    level: 5
  }, "Heading level 5"));
};

storiesOf('Heading', module).add('All', function () {
  return React.createElement(All, null);
}).add('Color', function () {
  return React.createElement(Color, null);
}).add('Custom Heading', function () {
  return React.createElement(CustomHeading, null);
});