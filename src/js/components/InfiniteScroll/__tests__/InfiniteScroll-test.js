import React from 'react';
import { render } from '@testing-library/react';
import 'jest-styled-components';

import { Grommet, Image } from '../..';
import { InfiniteScroll } from '..';

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

  test('mixed items', () => {
    const tempItems = [
      1,
      'Hello World',
      <Image
        a11yTitle="Gremlin"
        src="https://v2.grommet.io/img/stak-hurrah.svg"
      />,
      99,
      `Lorem ipsum dolor sit amet, consectetur adipisicing elit,
      sed do eiusmod temporincididunt ut labore et dolore magna
      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
      ullamco laboris nisi ut aliquip ex ea commodo consequat.
      Duis aute irure dolor in reprehenderit in voluptate velit
      esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
      occaecat cupidatat non proident, sunt in culpa qui officia 
      deserunt mollit anim id est laborum.`,
    ];
    const { container } = render(
      <Grommet>
        <InfiniteScroll items={tempItems}>
          {(item, index) => <div key={index}>{item}</div>}
        </InfiniteScroll>
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
