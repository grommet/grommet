import React from 'react';
import { render, screen } from '@testing-library/react';
import 'jest-styled-components';
import 'regenerator-runtime/runtime';
import '@testing-library/jest-dom';

import { Grommet } from '../../../components/Grommet';
import { ResponsiveContext } from '..';

describe('ResponsiveContext', () => {
  describe('when viewport width is 768px', () => {
    beforeEach(() => {
      jest
        .spyOn(document.body, 'clientWidth', 'get')
        .mockImplementation(() => 768);
    });

    test('should return small', () => {
      const { container } = render(
        <Grommet>
          <ResponsiveContext.Consumer>
            {(size) => size}
          </ResponsiveContext.Consumer>
        </Grommet>,
      );

      expect(screen.getByText('small')).toBeInTheDocument();
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('when viewport width is 1536px', () => {
    beforeEach(() => {
      jest
        .spyOn(document.body, 'clientWidth', 'get')
        .mockImplementation(() => 1536);
    });

    test('should return medium', () => {
      const { container } = render(
        <Grommet>
          <ResponsiveContext.Consumer>
            {(size) => size}
          </ResponsiveContext.Consumer>
        </Grommet>,
      );

      expect(screen.getByText('medium')).toBeInTheDocument();
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('when viewport width is 1537px', () => {
    beforeEach(() => {
      jest
        .spyOn(document.body, 'clientWidth', 'get')
        .mockImplementation(() => 1537);
    });

    test('should return large', () => {
      const { container } = render(
        <Grommet>
          <ResponsiveContext.Consumer>
            {(size) => size}
          </ResponsiveContext.Consumer>
        </Grommet>,
      );

      expect(screen.getByText('large')).toBeInTheDocument();
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
