import React from 'react';
import {
  render,
  act,
  fireEvent,
  waitFor,
  screen,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import 'jest-styled-components';
import '@testing-library/jest-dom';

import { Carousel } from '..';
import { Grommet } from '../../Grommet';

const getSlideOne = () => screen.getByText('Slide One');
const getSlideTwo = () => screen.getByText('Slide Two');
const getSlideThree = () => screen.getByText('Slide Three');

describe('Carousel', () => {
  test('basic', () => {
    const { asFragment } = render(
      <Grommet>
        <Carousel>
          <div>Slide One</div>
          <div>Slide Two</div>
        </Carousel>
      </Grommet>,
    );
    expect(getSlideOne()).toBeVisible();
    expect(getSlideTwo()).not.toBeVisible();
    expect(asFragment()).toMatchSnapshot();
  });

  test('basic with `initialChild: 1`', () => {
    render(
      <Grommet>
        <Carousel initialChild={1}>
          <div>Slide One</div>
          <div>Slide Two</div>
        </Carousel>
      </Grommet>,
    );

    expect(getSlideTwo()).toBeVisible();
    expect(getSlideOne()).not.toBeVisible();
  });

  test('arrow navigation: next', async () => {
    jest.useFakeTimers();
    const user = userEvent.setup({ delay: null });

    render(
      <Grommet>
        <Carousel controls="arrows">
          <div>Slide One</div>
          <div>Slide Two</div>
        </Carousel>
      </Grommet>,
    );

    /**
     * - Currently on "Slide One"
     * - Simulating click on the next arrow button
     * - Expecting "Slide Two" to be visible
     */
    const nextButton = screen.getByRole('button', { name: /Go to slide 2/i });

    await user.click(nextButton);
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(getSlideOne()).not.toBeVisible();
    expect(getSlideTwo()).toBeVisible();
  });

  test('arrow navigation: previous', async () => {
    jest.useFakeTimers();
    const user = userEvent.setup({ delay: null });

    render(
      <Grommet>
        <Carousel initialChild={1} controls="arrows">
          <div>Slide One</div>
          <div>Slide Two</div>
          <div>Slide Three</div>
        </Carousel>
      </Grommet>,
    );

    /**
     * - Currently on "Slide Two"
     * - Simulating click on the previous arrow button
     * - Expecting "Slide One" to be visible
     */
    const previousButton = screen.getByRole('button', {
      name: /Go to slide 1/i,
    });
    await user.click(previousButton);
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(getSlideTwo()).not.toBeVisible();
    expect(getSlideOne()).toBeVisible();
  });

  test('selector navigation: forward', async () => {
    jest.useFakeTimers();
    const user = userEvent.setup({ delay: null });

    render(
      <Grommet>
        <Carousel controls="selectors">
          <div>Slide One</div>
          <div>Slide Two</div>
          <div>Slide Three</div>
        </Carousel>
      </Grommet>,
    );

    /**
     * - Currently on "Slide One"
     * - Simulating click on the 3rd selector button
     * - Expecting "Slide Three" to be visible
     */
    const thirdSelector = screen.getByRole('button', {
      name: /Jump to slide 3/i,
    });
    await user.click(thirdSelector);
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(getSlideOne()).not.toBeVisible();
    expect(getSlideThree()).toBeVisible();
  });

  test('selector navigation: backward', async () => {
    jest.useFakeTimers();
    const user = userEvent.setup({ delay: null });

    render(
      <Grommet>
        <Carousel initialChild={2} controls="selectors">
          <div>Slide One</div>
          <div>Slide Two</div>
          <div>Slide Three</div>
        </Carousel>
      </Grommet>,
    );

    /**
     * - Currently on "Slide Three"
     * - Simulating click on the 1st selector button
     * - Expecting "Slide One" to be visible
     */
    const firstSelector = screen.getByRole('button', {
      name: /Jump to slide 1/i,
    });
    await user.click(firstSelector);
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(getSlideThree()).not.toBeVisible();
    expect(getSlideOne()).toBeVisible();
  });

  test('play', async () => {
    jest.useFakeTimers();
    render(
      <Grommet>
        <Carousel controls={false} play={500} wrap={false}>
          <div>Slide One</div>
          <div>Slide Two</div>
        </Carousel>
      </Grommet>,
    );

    expect(getSlideOne()).toBeVisible();
    await act(async () => {
      jest.advanceTimersByTime(600);
    });
    await waitFor(() => {
      expect(getSlideOne()).not.toBeVisible();
      expect(getSlideTwo()).toBeVisible();
    });
  });

  test('keyboard: left arrow', async () => {
    render(
      <Grommet>
        <Carousel initialChild={1} a11yTitle="test-carousel">
          <div>Slide One</div>
          <div>Slide Two</div>
        </Carousel>
      </Grommet>,
    );
    const carousel = screen.getByLabelText('test-carousel');
    fireEvent.keyDown(carousel, {
      key: 'Left',
      keyCode: 37,
      which: 37,
    });
    await waitFor(
      () => {
        expect(getSlideTwo()).not.toBeVisible();
        expect(getSlideOne()).toBeVisible();
      },
      { timeout: 1200 },
    );
  });

  test('keyboard: right arrow', async () => {
    render(
      <Grommet>
        <Carousel a11yTitle="test-carousel">
          <div>Slide One</div>
          <div>Slide Two</div>
        </Carousel>
      </Grommet>,
    );
    const carousel = screen.getByLabelText('test-carousel');
    fireEvent.keyDown(carousel, {
      key: 'Right',
      keyCode: 39,
      which: 39,
    });
    await waitFor(
      () => {
        expect(getSlideOne()).not.toBeVisible();
        expect(getSlideTwo()).toBeVisible();
      },
      { timeout: 1200 },
    );
  });

  test('controlled component', async () => {
    const { asFragment } = render(
      <Grommet>
        <Carousel controls="arrows" activeChild={1}>
          <div>Slide One</div>
          <div>Slide Two</div>
        </Carousel>
      </Grommet>,
    );

    expect(asFragment()).toMatchSnapshot();
    expect(getSlideOne()).not.toBeVisible();
    expect(getSlideTwo()).toBeVisible();
  });

  test('interactive slide', async () => {
    const user = userEvent.setup({ delay: null });

    const someFunction = jest.fn();
    render(
      <Grommet>
        <Carousel>
          <div>
            <span>Click the button below</span>
            <button
              aria-label="Test Button"
              type="button"
              onClick={someFunction}
            />
          </div>
        </Carousel>
      </Grommet>,
    );

    await user.click(screen.getByLabelText('Test Button'));
    expect(someFunction).toHaveBeenCalledTimes(1);
  });
});
