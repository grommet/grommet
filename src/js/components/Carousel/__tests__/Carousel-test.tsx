import React from 'react';
import { render, act, waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import 'jest-styled-components';
import '@testing-library/jest-dom';

import { Carousel } from '..';

const getSlideOne = () => screen.getByText('Slide One');
const getSlideTwo = () => screen.getByText('Slide Two');
const getSlideThree = () => screen.getByText('Slide Three');

describe('Carousel', () => {
  test('basic', () => {
    const { container } = render(
      <Carousel>
        <div>Slide One</div>
        <div>Slide Two</div>
      </Carousel>,
    );

    expect(getSlideOne()).toHaveStyle({ visibility: 'visible' });
    expect(getSlideTwo()).toHaveStyle({ visibility: 'hidden' });
    expect(container.firstChild).toMatchSnapshot();
  });

  test('basic with `initialChild: 1`', () => {
    const { container } = render(
      <Carousel initialChild={1}>
        <div>Slide One</div>
        <div>Slide Two</div>
      </Carousel>,
    );

    expect(getSlideOne()).toHaveStyle({ visibility: 'hidden' });
    expect(getSlideTwo()).toHaveStyle({ visibility: 'visible' });
    expect(container.firstChild).toMatchSnapshot();
  });

  test('arrow navigation: next', async () => {
    render(
      <Carousel fill controls="arrows">
        <div>Slide One</div>
        <div>Slide Two</div>
        <div>Slide Three</div>
      </Carousel>,
    );

    /**
     * - Currently on "Slide One"
     * - Simulating click on the next arrow button
     * - Expecting "Slide Two" to be visible
     */
    const nextButton = screen.getByLabelText('Next');
    expect(getSlideTwo()).toHaveStyle({ visibility: 'hidden' });
    userEvent.click(nextButton);
    await waitFor(() => {
      expect(getSlideTwo()).toHaveStyle({ visibility: 'visible' });
    });
  });

  test('arrow navigation: previous', async () => {
    render(
      <Carousel fill controls="arrows">
        <div>Slide One</div>
        <div>Slide Two</div>
        <div>Slide Three</div>
      </Carousel>,
    );

    /**
     * - Currently on "Slide One"
     * - Simulating click on the previous arrow button
     * - Expecting "Slide Three" to be visible
     */
    const previousButton = screen.getByLabelText('Previous');
    expect(getSlideThree()).toHaveStyle({ visibility: 'hidden' });
    userEvent.click(previousButton);
    await waitFor(() => {
      expect(getSlideThree()).toHaveStyle({ visibility: 'visible' });
    });
  });

  test('selector navigation: forward', async () => {
    render(
      <Carousel fill controls="selectors">
        <div>Slide One</div>
        <div>Slide Two</div>
        <div>Slide Three</div>
      </Carousel>,
    );

    /**
     * - Currently on "Slide One"
     * - Simulating click on the 3rd selector button
     * - Expecting "Slide Three" to be visible
     */
    const thirdSelector = screen.getAllByRole('button')[2];
    expect(getSlideThree()).toHaveStyle({ visibility: 'hidden' });
    userEvent.click(thirdSelector);
    await waitFor(() => {
      expect(getSlideThree()).toHaveStyle({ visibility: 'visible' });
    });
  });

  test('selector navigation: backward', async () => {
    render(
      <Carousel initialChild={2} fill controls="selectors">
        <div>Slide One</div>
        <div>Slide Two</div>
        <div>Slide Three</div>
      </Carousel>,
    );

    /**
     * - Currently on "Slide Three"
     * - Simulating click on the 1st selector button
     * - Expecting "Slide One" to be visible
     */
    const firstSelector = screen.getAllByRole('button')[0];
    expect(getSlideOne()).toHaveStyle({ visibility: 'hidden' });
    userEvent.click(firstSelector);
    await waitFor(() => {
      expect(getSlideOne()).toHaveStyle({ visibility: 'visible' });
    });
  });

  test('play', async () => {
    jest.useFakeTimers('modern');
    render(
      <Carousel play={500} controls={false}>
        <div>Slide One</div>
        <div>Slide Two</div>
      </Carousel>,
    );

    expect(screen.getByText('Slide One')).toHaveStyle({
      visibility: 'visible',
    });
    expect(screen.getByText('Slide Two')).toHaveStyle({
      visibility: 'hidden',
    });

    await act(async () => {
      jest.advanceTimersByTime(800);
    });
    await waitFor(() => {
      expect(getSlideOne()).toHaveStyle({ visibility: 'hidden' });
    });
    await waitFor(() => {
      expect(getSlideTwo()).toHaveStyle({ visibility: 'visible' });
    });
  });

  test('controlled component', async () => {
    const setActiveSlide = jest.fn();
    const { container } = render(
      <Carousel controls="arrows" activeChild={1} onChild={setActiveSlide}>
        <div>Slide One</div>
        <div>Slide Two</div>
      </Carousel>,
    );

    expect(container.firstChild).toMatchSnapshot();
    expect(setActiveSlide).toHaveBeenCalledWith(1);
  });
});
