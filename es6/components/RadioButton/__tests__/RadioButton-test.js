import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import { Grommet } from '../../Grommet';
import { Box } from '../../Box';
import { RadioButton } from '..';
describe('RadioButton', function () {
  test('basic', function () {
    var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(RadioButton, {
      name: "test",
      value: "1"
    }), /*#__PURE__*/React.createElement(RadioButton, {
      id: "test id",
      name: "test",
      value: "2"
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('label', function () {
    var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(RadioButton, {
      label: "test label",
      name: "test",
      value: "1"
    }), /*#__PURE__*/React.createElement(RadioButton, {
      label: /*#__PURE__*/React.createElement("div", null, "test label"),
      name: "test",
      value: "2"
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('checked', function () {
    var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(RadioButton, {
      checked: true,
      name: "test",
      value: "1"
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('disabled', function () {
    var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(RadioButton, {
      disabled: true,
      name: "test",
      value: "1"
    }), /*#__PURE__*/React.createElement(RadioButton, {
      disabled: true,
      checked: true,
      name: "test",
      value: "2"
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('children', function () {
    var child = function child(_ref) {
      var checked = _ref.checked;
      return /*#__PURE__*/React.createElement(Box, {
        pad: "small",
        background: checked ? 'accent-1' : 'control'
      });
    };

    var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(RadioButton, {
      name: "test",
      value: "1"
    }, child), /*#__PURE__*/React.createElement(RadioButton, {
      checked: true,
      name: "test",
      value: "2"
    }, child)));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});