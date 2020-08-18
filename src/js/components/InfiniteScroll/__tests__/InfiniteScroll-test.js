import React from 'react';
import { render } from '@testing-library/react';
import 'jest-styled-components';

import { Grommet } from '../../Grommet';
import { InfiniteScroll } from '..';
import { Box } from '../..';

const simpleItems = value =>
  Array(value)
    .fill()
    .map((_, i) => `item ${i + 1}`);

const createPageItems = allChildren => {
  const unfiltered = Array.from(allChildren);
  // Removing any children which are serving as refs
  return unfiltered.filter(childItem => childItem.outerHTML.includes('item'));
};

describe('InfiniteScroll', () => {
  const items = [];
  while (items.length < 4) items.push(items.length);

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
});

describe('Number of Items Rendered', () => {
  test(`Should render items equal to the length of 
  step when step < items.length`, () => {
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
  step when step = array.length`, () => {
    const step = 200;
    const { container } = render(
      <Grommet>
        <InfiniteScroll items={simpleItems(200)} step={step}>
          {item => <Box key={item}>{item}</Box>}
        </InfiniteScroll>
      </Grommet>,
    );

    const pageItems = createPageItems(container.firstChild.children);
    const expectedItems = step;
    expect(pageItems.length).toEqual(expectedItems);
  });

  test(`Should render items equal to the length of 
  item array when step > array`, () => {
    const numItems = 1000;
    const { container } = render(
      <Grommet>
        <InfiniteScroll items={simpleItems(numItems)} step={1050}>
          {item => <Box key={item}>{item}</Box>}
        </InfiniteScroll>
      </Grommet>,
    );

    const pageItems = createPageItems(container.firstChild.children);
    const expectedItems = numItems;
    expect(pageItems.length).toEqual(expectedItems);
  });

  test(`Should only contain unique items (i.e no duplicates)`, () => {
    const step = 25;
    const numItems = 200;
    const { container } = render(
      <Grommet>
        <InfiniteScroll items={simpleItems(numItems)} step={step}>
          {item => <Box key={item}>{item}</Box>}
        </InfiniteScroll>
      </Grommet>,
    );

    const pageItems = createPageItems(container.firstChild.children);
    const distinctItems = new Set(pageItems);
    /* Expected number of items should be at the show value rounded
    up to the next step increment/ */
    const expectedItems = step;
    /* If the number of distinct items is equivalent to the length 
    of results, then we have unique items. */
    expect(distinctItems.size).toEqual(expectedItems);
    expect(container.firstChild).toMatchSnapshot();
  });
});

describe('show scenarios', () => {
  test(`When show, show item should be visible in window`, () => {
    const { container } = render(
      <Grommet>
        <InfiniteScroll items={simpleItems(300)} show={105}>
          {item => <Box key={item}>{item}</Box>}
        </InfiniteScroll>
      </Grommet>,
    );
    // item(104) = 'item 105' because indexing starts at 0.
    // Need to modify this next selection to only be concerned with the
    // visible window.
    const renderedItems = container.firstChild.children.item(104).outerHTML;
    expect(renderedItems).toContain('item 105');
  });

  test(`When show, should only contain unique 
          items (i.e no duplicates)`, () => {
    const step = 25;
    const numItems = 200;
    const showIndex = 67;
    const { container } = render(
      <Grommet>
        <InfiniteScroll
          items={simpleItems(numItems)}
          show={showIndex}
          step={step}
        >
          {item => <Box key={item}>{item}</Box>}
        </InfiniteScroll>
      </Grommet>,
    );

    const pageItems = createPageItems(container.firstChild.children);
    const distinctItems = new Set(pageItems);
    /* Expected number of items should be at the show value rounded
    up to the next step increment/ */
    const expectedItems = Math.ceil(showIndex / step) * step;
    /* If the number of distinct items is equivalent to the length 
    of results, then we have unique items. */
    expect(distinctItems.size).toEqual(expectedItems);
    expect(container.firstChild).toMatchSnapshot();
  });

  test(`should display specified item when show is greater than step`, () => {
    const step = 8;
    const numItems = 200;
    const showIndex = 41;
    const { container, getByText } = render(
      <Grommet>
        <InfiniteScroll
          items={simpleItems(numItems)}
          show={showIndex}
          step={step}
        >
          {item => <Box key={item}>{item}</Box>}
        </InfiniteScroll>
      </Grommet>,
    );

    // Check to see that expected item exists
    const expectedItem = getByText('item 42').innerHTML;
    expect(expectedItem).toMatch(simpleItems(numItems)[showIndex]);

    // Check to see that we have the total number of items we expect
    const pageItems = createPageItems(container.firstChild.children);
    /* Expected number of items should be at the show value rounded
    up to the next step increment/ */
    const expectedItems = Math.ceil(showIndex / step) * step;
    expect(pageItems.length).toEqual(expectedItems);
  });

  test(`should display specified item when show is less than step`, () => {
    const step = 30;
    const numItems = 200;
    const showIndex = 26;
    const { container, getByText } = render(
      <Grommet>
        <InfiniteScroll
          items={simpleItems(numItems)}
          show={showIndex}
          step={step}
        >
          {item => <Box key={item}>{item}</Box>}
        </InfiniteScroll>
      </Grommet>,
    );

    // Check to see that expected item exists
    const expectedItem = getByText('item 27').innerHTML;
    expect(expectedItem).toMatch(simpleItems(numItems)[showIndex]);

    // Check to see that we have the total number of items we expect
    const pageItems = createPageItems(container.firstChild.children);

    /* Expected number of items should be at the show value rounded
    up to the next step increment/ */
    const expectedItems = Math.ceil(showIndex / step) * step;
    expect(pageItems.length).toEqual(expectedItems);
  });

  test(`should display specified item when show is 
        greater than step and replace is true`, () => {
    const step = 18;
    const numItems = 200;
    const showIndex = 88;
    const { container, getByText } = render(
      <Grommet>
        <InfiniteScroll
          items={simpleItems(numItems)}
          replace
          show={showIndex}
          step={step}
        >
          {item => <Box key={item}>{item}</Box>}
        </InfiniteScroll>
      </Grommet>,
    );

    // Check to see that expected item exists
    const expectedItem = getByText('item 89').innerHTML;
    expect(expectedItem).toMatch(simpleItems(numItems)[showIndex]);

    // Check to see that our replace items have been removed from the DOM.
    expect(container.firstChild).not.toContain('item 7');

    /* Check to see that we have the total number of items we expect.
     * When replace is true, the expected number of items should be less
     * than or equal to the step * 2.
     */

    /*
     * The following needs to be uncommented to for this test to pass.
     */
    // const pageItems = createPageItems(container.firstChild.children);
    // const expectedItems = step * 2;
    // expect(pageItems.length).toBeLessThanOrEqual(expectedItems);
  });

  test(`should display specified item when show is 
        less than step and replace is true`, () => {
    const step = 30;
    const numItems = 200;
    const showIndex = 26;
    const { container, getByText } = render(
      <Grommet>
        <InfiniteScroll
          items={simpleItems(numItems)}
          replace
          show={showIndex}
          step={step}
        >
          {item => <Box key={item}>{item}</Box>}
        </InfiniteScroll>
      </Grommet>,
    );

    // Check to see that expected item exists
    const expectedItem = getByText('item 27').innerHTML;
    expect(expectedItem).toMatch(simpleItems(numItems)[showIndex]);

    /* Check to see that we have the total number of items we expect.
     * When replace is true, the expected number of items should be less
     * than or equal to the step * 2.
     */
    const pageItems = createPageItems(container.firstChild.children);
    const expectedItems = step * 2;
    expect(pageItems.length).toBeLessThanOrEqual(expectedItems);
  });
});
