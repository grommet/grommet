import React from 'react';
import { render } from '@testing-library/react';
import 'jest-styled-components';

import { Grommet } from '../../Grommet';
import { InfiniteScroll } from '..';
import { Box } from '../..';

describe('InfiniteScroll', () => {
  const items = [];
  while (items.length < 4) items.push(items.length);
  const simpleItems = value =>
    Array(value)
      .fill()
      .map((_, i) => `item ${i + 1}`);

  test('basic', () => {
    const { container } = render(
      <Grommet>
        <InfiniteScroll />
        <InfiniteScroll items={items}>
          {(item, index, ref) => (
            <div ref={ref} key={index}>
              {item}
            </div>
          )}
        </InfiniteScroll>
        <InfiniteScroll items={items}>
          {(item, index) => <div key={index}>{item}</div>}
        </InfiniteScroll>
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('step', () => {
    const { container } = render(
      <Grommet>
        <InfiniteScroll items={items} step={2}>
          {(item, index) => <div key={index}>{item}</div>}
        </InfiniteScroll>
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('show', () => {
    const { container } = render(
      <Grommet>
        <InfiniteScroll items={items} step={2} show={3}>
          {(item, index) => <div key={index}>{item}</div>}
        </InfiniteScroll>
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renderMarker', () => {
    const { container } = render(
      <Grommet>
        <InfiniteScroll
          items={items}
          step={2}
          renderMarker={m => <div>{m}</div>}
        >
          {(item, index) => <div key={index}>{item}</div>}
        </InfiniteScroll>
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('replace', () => {
    const { container } = render(
      <Grommet>
        <InfiniteScroll items={items} step={2} replace>
          {(item, index) => <div key={index}>{item}</div>}
        </InfiniteScroll>
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test(`Should render items equal to the length of 
  step + 1 when step < items.length`, () => {
    const step = 50;
    const { container } = render(
      <Grommet>
        <InfiniteScroll
          items={simpleItems(1000)}
          // show={117}
          step={step}
        >
          {item => <Box key={item}>{item}</Box>}
        </InfiniteScroll>
      </Grommet>,
    );
    // When step < the length of the number of items, an additional
    // item is rendered as a marker for when scrolling nears the end
    // of the rendered items. This is why expectedItems is step + 1.
    const renderedItems = container.firstChild.children.length;
    const expectedItems = step + 1;
    expect(renderedItems).toEqual(expectedItems);
  });

  test(`Should render items equal to the length of 
  step + 1 when step = array`, () => {
    const step = 200;
    const { container } = render(
      <Grommet>
        <InfiniteScroll items={simpleItems(200)} show={117} step={step}>
          {item => <Box key={item}>{item}</Box>}
        </InfiniteScroll>
      </Grommet>,
    );
    // When step = the length of the number of items, an additional
    // item is rendered as a marker for when scrolling nears the end
    // of the rendered items. This is why expectedItems is step + 1.
    const renderedItems = container.firstChild.children.length;
    const expectedItems = step + 1;
    expect(renderedItems).toEqual(expectedItems);
  });

  test(`Should render items equal to the length of 
  step when step > array`, () => {
    const { container } = render(
      <Grommet>
        <InfiniteScroll items={simpleItems(1000)} show={117} step={1050}>
          {item => <Box key={item}>{item}</Box>}
        </InfiniteScroll>
      </Grommet>,
    );
    // When step > the length of the number of items,
    // an additional item is NOT rendered because the items
    // don't approach the end of the page. This is why the total
    // number of items is the length of simpleItems, 1000.
    const renderedItems = container.firstChild.children.length;
    const expectedItems = 1000;
    expect(renderedItems).toEqual(expectedItems);
  });
});
