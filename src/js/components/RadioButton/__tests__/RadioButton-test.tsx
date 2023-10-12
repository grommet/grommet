import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import 'jest-styled-components';
import 'jest-axe/extend-expect';
import 'regenerator-runtime/runtime';

import { Grommet } from '../../Grommet';
import { Box } from '../../Box';
import { RadioButton } from '..';

describe('RadioButton', () => {
  test('should have no accessibility violations', async () => {
    const { container } = render(
      <Grommet>
        <RadioButton name="test" a11yTitle="test" />
      </Grommet>,
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
    expect(container.firstChild).toMatchSnapshot();
  });

  test('basic', () => {
    const { container } = render(
      <Grommet>
        <RadioButton name="test" value="1" />
        <RadioButton id="test id" name="test" value="2" />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('label', () => {
    const { container } = render(
      <Grommet>
        <RadioButton label="test label" name="test" value="1" />
        <RadioButton label={<div>test label</div>} name="test" value="2" />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('checked', () => {
    const { container } = render(
      <Grommet>
        <RadioButton checked name="test" value="1" onChange={jest.fn()} />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('disabled', () => {
    const { container } = render(
      <Grommet>
        <RadioButton disabled name="test" value="1" />
        <RadioButton disabled checked name="test" value="2" />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('children', () => {
    const child = ({ checked }: { checked: boolean }) => (
      <Box pad="small" background={checked ? 'accent-1' : 'control'} />
    );

    const { container } = render(
      <Grommet>
        <RadioButton name="test" value="1">
          {child}
        </RadioButton>
        <RadioButton checked name="test" value="2" onChange={jest.fn()}>
          {child}
        </RadioButton>
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('label themed', () => {
    const customTheme = {
      radioButton: {
        font: {
          weight: 500,
        },
      },
    };
    const { container } = render(
      <Grommet theme={customTheme}>
        <RadioButton label="test" name="test" />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('background-color themed', () => {
    const customTheme = {
      radioButton: {
        check: {
          background: {
            color: 'red',
          },
        },
      },
    };

    const { container } = render(
      <Grommet theme={customTheme}>
        <RadioButton name="test" />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('background-color themed symbolic', () => {
    const customTheme = {
      radioButton: {
        check: {
          background: {
            color: 'brand',
          },
        },
      },
    };

    const { container } = render(
      <Grommet theme={customTheme}>
        <RadioButton name="test" />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders custom circle icon', () => {
    const CustomCircleIcon = ({ ...rest }) => (
      <svg data-testid="custom-radioButton-icon" {...rest} />
    );
    const customTheme = {
      radioButton: {
        icons: {
          circle: CustomCircleIcon,
        },
      },
    };

    const { container, getByTestId } = render(
      <Grommet theme={customTheme}>
        <RadioButton name="test" checked onChange={jest.fn()} />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
    expect(getByTestId('custom-radioButton-icon')).toBeDefined();
  });

  test('should apply a11yTitle or aria-label', () => {
    const { container, getByLabelText } = render(
      <Grommet>
        <RadioButton name="test" a11yTitle="test" />
        <RadioButton name="test" aria-label="test-2" />
      </Grommet>,
    );

    expect(getByLabelText('test')).toBeTruthy();
    expect(getByLabelText('test-2')).toBeTruthy();
    expect(container.firstChild).toMatchSnapshot();
  });
});
