// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React from 'react';
import InfiniteScroll from "../../src/js/utils/InfiniteScroll";

// needed because this:
// https://github.com/facebook/jest/issues/1353
jest.mock('react-dom');

describe('Infinite Scroll', () => {
  it('Construct infinite scroll', () => {
    expect.assertions(2);

    const topBodyElement = document.createElement('div');
    topBodyElement.setAttribute('id','topParent');
    document.body.insertBefore(topBodyElement, document.body.firstChild);
    document.scrollingElement = topBodyElement;

    const scrollParent = document.createElement('div');
    scrollParent.setAttribute('id','scrollParent');
    scrollParent.setAttribute('style','overflow:auto; height:1000px;');
    topBodyElement.appendChild(scrollParent, document.body.firstChild);

    const moreRef = document.createElement('div');
    moreRef.setAttribute('id','topRef');
    scrollParent.appendChild(moreRef);

    const moreAboveRef = document.createElement('div');
    moreAboveRef.setAttribute('id','bottomRef');
    moreAboveRef.setAttribute('style','position:absolute; bottom:0');

    scrollParent.appendChild(moreAboveRef);

    var onMore = jest.fn();
    var onMoreAbove = jest.fn();

    jest.useFakeTimers();
    InfiniteScroll.startListeningForScroll(
      moreRef, onMore,
      moreAboveRef, onMoreAbove
    );

    scrollParent.dispatchEvent(new Event('scroll'));

    document.dispatchEvent(new Event('scroll'));

    jest.runAllTimers();

    expect(onMore).toHaveBeenCalled();

    expect(onMoreAbove).toHaveBeenCalled();

  });
});
