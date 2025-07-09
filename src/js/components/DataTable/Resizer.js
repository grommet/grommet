import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { Box } from '../Box';
import { Button } from '../Button';
import { Keyboard } from '../Keyboard';
import { Stack } from '../Stack';
import { useThemeValue } from '../../utils/useThemeValue';

// Added a temporary min-width of 2px here so that the element doesn't
// end up with a width of 0px. This is a placeholder solution until we
// revisit this in https://github.com/grommet/grommet/issues/7273
const InteractionBox = styled(Button)`
  min-width: 2px;
  cursor: col-resize;
  > * {
    opacity: 0;
  }

  // when mouse down, we want to continue to display styling
  ${(props) => props.active && '> * { opacity: 1; }'}

  &:hover {
    > * {
      opacity: 1;
    }
  }
`;

const Resizer = ({ onResize, property, widths }) => {
  const { theme } = useThemeValue();
  const [active, setActive] = useState(false);
  const [start, setStart] = useState();
  const [width, setWidth] = useState();
  const ref = useRef();

  const onMouseDown = useCallback((event) => {
    if (ref.current) {
      let element = ref.current;
      // find TH parent
      while (element && element.nodeName !== 'TH') element = element.parentNode;
      const rect = element.getBoundingClientRect();
      setStart(event.clientX);
      setWidth(rect.width);
      setActive(true);
    }
  }, []);

  const onMouseMove = useCallback(
    (event) => {
      // We determined 12 empirically as being wide enough to hit but
      // not too wide to cause false hits.
      const nextWidth = Math.max(12, width + (event.clientX - start));
      onResize(property, nextWidth);
    },
    [onResize, property, start, width],
  );

  const onMouseUp = useCallback(() => {
    setActive(false);
    setStart(undefined);
    setWidth(undefined);
  }, []);

  useEffect(() => {
    const remove = () => {
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mousemove', onMouseMove);
    };

    if (active) {
      document.addEventListener('mouseup', onMouseUp);
      document.addEventListener('mousemove', onMouseMove);
      return remove;
    }
    remove();
    return undefined;
  }, [active, onMouseMove, onMouseUp]);

  let border;
  if (theme.dataTable.resize.hover && theme.dataTable.resize.hover.border) {
    const { color, side = 'end', size } = theme.dataTable.resize.hover.border;
    border = {
      color,
      side,
      size,
    };
  }

  const onKeyDown = useCallback(
    (event) => {
      event.preventDefault();
      if (!ref.current) return;
      let element = ref.current;
      while (element && element.nodeName !== 'TH') element = element.parentNode;
      const currentWidth = element.getBoundingClientRect().width;
      const propertyWidth = widths?.[property];
      // Used 12 here to align with the value set in onMouseMove
      const delta = event.key === 'ArrowLeft' ? -12 : 12;
      onResize(property, (propertyWidth || currentWidth) + delta);
    },
    [onResize, property, widths],
  );

  return (
    <Stack anchor="right" interactiveChild="last">
      <Box
        flex={false}
        responsive={false}
        pad={{ vertical: 'small' }}
        {...theme.dataTable.resize}
      />
      <Keyboard onLeft={onKeyDown} onRight={onKeyDown}>
        {/* provides a wider, more accessible target to grab resizer */}
        <InteractionBox
          aria-label={`Resize ${property} column`}
          active={active}
          flex={false}
          pad={{ left: 'xsmall' }}
          margin={{ top: 'xsmall' }}
          ref={ref}
          responsive={false}
          onMouseDown={onMouseDown}
          onMouseMove={start !== undefined ? onMouseMove : undefined}
          onMouseUp={start !== undefined ? onMouseUp : undefined}
        >
          <Box pad={{ vertical: 'small' }} border={border} />
        </InteractionBox>
      </Keyboard>
    </Stack>
  );
};

Resizer.displayName = 'Resizer';

export { Resizer };
