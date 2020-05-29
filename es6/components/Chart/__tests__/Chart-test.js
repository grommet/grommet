import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import { Grommet } from '../../Grommet';
import { Box } from '../../Box';
import { Chart, calcs } from '..';
var VALUES = [{
  value: [1, 60],
  label: 'sixty'
}, {
  value: [0, 0],
  label: 'zero'
}];
describe('Chart', function () {
  test('default', function () {
    var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Chart, {
      values: VALUES
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('type', function () {
    var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Chart, {
      type: "bar",
      values: VALUES
    }), /*#__PURE__*/React.createElement(Chart, {
      type: "line",
      values: VALUES
    }), /*#__PURE__*/React.createElement(Chart, {
      type: "area",
      values: VALUES
    }), /*#__PURE__*/React.createElement(Chart, {
      type: "point",
      values: VALUES
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('size', function () {
    var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Chart, {
      size: "xsmall",
      values: VALUES
    }), /*#__PURE__*/React.createElement(Chart, {
      size: "small",
      values: VALUES
    }), /*#__PURE__*/React.createElement(Chart, {
      size: "medium",
      values: VALUES
    }), /*#__PURE__*/React.createElement(Chart, {
      size: "large",
      values: VALUES
    }), /*#__PURE__*/React.createElement(Chart, {
      size: "xlarge",
      values: VALUES
    }), /*#__PURE__*/React.createElement(Box, {
      width: "large"
    }, /*#__PURE__*/React.createElement(Chart, {
      size: {
        width: 'full'
      },
      values: VALUES
    }), /*#__PURE__*/React.createElement(Chart, {
      size: {
        width: 'fill'
      },
      values: VALUES
    }), /*#__PURE__*/React.createElement(Chart, {
      size: {
        width: 'auto'
      },
      values: VALUES
    }))));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('thickness', function () {
    var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Chart, {
      thickness: "xsmall",
      values: VALUES
    }), /*#__PURE__*/React.createElement(Chart, {
      thickness: "small",
      values: VALUES
    }), /*#__PURE__*/React.createElement(Chart, {
      thickness: "medium",
      values: VALUES
    }), /*#__PURE__*/React.createElement(Chart, {
      thickness: "large",
      values: VALUES
    }), /*#__PURE__*/React.createElement(Chart, {
      thickness: "xlarge",
      values: VALUES
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('cap', function () {
    var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Chart, {
      round: true,
      values: VALUES
    }), /*#__PURE__*/React.createElement(Chart, {
      type: "line",
      round: true,
      values: VALUES
    }), /*#__PURE__*/React.createElement(Chart, {
      type: "area",
      round: true,
      values: VALUES
    }), /*#__PURE__*/React.createElement(Chart, {
      type: "point",
      round: true,
      values: VALUES
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('gap', function () {
    var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Box, {
      width: "large"
    }, /*#__PURE__*/React.createElement(Chart, {
      size: {
        width: 'auto'
      },
      gap: "small",
      values: VALUES
    }), /*#__PURE__*/React.createElement(Chart, {
      size: {
        width: 'auto'
      },
      gap: "medium",
      values: VALUES
    }), /*#__PURE__*/React.createElement(Chart, {
      size: {
        width: 'auto'
      },
      gap: "large",
      values: VALUES
    }))));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('dash', function () {
    var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Chart, {
      dash: true,
      values: VALUES
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('color', function () {
    var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Chart, {
      color: "brand",
      values: VALUES
    }), /*#__PURE__*/React.createElement(Chart, {
      color: {
        color: 'brand',
        opacity: 'strong'
      },
      values: VALUES
    }), /*#__PURE__*/React.createElement(Chart, {
      color: [{
        value: 0,
        color: 'brand'
      }, {
        value: 60,
        color: 'border'
      }],
      values: VALUES
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('pad', function () {
    var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Chart, {
      pad: "xsmall",
      values: VALUES
    }), /*#__PURE__*/React.createElement(Chart, {
      pad: {
        horizontal: 'medium',
        vertical: 'small'
      },
      values: VALUES
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('calcs', function () {
    var result = calcs([1, 2, 3]);
    expect(result).toMatchSnapshot();
  });
});