import React from 'react';
import 'jest-styled-components';
import { render, fireEvent } from '@testing-library/react';
import { axe } from 'jest-axe';
import 'jest-axe/extend-expect';
import 'regenerator-runtime/runtime';

import { Grommet, Video, VideoExtendedProps } from '../..';

describe('Video', () => {
  let App: React.FC<VideoExtendedProps>;

  beforeEach(() => {
    App = ({ ...props }) => (
      <Grommet>
        <Video {...props}>
          <source key="source" src="small.mp4" type="video/mp4" />
          <track key="track" />
        </Video>
      </Grommet>
    );
  });

  test('should have no accessibility violations', async () => {
    const { container } = render(
      <Grommet>
        <Video />
      </Grommet>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('renders with theme', () => {
    const { container } = render(
      <Grommet
        theme={{
          video: {
            controls: { background: '#000000' },
            scrubber: { track: { color: '#444444' } },
          },
        }}
      >
        <Video>
          <source key="source" src="small.mp4" type="video/mp4" />
          <track key="track" />
        </Video>
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders', () => {
    const { container } = render(<App />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('autoPlay renders', () => {
    const { container } = render(<App autoPlay />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('loop renders', () => {
    const { container } = render(<App loop />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('mute renders', () => {
    const { container } = render(<App mute />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('controls below renders', () => {
    const { container } = render(<App controls="below" />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('controls over renders', () => {
    const { container } = render(<App controls="over" />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('fit  cover renders', () => {
    const { container } = render(<App fit="cover" />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('fit contain renders', () => {
    const { container } = render(<App fit="contain" />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('Play and Pause event handlers', () => {
    const onPlay = jest.fn();
    const onPause = jest.fn();
    const { container } = render(<App onPlay={onPlay} onPause={onPause} />);
    const videoContainer = document.querySelector('video');
    expect(videoContainer).not.toBeNull();
    fireEvent.play(videoContainer!);
    expect(container.firstChild).toMatchSnapshot();
    expect(onPlay).toHaveBeenCalled();
    fireEvent.pause(videoContainer!);
    expect(container.firstChild).toMatchSnapshot();
    expect(onPause).toHaveBeenCalled();
  });

  test('mouse events handlers of controls', () => {
    const { container } = render(<App />);

    const videoContainer = document.querySelector('video');
    expect(videoContainer).not.toBeNull();
    fireEvent.mouseOver(videoContainer!);
    expect(container.firstChild).toMatchSnapshot();
    fireEvent.mouseMove(videoContainer!);
    expect(container.firstChild).toMatchSnapshot();
    fireEvent.touchStart(videoContainer!);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('End event handler', () => {
    const onEnd = jest.fn();
    const { container } = render(<App onEnded={onEnd} />);
    // Need to fire play event to get video playing before we fire ended event.
    const videoContainer = document.querySelector('video');
    expect(videoContainer).not.toBeNull();
    fireEvent.play(videoContainer!);
    fireEvent.ended(videoContainer!);
    expect(container.firstChild).toMatchSnapshot();
    expect(onEnd).toHaveBeenCalled();
  });

  test('Configure Menu Button', () => {
    window.scrollTo = jest.fn();
    const { container, getByLabelText } = render(<App />);
    fireEvent.click(getByLabelText('open menu'));
    expect(container.firstChild).toMatchSnapshot();
  });

  test('scrubber', () => {
    window.scrollTo = jest.fn();
    const { container, getByLabelText } = render(<App />);
    fireEvent.click(getByLabelText('scrubber'));

    // targeting scrub function
    fireEvent.mouseMove(getByLabelText('scrubber'));
    expect(container.firstChild).toMatchSnapshot();

    // targeting setScrubTime
    fireEvent.mouseLeave(getByLabelText('scrubber'));
    expect(container.firstChild).toMatchSnapshot();
  });

  test('fullscreen button', () => {
    const scrollSpy = jest.spyOn(window, 'scrollTo').mockImplementation();
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation();
    const { getByLabelText } = render(<App />);
    fireEvent.click(getByLabelText('open menu'));
    fireEvent.click(getByLabelText('full screen'));
    /* expect warn to have been called because jest doesn't test in any browser,
    will always have warning here due to the jest browser not supporting
     fullscreen */
    expect(warnSpy).toHaveBeenCalledWith(
      "This browser doesn't support fullscreen.",
    );
    warnSpy.mockReset();
    warnSpy.mockRestore();
    scrollSpy.mockRestore();
  });

  test('play button', () => {
    const playStub = jest
      .spyOn(window.HTMLMediaElement.prototype, 'play')
      .mockImplementation(async () => {});
    const { getByLabelText } = render(<App />);
    fireEvent.click(getByLabelText('play'));
    expect(playStub).toHaveBeenCalled();
    playStub.mockRestore();
  });

  test('volume controls', () => {
    const volMock = jest.fn();
    const scrollSpy = jest.spyOn(window, 'scrollTo').mockImplementation();

    const { getByLabelText } = render(<App onVolumeChange={volMock} />);
    fireEvent.click(getByLabelText('open menu'));
    fireEvent.click(getByLabelText('volume down'));
    expect(volMock).toHaveBeenCalled();
    fireEvent.click(getByLabelText('volume up'));
    expect(volMock).toHaveBeenCalledTimes(2);

    scrollSpy.mockRestore();
  });

  test('timeUpdate event handler', () => {
    const onTimeUpdate = jest.fn();
    const { container } = render(<App onTimeUpdate={onTimeUpdate} />);
    const videoContainer = document.querySelector('video');
    expect(videoContainer).not.toBeNull();
    fireEvent.timeUpdate(videoContainer!);
    expect(container.firstChild).toMatchSnapshot();
    expect(onTimeUpdate).toHaveBeenCalled();
  });

  test('duration event handler', () => {
    const onDurationChange = jest.fn();
    const { container } = render(<App onDurationChange={onDurationChange} />);
    const videoContainer = document.querySelector('video');
    expect(videoContainer).not.toBeNull();
    fireEvent.durationChange(videoContainer!);
    expect(container.firstChild).toMatchSnapshot();
    expect(onDurationChange).toHaveBeenCalled();
  });
});
