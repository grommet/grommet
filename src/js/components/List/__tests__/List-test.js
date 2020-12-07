import React from 'react';
import 'jest-styled-components';
import 'jest-axe/extend-expect';
import 'regenerator-runtime/runtime';

import { cleanup, render, fireEvent } from '@testing-library/react';
import { axe } from 'jest-axe';
import { Grommet } from '../../Grommet';
import { List } from '..';

describe('List', () => {
  afterEach(cleanup);

  test('should have no accessibility violations', async () => {
    const onClickItem = jest.fn();
    const { container, getByText } = render(
      <Grommet>
        <List
          data={[{ a: 'alpha' }, { a: 'beta' }]}
          onClickItem={onClickItem}
        />
      </Grommet>,
    );

    fireEvent.click(getByText('alpha'));
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('empty', () => {
    const { container } = render(
      <Grommet>
        <List />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('data strings', () => {
    const { container } = render(
      <Grommet>
        <List data={['one', 'two']} />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('data objects', () => {
    const { container } = render(
      <Grommet>
        <List
          data={[
            { a: 'one', b: 1 },
            { a: 'two', b: 2 },
          ]}
        />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('onClickItem', () => {
    const onClickItem = jest.fn();
    const { container, getByText } = render(
      <Grommet>
        <List
          data={[{ a: 'alpha' }, { a: 'beta' }]}
          onClickItem={onClickItem}
        />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
    fireEvent.click(getByText('beta'));
    expect(onClickItem).toBeCalledWith(
      expect.objectContaining({ item: { a: 'beta' } }),
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('background string', () => {
    const { container } = render(
      <Grommet>
        <List data={['one', 'two']} background="accent-1" />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('background array', () => {
    const { container } = render(
      <Grommet>
        <List
          data={['one', 'two', 'three', 'four']}
          background={['accent-1', 'accent-2']}
        />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('border boolean true', () => {
    const { container } = render(
      <Grommet>
        <List data={['one', 'two']} border />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('border boolean false', () => {
    const { container } = render(
      <Grommet>
        <List data={['one', 'two']} border={false} />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('border side', () => {
    const { container } = render(
      <Grommet>
        <List data={['one', 'two']} border="horizontal" />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('border object', () => {
    const { container } = render(
      <Grommet>
        <List
          data={['one', 'two']}
          border={{ color: 'accent-1', side: 'horizontal', size: 'large' }}
        />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('children render', () => {
    const { container } = render(
      <Grommet>
        <List data={['one', 'two']}>
          {(item, index) => `${item} - ${index}`}
        </List>
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('itemProps', () => {
    const { container } = render(
      <Grommet>
        <List
          data={['one', 'two']}
          itemProps={{
            1: {
              background: 'accent-1',
              border: { side: 'horizontal', size: 'small' },
              pad: 'large',
            },
          }}
        />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('margin string', () => {
    const { container } = render(
      <Grommet>
        <List data={['one', 'two']} margin="large" />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('margin object', () => {
    const { container } = render(
      <Grommet>
        <List data={['one', 'two']} margin={{ horizontal: 'large' }} />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('pad string', () => {
    const { container } = render(
      <Grommet>
        <List data={['one', 'two']} pad="large" />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('pad object', () => {
    const { container } = render(
      <Grommet>
        <List data={['one', 'two']} pad={{ horizontal: 'large' }} />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('primaryKey', () => {
    const { container } = render(
      <Grommet>
        <List
          data={[
            { a: 'one', b: 1 },
            { a: 'two', b: 2 },
          ]}
          primaryKey="a"
        />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('secondaryKey', () => {
    const { container } = render(
      <Grommet>
        <List
          data={[
            { a: 'one', b: 1 },
            { a: 'two', b: 2 },
          ]}
          primaryKey="a"
          secondaryKey="b"
        />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});

describe('List events', () => {
  let onClickItem;
  let App;

  beforeEach(() => {
    onClickItem = jest.fn();
    App = () => {
      return (
        <Grommet>
          <List
            data={[{ a: 'alpha' }, { a: 'beta' }]}
            onClickItem={onClickItem}
          />
        </Grommet>
      );
    };
  });

  afterEach(cleanup);

  test('Enter key', () => {
    const { container, getByText } = render(<App />);

    expect(container.firstChild).toMatchSnapshot();
    fireEvent.click(getByText('beta'));
    fireEvent.mouseOver(getByText('beta'));
    fireEvent.keyDown(getByText('beta'), {
      key: 'Enter',
      keyCode: 13,
      which: 13,
    });
    // Reported bug: onEnter calls onClickItem twice instead of once.
    // Issue #4173. Once fixed it should be
    // `expect(onClickItem).toHaveBeenCalledTimes(2);`
    expect(onClickItem).toHaveBeenCalledTimes(3);
    // Both focus and active should be placed on 'beta'
    expect(container.firstChild).toMatchSnapshot();
  });

  test('ArrowUp key', () => {
    const { container, getByText } = render(<App />);

    fireEvent.click(getByText('beta'));
    fireEvent.mouseOver(getByText('beta'));
    fireEvent.keyDown(getByText('beta'), {
      key: 'ArrowUp',
      keyCode: 38,
      which: 38,
    });
    expect(onClickItem).toHaveBeenCalledTimes(1);
    // Focus on beta while `active` is on alpha
    expect(container.firstChild).toMatchSnapshot();
  });

  test('ArrowDown key', () => {
    const { container, getByText } = render(<App />);

    fireEvent.click(getByText('alpha'));
    fireEvent.mouseOver(getByText('alpha'));
    fireEvent.keyDown(getByText('alpha'), {
      key: 'ArrowDown',
      keyCode: 40,
      which: 40,
    });
    expect(onClickItem).toHaveBeenCalledTimes(1);
    // Focus on alpha while `active` is on beta
    expect(container.firstChild).toMatchSnapshot();
  });

  test('ArrowDown key on last element', () => {
    const { container, getByText } = render(<App />);

    fireEvent.click(getByText('beta'));
    fireEvent.mouseOver(getByText('beta'));
    fireEvent.keyDown(getByText('beta'), {
      key: 'ArrowDown',
      keyCode: 40,
      which: 40,
    });
    expect(onClickItem).toHaveBeenCalledTimes(1);
    // Both focus and active should be placed on 'beta'
    expect(container.firstChild).toMatchSnapshot();
  });

  test('focus and blur', () => {
    const { container, getByText } = render(<App />);

    fireEvent.focus(getByText('beta'));
    // Both focus and active should be placed on 'beta'
    expect(container.firstChild).toMatchSnapshot();
    fireEvent.blur(getByText('beta'));
    // Focus on beta while `active` is not on beta
    expect(container.firstChild).toMatchSnapshot();
    expect(onClickItem).toBeCalledTimes(0);
  });

  test('mouse events', () => {
    const { container, getByText } = render(<App />);

    fireEvent.mouseOver(getByText('beta'));
    // Both focus and active should be placed on 'beta'
    expect(container.firstChild).toMatchSnapshot();
    fireEvent.mouseOut(getByText('beta'));
    // Focus on beta while `active` is not on beta
    expect(container.firstChild).toMatchSnapshot();
    expect(onClickItem).toBeCalledTimes(0);
  });
});
