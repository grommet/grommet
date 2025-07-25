import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import styled from 'styled-components';

import { Box } from '../Box';
import { Keyboard } from '../Keyboard';
import { useThemeValue } from '../../utils/useThemeValue';
import { MessageContext } from '../../contexts/MessageContext';
import { focusStyle, unfocusStyle } from '../../utils/styles';

const StyledResizer = styled(Box)`
  position: absolute;
  right: 0;
  width: 24px;
  height: 100%;
  top: 0;
  cursor: col-resize;
  z-index: 1;
  &:focus {
    ${(props) =>
      (!props.plain || props.focusIndicator) &&
      focusStyle({ inset: props.focusIndicator === 'inset' })}
  }
  &:focus:not(:focus-visible) {
    ${unfocusStyle()}
  }
`;

const Resizer = ({ onResize, property, headerText, messages, headerId }) => {
  const { theme } = useThemeValue();
  const [active, setActive] = useState(false);
  const [start, setStart] = useState();
  const [width, setWidth] = useState(0);
  const ref = useRef();
  const { format } = useContext(MessageContext);

  // Set the initial width based on the TH element's width
  useEffect(() => {
    if (ref.current) {
      let element = ref.current;
      // find TH parent
      while (element && element.nodeName !== 'TH') element = element.parentNode;
      const rect = element.getBoundingClientRect();
      // Set initial width based on the TH element's width
      setWidth(rect.width);
    }
  }, [ref]);

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
      let element = ref.current;
      while (element && element.nodeName !== 'TH') element = element.parentNode;
      const currentWidth = element.getBoundingClientRect().width;
      // Used 12 here to align with the value set in onMouseMove
      const delta = event.key === 'ArrowLeft' ? -12 : 12;
      onResize(property, currentWidth + delta);
      setWidth(currentWidth + delta);
    },
    [onResize, property],
  );

  const [hover, setHover] = useState(false);
  const ariaLabel = format({
    id: 'dataTable.resizerAria',
    values: { headerText },
    messages,
  });

  return (
    <Keyboard onLeft={onKeyDown} onRight={onKeyDown}>
      <StyledResizer
        tabIndex={0}
        aria-label={
          width ? `${ariaLabel} ${Math.trunc(width)} pixels` : ariaLabel
        }
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onMouseDown={onMouseDown}
        onMouseMove={start !== undefined ? onMouseMove : undefined}
        onMouseUp={start !== undefined ? onMouseUp : undefined}
        ref={ref}
        // TO DO add theme object
        pad={{ vertical: 'xsmall' }}
        // TO DO add theme object
        margin={{ right: `-${theme.global.edgeSize.small}` }}
        role="separator"
        aria-valuenow={width}
        aria-valuetext={
          width ? `${ariaLabel} ${Math.trunc(width)} pixels` : ariaLabel
        }
        aria-controls={headerId}
        aria-orientation="vertical"
      >
        <Box
          border={hover ? hoverBorder : border}
          height="100%"
          alignSelf="center"
        />
      </StyledResizer>
    </Keyboard>
  );
};

Resizer.displayName = 'Resizer';

export { Resizer };
