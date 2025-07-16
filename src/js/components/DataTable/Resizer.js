import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import styled from 'styled-components';
import { Add, Subtract } from 'grommet-icons';

import { Box } from '../Box';
import { Button } from '../Button';
import { DropButton } from '../DropButton';
import { Keyboard } from '../Keyboard';
import { Stack } from '../Stack';
import { useThemeValue } from '../../utils/useThemeValue';
import { MessageContext } from '../../contexts/MessageContext';

// We determined 12 empirically as being wide enough to hit but
// not too wide to cause false hits.
const STEP = 12; // Used to determine the width change on resize

// Added a temporary min-width of 2px here so that the element doesn't
// end up with a width of 0px. This is a placeholder solution until we
// revisit this in https://github.com/grommet/grommet/issues/7273
const InteractionBox = styled(DropButton)`
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

const Resizer = ({ onResize, property, headerText, messages }) => {
  const { theme } = useThemeValue();
  const [active, setActive] = useState(false);
  const [start, setStart] = useState();
  const [width, setWidth] = useState();
  const ref = useRef();
  const thRef = useRef();
  const { format } = useContext(MessageContext);

  useEffect(() => {
    if (ref.current) {
      let element = ref.current;
      // find TH parent
      while (element && element.nodeName !== 'TH') {
        element = element.parentNode;
      }
      thRef.current = element;
    }
  }, []);

  const onResizeStart = useCallback((event) => {
    const clientX = event.touches ? event.touches[0].clientX : event.clientX;
    if (thRef.current) {
      const element = thRef.current;
      const rect = element.getBoundingClientRect();
      setStart(clientX);
      setWidth(rect.width);
      setActive(true);
    }
  }, []);

  const onResizeMove = useCallback(
    (event) => {
      const clientX = event.touches ? event.touches[0].clientX : event.clientX;
      const nextWidth = Math.max(STEP, width + (clientX - start));
      onResize(property, nextWidth);
    },
    [onResize, property, start, width],
  );

  const onResizeEnd = useCallback(() => {
    setActive(false);
    setStart(undefined);
    setWidth(undefined);
  }, []);

  useEffect(() => {
    const remove = () => {
      document.removeEventListener('mouseup', onResizeEnd);
      document.removeEventListener('mousemove', onResizeMove);
    };

    if (active) {
      document.addEventListener('mouseup', onResizeEnd);
      document.addEventListener('mousemove', onResizeMove);

      return remove;
    }
    remove();
    return undefined;
  }, [active, onResizeMove, onResizeEnd]);

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
      // Used STEP here to align with the value set in onMouseMove
      const delta = event.key === 'ArrowLeft' ? -STEP : STEP;
      onResize(property, currentWidth + delta);
    },
    [onResize, property],
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
          aria-label={format({
            id: 'dataTable.resizerAria',
            values: { headerText },
            messages,
          })}
          active={active}
          flex={false}
          pad={{ left: 'xsmall' }}
          margin={{ top: 'xsmall' }}
          ref={ref}
          responsive={false}
          onMouseDown={onResizeStart}
          onMouseMove={start !== undefined ? onResizeMove : undefined}
          onMouseUp={start !== undefined ? onResizeEnd : undefined}
          onTouchStart={onResizeStart}
          onTouchMove={start !== undefined ? onResizeMove : undefined}
          onTouchEnd={start !== undefined ? onResizeEnd : undefined}
          dropContent={
            <Box direction="row" pad="xsmall">
              <Button
                icon={<Subtract />}
                onClick={() => {
                  if (thRef.current) {
                    const element = thRef.current;
                    const rect = element.getBoundingClientRect();
                    const currentWidth = rect.width;
                    const nextWidth = Math.max(STEP, currentWidth - STEP);
                    onResize(property, nextWidth);
                  }
                }}
                autoFocus
              />
              <Button
                icon={<Add />}
                onClick={() => {
                  if (thRef.current) {
                    const element = thRef.current;
                    const rect = element.getBoundingClientRect();
                    const currentWidth = rect.width;
                    const nextWidth = Math.max(STEP, currentWidth + STEP);
                    onResize(property, nextWidth);
                  }
                }}
              />
            </Box>
          }
          dropAlign={{ top: 'bottom' }}
        >
          <Box pad={{ vertical: 'small' }} border={border} />
        </InteractionBox>
      </Keyboard>
    </Stack>
  );
};

Resizer.displayName = 'Resizer';

export { Resizer };
