import React, { useState } from 'react';
import 'jest-styled-components';
import 'jest-axe/extend-expect';
import 'regenerator-runtime/runtime';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { render, fireEvent, screen, within } from '@testing-library/react';

import { axe } from 'jest-axe';
import { Grommet } from '../../Grommet';
import { List } from '..';
import { Box } from '../../Box';
import { Text } from '../../Text';
import { Button } from '../../Button';

const data = [];
for (let i = 0; i < 95; i += 1) {
  data.push(`entry-${i}`);
}

describe('List', () => {
  test('should have no accessibility violations', async () => {
    const onClickItem = jest.fn();
    const { container, getByText } = render(
      <Grommet>
        <List
          aria-label="List"
          data={[{ a: 'alpha' }, { a: 'beta' }]}
          onClickItem={onClickItem}
        />
      </Grommet>,
    );

    fireEvent.click(getByText('alpha'));
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('renders a11yTitle and aria-label', () => {
    const { container, getByLabelText } = render(
      <Grommet>
        <List a11yTitle="test" data={[{ a: 'alpha' }, { a: 'beta' }]} />
        <List aria-label="test-2" data={[{ a: 'alpha' }, { a: 'beta' }]} />
      </Grommet>,
    );
    expect(getByLabelText('test')).toBeTruthy();
    expect(getByLabelText('test-2')).toBeTruthy();
    expect(container).toMatchSnapshot();
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

  test('defaultItemProps', () => {
    const { container } = render(
      <Grommet>
        <List
          data={['one', 'two']}
          defaultItemProps={{
            background: 'accent-1',
            align: 'start',
          }}
        />
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

  test('itemKey function', () => {
    const onOrder = jest.fn();
    const TestApp = () => {
      const [ordered, setOrdered] = useState([
        { city: 'Fort Collins', state: 'Colorado' },
        { city: 'Boise', state: 'Idaho' },
        { city: 'New Orleans', state: 'Louisiana' },
      ]);
      return (
        <Grommet>
          <List
            data={ordered}
            itemKey={(item) => item.state}
            onOrder={(items) => {
              onOrder(items);
              setOrdered(items);
            }}
            pinned={['Idaho']}
          />
        </Grommet>
      );
    };
    const { asFragment } = render(<TestApp />);
    fireEvent.click(screen.getByRole('button', { name: /Colorado move down/ }));
    expect(onOrder).toHaveBeenCalled();
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('List events', () => {
  let onActive;
  let onClickItem;
  let App;

  beforeEach(() => {
    onActive = jest.fn();
    onClickItem = jest.fn();
    App = () => (
      <Grommet>
        <List
          data={[{ a: 'alpha' }, { a: 'beta' }]}
          onClickItem={onClickItem}
          onActive={onActive}
        />
      </Grommet>
    );
  });

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
    expect(onActive).toHaveBeenCalledTimes(1);
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
    expect(onActive).toHaveBeenCalledTimes(2);
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
    expect(onActive).toHaveBeenCalledTimes(2);
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
    expect(onActive).toHaveBeenCalledTimes(1);
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
    expect(onActive).toHaveBeenCalledTimes(2);
  });

  test('should paginate', () => {
    const { container, getAllByText } = render(
      <Grommet>
        <List data={data} paginate />
      </Grommet>,
    );

    const results = getAllByText('entry', { exact: false });
    // default step 50
    expect(results.length).toEqual(50);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('should apply pagination styling', () => {
    const { container } = render(
      <Grommet>
        <List data={data} paginate={{ background: 'red', margin: 'large' }} />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('should show correct item index when "show" is a number', () => {
    const show = 15;
    const { container, getByText } = render(
      <Grommet>
        <List data={data} show={show} paginate />
      </Grommet>,
    );

    const result = getByText(`entry-${show}`);
    expect(result).toBeTruthy();
    expect(container.firstChild).toMatchSnapshot();
  });

  test('should show correct page when "show" is { page: # }', () => {
    const desiredPage = 2;
    const { container } = render(
      <Grommet>
        <List data={data} show={{ page: desiredPage }} paginate />
      </Grommet>,
    );

    const activePage = container.querySelector(
      `[aria-current="page"]`,
    ).innerHTML;

    expect(activePage).toEqual(`${desiredPage}`);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('should render correct num items per page (step)', () => {
    const step = 14;
    const { container, getAllByText } = render(
      <Grommet>
        <List data={data} step={step} paginate />
      </Grommet>,
    );

    const results = getAllByText('entry', { exact: false });

    expect(results.length).toEqual(step);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('should render new data when page changes', () => {
    const { container, getByLabelText } = render(
      <Grommet>
        <List data={data} paginate />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
    fireEvent.click(getByLabelText('Go to next page'));

    expect(container.firstChild).toMatchSnapshot();
  });

  test('should not show paginate controls when length of data < step', () => {
    const { container } = render(
      <Grommet>
        <List data={['entry-1', 'entry-2', 'entry-3']} paginate />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});

describe('List onOrder', () => {
  let onOrder;
  let App;

  beforeEach(() => {
    onOrder = jest.fn();
    App = () => {
      const [ordered, setOrdered] = useState([{ a: 'alpha' }, { a: 'beta' }]);
      return (
        <Grommet>
          <List
            data={ordered}
            primaryKey="a"
            onOrder={(newData) => {
              setOrdered(newData);
              onOrder(newData);
            }}
          />
        </Grommet>
      );
    };
  });

  test('Mouse move down', () => {
    const { container } = render(<App />);

    expect(container.firstChild).toMatchSnapshot();
    fireEvent.click(container.querySelector('#alphaMoveDown'));
    expect(onOrder).toHaveBeenCalled();
    expect(container.firstChild).toMatchSnapshot();
  });

  test('Keyboard move down', () => {
    const { container, getByText } = render(<App />);

    expect(container.firstChild).toMatchSnapshot();
    fireEvent.click(getByText('alpha'));
    fireEvent.mouseOver(getByText('alpha'));
    fireEvent.keyDown(getByText('alpha'), {
      key: 'ArrowDown',
      keyCode: 40,
      which: 40,
    });
    // alpha's down arrow control should be active
    expect(container.firstChild).toMatchSnapshot();
    fireEvent.keyDown(getByText('alpha'), {
      key: 'Enter',
      keyCode: 13,
      which: 13,
    });
    expect(onOrder).toHaveBeenCalled();
    expect(container.firstChild).toMatchSnapshot();
  });

  test('Keyboard move up', () => {
    const { container, getByText } = render(<App />);

    expect(container.firstChild).toMatchSnapshot();
    fireEvent.click(getByText('alpha'));
    fireEvent.mouseOver(getByText('alpha'));
    fireEvent.keyDown(getByText('alpha'), {
      key: 'ArrowDown',
      keyCode: 40,
      which: 40,
    });
    fireEvent.keyDown(getByText('alpha'), {
      key: 'ArrowDown',
      keyCode: 40,
      which: 40,
    });
    // beta's up arrow control should be active
    expect(container.firstChild).toMatchSnapshot();
    fireEvent.keyDown(getByText('alpha'), {
      key: 'Enter',
      keyCode: 13,
      which: 13,
    });
    expect(onOrder).toHaveBeenCalled();
    expect(container.firstChild).toMatchSnapshot();
  });
});

describe('List onOrder with action', () => {
  let onOrder;
  let App;

  beforeEach(() => {
    onOrder = jest.fn();
    App = () => {
      const [ordered, setOrdered] = useState([{ a: 'alpha' }, { a: 'beta' }]);
      return (
        <Grommet>
          <List
            data={ordered}
            primaryKey="a"
            onOrder={(newData) => {
              setOrdered(newData);
              onOrder(newData);
            }}
            // eslint-disable-next-line react/no-unstable-nested-components
            action={(item, index) => (
              <Button key={`action${index}`} label="Action" />
            )}
          />
        </Grommet>
      );
    };
  });

  test('Render', () => {
    const { asFragment } = render(<App />);

    expect(asFragment()).toMatchSnapshot();
  });
});

describe('List disabled', () => {
  const locations = [
    'Boise',
    'Fort Collins',
    'Los Gatos',
    'Palo Alto',
    'San Francisco',
  ];
  const disabledLocations = ['Fort Collins', 'Palo Alto'];

  test('Should apply disabled styling to items', () => {
    const App = () => (
      <Grommet>
        <List data={locations} disabled={disabledLocations} />
      </Grommet>
    );
    const { asFragment } = render(<App />);

    expect(asFragment()).toMatchSnapshot();
  });

  test('Should render aria-disabled="true"', () => {
    const App = () => (
      <Grommet>
        <List data={locations} disabled={disabledLocations} />
      </Grommet>
    );
    render(<App />);

    const allItems = screen.getAllByRole('listitem');
    expect(allItems).toHaveLength(locations.length);
    let disabledCount = 0;
    allItems.forEach((item) => {
      if (item.getAttribute('aria-disabled') === 'true') {
        disabledCount += 1;
      }
    });
    expect(disabledCount).toBe(disabledLocations.length);
  });

  test('Should apply disabled styling to items when data are objects', () => {
    const typeObjects = [
      { city: 'Boise', state: 'Idaho' },
      { city: 'Fort Collins', state: 'Colorado' },
      { city: 'Los Gatos', state: 'California' },
      { city: 'Palo Alto', state: 'California' },
      { city: 'San Francisco', state: 'California' },
    ];

    const App = () => (
      <Grommet>
        <List data={typeObjects} disabled={disabledLocations} itemKey="city" />
      </Grommet>
    );
    const { asFragment } = render(<App />);

    expect(asFragment()).toMatchSnapshot();
  });

  test('Should apply disabled styling to items when data are children', () => {
    const App = () => (
      <Grommet>
        <List data={locations} disabled={disabledLocations}>
          {(item) => (
            <Box>
              <Text weight="bold">{item}</Text>
            </Box>
          )}
        </List>
      </Grommet>
    );
    const { asFragment } = render(<App />);

    expect(asFragment()).toMatchSnapshot();
  });

  test('Disabled items should not call onClickItem with mouse', async () => {
    const onClickItem = jest.fn();
    const user = userEvent.setup();

    const App = () => (
      <Grommet>
        <List
          data={locations}
          disabled={disabledLocations}
          onClickItem={onClickItem}
        />
      </Grommet>
    );
    render(<App />);

    const enabledItems = locations.filter(
      (item) => !disabledLocations.includes(item),
    );

    await user.click(
      screen.getByRole('option', {
        name: enabledItems[0],
      }),
    );
    await user.click(
      screen.getByRole('option', {
        name: disabledLocations[0],
      }),
    );
    await user.click(
      screen.getByRole('option', {
        name: enabledItems[enabledItems.length - 1],
      }),
    );
    await user.click(
      screen.getByRole('option', {
        name: disabledLocations[disabledLocations.length - 1],
      }),
    );

    expect(onClickItem).toHaveBeenCalledTimes(2);
  });

  test('Disabled items should not call onClickItem with keyboard', async () => {
    const onClickItem = jest.fn();
    const user = userEvent.setup();

    const App = () => (
      <Grommet>
        <List
          data={locations}
          disabled={disabledLocations}
          onClickItem={({ item }) => onClickItem(item)}
        />
      </Grommet>
    );
    render(<App />);

    const list = screen.getByRole('listbox');
    await user.tab();
    expect(list).toHaveFocus();
    // user.keyboard is not behaving as expected
    // await user.keyboard('[ArrowUp][Enter]');
    const enabledItems = locations.filter(
      (item) => !disabledLocations.includes(item),
    );

    fireEvent.keyDown(screen.getByRole('option', { name: enabledItems[0] }), {
      key: 'Enter',
      keyCode: 13,
      which: 13,
    });

    fireEvent.keyDown(
      screen.getByRole('option', { name: disabledLocations[0] }),
      {
        key: 'Enter',
        keyCode: 13,
        which: 13,
      },
    );

    fireEvent.keyDown(
      screen.getByRole('option', {
        name: enabledItems[enabledItems.length - 1],
      }),
      {
        key: 'Enter',
        keyCode: 13,
        which: 13,
      },
    );

    fireEvent.keyDown(
      screen.getByRole('option', {
        name: disabledLocations[disabledLocations.length - 1],
      }),
      {
        key: 'Enter',
        keyCode: 13,
        which: 13,
      },
    );

    expect(onClickItem).toHaveBeenCalledTimes(2);
    expect(onClickItem).toHaveBeenCalledWith(enabledItems[0]);
    expect(onClickItem).not.toHaveBeenCalledWith(disabledLocations[0]);
  });

  test('Disabled items should be allowed to be re-ordered', async () => {
    const onOrder = jest.fn();
    const user = userEvent.setup();

    const App = () => {
      const [ordered, setOrdered] = useState(locations);
      return (
        <Grommet>
          <List
            data={ordered}
            disabled={disabledLocations}
            onOrder={(next) => {
              setOrdered(next);
              onOrder(next);
            }}
          />
        </Grommet>
      );
    };

    const { asFragment } = render(<App />);

    expect(asFragment()).toMatchSnapshot();

    const disabledItem = screen.getByRole('button', {
      name: '2 Fort Collins move up',
    });
    await user.click(disabledItem);
    expect(onOrder).toHaveBeenCalled();
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('List pinned', () => {
  const locations = [
    'Boise',
    'Fort Collins',
    'Los Gatos',
    'Palo Alto',
    'San Francisco',
  ];
  const pinnedLocations = ['Fort Collins', 'Palo Alto'];

  test('Should apply pinned styling to items', () => {
    const App = () => (
      <Grommet>
        <List data={locations} pinned={pinnedLocations} />
      </Grommet>
    );
    const { asFragment } = render(<App />);

    expect(asFragment()).toMatchSnapshot();
  });

  test('Should apply pinned styling to items when data are objects', () => {
    const typeObjects = [
      { city: 'Boise', state: 'Idaho' },
      { city: 'Fort Collins', state: 'Colorado' },
      { city: 'Los Gatos', state: 'California' },
      { city: 'Palo Alto', state: 'California' },
      { city: 'San Francisco', state: 'California' },
    ];

    const App = () => (
      <Grommet>
        <List data={typeObjects} pinned={pinnedLocations} itemKey="city" />
      </Grommet>
    );
    const { asFragment } = render(<App />);

    expect(asFragment()).toMatchSnapshot();
  });

  test('Should apply pinned styling to items when data are children', () => {
    const App = () => (
      <Grommet>
        <List data={locations} pinned={pinnedLocations}>
          {(item) => (
            <Box>
              <Text weight="bold">{item}</Text>
            </Box>
          )}
        </List>
      </Grommet>
    );
    const { asFragment } = render(<App />);

    expect(asFragment()).toMatchSnapshot();
  });

  test('Pinned items should not be allowed to be re-ordered', async () => {
    const onOrder = jest.fn();
    const user = userEvent.setup();

    const App = () => {
      const [ordered, setOrdered] = useState(locations);
      return (
        <Grommet>
          <List
            data={ordered}
            pinned={pinnedLocations}
            onOrder={(next) => {
              setOrdered(next);
              onOrder(next);
            }}
          />
        </Grommet>
      );
    };

    const { asFragment } = render(<App />);

    expect(asFragment()).toMatchSnapshot();

    const list = screen.getByRole('listbox');
    const listItems = within(list).getAllByRole('listitem');
    const middleItem = screen.getByRole('button', {
      name: '3 San Francisco move up',
    });

    // expect item at position 2 in the list
    expect(listItems[1]).toHaveTextContent('2Fort Collins');
    await user.click(middleItem);
    expect(onOrder).toHaveBeenCalled();

    // confirm item at position 2 in the list is unchanged
    expect(listItems[1]).toHaveTextContent('2Fort Collins');
    expect(asFragment()).toMatchSnapshot();
  });
});
