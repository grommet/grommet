import React from 'react';
import 'jest-styled-components';
import 'jest-axe/extend-expect';
import 'regenerator-runtime/runtime';

import { axe } from 'jest-axe';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Accordion, AccordionPanel, Box, Grommet } from '../..';

const customTheme = {
  accordion: {
    heading: { level: '3' },
    hover: {
      background: 'background-contrast',
    },
  },
};

describe('Accordion', () => {
  test('should have no accessibility violations', async () => {
    const { container, asFragment } = render(
      <Grommet>
        <Accordion>
          <AccordionPanel>Panel body 1</AccordionPanel>
        </Accordion>
      </Grommet>,
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
    expect(asFragment()).toMatchSnapshot();
  });

  test('no AccordionPanel', () => {
    const { asFragment } = render(
      <Grommet>
        <Accordion />
      </Grommet>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('AccordionPanel', () => {
    const { asFragment } = render(
      <Grommet>
        <Accordion>
          <AccordionPanel label="Panel 1">Panel body 1</AccordionPanel>
          <AccordionPanel label="Panel 2">Panel body 2</AccordionPanel>
          {false && (
            <AccordionPanel label="Panel 2">Panel body 2</AccordionPanel>
          )}
        </Accordion>
      </Grommet>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('complex title', () => {
    const { asFragment } = render(
      <Grommet>
        <Box background="dark-1">
          <Accordion>
            <AccordionPanel label={<div>Panel 1 complex</div>}>
              Panel body 1
            </AccordionPanel>
            {undefined}
            <AccordionPanel label={<div>Panel 2 complex</div>}>
              Panel body 2
            </AccordionPanel>
          </Accordion>
        </Box>
      </Grommet>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('complex header', () => {
    const { asFragment } = render(
      <Grommet>
        <Accordion activeIndex={1} animate={false}>
          <AccordionPanel header={<div>Panel 1 header</div>}>
            Panel body 1
          </AccordionPanel>
          {undefined}
          <AccordionPanel header={<div>Panel 2 header</div>}>
            Panel body 2
          </AccordionPanel>
        </Accordion>
      </Grommet>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('change to second Panel', async () => {
    const user = userEvent.setup();
    const onActive = jest.fn();
    const { asFragment } = render(
      <Grommet>
        <Accordion onActive={onActive}>
          <AccordionPanel label="Panel 1">Panel body 1</AccordionPanel>
          <AccordionPanel label="Panel 2">Panel body 2</AccordionPanel>
        </Accordion>
      </Grommet>,
    );
    expect(asFragment()).toMatchSnapshot();

    await user.click(screen.getByRole('button', { name: /Panel 2/i }));
    expect(onActive).toBeCalled();
    expect(asFragment()).toMatchSnapshot();
  });

  test('change to second Panel without onActive', async () => {
    const user = userEvent.setup();
    const { asFragment } = render(
      <Grommet>
        <Accordion animate={false}>
          <AccordionPanel label="Panel 1">Panel body 1</AccordionPanel>
          <AccordionPanel label="Panel 2">Panel body 2</AccordionPanel>
        </Accordion>
      </Grommet>,
    );
    expect(asFragment()).toMatchSnapshot();

    await user.click(screen.getByRole('button', { name: /Panel 2/i }));
    expect(asFragment()).toMatchSnapshot();
  });

  test('multiple panels', async () => {
    const user = userEvent.setup();
    const onActive = jest.fn();
    const { asFragment } = render(
      <Grommet>
        <Accordion animate={false} multiple onActive={onActive}>
          <AccordionPanel label="Panel 1">Panel body 1</AccordionPanel>
          <AccordionPanel label="Panel 2">Panel body 2</AccordionPanel>
        </Accordion>
      </Grommet>,
    );
    expect(asFragment()).toMatchSnapshot();

    await user.click(screen.getByRole('button', { name: /Panel 2/i }));
    expect(onActive).toBeCalledWith([1]);

    expect(asFragment()).toMatchSnapshot();

    await user.click(screen.getByRole('button', { name: /Panel 1/i }));
    expect(onActive).toBeCalledWith([1, 0]);

    expect(asFragment()).toMatchSnapshot();

    await user.click(screen.getByRole('button', { name: /Panel 2/i }));
    expect(onActive).toBeCalledWith([0]);

    expect(asFragment()).toMatchSnapshot();

    await user.click(screen.getByRole('button', { name: /Panel 1/i }));
    expect(onActive).toBeCalledWith([]);

    expect(asFragment()).toMatchSnapshot();
  });

  test('custom accordion', async () => {
    const user = userEvent.setup();

    const { asFragment } = render(
      <Grommet theme={customTheme}>
        <Accordion>
          <AccordionPanel label="Panel 1">Panel body 1</AccordionPanel>
        </Accordion>
      </Grommet>,
    );
    expect(asFragment()).toMatchSnapshot();

    await user.hover(screen.getByRole('button', { name: 'Panel 1 FormDown' }));
    expect(asFragment()).toMatchSnapshot();
  });

  test('accordion border', () => {
    const { asFragment } = render(
      <Grommet
        theme={{
          accordion: {
            border: undefined,
            panel: {
              border: {
                side: 'horizontal',
              },
            },
          },
        }}
      >
        <Accordion>
          <AccordionPanel label="Panel 1">Panel body 1</AccordionPanel>
        </Accordion>
      </Grommet>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('change active index', async () => {
    const user = userEvent.setup();
    const onActive = jest.fn();
    const { asFragment } = render(
      <Grommet>
        <Accordion animate={false} activeIndex={1} onActive={onActive}>
          <AccordionPanel label="Panel 1">Panel body 1</AccordionPanel>
          <AccordionPanel label="Panel 2">Panel body 2</AccordionPanel>
        </Accordion>
      </Grommet>,
    );
    expect(asFragment()).toMatchSnapshot();

    await user.click(screen.getByRole('button', { name: /Panel 1/i }));
    expect(onActive).toBeCalledWith([0]);
    expect(asFragment()).toMatchSnapshot();
  });

  test('focus and hover styles', async () => {
    const user = userEvent.setup();
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation();
    const { asFragment } = render(
      <Grommet theme={{ accordion: { hover: { color: 'red' } } }}>
        <Accordion>
          <AccordionPanel
            label="Panel 1"
            onMouseOver={() => {}}
            onMouseOut={() => {}}
            onFocus={() => {}}
            onBlur={() => {}}
          >
            Panel body 1
          </AccordionPanel>
        </Accordion>
      </Grommet>,
    );

    await user.click(screen.getByRole('button', { name: /Panel 1/i }));
    expect(asFragment()).toMatchSnapshot();
    expect(warnSpy).toHaveBeenCalled();
    warnSpy.mockRestore();
  });

  test('backward compatibility of hover.color = undefined', async () => {
    const user = userEvent.setup();
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation();
    const { asFragment } = render(
      <Grommet
        theme={{
          accordion: {
            hover: { color: undefined },
          },
        }}
      >
        <Accordion>
          <AccordionPanel
            label="Panel 1"
            onMouseOver={() => {}}
            onMouseOut={() => {}}
            onFocus={() => {}}
            onBlur={() => {}}
          >
            Panel body 1
          </AccordionPanel>
        </Accordion>
      </Grommet>,
    );

    await user.tab();
    // hover color should be undefined
    expect(asFragment()).toMatchSnapshot();
    expect(warnSpy).toHaveBeenCalled();
    warnSpy.mockRestore();
  });

  test('theme hover of hover.heading.color', async () => {
    const user = userEvent.setup();
    const { asFragment } = render(
      <Grommet
        theme={{
          accordion: {
            hover: { heading: { color: 'teal' } },
          },
        }}
      >
        <Accordion>
          <AccordionPanel
            label="Panel 1"
            onMouseOver={() => {}}
            onMouseOut={() => {}}
            onFocus={() => {}}
            onBlur={() => {}}
          >
            Panel body 1
          </AccordionPanel>
        </Accordion>
      </Grommet>,
    );

    await user.tab();
    // hover color should be undefined
    expect(asFragment()).toMatchSnapshot();
  });

  test('set on hover', async () => {
    const user = userEvent.setup();
    const onMouseOver1 = jest.fn();
    const onMouseOut1 = jest.fn();
    const onMouseOver2 = jest.fn();
    const onMouseOut2 = jest.fn();
    render(
      <Grommet>
        <Accordion>
          <AccordionPanel
            label="Panel 1"
            onMouseOver={onMouseOver1}
            onMouseOut={onMouseOut1}
          >
            Panel body 1
          </AccordionPanel>
          <AccordionPanel
            label="Panel 2"
            onMouseOver={onMouseOver2}
            onMouseOut={onMouseOut2}
          >
            Panel body 2
          </AccordionPanel>
        </Accordion>
      </Grommet>,
    );

    await user.hover(screen.getByRole('button', { name: /Panel 1/i }));
    expect(onMouseOver1).toHaveBeenCalled();
    await user.unhover(screen.getByRole('button', { name: /Panel 1/i }));
    expect(onMouseOut1).toHaveBeenCalled();

    await user.hover(screen.getByRole('button', { name: /Panel 2/i }));
    expect(onMouseOver2).toHaveBeenCalled();
    await user.unhover(screen.getByRole('button', { name: /Panel 2/i }));
    expect(onMouseOver2).toHaveBeenCalled();
  });

  test('wrapped panel', async () => {
    const user = userEvent.setup();
    const onActive = jest.fn();
    const { asFragment } = render(
      <Grommet>
        <Accordion animate={false} onActive={onActive}>
          <AccordionPanel label="Panel 1">Panel body 1</AccordionPanel>
          <AccordionPanel label="Panel 2">Panel body 2</AccordionPanel>
        </Accordion>
      </Grommet>,
    );
    expect(asFragment()).toMatchSnapshot();

    await user.click(screen.getByRole('button', { name: /Panel 1/i }));
    expect(onActive).toBeCalledWith([0]);
    expect(screen.getByText('Panel body 1')).not.toBeNull();
    expect(asFragment()).toMatchSnapshot();
  });

  test('blur styles', async () => {
    const user = userEvent.setup();
    const onBlur = jest.fn();
    const { asFragment } = render(
      <Grommet theme={{ accordion: { hover: { heading: { color: 'red' } } } }}>
        <Accordion>
          <AccordionPanel
            label="Panel 1"
            onMouseOver={() => {}}
            onMouseOut={() => {}}
            onFocus={() => {}}
            onBlur={onBlur}
          >
            Panel body 1
          </AccordionPanel>
        </Accordion>
      </Grommet>,
    );

    // tab to the first accordion panel
    await user.tab();
    expect(asFragment()).toMatchSnapshot();
    // tab away from the first accordion panel
    await user.tab();
    expect(onBlur).toHaveBeenCalled();
  });

  test('should apply level prop to headings', () => {
    const { asFragment } = render(
      <Grommet>
        <Accordion level={2}>
          <AccordionPanel label="Panel 1">Panel body 1</AccordionPanel>
          <AccordionPanel label="Panel 2">Panel body 2</AccordionPanel>
        </Accordion>
      </Grommet>,
    );

    expect(
      screen.getByRole('heading', { level: 2, name: 'Panel 1' }),
    ).toBeTruthy();

    expect(asFragment()).toMatchSnapshot();
  });
});
