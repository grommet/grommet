import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import styled from 'styled-components';
import { Add } from 'grommet-icons/icons/Add';
import { Subtract } from 'grommet-icons/icons/Subtract';

import { Box } from '../Box';
import { Button } from '../Button';
import { DropButton } from '../DropButton';
import { Keyboard } from '../Keyboard';
import { useThemeValue } from '../../utils/useThemeValue';
import { MessageContext } from '../../contexts/MessageContext';

// We determined 12 empirically as being wide enough to hit but
// not too wide to cause false hits.
const STEP = 12; // Used to determine the width change on resize

const StyledResizer = styled(DropButton)`
  display: flex;
  justify-content: center;
  padding-top: ${(props) => props.theme.global.edgeSize.xsmall};
  padding-bottom: ${(props) => props.theme.global.edgeSize.xsmall};
  margin-right: -${(props) => props.theme.global.edgeSize.small};
  position: absolute;
  right: 0;
  width: 24px;
  height: 100%;
  top: 0;
  cursor: col-resize;
  z-index: 1;
`;

const Resizer = ({ onResize, property, headerText, messages, headerId }) => {
  const { theme } = useThemeValue();
  const [active, setActive] = useState(false);
  const [start, setStart] = useState();
  const [width, setWidth] = useState(0);
  const ref = useRef();
  const thRef = useRef();
  const { format } = useContext(MessageContext);
  const ResizeIncreaseIcon =
    theme.dataTable.resize?.icons?.resizeIncrease || Add;
  const ResizeDecreaseIcon =
    theme.dataTable.resize?.icons?.resizeDecrease || Subtract;

  // Set the initial width based on the TH element's width and
  // store th element ref
  useEffect(() => {
    if (ref.current) {
      let element = ref.current;
      // find TH parent
      while (element && element.nodeName !== 'TH') element = element.parentNode;
      thRef.current = element;
      const rect = element.getBoundingClientRect();
      // Set initial width based on the TH element's width
      setWidth(rect.width);
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
      document.removeEventListener('touchend', onResizeEnd);
      document.removeEventListener('touchmove', onResizeMove);
    };

    if (active) {
      document.addEventListener('mouseup', onResizeEnd);
      document.addEventListener('mousemove', onResizeMove);
      document.addEventListener('touchend', onResizeEnd);
      document.addEventListener('touchmove', onResizeMove);

      return remove;
    }
    remove();
    return undefined;
  }, [active, onResizeMove, onResizeEnd]);

  let border;
  if (
    theme.dataTable.resize.border.color &&
    theme.dataTable.resize.border.side
  ) {
    const { color, side = 'end' } = theme.dataTable.resize.border;
    border = {
      color,
      side,
    };
  }

  let hoverBorder = border;
  if (theme.dataTable.resize.hover && theme.dataTable.resize.hover.border) {
    const { color, side = 'end', size } = theme.dataTable.resize.hover.border;
    hoverBorder = {
      color,
      side,
      size,
    };
  }

  const onKeyDown = useCallback(
    (event) => {
      event.preventDefault();
      if (!ref.current) return;
      if (thRef.current) {
        const element = thRef.current;
        const currentWidth = element.getBoundingClientRect().width;
        // Used STEP here to align with the value set in onMouseMove
        const delta = event.key === 'ArrowLeft' ? -STEP : STEP;
        onResize(property, currentWidth + delta);
        setWidth(currentWidth + delta);
      }
    },
    [onResize, property],
  );

  const onDecrease = useCallback(() => {
    if (thRef.current) {
      const element = thRef.current;
      const rect = element.getBoundingClientRect();
      const currentWidth = rect.width;
      const nextWidth = Math.max(STEP, currentWidth - STEP);
      setWidth(nextWidth);
      onResize(property, nextWidth);
    }
  }, [onResize, property]);

  const onIncrease = useCallback(() => {
    if (thRef.current) {
      const element = thRef.current;
      const rect = element.getBoundingClientRect();
      const currentWidth = rect.width;
      const nextWidth = Math.max(STEP, currentWidth + STEP);
      setWidth(nextWidth);
      onResize(property, nextWidth);
    }
  }, [onResize, property]);

  const [hover, setHover] = useState(false);
  const ariaLabel = format({
    id: 'dataTable.resizerAria',
    values: { headerText },
    messages,
  });

  return (
    <Keyboard onLeft={onKeyDown} onRight={onKeyDown}>
      <StyledResizer
        aria-label={
          width ? `${ariaLabel} ${Math.trunc(width)} pixels` : ariaLabel
        }
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        ref={ref}
        role="separator"
        aria-valuenow={width}
        aria-valuetext={
          width ? `${ariaLabel} ${Math.trunc(width)} pixels` : ariaLabel
        }
        aria-controls={headerId}
        aria-orientation="vertical"
        onMouseDown={onResizeStart}
        onMouseMove={start !== undefined ? onResizeMove : undefined}
        onMouseUp={start !== undefined ? onResizeEnd : undefined}
        onTouchStart={onResizeStart}
        onTouchMove={start !== undefined ? onResizeMove : undefined}
        onTouchEnd={start !== undefined ? onResizeEnd : undefined}
        dropContent={
          <Box direction="row" pad="xsmall">
            <Button
              aria-label={format({
                id: 'dataTable.decrease',
                values: { headerText },
                messages,
              })}
              icon={<ResizeDecreaseIcon />}
              onClick={onDecrease}
              autoFocus
            />
            <Button
              aria-label={format({
                id: 'dataTable.increase',
                values: { headerText },
                messages,
              })}
              icon={<ResizeIncreaseIcon />}
              onClick={onIncrease}
            />
          </Box>
        }
        dropAlign={{ top: 'bottom' }}
      >
        <Box
          border={hover || active ? hoverBorder : border}
          height="100%"
          alignSelf="center"
        />
      </StyledResizer>
    </Keyboard>
  );
};

Resizer.displayName = 'Resizer';

export { Resizer };
