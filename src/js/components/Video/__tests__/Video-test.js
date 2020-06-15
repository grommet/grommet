import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import { cleanup, render, fireEvent } from '@testing-library/react';
import { Grommet, Video } from '../..';

const CONTENTS = [
  <source key="source" src="small.mp4" type="video/mp4" />,
  <track key="track" />,
];
describe('Video', () => {
  afterEach(cleanup);

  test('renders', () => {
    const component = renderer.create(
      <Grommet>
        <Video>{CONTENTS}</Video>
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('autoPlay renders', () => {
    const component = renderer.create(
      <Grommet>
        <Video autoPlay>{CONTENTS}</Video>
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('loop renders', () => {
    const component = renderer.create(
      <Grommet>
        <Video loop>{CONTENTS}</Video>
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('mute renders', () => {
    const component = renderer.create(
      <Grommet>
        <Video mute>{CONTENTS}</Video>
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('controls renders', () => {
    const component = renderer.create(
      <Grommet>
        <Video controls="over">{CONTENTS}</Video>
        <Video controls="below">{CONTENTS}</Video>
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('fit renders', () => {
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
    const { container } = render(
      <Grommet>
        <Video controls="below" playing={false}>
          {CONTENTS}
        </Video>
      </Grommet>,
    );
    const videoContainer = document.querySelector('video');
    fireEvent.play(videoContainer);
    expect(container.firstChild).toMatchSnapshot();
    fireEvent.pause(videoContainer);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('End event handler', () => {
    const { container } = render(
      <Grommet>
        <Video controls="below">{CONTENTS}</Video>
      </Grommet>,
    );
    // Need to fire play event to get video playing before we fire ended event.
    const videoContainer = document.querySelector('video');
    fireEvent.play(videoContainer);
    fireEvent.ended(videoContainer);
    expect(container.firstChild).toMatchSnapshot();
  });

  test(' Configure Menu Button', () => {
    window.scrollTo = jest.fn();
    const { container, getByLabelText } = render(
      <Grommet>
        <Video controls="below" playing={false}>
          {CONTENTS}
        </Video>
      </Grommet>,
    );
    fireEvent.click(getByLabelText('Open Menu'));
    expect(container.firstChild).toMatchSnapshot();
  });

  test('fullscreen button', () => {
    window.scrollTo = jest.fn();
    console.warn = jest.fn();
    const warnSpy = jest.spyOn(console, 'warn');
    const { getByLabelText } = render(
      <Grommet>
        <Video controls="below" playing={false}>
          {CONTENTS}
        </Video>
      </Grommet>,
    );
    fireEvent.click(getByLabelText('Open Menu'));
    fireEvent.click(getByLabelText('Expand'));
    /* expect warn to have been called because jest doesn't test in any browser,
    will always have warning here due to the jest browser not supporting
     fullscreen */
    expect(warnSpy).toHaveBeenCalledWith(
      "This browser doesn't support fullscreen.",
    );
    warnSpy.mockReset();
    warnSpy.mockRestore();
    console.warn.mockRestore();
    window.scrollTo.mockRestore();
  });

  test('play button', () => {
    const playStub = jest
      .spyOn(window.HTMLMediaElement.prototype, 'play')
      .mockImplementation(() => {});
    const { getByLabelText } = render(
      <Grommet>
        <Video controls="below" playing={false}>
          {CONTENTS}
        </Video>
      </Grommet>,
    );
    fireEvent.click(getByLabelText('Play'));
    expect(playStub).toHaveBeenCalled();
    playStub.mockRestore();
  });

  test('volume controls', () => {
    const volMock = jest.fn();
    window.scrollTo = jest.fn();
    const { getByLabelText } = render(
      <Grommet>
        <Video controls="below" playing={false} onVolumeChange={volMock}>
          {CONTENTS}
        </Video>
      </Grommet>,
    );
    fireEvent.click(getByLabelText('Open Menu'));
    fireEvent.click(getByLabelText('VolumeLow'));
    expect(volMock).toHaveBeenCalled();

    window.scrollTo.mockRestore();
  });
});
