import React from 'react';
import renderer from 'react-test-renderer';
import styled from 'styled-components';
import 'jest-styled-components';
import { Grommet } from '../../Grommet';
import { FormField } from '..';
import { TextInput } from '../../TextInput';
var CustomFormField = styled(FormField).withConfig({
  displayName: "FormField-test__CustomFormField",
  componentId: "sc-1ddfx0c-0"
})(["font-size:40px;"]);
describe('FormField', function () {
  test('default', function () {
    var component = renderer.create(React.createElement(Grommet, null, React.createElement(FormField, null), React.createElement(FormField, null, React.createElement(TextInput, null))));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('label', function () {
    var component = renderer.create(React.createElement(Grommet, null, React.createElement(FormField, {
      label: "test label"
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('help', function () {
    var component = renderer.create(React.createElement(Grommet, null, React.createElement(FormField, {
      help: "test help"
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('error', function () {
    var component = renderer.create(React.createElement(Grommet, null, React.createElement(FormField, {
      error: "test error"
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('info', function () {
    var component = renderer.create(React.createElement(Grommet, null, React.createElement(FormField, {
      info: "test info"
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('htmlFor', function () {
    var component = renderer.create(React.createElement(Grommet, null, React.createElement(FormField, {
      htmlFor: "test-id"
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('margin', function () {
    var component = renderer.create(React.createElement(Grommet, null, React.createElement(FormField, {
      margin: "medium"
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('empty margin', function () {
    var component = renderer.create(React.createElement(Grommet, null, React.createElement(FormField, {
      margin: "none"
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('pad', function () {
    var component = renderer.create(React.createElement(Grommet, null, React.createElement(FormField, {
      pad: true
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('abut', function () {
    var component = renderer.create(React.createElement(Grommet, {
      theme: {
        formField: {
          border: {
            color: 'border',
            error: {
              color: {
                dark: 'white',
                light: 'status-critical'
              }
            },
            size: 'large',
            position: 'outer',
            side: 'all'
          },
          margin: {
            bottom: 'small'
          }
        }
      }
    }, React.createElement(FormField, {
      htmlFor: "test-id"
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('abut with margin', function () {
    var component = renderer.create(React.createElement(Grommet, {
      theme: {
        formField: {
          border: {
            color: 'border',
            error: {
              color: {
                dark: 'white',
                light: 'status-critical'
              }
            },
            size: 'large',
            position: 'outer',
            side: 'all'
          },
          margin: {
            bottom: 'small'
          }
        }
      }
    }, React.createElement(FormField, {
      margin: "medium",
      htmlFor: "test-id"
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('custom formfield', function () {
    var component = renderer.create(React.createElement(Grommet, null, React.createElement(CustomFormField, {
      htmlFor: "test-id"
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});