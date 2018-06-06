import React from 'react';
import 'jest-styled-components';
import renderer from 'react-test-renderer';
import { render, Simulate } from 'react-testing-library';

import { Box, Grommet } from '../../';

import { Accordion, AccordionPanel } from '../';

describe('Accordion', () => {
  test('no AccordionPanel', () => {
    const component = renderer.create(
      <Grommet>
        <Accordion />
      </Grommet>
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  test('AccordionPanel', () => {
    const component = renderer.create(
      <Grommet>
        <Accordion>
          <AccordionPanel title='Panel 1'>
            Panel body 1
          </AccordionPanel>
          <AccordionPanel title='Panel 2'>
            Panel body 2
          </AccordionPanel>
          {false && (
            <AccordionPanel title='Panel 2'>
              Panel body 2
            </AccordionPanel>
          )}
        </Accordion>
      </Grommet>
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  test('complex title', () => {
    const component = renderer.create(
      <Grommet>
        <Box background='dark-1'>
          <Accordion>
            <AccordionPanel title={<div>Panel 1 complex</div>}>
              Panel body 1
            </AccordionPanel>
            {undefined}
            <AccordionPanel title={<div>Panel 2 complex</div>}>
              Panel body 2
            </AccordionPanel>
          </Accordion>
        </Box>
      </Grommet>
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
      </Grommet>
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  test('change to second Panel', (done) => {
    const onActive = jest.fn();
    const { getByText, container } = render(
      <Grommet>
        <Accordion onActive={onActive}>
          <AccordionPanel title='Panel 1'>
            Panel body 1
          </AccordionPanel>
          <AccordionPanel title='Panel 2'>
            Panel body 2
          </AccordionPanel>
        </Accordion>
      </Grommet>
    );
    expect(container.firstChild).toMatchSnapshot();

    Simulate.click(getByText('Panel 2'));

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
          <AccordionPanel title='Panel 1'>
            Panel body 1
          </AccordionPanel>
          <AccordionPanel title='Panel 2'>
            Panel body 2
          </AccordionPanel>
        </Accordion>
      </Grommet>
    );
    expect(container.firstChild).toMatchSnapshot();

    Simulate.click(getByText('Panel 2'));

    expect(container.firstChild).toMatchSnapshot();
  });

  test('multiple panels', () => {
    const onActive = jest.fn();
    const { getByText, container } = render(
      <Grommet>
        <Accordion
          animate={false}
          multiple={true}
          onActive={onActive}
        >
          <AccordionPanel title='Panel 1'>
            Panel body 1
          </AccordionPanel>
          <AccordionPanel title='Panel 2'>
            Panel body 2
          </AccordionPanel>
        </Accordion>
      </Grommet>
    );
    expect(container.firstChild).toMatchSnapshot();

    Simulate.click(getByText('Panel 2'));
    expect(onActive).toBeCalledWith([1]);

    expect(container.firstChild).toMatchSnapshot();

    Simulate.click(getByText('Panel 1'));
    expect(onActive).toBeCalledWith([1, 0]);

    expect(container.firstChild).toMatchSnapshot();

    Simulate.click(getByText('Panel 2'));
    expect(onActive).toBeCalledWith([0]);

    expect(container.firstChild).toMatchSnapshot();

    Simulate.click(getByText('Panel 1'));
    expect(onActive).toBeCalledWith([]);

    expect(container.firstChild).toMatchSnapshot();
  });

  test('change active index', () => {
    const onActive = jest.fn();
    const { getByText, container } = render(
      <Accordion animate={false} activeIndex={1} onActive={onActive}>
        <AccordionPanel title='Panel 1'>
          Panel body 1
        </AccordionPanel>
        <AccordionPanel title='Panel 2'>
          Panel body 2
        </AccordionPanel>
      </Accordion>
    );
    expect(container.firstChild).toMatchSnapshot();

    Simulate.click(getByText('Panel 1'));
    expect(onActive).toBeCalledWith(0);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('set on hover', () => {
    const { getByText, container } = render(
      <Accordion>
        <AccordionPanel
          title='Panel 1'
          onMouseOver={() => {}}
          onMouseOut={() => {}}
        >
          Panel body 1
        </AccordionPanel>
        <AccordionPanel
          title='Panel 2'
          onMouseOver={() => {}}
          onMouseOut={() => {}}
        >
          Panel body 2
        </AccordionPanel>
      </Accordion>
    );
    expect(container.firstChild).toMatchSnapshot();

    Simulate.mouseOver(getByText('Panel 1'));
    expect(container.firstChild).toMatchSnapshot();

    Simulate.mouseOver(getByText('Panel 2'));
    expect(container.firstChild).toMatchSnapshot();

    Simulate.mouseOut(getByText('Panel 1'));
    expect(container.firstChild).toMatchSnapshot();

    Simulate.mouseOut(getByText('Panel 2'));
    expect(container.firstChild).toMatchSnapshot();
  });
});
