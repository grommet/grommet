import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import { cleanup, render, fireEvent } from '@testing-library/react';

// import { mount } from 'enzyme';

import { Grommet, Video } from '../..';

const CONTENTS = [
  <source key="source" src="small.mp4" type="video/mp4" />,
  <track key="track" />,
];
describe('Video', () => {
  afterEach(cleanup);

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

  test('Video plays and pauses', () => {
    window.scrollTo = jest.fn();
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
    expect(warnSpy).toHaveBeenCalledWith(
      "This browser doesn't support fullscreen.",
    );
  });

  // test('volume up', () =>{
  //   window.scrollTo=jest.fn();
  //   const volspy=jest.spyOn(Video, 'setVolume');
  //   const {container, getByTestId, getByLabelText} = render(
  //     <Grommet>
  //       <Video controls="below" playing={false}>{CONTENTS}</Video>
  //     </Grommet>
  //   );
  //   fireEvent.click(getByTestId("Menu-button"));
  //   fireEvent.click(getByLabelText("VolumeLow"));
  //   expect(volspy).toHaveBeenCalled();
  // })

  // test('play button', ()=>{
  //   const playStub = jest
  //   .spyOn(window.HTMLMediaElement.prototype, 'pause')
  //   .mockImplementation(() => {})
  //   const {container, getByTestId} = render(
  //     <Grommet>
  //       <Video controls="below" playing={true}>{CONTENTS}</Video>
  //     </Grommet>
  //   );
  //     fireEvent.click(getByTestId("play-button"));
  //   expect(playStub).toHaveBeenCalled();
  // })

  // test('Video plays', () => {
  //   const component = mount(
  //     <Grommet>
  //       <Video controls='below'>{CONTENTS}</Video>
  //     </Grommet>
  //   );
  //   const button = component.find('button').at(0);
  //   console.log('!!!', button.debug());
  //   button.simulate('click');
  //   expect(component).toMatchSnapshot();
  // });

  // test('Video controls appear on hover', () => {
  //   const component = mount(
  //     <Grommet>
  //       <Video controls='over'>{CONTENTS}</Video>
  //     </Grommet>
  //   );
  //   console.log('!!!', component.debug());
  //   const container = component.find('StyledVideo__StyledVideoContainer');
  //   console.log('!!!', container.debug());
  //   container.simulate('mouseenter');
  //   expect(component).toMatchSnapshot();
  // });
});
