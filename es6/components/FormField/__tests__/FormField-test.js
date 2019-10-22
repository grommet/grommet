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
test('renders', function () {
  var component = renderer.create(React.createElement(Grommet, null, React.createElement(FormField, null), React.createElement(FormField, null, React.createElement(TextInput, null))));
  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('renders label', function () {
  var component = renderer.create(React.createElement(Grommet, null, React.createElement(FormField, {
    label: "test label"
  })));
  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('renders help', function () {
  var component = renderer.create(React.createElement(Grommet, null, React.createElement(FormField, {
    help: "test help"
  })));
  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('renders error', function () {
  var component = renderer.create(React.createElement(Grommet, null, React.createElement(FormField, {
    error: "test error"
  })));
  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('renders htmlFor', function () {
  var component = renderer.create(React.createElement(Grommet, null, React.createElement(FormField, {
    htmlFor: "test-id"
  })));
  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('renders custom margin', function () {
  var component = renderer.create(React.createElement(Grommet, null, React.createElement(FormField, {
    margin: "medium"
  })));
  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('forces empty margin', function () {
  var component = renderer.create(React.createElement(Grommet, null, React.createElement(FormField, {
    margin: "none"
  })));
  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('renders pad', function () {
  var component = renderer.create(React.createElement(Grommet, null, React.createElement(FormField, {
    pad: true
  })));
  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('renders abut correctly', function () {
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
test('renders abut with forced margin', function () {
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
test('renders custom formfield', function () {
  var component = renderer.create(React.createElement(Grommet, null, React.createElement(CustomFormField, {
    htmlFor: "test-id"
  })));
  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});