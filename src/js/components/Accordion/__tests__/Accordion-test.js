import React from 'react';
import 'jest-styled-components';
import renderer from 'react-test-renderer';
import { cleanup, render, fireEvent } from '@testing-library/react';

import { Accordion, AccordionPanel, Box, Grommet } from '../..';

const customTheme = {
  accordion: {
    heading: { level: '3' },
  },
};

describe('Accordion', () => {
  afterEach(cleanup);

  test('no AccordionPanel', () => {
    const component = renderer.create(
      <Grommet>
        <Accordion />
      </Grommet>,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  test('AccordionPanel', () => {
    const component = renderer.create(
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
    expect(component.toJSON()).toMatchSnapshot();
  });

  test('complex title', () => {
    const component = renderer.create(
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
    expect(component.toJSON()).toMatchSnapshot();
  });

  test('complex header', () => {
    const component = renderer.create(
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
    expect(component.toJSON()).toMatchSnapshot();
  });

  test('change to second Panel', done => {
    const onActive = jest.fn();
    const { getByText, container } = render(
      <Grommet>
        <Accordion onActive={onActive}>
          <AccordionPanel label="Panel 1">Panel body 1</AccordionPanel>
          <AccordionPanel label="Panel 2">Panel body 2</AccordionPanel>
        </Accordion>
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();

    fireEvent.click(getByText('Panel 2'));

    // wait for panel animation to finish
    setTimeout(() => {
      expect(onActive).toBeCalled();

      expect(container.firstChild).toMatchSnapshot();

      done();
    }, 500);
  });

  test('change to second Panel without onActive', () => {
    const { getByText, container } = render(
      <Grommet>
        <Accordion animate={false}>
          <AccordionPanel label="Panel 1">Panel body 1</AccordionPanel>
          <AccordionPanel label="Panel 2">Panel body 2</AccordionPanel>
        </Accordion>
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();

    fireEvent.click(getByText('Panel 2'));

    expect(container.firstChild).toMatchSnapshot();
  });

  test('multiple panels', () => {
    const onActive = jest.fn();
    const { getByText, container } = render(
      <Grommet>
        <Accordion animate={false} multiple onActive={onActive}>
          <AccordionPanel label="Panel 1">Panel body 1</AccordionPanel>
          <AccordionPanel label="Panel 2">Panel body 2</AccordionPanel>
        </Accordion>
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();

    fireEvent.click(getByText('Panel 2'));
    expect(onActive).toBeCalledWith([1]);

    expect(container.firstChild).toMatchSnapshot();

    fireEvent.click(getByText('Panel 1'));
    expect(onActive).toBeCalledWith([1, 0]);

    expect(container.firstChild).toMatchSnapshot();

    fireEvent.click(getByText('Panel 2'));
    expect(onActive).toBeCalledWith([0]);

    expect(container.firstChild).toMatchSnapshot();

    fireEvent.click(getByText('Panel 1'));
    expect(onActive).toBeCalledWith([]);

    expect(container.firstChild).toMatchSnapshot();
  });

  test('custom accordion', () => {
    const component = renderer.create(
      <Grommet theme={customTheme}>
        <Accordion>
          <AccordionPanel label="Panel 1">Panel body 1</AccordionPanel>
        </Accordion>
      </Grommet>,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  test('change active index', () => {
    const onActive = jest.fn();
    const { getByText, container } = render(
      <Grommet>
        <Accordion animate={false} activeIndex={1} onActive={onActive}>
          <AccordionPanel label="Panel 1">Panel body 1</AccordionPanel>
          <AccordionPanel label="Panel 2">Panel body 2</AccordionPanel>
        </Accordion>
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();

    fireEvent.click(getByText('Panel 1'));
    expect(onActive).toBeCalledWith([0]);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('set on hover', () => {
    const { getByText, container } = render(
      <Grommet>
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
          <AccordionPanel
            label="Panel 2"
            onMouseOver={() => {}}
            onMouseOut={() => {}}
            onFocus={() => {}}
            onBlur={() => {}}
          >
            Panel body 2
          </AccordionPanel>
        </Accordion>
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();

    fireEvent.mouseOver(getByText('Panel 1'));
    expect(container.firstChild).toMatchSnapshot();

    fireEvent.mouseOver(getByText('Panel 2'));
    expect(container.firstChild).toMatchSnapshot();

    fireEvent.mouseOut(getByText('Panel 1'));
    expect(container.firstChild).toMatchSnapshot();

    fireEvent.mouseOut(getByText('Panel 2'));
    expect(container.firstChild).toMatchSnapshot();
  });
});
