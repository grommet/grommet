import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import { cleanup, fireEvent, render } from '@testing-library/react';
import { axe } from 'jest-axe';
import 'jest-axe/extend-expect';
import 'regenerator-runtime/runtime';

import { createPortal, expectPortal } from '../../../utils/portal';
import { Grommet } from '../../Grommet';
import { TimeInput } from '..';

const TIME = '2020-07-02T00:30:00-08:00';

describe('TimeInput', () => {
  beforeEach(createPortal);

  afterEach(cleanup);

  test('should have no accessibility violations', async () => {
    const { container } = render(
      <Grommet>
        <TimeInput format="hh:mm" a11yTitle="axe test" />
      </Grommet>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('basic', () => {
    const component = renderer.create(
      <Grommet>
        <TimeInput id="item" name="item" value={TIME} />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('format', () => {
    const component = renderer.create(
      <Grommet>
        <TimeInput id="item" name="item" format="hh:mm" value={TIME} />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('inline', () => {
    const component = renderer.create(
      <Grommet>
        <TimeInput id="item" name="item" inline value={TIME} />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('format inline', () => {
    const component = renderer.create(
      <Grommet>
        <TimeInput id="item" name="item" format="hh:mm" inline value={TIME} />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('format disabled', () => {
    const component = renderer.create(
      <Grommet>
        <TimeInput id="item" name="item" format="hh:mm" disabled value={TIME} />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('focus', () => {
    const onFocus = jest.fn();
    const { container, getByPlaceholderText } = render(
      <Grommet>
        <TimeInput
          id="item"
          name="item"
          format="hh:mm"
          value={TIME}
          onFocus={onFocus}
        />
      </Grommet>,
    );

    fireEvent.focus(getByPlaceholderText('hh:mm'));
    expect(container.firstChild).toMatchSnapshot();
    expectPortal('item__drop').toMatchSnapshot();
    expect(onFocus).toHaveBeenCalled();

    fireEvent.keyDown(getByPlaceholderText('hh:mm'), {
      key: 'Esc',
      keyCode: 27,
      which: 27,
    });
    expect(document.getElementById('item__drop')).toBeNull();
  });

  test('select format', () => {
    const onChange = jest.fn(event => event.value);
    const { container, getByPlaceholderText } = render(
      <Grommet>
        <TimeInput
          id="item"
          name="item"
          format="hh:mm"
          value={TIME}
          onChange={onChange}
        />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();

    fireEvent.focus(getByPlaceholderText('hh:mm'));
    expect(container.firstChild).toMatchSnapshot();
    expectPortal('item__drop').toMatchSnapshot();

    // fireEvent.click(getByPlaceholderText('hh:mm'));
    // expect(onChange).toHaveBeenCalled();
    // expect(onChange).toHaveReturnedWith('2020-07-20T08:00:00.000Z');
    // expect(document.getElementById('item__drop')).toBeNull();
  });

  test(`dropProps should pass props to Drop 
  when not inline`, () => {
    const { container } = render(
      <Grommet>
        <TimeInput
          dropProps={{
            plain: true,
          }}
          format="hh:mm"
        />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test(`buttonProps should pass props to Button 
  when not inline and no format`, () => {
    const component = renderer.create(
      <Grommet>
        <TimeInput
          buttonProps={{
            open: true,
            disabled: true,
          }}
        />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
