import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { axe } from 'jest-axe';
import 'jest-styled-components';
import 'jest-axe/extend-expect';
import 'regenerator-runtime/runtime';

import { Grommet } from '../../Grommet';
import { TextArea } from '..';

describe('TextArea', () => {
  test('should not have accessibility violations', async () => {
    const { container } = render(
      <Grommet>
        <TextArea a11yTitle="test" id="item" name="item" />
      </Grommet>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('basic', () => {
    const { container } = render(
      <Grommet>
        <TextArea id="item" name="item" />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('placeholder', () => {
    const { container } = render(
      <Grommet>
        <TextArea id="item" name="item" placeholder="placeholder" />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('plain', () => {
    const { container } = render(
      <Grommet>
        <TextArea id="item" name="item" plain />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('disabled', () => {
    const { container } = render(
      <Grommet>
        <TextArea disabled id="item" name="item" plain />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('focusIndicator', () => {
    const { container } = render(
      <Grommet>
        <TextArea id="item" name="item" focusIndicator />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('fill', () => {
    const { container } = render(
      <Grommet>
        <TextArea id="item" name="item" fill />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  [true, false, 'horizontal', 'vertical'].forEach((resize) => {
    test(`resize ${resize}`, () => {
      const { container } = render(
        <Grommet>
          <TextArea id="item" name="item" resize={resize} />
        </Grommet>,
      );

      expect(container.firstChild).toMatchSnapshot();
    });
  });

  ['small', 'medium', 'large'].forEach((size) => {
    test(`size ${size}`, () => {
      const { container } = render(
        <Grommet>
          <TextArea id="item" name="item" size={size} />
        </Grommet>,
      );

      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('Event tests', () => {
    const keyEvent = {
      key: 'Backspace',
      keyCode: 8,
      which: 8,
    };

    test(`onKeyDown`, () => {
      let capturedEvent = null;
      const callback = (event) => {
        const { key, keyCode, which } = event;
        capturedEvent = { key, keyCode, which };
      };

      const component = render(
        <Grommet>
          <TextArea
            id="item"
            name="item"
            placeholder="item"
            onKeyDown={callback}
          />
        </Grommet>,
      );

      const textArea = component.getByPlaceholderText('item');

      fireEvent.keyDown(textArea, keyEvent);

      expect(capturedEvent).toEqual(expect.objectContaining(keyEvent));
    });

    test(`onKeyUp`, () => {
      let capturedEvent = null;
      const callback = (event) => {
        const { key, keyCode, which } = event;
        capturedEvent = { key, keyCode, which };
      };

      const component = render(
        <Grommet>
          <TextArea
            id="item"
            name="item"
            placeholder="item"
            onKeyUp={callback}
          />
        </Grommet>,
      );

      const textArea = component.getByPlaceholderText('item');

      fireEvent.keyUp(textArea, keyEvent);

      expect(capturedEvent).toEqual(expect.objectContaining(keyEvent));
    });

    test('onFocus', () => {
      const onFocus = jest.fn();
      const { container, getByPlaceholderText } = render(
        <Grommet>
          <TextArea name="item" placeholder="item" onFocus={onFocus} />
        </Grommet>,
      );
      fireEvent.focus(getByPlaceholderText('item'));
      expect(container.firstChild).toMatchSnapshot();
      expect(onFocus).toHaveBeenCalledTimes(1);
    });

    test('onChange', () => {
      const onChange = jest.fn();
      const { getByPlaceholderText } = render(
        <Grommet>
          <TextArea name="item" placeholder="item" onChange={onChange} />
        </Grommet>,
      );
      const input = getByPlaceholderText('item');
      fireEvent.change(input, {
        target: { value: 'Test' },
      });
      expect(input.value).toEqual('Test');
      expect(onChange).toHaveBeenCalledTimes(1);
    });

    test('onBlur is being called', () => {
      const onBlur = jest.fn();
      const { getByPlaceholderText } = render(
        <Grommet>
          <TextArea name="item" placeholder="item" onBlur={onBlur} />
        </Grommet>,
      );
      fireEvent.blur(getByPlaceholderText('item'));
      expect(onBlur).toHaveBeenCalledTimes(1);
    });
  });
});
