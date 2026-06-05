import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { axe } from 'jest-axe';
import 'jest-styled-components';
import 'jest-axe/extend-expect';
import '@testing-library/jest-dom';
import 'regenerator-runtime/runtime';

import { Grommet } from '../../Grommet';
import { Box } from '../../Box';
import { Text } from '..';

describe('Text', () => {
  test('should have no accessibility violations', async () => {
    const { container } = render(
      <Grommet>
        <Text aria-label="test">Example</Text>
      </Grommet>,
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders', () => {
    const { container } = render(
      <Grommet>
        <Text>text</Text>
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders outside grommet wrapper', () => {
    const { container } = render(<Text>text</Text>);

    expect(container.firstChild).toMatchSnapshot();
  });

  test('accepts ref', () => {
    const ref = React.createRef<HTMLParagraphElement>();
    const { container } = render(
      <Grommet>
        <Text ref={ref}>text</Text>
      </Grommet>,
    );

    expect(ref.current).not.toBeNull();
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders size', () => {
    const { container } = render(
      <Grommet>
        <Text size="xsmall" />
        <Text size="small" />
        <Text size="medium" />
        <Text size="large" />
        <Text size="xlarge" />
        <Text size="xxlarge" />
        <Text size="2xl" />
        <Text size="3xl" />
        <Text size="4xl" />
        <Text size="5xl" />
        <Text size="6xl" />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders textAlign', () => {
    const { container } = render(
      <Grommet>
        <Text textAlign="start" />
        <Text textAlign="center" />
        <Text textAlign="end" />
        <Text textAlign="justify" />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders margin', () => {
    const { container } = render(
      <Grommet>
        <Text margin="small" />
        <Text margin="medium" />
        <Text margin="large" />
        <Text margin="none" />
        <Text margin={{ vertical: 'small' }} />
        <Text margin={{ horizontal: 'small' }} />
        <Text margin={{ bottom: 'small' }} />
        <Text margin={{ top: 'small' }} />
        <Text margin={{ left: 'small' }} />
        <Text margin={{ right: 'small' }} />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  const LONG = 'a b c d e f g h i j k l m n o p q r s t u v w x y z';

  test('renders truncate', () => {
    const { container } = render(
      <Grommet>
        <Text truncate={false}>{LONG}</Text>
        <Text truncate>{LONG}</Text>
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders truncate="tip"', async () => {
    // Mock scrollWidth to be larger than offsetWidth to trigger truncation
    Object.defineProperty(HTMLElement.prototype, 'scrollWidth', {
      configurable: true,
      value: 200,
    });
    Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
      configurable: true,
      value: 100,
    });

    render(
      <Grommet>
        <Text truncate="tip">{LONG}</Text>
      </Grommet>,
    );

    const text = screen.getByText(LONG);
    fireEvent.mouseOver(text);

    const tip = await waitFor(() => {
      const tips = screen.getAllByText(LONG);
      return tips.find((el) => el.closest('[role="tooltip"]'));
    });
    expect(tip).toBeInTheDocument();
  });

  test('Tip should have proper ARIA attributes for screen readers', async () => {
    render(
      <Grommet>
        <Text
          id="test-text"
          tip={{
            content: (
              <Box id="test-tooltip" data-testid="tooltip">
                Accessible tooltip
              </Box>
            ),
          }}
        >
          Screen reader accessible text
        </Text>
      </Grommet>,
    );

    const textElement = screen.getByText('Screen reader accessible text');

    // Text should have aria-describedby pointing to tooltip when tooltip is visible
    expect(textElement).not.toHaveAttribute('aria-describedby');
    expect(textElement).toHaveAttribute('tabIndex', '0');

    // Focus the text to show tooltip
    fireEvent.keyDown(document, { key: 'Tab' });
    fireEvent.focus(textElement);

    const tooltip = await waitFor(() => screen.getByText('Accessible tooltip'));
    expect(tooltip).toBeInTheDocument();

    const ariaDescribedBy = textElement.getAttribute('aria-describedby');
    expect(ariaDescribedBy).toBeTruthy();

    // Check that the tooltip container has the id referenced by aria-describedby
    const tooltipContainer = document.getElementById(ariaDescribedBy as string);
    expect(tooltipContainer).toBeInTheDocument();
    expect(tooltipContainer).toContainElement(tooltip);
  });

  test('renders color', () => {
    const { container } = render(
      <Grommet>
        <Text color="status-critical" />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders tag', () => {
    const { container } = render(
      <Grommet>
        <Text as="div" />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('proxies tag', () => {
    const { container: tagComponent } = render(
      <Grommet>
        <Text tag="div" />
      </Grommet>,
    );
    const { container: asComponent } = render(
      <Grommet>
        <Text as="div" />
      </Grommet>,
    );

    expect(tagComponent).toEqual(asComponent);
  });

  test('renders weight', () => {
    const { container } = render(
      <Grommet>
        <Text weight="normal" />
        <Text weight="bold" />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders tip on hover', () => {
    const { container, getByText } = render(
      <Grommet>
        <Text tip="tooltip">Default Tip</Text>
      </Grommet>,
    );

    fireEvent.mouseOver(getByText('Default Tip'));
    expect(container.firstChild).toMatchSnapshot();
  });

  test('should apply aria-description when tip is a string', () => {
    const { container, getByText } = render(
      <Grommet>
        <Text tip="tooltip description">Example with tip as a string</Text>
      </Grommet>,
    );

    const textWithTip = getByText('Example with tip as a string');
    const ariaDescription = textWithTip.getAttribute('aria-description');
    expect(ariaDescription).toBe('tooltip description');
    expect(container.firstChild).toMatchSnapshot();
  });

  test('should apply aria-describedby when tip is React node content', () => {
    const { container, getByText } = render(
      <Grommet>
        <Text
          tip={{
            plain: true,
            dropProps: { align: { bottom: 'top' } },
            content: (
              <Box
                pad="xxsmall"
                elevation="small"
                background="#EDEDED"
                round="xsmall"
                margin="xsmall"
                overflow="hidden"
                align="center"
              >
                tooltip
              </Box>
            ),
          }}
        >
          Example with tip that is not a string
        </Text>
      </Grommet>,
    );

    const textWithTip = getByText('Example with tip that is not a string');
    fireEvent.mouseOver(textWithTip);
    const ariaDescribedBy = textWithTip.getAttribute('aria-describedby');
    expect(ariaDescribedBy).toBeTruthy();
    const tooltipEl = document.getElementById(ariaDescribedBy as string);
    expect(tooltipEl).not.toBeNull();
    expect(tooltipEl?.getAttribute('role')).toBe('tooltip');
    expect(container.firstChild).toMatchSnapshot();
  });

  test('should apply aria-describedby to tooltip and preserve id on element when tip is React node content', () => {
    const { container, getByText } = render(
      <Grommet>
        <Text
          id="tip-id"
          tip={{
            plain: true,
            dropProps: { align: { bottom: 'top' } },
            content: (
              <Box
                pad="xxsmall"
                elevation="small"
                background="#EDEDED"
                round="xsmall"
                margin="xsmall"
                overflow="hidden"
                align="center"
              >
                tooltip
              </Box>
            ),
          }}
        >
          Example with tip that is not a string with id prop
        </Text>
      </Grommet>,
    );

    const textWithTip = getByText(
      'Example with tip that is not a string with id prop',
    );
    expect(textWithTip.getAttribute('id')).toBe('tip-id');
    fireEvent.mouseOver(textWithTip);
    const ariaDescribedBy = textWithTip.getAttribute('aria-describedby');
    expect(ariaDescribedBy).toBeTruthy();
    // aria-describedby references the tooltip element, not the element's own id
    expect(ariaDescribedBy).not.toBe('tip-id');
    const tooltipEl = document.getElementById(ariaDescribedBy as string);
    expect(tooltipEl).not.toBeNull();
    expect(tooltipEl?.getAttribute('role')).toBe('tooltip');
    expect(container.firstChild).toMatchSnapshot();
  });
});
