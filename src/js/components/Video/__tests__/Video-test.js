import React from 'react';
import 'jest-styled-components';
import { cleanup, render, fireEvent } from '@testing-library/react';
import { axe } from 'jest-axe';
import 'jest-axe/extend-expect';
import 'regenerator-runtime/runtime';

import { Grommet, Video } from '../..';

describe('Video', () => {
  let App;

  beforeEach(() => {
    App = ({ ...props }) => {
      return (
        <Grommet>
          <Video {...props}>
            <source key="source" src="small.mp4" type="video/mp4" />
            <track key="track" />
          </Video>
        </Grommet>
      );
    };
  });

  afterEach(cleanup);

  test('should have no accessibility violations', async () => {
    const { container } = render(<App />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
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
    const { container } = render(<App playing={false} />);
    const videoContainer = document.querySelector('video');
    fireEvent.play(videoContainer);
    expect(container.firstChild).toMatchSnapshot();
    fireEvent.pause(videoContainer);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('End event handler', () => {
    const { container } = render(<App />);
    // Need to fire play event to get video playing before we fire ended event.
    const videoContainer = document.querySelector('video');
    fireEvent.play(videoContainer);
    fireEvent.ended(videoContainer);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('Configure Menu Button', () => {
    window.scrollTo = jest.fn();
    const { container, getByLabelText } = render(<App />);
    fireEvent.click(getByLabelText('open menu'));
    expect(container.firstChild).toMatchSnapshot();
  });

  test('fullscreen button', () => {
    window.scrollTo = jest.fn();
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
    window.scrollTo.mockRestore();
  });

  test('play button', () => {
    const playStub = jest
      .spyOn(window.HTMLMediaElement.prototype, 'play')
      .mockImplementation(() => {});
    const { getByLabelText } = render(<App />);
    fireEvent.click(getByLabelText('play'));
    expect(playStub).toHaveBeenCalled();
    playStub.mockRestore();
  });

  test('volume controls', () => {
    const volMock = jest.fn();
    window.scrollTo = jest.fn();
    const { getByLabelText } = render(<App onVolumeChange={volMock} />);
    fireEvent.click(getByLabelText('open menu'));
    fireEvent.click(getByLabelText('volume down'));
    expect(volMock).toHaveBeenCalled();
    fireEvent.click(getByLabelText('volume up'));
    expect(volMock).toHaveBeenCalledTimes(2);

    window.scrollTo.mockRestore();
  });
});
