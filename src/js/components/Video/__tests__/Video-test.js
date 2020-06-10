import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import { cleanup, render, fireEvent } from '@testing-library/react';
import { axe } from 'jest-axe';
import 'jest-axe/extend-expect';
import 'regenerator-runtime/runtime';

import { Grommet, Video } from '../..';

const CONTENTS = [
  <source key="source" src="small.mp4" type="video/mp4" />,
  <track key="track" />,
];
describe('Video', () => {
  afterEach(cleanup);

  test('Video Accessibility', async () => {
    const { container } = render(
      <Grommet>
        <Video>{CONTENTS}</Video>
      </Grommet>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('Video renders', () => {
    const component = renderer.create(
      <Grommet>
        <Video>{CONTENTS}</Video>
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Video autoPlay renders', () => {
    const component = renderer.create(
      <Grommet>
        <Video autoPlay>{CONTENTS}</Video>
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Video loop renders', () => {
    const component = renderer.create(
      <Grommet>
        <Video loop>{CONTENTS}</Video>
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Video mute renders', () => {
    const component = renderer.create(
      <Grommet>
        <Video mute>{CONTENTS}</Video>
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Video controls renders', () => {
    const component = renderer.create(
      <Grommet>
        <Video controls="over">{CONTENTS}</Video>
        <Video controls="below">{CONTENTS}</Video>
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Video fit renders', () => {
    const component = renderer.create(
      <Grommet>
        <Video fit="cover">{CONTENTS}</Video>
        <Video fit="contain">{CONTENTS}</Video>
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Play and Pause event handlers', () => {
    const { container, getByTestId } = render(
      <Grommet>
        <Video controls="below" playing={false}>
          {CONTENTS}
        </Video>
      </Grommet>,
    );
    fireEvent.play(getByTestId('Video-container'));
    expect(container.firstChild).toMatchSnapshot();
    fireEvent.pause(getByTestId('Video-container'));
    expect(container.firstChild).toMatchSnapshot();
  });

  test('End event handler', () => {
    const { container, getByTestId } = render(
      <Grommet>
        <Video controls="below">{CONTENTS}</Video>
      </Grommet>,
    );
    // Need to fire play event to get video playing before we fire ended event.
    fireEvent.play(getByTestId('Video-container'));
    fireEvent.ended(getByTestId('Video-container'));
    expect(container.firstChild).toMatchSnapshot();
  });

  test('Menu Button', () => {
    window.scrollTo = jest.fn();
    const { container, getByTestId } = render(
      <Grommet>
        <Video controls="below" playing={false}>
          {CONTENTS}
        </Video>
      </Grommet>,
    );
    fireEvent.click(getByTestId('Menu-button'));
    expect(container.firstChild).toMatchSnapshot();
  });

  test('fullscreen button', () => {
    window.scrollTo = jest.fn();
    const warnSpy = jest.spyOn(console, 'warn');
    const { getByTestId, getByLabelText } = render(
      <Grommet>
        <Video controls="below" playing={false}>
          {CONTENTS}
        </Video>
      </Grommet>,
    );
    fireEvent.click(getByTestId('Menu-button'));
    fireEvent.click(getByLabelText('Expand'));
    /* expect warn to have been called because jest doesn't test in any browser,
    will always have warning here */
    expect(warnSpy).toHaveBeenCalledWith(
      "This browser doesn't support fullscreen.",
    );
  });

  test('play button', () => {
    const playStub = jest
      .spyOn(window.HTMLMediaElement.prototype, 'play')
      .mockImplementation(() => {});
    const { getByTestId } = render(
      <Grommet>
        <Video controls="below" playing={false}>
          {CONTENTS}
        </Video>
      </Grommet>,
    );
    fireEvent.click(getByTestId('play-button'));
    expect(playStub).toHaveBeenCalled();
    playStub.mockRestore();
  });
});
