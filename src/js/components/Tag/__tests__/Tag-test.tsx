import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import userEvent from '@testing-library/user-event';

import 'jest-styled-components';
import 'jest-axe/extend-expect';
import 'regenerator-runtime/runtime';
import '@testing-library/jest-dom';

import { Grommet, Tag } from '../..';
import { grommet } from '../../../themes/grommet';
import { deepMerge } from '../../../utils';
import { ThemeType } from '../../../themes';

describe('Tag', () => {
  test('should have no accessibility violations', async () => {
    const { container } = render(
      <Grommet>
        <Tag a11yTitle="Test tag" value="Test" />
      </Grommet>,
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('passes through the aria-label prop', async () => {
    const TEST_LABEL = 'Test Label';
    const { container } = render(
      <Grommet>
        <Tag aria-label={TEST_LABEL} data-testid="tag" value="Test" />
      </Grommet>,
    );
    expect(screen.getByTestId('tag')).toHaveAttribute('aria-label', TEST_LABEL);

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('basic', () => {
    const { container } = render(
      <Grommet>
        <Tag name="Name" value="Value" />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('basic outside grommet wrapper', () => {
    const { container } = render(<Tag name="Name" value="Value" />);

    expect(container.firstChild).toMatchSnapshot();
  });

  test('onClick', async () => {
    const user = userEvent.setup();

    const onClick = jest.fn();
    const { container } = render(
      <Grommet>
        <Tag value="Test" onClick={onClick} />
      </Grommet>,
    );

    await user.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalled();

    expect(container.firstChild).toMatchSnapshot();
  });

  test('onRemove', async () => {
    const user = userEvent.setup();

    const onRemove = jest.fn();
    const { container } = render(
      <Grommet>
        <Tag value="Test" onRemove={onRemove} />
      </Grommet>,
    );

    await user.click(screen.getByRole('button'));
    expect(onRemove).toHaveBeenCalled();

    expect(container.firstChild).toMatchSnapshot();
  });

  test('size', () => {
    const { container } = render(
      <Grommet>
        <Tag size="xsmall" name="Name" value="Value" />
        <Tag size="small" name="Name" value="Value" />
        <Tag size="medium" name="Name" value="Value" />
        <Tag size="large" name="Name" value="Value" />
        <Tag size="xlarge" name="Name" value="Value" />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders custom remove icon', () => {
    const CustomRemoveIcon = () => <svg data-testid="custom-remove-icon" />;
    const customTheme = {
      tag: {
        icons: {
          remove: CustomRemoveIcon,
        },
      },
    };

    const { container, getByTestId } = render(
      <Grommet theme={customTheme}>
        <Tag value="Value" onRemove={jest.fn()} />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
    expect(getByTestId('custom-remove-icon')).toBeDefined();
  });

  test('renders default remove icon', () => {
    const { container } = render(<Tag value="Value" onRemove={jest.fn()} />);
    expect(container).toMatchSnapshot();
    expect(screen.getByLabelText('FormClose')).toBeDefined();
  });

  test('renders custom remove button kind and size', () => {
    const customTheme = {
      button: {
        default: {
          background: 'blue',
        },
      },
      tag: {
        remove: {
          kind: 'default',
        },
        size: {
          medium: {
            remove: {
              size: 'small',
              margin: 'small',
            },
          },
          large: {
            remove: {
              size: 'medium',
              margin: {
                vertical: '12px',
                horizontal: '18px',
              },
            },
          },
          xlarge: {
            remove: {
              size: 'large',
              margin: '10px',
            },
          },
        },
      },
    };

    const { asFragment } = render(
      <Grommet theme={customTheme}>
        <Tag value="Value" onRemove={jest.fn()} />
        <Tag value="Value" size="medium" onRemove={jest.fn()} />
        <Tag value="Value" size="large" onRemove={jest.fn()} />
        <Tag value="Value" size="xlarge" onRemove={jest.fn()} />
      </Grommet>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('renders aria-label from messages (name and value)', () => {
    const messages = {
      removeLabel: {
        nameAndValue: 'Remove {name}: {value}',
      },
    };

    render(
      <Grommet>
        <Tag
          name="Category"
          value="Fruits"
          onRemove={() => {}}
          messages={messages}
        />
      </Grommet>,
    );

    expect(screen.getByRole('button')).toHaveAttribute(
      'aria-label',
      'Remove Category: Fruits',
    );
  });

  test('renders aria-label from grommet messages (name and value)', () => {
    render(
      <Grommet
        messages={{
          messages: {
            tag: {
              removeLabel: {
                nameAndValue: 'Remove {name}: {value}',
              },
            },
          },
        }}
      >
        <Tag name="Category" value="Fruits" onRemove={() => {}} />
      </Grommet>,
    );

    expect(screen.getByRole('button')).toHaveAttribute(
      'aria-label',
      'Remove Category: Fruits',
    );
  });

  test('renders aria-label from messages (value only)', () => {
    const messages = {
      removeLabel: {
        valueOnly: 'Remove {value}',
      },
    };

    render(
      <Grommet>
        <Tag value="Fruits" onRemove={() => {}} messages={messages} />
      </Grommet>,
    );

    expect(screen.getByRole('button')).toHaveAttribute(
      'aria-label',
      'Remove Fruits',
    );
  });

  const customHoverTheme: ThemeType = deepMerge(grommet, {
    tag: {
      border: true,
      hover: {
        background: 'pink',
        border: { color: 'green' },
      },
    },
  });

  test('theme border and hover background/border', async () => {
    const user = userEvent.setup();

    const { container } = render(
      <Grommet theme={customHoverTheme}>
        <Tag value="Hover me" background="background" onClick={() => {}} />
      </Grommet>,
    );

    const tagButton = screen.getByRole('button', { name: /Hover me/i });
    await user.hover(tagButton);

    expect(container.firstChild).toMatchSnapshot();
  });
});
