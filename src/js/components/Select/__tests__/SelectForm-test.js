import React from 'react';
import 'jest-styled-components';
import { cleanup, render, fireEvent } from '@testing-library/react';

import { Grommet } from '../..';
import { Select } from '..';
import { Form } from '../../Form';
import { FormField } from '../../FormField';

describe('Select with Form', () => {
  let App;
  beforeEach(() => {
    App = ({ ...props }) => {
      return (
        <Grommet>
          <Form>
            <FormField label="Select">
              <Select {...props} />
            </FormField>
          </Form>
        </Grommet>
      );
    };
  });
  afterEach(cleanup);

  test('renders', () => {
    const { container } = render(<App options={['one', 'two']} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('opens', () => {
    const onOpen = jest.fn();
    const { getByLabelText } = render(
      <App a11yTitle="test-label" options={['one', 'two']} onOpen={onOpen} />,
    );
    fireEvent.click(getByLabelText('test-label'));
    expect(onOpen).toHaveBeenCalled();
  });

  test('select an option', () => {
    const { getByLabelText } = render(
      <App id="test-select" a11yTitle="test-label" options={['one', 'two']} />,
    );
    const select = getByLabelText('test-label');
    fireEvent.click(select);
    fireEvent.click(
      document.getElementById('test-select__drop').querySelector('button'),
    );
    expect(select.value).toEqual('one');
  });
});
