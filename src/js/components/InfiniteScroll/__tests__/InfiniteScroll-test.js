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

  test(`Show item should be visible in window`, () => {
    const { container } = render(
      <Grommet>
        <InfiniteScroll
          items={simpleItems(300)}
          /* Uncomment the next 2 lines once fix for show is in place */
          // show={105}
        >
          {item => <Box key={item}>{item}</Box>}
        </InfiniteScroll>
      </Grommet>,
    );
    // item(104) = 'item 105' because indexing starts at 0.
    /* Delete the next 2 lines once fix for show is in place */
    const renderedItems = container.firstChild.children.item(10).outerHTML;
    expect(renderedItems).toContain('item 11');
    /* Uncomment the next 2 lines once fix for show is in place */
    // const renderedItems = container.firstChild.children.item(104).outerHTML;
    // expect(renderedItems).toContain('item 105');
  });
});

describe('Number of Items Rendered', () => {
  const simpleItems = value =>
    Array(value)
      .fill()
      .map((_, i) => `item ${i + 1}`);

  function createPageItems(allChildren) {
    const unfiltered = Array.from(allChildren);
    // Removing any children which are serving as refs
    return unfiltered.filter(childItem => childItem.outerHTML.includes('item'));
  }

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

    const pageItems = createPageItems(container.firstChild.children);
    const expectedItems = step;
    expect(pageItems.length).toEqual(expectedItems);
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

    const pageItems = createPageItems(container.firstChild.children);
    const expectedItems = step;
    expect(pageItems.length).toEqual(expectedItems);
  });

  test(`Should render items equal to the length of 
  step when step > array`, () => {
    const numItems = 1000;
    const { container } = render(
      <Grommet>
        <InfiniteScroll items={simpleItems(numItems)} show={117} step={1050}>
          {item => <Box key={item}>{item}</Box>}
        </InfiniteScroll>
      </Grommet>,
    );

    const pageItems = createPageItems(container.firstChild.children);
    const expectedItems = numItems;
    expect(pageItems.length).toEqual(expectedItems);
  });
});
