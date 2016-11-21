import React from 'react';
import renderer from 'react-test-renderer';

import Form from '../../src/js/components/Form';
import FormFields from '../../src/js/components/FormFields';
import FormField from '../../src/js/components/FormField';

// needed because this:
// https://github.com/facebook/jest/issues/1353
jest.mock('react-dom');

describe('Form', () => {
  it('has correct default options', () => {
    const component = renderer.create(
      <Form
        onSubmit={(e) => e}>
        <FormFields>
          <FormField label="Item 1" htmlFor="item1">
            <input id="item1" type="text" />
          </FormField>
        </FormFields>
      </Form>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders with alternate props', () => {
    const component = renderer.create(
      <Form pad={{ horizontal: 'large', vertical: 'large'}}
        compact fill onSubmit={(e) => e}>
        <FormFields>
          <FormField label="Item 1" htmlFor="item1">
            <input id="item1" type="text" />
          </FormField>
        </FormFields>
      </Form>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders a class name', () => {
    const component = renderer.create(
      <Form className="test"
        onSubmit={(e) => e}>
        <FormFields>
          <FormField label="Item 1" htmlFor="item1">
            <input id="item1" type="text" />
          </FormField>
        </FormFields>
      </Form>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders microdata properties', () => {
    const component = renderer.create(
      <Form itemScope={true} itemType="http://schema.org/Article"
        itemProp="test" onSubmit={(e) => e}>
        <FormFields>
          <FormField label="Item 1" htmlFor="item1">
            <input id="item1" type="text" />
          </FormField>
        </FormFields>
      </Form>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
